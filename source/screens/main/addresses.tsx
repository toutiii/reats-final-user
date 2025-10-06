import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  ChevronLeft,
  Save,
  Home,
  Building,
  MapPin,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";

// Types
interface Address {
  id: string;
  type: "home" | "work" | "other";
  label: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

type AddressType = "home" | "work" | "other";

interface AddressTypeOption {
  type: AddressType;
  label: string;
  icon: React.ComponentType<any>;
  gradient: string[];
  description: string;
}

interface ValidationErrors {
  label?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

// Route params type
type RootStackParamList = {
  AddAddress: { addressId?: string } | undefined;
  [key: string]: any;
};

type AddAddressRouteProp = RouteProp<RootStackParamList, "AddAddress">;

const AddAddressScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const route = useRoute<AddAddressRouteProp>();

  // Récupération sécurisée de addressId
  const addressId = route.params?.addressId;

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [scaleAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));

  const [formData, setFormData] = useState({
    label: "",
    type: "home" as AddressType,
    address: "",
    city: "",
    postalCode: "",
    isDefault: false,
  });

  const addressTypes: AddressTypeOption[] = [
    {
      type: "home",
      label: "Domicile",
      icon: Home,
      gradient: ["#10B981", "#059669"],
      description: "Votre résidence principale",
    },
    {
      type: "work",
      label: "Bureau",
      icon: Building,
      gradient: ["#3B82F6", "#2563EB"],
      description: "Votre lieu de travail",
    },
    {
      type: "other",
      label: "Autre",
      icon: MapPin,
      gradient: ["#F59E0B", "#D97706"],
      description: "Adresse personnalisée",
    },
  ];

  const isEditing = Boolean(addressId);

