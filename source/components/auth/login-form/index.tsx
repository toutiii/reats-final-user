import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { ICountry } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";
import { FormInputControlPhone } from "@/components/common/form-input-control-phone";

const LoginForm = () => {
  const navigation = useNavigation<StackNavigation>();
  const [country, setCountry] = useState<ICountry>({
    calling_codes: [242],
    key: "FR",
    emoji: "🇫🇷",
    value: "France",
  });

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      phone: "",
    },
  });

  return (
    <VStack className="px-6 pt-8 flex-1 bg-white rounded-t-3xl" space="lg">
      <FormInputControlPhone
        control={control}
        name="phone"
        error={errors.phone?.message}
        defaultValue={watch("phone")}
        label="Numéro de téléphone"
        placeholder="Entrez votre numéro de téléphone"
        country={country}
        setCountry={setCountry}
        textInfo="Format: +33 6 XX XX XX XX"
        isRequired={true}
      />
      <Button size="xl" className="my-3 rounded-full" onPress={() => null}>
        <ButtonText size="lg">Se connecter</ButtonText>
      </Button>

      {/* Divider */}
      <View className="flex-row items-center my-2">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500">Ou</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Register Link */}
      <View className="flex-row justify-center mt-4">
        <Text className="text-base text-gray-500">
          Vous n&lsquo;avez pas de compte ?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "RegisterScreen" })}>
          <Text className="text-base text-blue-500">S&lsquo;inscrire</Text>
        </TouchableOpacity>
      </View>
    </VStack>
  );
};

export default LoginForm;
