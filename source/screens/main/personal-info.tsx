import React, { useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import {
  ChevronLeft,
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
} from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Types
interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  dateOfBirth: string;
  avatar: string;
}

interface FormField {
  id: keyof PersonalInfo;
  label: string;
  placeholder: string;
  icon: React.ComponentType<any>;
  type: "text" | "email" | "phone" | "date";
  required: boolean;
}

// Navigation types
type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  PersonalInfo: undefined;
};

type PersonalInfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PersonalInfo"
>;

const PersonalInfoScreen: React.FC = () => {
  const navigation = useNavigation<PersonalInfoScreenNavigationProp>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "Vishal",
    lastName: "Khadok",
    email: "vishal.khadok@example.com",
    phone: "+1 (555) 123-4567",
    address: "2118 Thornridge Cir",
    city: "Syracuse, NY 13201",
    dateOfBirth: "15/08/1992",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  });

  const formFields: FormField[] = [
    {
      id: "firstName",
      label: "First Name",
      placeholder: "Enter your first name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      id: "lastName",
      label: "Last Name",
      placeholder: "Enter your last name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      id: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      icon: Mail,
      type: "email",
      required: true,
    },
    {
      id: "phone",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      icon: Phone,
      type: "phone",
      required: true,
    },
    {
      id: "address",
      label: "Address",
      placeholder: "Enter your address",
      icon: MapPin,
      type: "text",
      required: false,
    },
    {
      id: "city",
      label: "City",
      placeholder: "Enter your city",
      icon: MapPin,
      type: "text",
      required: false,
    },
    {
      id: "dateOfBirth",
      label: "Date of Birth",
      placeholder: "DD/MM/YYYY",
      icon: Calendar,
      type: "date",
      required: false,
    },
  ];

  const handleFieldChange = (field: keyof PersonalInfo, value: string): void => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (): Promise<void> => {
    setIsSaving(true);

    const requiredFields = formFields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !personalInfo[field.id].trim());

    if (missingFields.length > 0) {
      Alert.alert(
        "Missing Information",
        `Please fill in the following required fields: ${missingFields.map(f => f.label).join(", ")}`
      );
      setIsSaving(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        "Success",
        "Your personal information has been updated successfully.",
        [{ text: "OK", onPress: () => setIsEditing(false) }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to update your information. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = (): void => {
    setIsEditing(false);
  };

  const handleAvatarPress = (): void => {
    if (isEditing) {
      Alert.alert(
        "Change Photo",
        "Choose an option",
        [
          { text: "Camera", onPress: () => console.log("Camera selected") },
          { text: "Photo Library", onPress: () => console.log("Gallery selected") },
          { text: "Cancel", style: "cancel" },
        ]
      );
    }
  };

  const InputGroup: React.FC<{ field: FormField }> = ({ field }) => {
    const value = personalInfo[field.id];

    return (
      <View className="mb-8">
        <Text className="text-gray-900 text-sm font-medium mb-3">
          {field.label}
          {field.required && <Text className="text-red-500"> *</Text>}
        </Text>

        <Input
          variant="outline"
          size="lg"
          isDisabled={!isEditing || isSaving}
          className="bg-white border-gray-200 rounded-full"
        >
          <InputField
            placeholder={field.placeholder}
            value={value}
            onChangeText={(text) => handleFieldChange(field.id, text)}
            keyboardType={
              field.type === "email"
? "email-address" :
                field.type === "phone"
? "phone-pad"
: "default"
            }
            autoCapitalize={field.type === "email"
? "none"
: "words"}
            className="text-gray-900 text-base"
          />
        </Input>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="bg-white border-b border-gray-100">
        <HStack className="items-center justify-between px-6 py-4">
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center"
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}
          >
            <ChevronLeft size={24} color="#111827" strokeWidth={1.5} />
          </TouchableOpacity>

          <Text className="text-gray-900 text-lg font-medium">
            Personal Information
          </Text>

          <TouchableOpacity
            className="w-10 h-10 items-center justify-center"
            onPress={() => setIsEditing(!isEditing)}
            activeOpacity={0.6}
            disabled={isSaving}
          >
            <Edit3 size={20} color="#111827" strokeWidth={1.5} />
          </TouchableOpacity>
        </HStack>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View className="items-center py-12 border-b border-gray-100">
          <TouchableOpacity
            className="relative"
            onPress={handleAvatarPress}
            activeOpacity={0.8}
            disabled={!isEditing}
          >
            <Avatar size="2xl" className="border-2 border-gray-200">
              <AvatarImage
                source={{
                  uri: "https://avatar.iran.liara.run/public/28",
                }}
              />
              <AvatarFallbackText className="font-medium">
                VK
              </AvatarFallbackText>

            </Avatar>

            {isEditing && (
              <View className="absolute -bottom-1 -right-2 w-10 h-10 bg-orange-500 rounded-full items-center justify-center border-2 border-white">
                <Camera size={18} color="white" strokeWidth={1.5} />
              </View>
            )}
          </TouchableOpacity>

          <Text className="text-gray-900 text-xl font-medium mt-4">
            {personalInfo.firstName} {personalInfo.lastName}
          </Text>
          <Text className="text-gray-500 text-base mt-1">
            Food enthusiast
          </Text>
        </View>

        {/* Form Fields */}
        <View className="px-6 pt-8">
          {formFields.map((field) => (
            <InputGroup key={field.id} field={field} />
          ))}
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View className="px-6 pt-4 pb-8">
            <HStack className="gap-4">
              <Button
                variant="outline"
                className="flex-1 border-gray-300 rounded-xl"
                onPress={handleCancel}
                isDisabled={isSaving}
              >
                <ButtonText className="text-gray-700">
                  Cancel
                </ButtonText>
              </Button>

              <Button
                className="flex-1 bg-orange-500 rounded-xl"
                onPress={handleSave}
                isDisabled={isSaving}
              >
                <ButtonIcon as={Save} size="sm" className="mr-2" />
                <ButtonText>
                  {isSaving
? "Saving..."
: "Save"}
                </ButtonText>
              </Button>
            </HStack>
          </View>
        )}

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;