import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { AlertCircleIcon, InfoIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { ICountry } from "@/types";

import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Text } from "@/components/ui/text";
import { StackNavigation } from "@/types/navigation";
import { registerValidationSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { FormInputControlPhone } from "../../common/form-input-control-phone";
import { Register } from "@/types/auth";

const RegisterForm = () => {
  const navigation = useNavigation<StackNavigation>();
  const [country, setCountry] = useState<ICountry>({
    calling_codes: [242],
    key: "FR",
    emoji: "🇫🇷",
    value: "France",
  });
  const [error, setError] = useState<string>("");

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      firstName: "Dave",
      lastName: "Glad",
      phone: "0753790506",
    },
  });

  const onSubmit = async (data: Register) => {
    try {
      console.log("Données du formulaire:", data);
      // Simuler un délai d'API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigation.navigate("Auth", { screen: "OTPScreen" });
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setError("Erreur lors de l'inscription:");
    }
  };

  return (
    <VStack className="px-6 pt-8 flex-1 bg-white rounded-t-3xl" space="lg">
      {/* Prénom Input */}
      <View>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl isInvalid={!!errors.firstName} size="md" isDisabled={isSubmitting} isReadOnly={false} isRequired={true}>
              <FormControlLabel>
                <FormControlLabelText>Prénom</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size={"lg"} variant="rounded">
                <InputField type="text" placeholder="Entrez votre prénom" value={value} onChangeText={onChange} onBlur={onBlur} />
              </Input>
              {errors.firstName && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.firstName.message}</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />
      </View>

      {/* Nom Input */}
      <View>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl isInvalid={!!errors.lastName} size="md" isDisabled={isSubmitting} isReadOnly={false} isRequired={true}>
              <FormControlLabel>
                <FormControlLabelText>Nom</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size={"lg"} variant="rounded">
                <InputField type="text" placeholder="Entrez votre nom" value={value} onChangeText={onChange} onBlur={onBlur} />
              </Input>
              {errors.lastName && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.lastName.message}</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />
      </View>

      <FormInputControlPhone
        control={control}
        name="phone"
        error={errors.phone?.message}
        defaultValue={watch("phone")}
        label="Numéro de téléphone"
        placeholder="Entrez votre numéro de téléphone"
        country={country}
        setCountry={setCountry}
        textInfo="Format: +33 X XX XX XX XX"
        isRequired={true}
        isDisabled={isSubmitting}
      />

      {error && (
        <Alert action="error" variant="solid">
          <AlertIcon as={InfoIcon} />
          <AlertText>{error}</AlertText>
        </Alert>
      )}

      {/* Register Button */}
      <Button size="xl" className="my-2 rounded-full" onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
        <ButtonText size="lg">{isSubmitting
          ? "Inscription en cours..."
          : "S'inscrire"}</ButtonText>
      </Button>

      {/* Divider */}
      <View className="flex-row items-center my-2">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500">Ou</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Login Link */}
      <View className="flex-row justify-center">
        <Text className="text-base text-gray-500">Vous avez déjà un compte? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "LoginScreen" })} disabled={isSubmitting}>
          <Text className="text-base text-blue-500">Se connecter</Text>
        </TouchableOpacity>
      </View>
    </VStack>
  );
};

export default RegisterForm;