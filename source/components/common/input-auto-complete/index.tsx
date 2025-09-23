import { Feather } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Animated, ScrollView, TouchableOpacity, View } from "react-native";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "../../ui/form-control";
import { HStack } from "../../ui/hstack";
import { AddIcon, AlertCircleIcon, CloseIcon, SearchIcon } from "../../ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "../../ui/input";
import { Text } from "../../ui/text";
import { VStack } from "../../ui/vstack";

// Définition des interfaces
interface Departement {
  code: string;
  nom: string;
}

export interface City {
  nom: string;
  code: string;
  _score: number;
  departement?: Departement;
}

interface InputMultiSelectCityProps {
  onCitiesSelected?: (cities: City[]) => void;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  maxSelections?: number;
  minSelections?: number;
  themeColor?: string;
  accentColor?: string;
  selectionColor?: string;
}

// Constantes pour éviter les re-rendus
const ANIMATION_CONFIG = {
  duration: 200,
  useNativeDriver: true,
};

const SPRING_CONFIG = {
  friction: 8,
  tension: 40,
  useNativeDriver: true,
};

const InputMultiSelectCity: React.FC<InputMultiSelectCityProps> = ({
  onCitiesSelected,
  label = "Recherche de villes",
  placeholder = "Entrez le nom d'une ville",
  errorMessage = "Veuillez sélectionner au moins une ville valide",
  helperText = "Commencez à taper pour voir des suggestions",
  maxSelections = 5,
  minSelections = 1,
  themeColor = "#FF6347",
  accentColor = "#fffbfa",
  selectionColor = "#10B981",
}) => {
  // States
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [errorType, setErrorType] = useState<string>("");

  // Références pour les animations
  const animations = useRef({
    suggestionOpacity: new Animated.Value(0),
    selectionScale: new Animated.Value(1),
    shakeAnimation: new Animated.Value(0),
    tagAppearAnimation: new Animated.Value(0),
  }).current;

  // Styles mémorisés
  const styles = useMemo(
    () => ({
      tagStyle: {
        backgroundColor: accentColor,
        borderWidth: 1,
        borderColor: themeColor,
      },
      clearButtonStyle: {
        color: themeColor,
      },
      addButtonStyle: {
        color: themeColor,
      },
      validSelectionStyle: {
        color: selectionColor,
      },
      errorIconStyle: {
        color: "#EF4444",
        width: 20,
        height: 20,
      },
      clearIconContainerStyle: {
        backgroundColor: themeColor,
      },
    }),
    [themeColor, accentColor, selectionColor]
  );

  // Calcul mémorisé des messages d'erreur
  const errorMessage_i18n = useMemo(
    () => ({
      maxLimit: `Vous ne pouvez pas sélectionner plus de ${maxSelections} villes`,
      minLimit: `Veuillez sélectionner au moins ${minSelections} ville${minSelections > 1
? "s"
: ""}`,
      network: "Erreur de connexion, veuillez réessayer",
    }),
    [maxSelections, minSelections]
  );

  // Fonction de recherche des suggestions avec mémorisation
  const fetchSuggestions = useCallback(
    async (query: string): Promise<void> => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&fields=departement&boost=population&limit=5`);

        if (!response.ok) {
          throw new Error("Erreur réseau");
        }

        const data: City[] = await response.json();

        // Filtrer les villes déjà sélectionnées avec une Map pour optimiser les performances
        const selectedCityCodes = new Set(selectedCities.map((city) => city.code));
        const filteredData = data.filter((city) => !selectedCityCodes.has(city.code));

        setSuggestions(filteredData);

        // Animation des suggestions
        Animated.timing(animations.suggestionOpacity, {
          toValue: filteredData.length > 0
? 1
: 0,
          ...ANIMATION_CONFIG,
        }).start();
      } catch (error) {
        console.error("Erreur:", error);
        setIsInvalid(true);
        setErrorType("network");
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCities, animations.suggestionOpacity]
  );

  // Debounce pour éviter trop d'appels API
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(inputValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, fetchSuggestions]);

  // Animation de secousse pour erreur
  const startShakeAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(animations.shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animations.shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animations.shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animations.shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animations.shakeAnimation]);

  // Gestion de la sélection d'une ville
  const handleSelectCity = useCallback(
    (city: City): void => {
      if (selectedCities.length >= maxSelections) {
        setIsInvalid(true);
        setErrorType("maxLimit");
        startShakeAnimation();
        return;
      }

      // Animation d'apparition des tags
      animations.tagAppearAnimation.setValue(0);

      // Créer le nouveau tableau de villes sélectionnées
      const updatedCities = [...selectedCities, city];

      // Mettre à jour l'état avec le nouveau tableau
      setSelectedCities(updatedCities);
      setInputValue("");
      setSuggestions([]);
      setIsInvalid(false);
      setErrorType("");

      // Animation d'apparition du tag
      Animated.spring(animations.tagAppearAnimation, {
        toValue: 1,
        ...SPRING_CONFIG,
      }).start();

      // Callback pour le parent avec le nouveau tableau mis à jour
      if (onCitiesSelected) {
        onCitiesSelected(updatedCities);
      }
    },
    [selectedCities, maxSelections, animations.tagAppearAnimation, startShakeAnimation, onCitiesSelected]
  );

  // Suppression d'une ville sélectionnée
  const handleRemoveCity = useCallback(
    (cityCode: string): void => {
      const updatedCities = selectedCities.filter((city) => city.code !== cityCode);
      setSelectedCities(updatedCities);

      // Callback pour le parent
      if (onCitiesSelected) {
        onCitiesSelected(updatedCities);
      }

      // Vérifier si nous sommes en dessous du minimum requis
      if (updatedCities.length < minSelections) {
        setIsInvalid(true);
        setErrorType("minLimit");
      } else {
        setIsInvalid(false);
        setErrorType("");
      }
    },
    [selectedCities, minSelections, onCitiesSelected]
  );

  // Validation du formulaire
  const validateSelection = useCallback((): boolean => {
    if (selectedCities.length < minSelections) {
      setIsInvalid(true);
      setErrorType("minLimit");
      startShakeAnimation();
      return false;
    }

    setIsInvalid(false);
    setErrorType("");
    return true;
  }, [selectedCities.length, minSelections, startShakeAnimation]);

  // Reset complet du champ avec animation
  const handleClearAll = useCallback((): void => {
    // Animation de disparition
    Animated.timing(animations.selectionScale, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setInputValue("");
      setSelectedCities([]);
      setIsInvalid(false);
      setErrorType("");
      setSuggestions([]);

      // Animation de réapparition
      Animated.spring(animations.selectionScale, {
        toValue: 1,
        ...SPRING_CONFIG,
      }).start();

      // Callback pour le parent
      if (onCitiesSelected) {
        onCitiesSelected([]);
      }
    });
  }, [animations.selectionScale, onCitiesSelected]);

  // Fonction optimisée pour éviter les re-calculs dans le render
  const handleInputChange = useCallback(
    (text: string) => {
      setInputValue(text);
      if (isInvalid && errorType === "maxLimit") {
        setIsInvalid(false);
        setErrorType("");
      }
    },
    [isInvalid, errorType]
  );

  // Gestion du focus et blur pour l'input
  const handleInputBlur = useCallback(() => {
    // Valider après la perte de focus
    if (selectedCities.length > 0) {
      validateSelection();
    }
  }, [selectedCities.length, validateSelection]);

  // Affichage du message d'erreur en fonction du type
  const getErrorMessage = useCallback(() => {
    return errorMessage_i18n[errorType as keyof typeof errorMessage_i18n] || errorMessage;
  }, [errorType, errorMessage_i18n, errorMessage]);

  // Rendu des villes sélectionnées - mémorisé pour éviter les re-rendus inutiles
  const renderedSelectedCities = useMemo(() => {
    if (selectedCities.length === 0) return null;

    return (
      <View className="mb-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "nowrap",
            gap: 8,
            paddingVertical: 4,
          }}
        >
          {selectedCities.map((city) => (
            <View key={city.code}>
              <HStack className="items-center px-3 py-2 rounded-full" style={styles.tagStyle}>
                <Text className="font-medium text-sm mr-1" style={styles.clearButtonStyle}>
                  {city.nom}
                </Text>
                <TouchableOpacity onPress={() => handleRemoveCity(city.code)} className="w-5 h-5 rounded-full justify-center items-center" style={styles.clearIconContainerStyle}>
                  <CloseIcon color="#FFFFFF" />
                </TouchableOpacity>
              </HStack>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }, [selectedCities, handleRemoveCity, styles]);

  // Rendu des suggestions - mémorisé pour éviter les re-rendus inutiles
  const renderedSuggestions = useMemo(() => {
    if (suggestions.length === 0) return null;

    return (
      <Animated.View style={{ opacity: animations.suggestionOpacity }}>
        <VStack className="w-full border border-gray-100 rounded-lg mt-2 mb-3 bg-white shadow-sm overflow-hidden" style={{ elevation: 2 }}>
          {suggestions.map((city, index) => (
            <TouchableOpacity
              key={city.code}
              onPress={() => handleSelectCity(city)}
              className="w-full py-4 px-4"
              style={{
                borderBottomWidth: index < suggestions.length - 1
? 1
: 0,
                borderBottomColor: "#F3F4F6",
                backgroundColor: index % 2 === 0
? "#FFFFFF"
: "#FAFAFA",
              }}
              activeOpacity={0.7}
            >
              <HStack className="justify-between items-center">
                <HStack className="items-center space-x-3">
                  <VStack className="space-y-1">
                    <Text className="font-medium text-gray-800">{city.nom}</Text>
                    <Text className="text-xs text-gray-500">
                      {city.departement?.code} - {city.departement?.nom}
                    </Text>
                  </VStack>
                </HStack>
                <HStack className="items-center space-x-2">
                  <Text className="text-xs font-medium" style={styles.addButtonStyle}>
                    Ajouter
                  </Text>
                  <AddIcon color={themeColor} style={{ width: 20, height: 20 }} />
                </HStack>
              </HStack>
            </TouchableOpacity>
          ))}
        </VStack>
      </Animated.View>
    );
  }, [suggestions, animations.suggestionOpacity, handleSelectCity, styles.addButtonStyle, themeColor]);

  return (
    <Animated.View
      className="w-full max-w-md"
      style={{
        transform: [{ translateX: animations.shakeAnimation }],
      }}
    >
      <FormControl isInvalid={isInvalid} size="md">
        <FormControlLabel>
          <HStack className="justify-between items-center mb-1">
            <FormControlLabelText className="text-gray-800 font-semibold text-lg" style={{ letterSpacing: -0.3 }}>
              {label}
            </FormControlLabelText>
            {selectedCities.length > 0 && (
              <TouchableOpacity onPress={handleClearAll}>
                <Text className="text-sm font-medium pl-1" style={styles.clearButtonStyle}>
                  Tout effacer ({selectedCities.length})
                </Text>
              </TouchableOpacity>
            )}
          </HStack>
        </FormControlLabel>

        {/* Affichage des villes sélectionnées */}
        {renderedSelectedCities}

        {/* Input de recherche */}
        <Input variant="rounded" size="lg">
          <InputSlot className="pl-4">
            <InputIcon as={SearchIcon} fill="none" stroke="gray" />
          </InputSlot>
          <InputField type="text" placeholder={selectedCities.length > 0
? "Ajouter une autre ville"
: placeholder} value={inputValue} className="h-14 text-base font-medium px-2" onChangeText={handleInputChange} onFocus={() => {}} onBlur={handleInputBlur} />
          {inputValue !== "" && (
            <InputSlot onPress={() => setInputValue("")} className="pr-4">
              <InputIcon as={CloseIcon} className="text-gray-400" />
            </InputSlot>
          )}
        </Input>

        {/* État de chargement */}
        {isLoading && (
          <FormControlHelper>
            <HStack className="items-center my-2 space-x-2">
              <ActivityIndicator size="small" color={themeColor} className="mr-2" />
              <FormControlHelperText className="text-gray-500 font-medium">Chargement des suggestions...</FormControlHelperText>
            </HStack>
          </FormControlHelper>
        )}

        {/* Message d'aide */}
        {!inputValue && !isLoading && !isInvalid && selectedCities.length === 0 && (
          <FormControlHelper>
            <FormControlHelperText className="text-gray-500 font-light italic ml-1 mt-1">{helperText}</FormControlHelperText>
          </FormControlHelper>
        )}

        {/* Compteur de sélection */}
        {selectedCities.length > 0 && !isInvalid && !inputValue && (
          <FormControlHelper>
            <FormControlHelperText className="text-gray-500 font-medium ml-1 mt-1">
              {selectedCities.length} ville
              {selectedCities.length > 1
? "s"
: ""} sélectionnée
              {selectedCities.length > 1
? "s"
: ""}
              {maxSelections && ` (max: ${maxSelections})`}
            </FormControlHelperText>
          </FormControlHelper>
        )}

        {/* Liste des suggestions */}
        {renderedSuggestions}

        {/* Message quand aucun résultat */}
        {inputValue.length > 2 && !isLoading && suggestions.length === 0 && (
          <FormControlHelper>
            <HStack className="items-center my-2 p-3 bg-gray-50 rounded-lg">
              <FormControlHelperText className="text-gray-500 font-medium">Aucune ville trouvée pour "{inputValue}"</FormControlHelperText>
            </HStack>
          </FormControlHelper>
        )}

        {/* Message d'erreur */}
        {isInvalid && (
          <FormControlError>
            <HStack className="items-center space-x-2 mt-2">
              <FormControlErrorIcon as={AlertCircleIcon} style={styles.errorIconStyle} />
              <FormControlErrorText className="font-medium" style={{ color: "#EF4444" }}>
                {getErrorMessage()}
              </FormControlErrorText>
            </HStack>
          </FormControlError>
        )}

        {/* Résumé du statut de sélection */}
        {selectedCities.length >= 1 && (
          <View className="mt-4 mb-2 px-4 py-3 rounded-lg bg-gray-50">
            <HStack className="justify-between items-center">
              <Text className="font-medium text-gray-700">
                {selectedCities.length} / {maxSelections} villes
              </Text>
              {selectedCities.length >= minSelections && (
                <HStack className="items-center space-x-1">
                  <Feather name="check-circle" size={16} color={selectionColor} />
                  <Text className="text-sm font-medium pl-1" style={styles.validSelectionStyle}>
                    Sélection valide
                  </Text>
                </HStack>
              )}
            </HStack>
          </View>
        )}
      </FormControl>
    </Animated.View>
  );
};

export default React.memo(InputMultiSelectCity);