  useEffect(() => {
    // Animation d'entrée
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    if (isEditing && addressId) {
      // Simuler le chargement des données
      setFormData({
        label: "Domicile",
        type: "home",
        address: "2118 Thornridge Cir",
        city: "Syracuse, NY 13201",
        postalCode: "13201",
        isDefault: true,
      });
    }
  }, [isEditing, addressId, scaleAnim, fadeAnim]);

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "label":
        if (!value.trim()) return "Le libellé est requis";
        if (value.length < 2) return "Le libellé doit contenir au moins 2 caractères";
        break;
      case "address":
        if (!value.trim()) return "L'adresse est requise";
        if (value.length < 5) return "L'adresse doit être plus détaillée";
        break;
      case "city":
        if (!value.trim()) return "La ville est requise";
        break;
      case "postalCode":
        if (value && !/^\d{5}$/.test(value)) return "Code postal invalide (5 chiffres)";
        break;
    }
    return undefined;
  };

  const handleFieldChange = (field: string, value: string | boolean): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Validation en temps réel
    if (typeof value === "string" && touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const handleBlur = (field: string): void => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData] as string);
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleSave = async (): Promise<void> => {
    // Valider tous les champs
    const newErrors: ValidationErrors = {};
    let hasError = false;

    Object.keys(formData).forEach(field => {
      if (["label", "address", "city", "postalCode"].includes(field)) {
        const error = validateField(field, formData[field as keyof typeof formData] as string);
        if (error) {
          newErrors[field as keyof ValidationErrors] = error;
          hasError = true;
        }
      }
    });

    if (hasError) {
      setErrors(newErrors);
      setTouched({
        label: true,
        address: true,
        city: true,
        postalCode: true,
      });

      // Animation de secousse
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.98, duration: 100, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, tension: 300, useNativeDriver: true }),
      ]).start();

      return;
    }

    setIsSaving(true);

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        "Succès 🎉",
        `Adresse ${isEditing
? "mise à jour"
: "ajoutée"} avec succès !`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert(
        "Erreur",
        `Impossible de ${isEditing
? "mettre à jour"
: "ajouter"} l'adresse. Réessayez.`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const AddressTypeSelector: React.FC = () => (
    <View className="mb-8">
      <HStack className="items-center mb-4">
        <Text className="text-gray-900 text-base font-semibold">
          Type d'adresse
        </Text>
        <View className="ml-2 bg-orange-100 px-2 py-1 rounded-full">
          <Text className="text-orange-600 text-xs font-medium">Requis</Text>
        </View>
      </HStack>

      <VStack className="gap-3">
        {addressTypes.map((option) => {
          const IconComponent = option.icon;
          const isSelected = formData.type === option.type;

          return (
            <TouchableOpacity
              key={option.type}
              className={`p-4 rounded-2xl border-2 ${
                isSelected
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white"
              }`}
              style={{
                shadowColor: isSelected
? "#f97316"
: "#000",
                shadowOffset: { width: 0, height: isSelected
? 4
: 2 },
                shadowOpacity: isSelected
? 0.15
: 0.05,
                shadowRadius: isSelected
? 8
: 3,
                elevation: isSelected
? 5
: 2,
              }}
              onPress={() => handleFieldChange("type", option.type)}
              activeOpacity={0.7}
            >
              <HStack className="items-center">
                <View
                  className={`w-14 h-14 rounded-2xl items-center justify-center mr-4 ${
                    isSelected
? "bg-orange-500"
: "bg-gray-100"
                  }`}
                  style={{
                    shadowColor: isSelected
? "#f97316"
: "transparent",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: isSelected
? 4
: 0,
                  }}
                >
                  <IconComponent
                    size={24}
                    color={isSelected
? "white"
: "#6B7280"}
                    strokeWidth={2}
                  />
                </View>

                <VStack className="flex-1">
                  <Text className={`text-base font-semibold mb-1 ${
                    isSelected
? "text-orange-600"
: "text-gray-900"
                  }`}>
                    {option.label}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {option.description}
                  </Text>
                </VStack>

                {isSelected && (
                  <View className="w-8 h-8 rounded-full bg-orange-500 items-center justify-center">
                    <Check size={16} color="white" strokeWidth={3} />
                  </View>
                )}
              </HStack>
            </TouchableOpacity>
          );
        })}
      </VStack>
    </View>
  );

  const InputGroup: React.FC<{
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    required?: boolean;
    keyboardType?: "default" | "numeric";
    field: string;
    helpText?: string;
  }> = ({ label, value, onChangeText, placeholder, required = false, keyboardType = "default", field, helpText }) => {
    const error = touched[field] && errors[field as keyof ValidationErrors];
    const hasValue = value.trim().length > 0;

    return (
      <View className="mb-6">
        <HStack className="items-center justify-between mb-3">
          <HStack className="items-center">
            <Text className="text-gray-900 text-sm font-semibold">
              {label}
            </Text>
            {required && (
              <View className="ml-1 w-2 h-2 rounded-full bg-red-500" />
            )}
          </HStack>
          {hasValue && !error && (
            <View className="bg-green-100 px-2 py-0.5 rounded-full">
              <Text className="text-green-600 text-xs font-medium">✓ Valide</Text>
            </View>
          )}
        </HStack>

        <View className="relative">
          <Input
            variant="outline"
            size="lg"
            isDisabled={isSaving}
            className={`bg-white rounded-2xl ${
              error
                ? "border-2 border-red-500 bg-red-50"
                : hasValue
                  ? "border-2 border-green-500 bg-green-50"
                  : "border border-gray-200"
            }`}
            style={{
              shadowColor: error
? "#EF4444"
: hasValue
? "#10B981"
: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: error || hasValue
? 0.1
: 0.03,
              shadowRadius: 4,
              elevation: error || hasValue
? 3
: 1,
            }}
          >
            <InputField
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              onBlur={() => handleBlur(field)}
              keyboardType={keyboardType}
              autoCapitalize="words"
              className={`text-gray-900 text-base px-4 ${
                error
? "text-red-600"
: ""
              }`}
              placeholderTextColor="#9CA3AF"
            />
          </Input>

          {error && (
            <HStack className="items-center mt-2 px-1">
              <AlertCircle size={14} color="#EF4444" strokeWidth={2} />
              <Text className="text-red-500 text-xs font-medium ml-1.5">
                {error}
              </Text>
            </HStack>
          )}

          {helpText && !error && (
            <Text className="text-gray-400 text-xs mt-2 px-1">
              {helpText}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7ED" />

      {/* Header */}
      <View
        className="bg-white border-b border-gray-100"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <HStack className="items-center justify-between px-6 py-4">
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}
          >
            <ChevronLeft size={22} color="#111827" strokeWidth={2.5} />
          </TouchableOpacity>

          <VStack className="items-center">
            <Text className="text-gray-900 text-lg font-bold">
              {isEditing
? "Modifier l'adresse"
: "Nouvelle adresse"}
            </Text>
            {isEditing && (
              <Text className="text-gray-500 text-xs">
                Mise à jour de vos informations
              </Text>
            )}
          </VStack>

          <View className="w-10 h-10 items-center justify-center">
            {!isEditing && <Sparkles size={20} color="#F97316" />}
          </View>
        </HStack>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios"
? "padding"
: "height"}
        keyboardVerticalOffset={Platform.OS === "ios"
? 0
: 20}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <Animated.View
            className="px-6 pt-6"
            style={{
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }}
          >
            {/* Badge d'information */}
            <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
              <HStack className="items-start">
                <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center mr-3">
                  <MapPin size={20} color="white" strokeWidth={2} />
                </View>
                <VStack className="flex-1">
                  <Text className="text-blue-900 text-sm font-semibold mb-1">
                    Précision importante
                  </Text>
                  <Text className="text-blue-700 text-xs leading-relaxed">
                    Assurez-vous que l'adresse est complète pour une livraison rapide et sans erreur
                  </Text>
                </VStack>
              </HStack>
            </View>

            <AddressTypeSelector />

            <InputGroup
              label="Libellé"
              field="label"
              value={formData.label}
              onChangeText={(text) => handleFieldChange("label", text)}
              placeholder="ex: Maison, Bureau, Salle de sport"
              required
              helpText="Un nom facile à mémoriser pour cette adresse"
            />

            <InputGroup
              label="Adresse complète"
              field="address"
              value={formData.address}
              onChangeText={(text) => handleFieldChange("address", text)}
              placeholder="Numéro et nom de rue"
              required
              helpText="Incluez le numéro, nom de rue, bâtiment, etc."
            />

            <InputGroup
              label="Ville"
              field="city"
              value={formData.city}
              onChangeText={(text) => handleFieldChange("city", text)}
              placeholder="Ville, Région, Code postal"
              required
            />

            <InputGroup
              label="Code postal"
              field="postalCode"
              value={formData.postalCode}
              onChangeText={(text) => handleFieldChange("postalCode", text)}
              placeholder="12345"
              keyboardType="numeric"
            />

            {/* Set as Default */}
            <TouchableOpacity
              className={`p-5 rounded-2xl border-2 ${
                formData.isDefault
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white"
              }`}
              style={{
                shadowColor: formData.isDefault
? "#f97316"
: "#000",
                shadowOffset: { width: 0, height: formData.isDefault
? 4
: 2 },
                shadowOpacity: formData.isDefault
? 0.15
: 0.05,
                shadowRadius: formData.isDefault
? 8
: 3,
                elevation: formData.isDefault
? 5
: 2,
              }}
              onPress={() => handleFieldChange("isDefault", !formData.isDefault)}
              activeOpacity={0.7}
            >
              <HStack className="items-center justify-between">
                <HStack className="flex-1 items-center mr-4">
                  <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${
                    formData.isDefault
? "bg-orange-500"
: "bg-gray-100"
                  }`}>
                    <Home
                      size={20}
                      color={formData.isDefault
? "white"
: "#6B7280"}
                      strokeWidth={2}
                    />
                  </View>

                  <VStack className="flex-1">
                    <Text className={`text-base font-semibold mb-1 ${
                      formData.isDefault
? "text-orange-600"
: "text-gray-900"
                    }`}>
                      Adresse par défaut
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      Votre lieu de livraison principal
                    </Text>
                  </VStack>
                </HStack>

                <View className={`w-7 h-7 rounded-lg border-2 items-center justify-center ${
                  formData.isDefault
                    ? "bg-orange-500 border-orange-500"
                    : "border-gray-300 bg-white"
                }`}>
                  {formData.isDefault && (
                    <Check size={16} color="white" strokeWidth={3} />
                  )}
                </View>
              </HStack>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>

        {/* Action Buttons */}
        <View
          className="px-6 pt-5 pb-8 bg-white border-t border-gray-100"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <HStack className="gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-2 border-gray-300 rounded-2xl bg-white"
              onPress={() => navigation.goBack()}
              isDisabled={isSaving}
            >
              <ButtonText className="text-gray-700 font-semibold">
                Annuler
              </ButtonText>
            </Button>

            <Button
              size="lg"
              className="flex-1 bg-orange-500 rounded-2xl"
              style={{
                shadowColor: "#f97316",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
              onPress={handleSave}
              isDisabled={isSaving}
            >
              {!isSaving && <ButtonIcon as={Save} size="sm" className="mr-2" />}
              <ButtonText className="font-bold">
                {isSaving
? "Enregistrement..."
: isEditing
? "Mettre à jour"
: "Enregistrer"}
              </ButtonText>
            </Button>
          </HStack>

          {isSaving && (
            <View className="mt-3 items-center">
              <Text className="text-gray-500 text-xs">
                Sauvegarde en cours...
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddAddressScreen;