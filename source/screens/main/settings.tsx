import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  View,
  Switch,
  Alert,
  Image,
} from "react-native";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  MessageSquare,
  MapPin,
  Globe,
  Moon,
  Volume2,
  Smartphone,
  Star,
  Share2,
  LogOut,
  Settings as SettingsIcon
} from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// Types
interface SettingOption {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  iconColor?: string;
  iconBgColor?: string;
  type: "navigation" | "switch" | "action";
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  showBadge?: boolean;
  badgeCount?: number;
  destructive?: boolean;
}

interface SettingSection {
  id: string;
  title: string;
  options: SettingOption[];
}

type RootStackParamList = {
  Settings: undefined;
  Profile: undefined;
  Notifications: undefined;
  PaymentMethods: undefined;
  Security: undefined;
  Help: undefined;
  About: undefined;
  Language: undefined;
  Addresses: undefined;
};

type SettingsScreenNavigationProp = {
  navigation: StackNavigationProp<RootStackParamList, "Settings">;
  route: RouteProp<RootStackParamList, "Settings">;
};

const SettingsScreen: React.FC<SettingsScreenNavigationProp> = ({ navigation }) => {
  // États pour les switches
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  // Données utilisateur mockées
  const userData = {
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    avatar: "https://avatar.iran.liara.run/public/29",
    memberSince: "Membre depuis Jan 2023"
  };

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Déconnexion",
          style: "destructive",
          onPress: () => {
            // Logique de déconnexion
            console.log("Déconnexion");
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Cette action est irréversible. Toutes vos données seront définitivement supprimées.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            console.log("Suppression du compte");
          }
        }
      ]
    );
  };

  // Configuration des sections
  const settingSections: SettingSection[] = [
    {
      id: "account",
      title: "Compte",
      options: [
        {
          id: "profile",
          title: "Profil personnel",
          subtitle: "Modifier vos informations",
          icon: User,
          iconColor: "#3B82F6",
          iconBgColor: "#DBEAFE",
          type: "navigation",
          onPress: () => navigation.navigate("Profile")
        },
        {
          id: "addresses",
          title: "Mes adresses",
          subtitle: "Gérer vos adresses de livraison",
          icon: MapPin,
          iconColor: "#10B981",
          iconBgColor: "#D1FAE5",
          type: "navigation",
          onPress: () => navigation.navigate("Addresses")
        },
        {
          id: "payment",
          title: "Moyens de paiement",
          subtitle: "Cartes et portefeuilles",
          icon: CreditCard,
          iconColor: "#8B5CF6",
          iconBgColor: "#EDE9FE",
          type: "navigation",
          onPress: () => navigation.navigate("PaymentMethods")
        }
      ]
    },
    {
      id: "notifications",
      title: "Notifications",
      options: [
        {
          id: "push",
          title: "Notifications push",
          subtitle: "Commandes et promotions",
          icon: Bell,
          iconColor: "#F59E0B",
          iconBgColor: "#FEF3C7",
          type: "switch",
          value: pushNotifications,
          onToggle: setPushNotifications
        },
        {
          id: "email",
          title: "Notifications email",
          subtitle: "Newsletters et offres",
          icon: Bell,
          iconColor: "#EF4444",
          iconBgColor: "#FEE2E2",
          type: "switch",
          value: emailNotifications,
          onToggle: setEmailNotifications
        },
        {
          id: "sms",
          title: "Notifications SMS",
          subtitle: "Confirmations de commande",
          icon: Smartphone,
          iconColor: "#06B6D4",
          iconBgColor: "#CFFAFE",
          type: "switch",
          value: smsNotifications,
          onToggle: setSmsNotifications
        }
      ]
    },
    {
      id: "preferences",
      title: "Préférences",
      options: [
        {
          id: "language",
          title: "Langue",
          subtitle: "Français",
          icon: Globe,
          iconColor: "#6366F1",
          iconBgColor: "#E0E7FF",
          type: "navigation",
          onPress: () => navigation.navigate("Language")
        },
        {
          id: "location",
          title: "Services de localisation",
          subtitle: "Pour de meilleures recommandations",
          icon: MapPin,
          iconColor: "#10B981",
          iconBgColor: "#D1FAE5",
          type: "switch",
          value: locationServices,
          onToggle: setLocationServices
        },
        {
          id: "sounds",
          title: "Sons et vibrations",
          subtitle: "Effets sonores de l'app",
          icon: Volume2,
          iconColor: "#F97316",
          iconBgColor: "#FFEDD5",
          type: "switch",
          value: soundEffects,
          onToggle: setSoundEffects
        },
        {
          id: "dark",
          title: "Mode sombre",
          subtitle: "Apparence de l'application",
          icon: Moon,
          iconColor: "#6B7280",
          iconBgColor: "#F3F4F6",
          type: "switch",
          value: darkMode,
          onToggle: setDarkMode
        }
      ]
    },
    {
      id: "support",
      title: "Support & Légal",
      options: [
        {
          id: "help",
          title: "Centre d'aide",
          subtitle: "FAQ et assistance",
          icon: HelpCircle,
          iconColor: "#14B8A6",
          iconBgColor: "#CCFBF1",
          type: "navigation",
          onPress: () => navigation.navigate("Help")
        },
        {
          id: "contact",
          title: "Nous contacter",
          subtitle: "Support client 24/7",
          icon: MessageSquare,
          iconColor: "#8B5CF6",
          iconBgColor: "#EDE9FE",
          type: "navigation",
          showBadge: true,
          onPress: () => console.log("Contact")
        },
        {
          id: "rate",
          title: "Noter l'application",
          subtitle: "Donnez votre avis sur l'App Store",
          icon: Star,
          iconColor: "#FBBF24",
          iconBgColor: "#FEF3C7",
          type: "navigation",
          onPress: () => console.log("Rate app")
        },
        {
          id: "share",
          title: "Partager l'app",
          subtitle: "Invitez vos amis",
          icon: Share2,
          iconColor: "#06B6D4",
          iconBgColor: "#CFFAFE",
          type: "navigation",
          onPress: () => console.log("Share app")
        },
        {
          id: "about",
          title: "À propos",
          subtitle: "Version 2.1.0",
          icon: SettingsIcon,
          iconColor: "#6B7280",
          iconBgColor: "#F3F4F6",
          type: "navigation",
          onPress: () => navigation.navigate("About")
        }
      ]
    },
    {
      id: "account_actions",
      title: "Actions du compte",
      options: [
        {
          id: "logout",
          title: "Déconnexion",
          icon: LogOut,
          iconColor: "#EF4444",
          iconBgColor: "#FEE2E2",
          type: "action",
          destructive: true,
          onPress: handleLogout
        }
      ]
    }
  ];

  const SettingOptionComponent: React.FC<{ option: SettingOption }> = ({ option }) => {
    const IconComponent = option.icon;

    return (
      <TouchableOpacity
        className={`py-4 px-5 ${option.destructive
? "active:bg-red-50"
: "active:bg-gray-50"}`}
        onPress={option.onPress}
        activeOpacity={option.type === "switch"
? 1
: 0.7}
        disabled={option.type === "switch"}
      >
        <HStack className="items-center justify-between">
          <HStack className="items-center flex-1">
            <View
              className="w-10 h-10 rounded-2xl items-center justify-center mr-4"
              style={{ backgroundColor: option.iconBgColor || "#F3F4F6" }}
            >
              <IconComponent
                size={18}
                color={option.iconColor || "#6B7280"}
                strokeWidth={2}
              />
            </View>

            <VStack className="flex-1 mr-3">
              <HStack className="items-center">
                <Text className={`text-[16px] font-semibold ${
                  option.destructive
? "text-red-600"
: "text-gray-900"
                }`}>
                  {option.title}
                </Text>
                {option.showBadge && (
                  <View className="w-2 h-2 bg-orange-500 rounded-full ml-2" />
                )}
              </HStack>
              {option.subtitle && (
                <Text className="text-gray-500 text-[13px] mt-0.5">
                  {option.subtitle}
                </Text>
              )}
            </VStack>
          </HStack>

          {option.type === "switch" && option.onToggle
? (
            <Switch
              value={option.value}
              onValueChange={option.onToggle}
              trackColor={{ false: "#E5E7EB", true: "#FED7AA" }}
              thumbColor={option.value
? "#F97316"
: "#9CA3AF"}
            />
          )
: option.type === "navigation"
? (
            <ChevronRight size={18} color="#9CA3AF" strokeWidth={2} />
          )
: null}
        </HStack>
      </TouchableOpacity>
    );
  };

  const UserHeader: React.FC = () => (
    <TouchableOpacity
      className="bg-white rounded-3xl p-6 mb-6 active:scale-[0.99]"
      onPress={() => navigation.navigate("Profile")}
      activeOpacity={0.9}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      <HStack className="items-center">
        <Image
          source={{ uri: userData.avatar }}
          className="w-16 h-16 rounded-full mr-4"
        />
        <VStack className="flex-1">
          <Text className="text-gray-900 text-[18px] font-bold mb-1">
            {userData.name}
          </Text>
          <Text className="text-gray-600 text-[14px] mb-1">
            {userData.email}
          </Text>
          <Text className="text-orange-600 text-[12px] font-medium">
            {userData.memberSince}
          </Text>
        </VStack>
        <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center">
          <ChevronRight size={16} color="#F97316" strokeWidth={2} />
        </View>
      </HStack>
    </TouchableOpacity>
  );

  const SettingSection: React.FC<{ section: SettingSection }> = ({ section }) => (
    <View className="mb-6">
      <Text className="text-gray-700 text-[15px] font-semibold mb-4 px-5">
        {section.title}
      </Text>

      <View
        className="bg-white rounded-3xl overflow-hidden"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 3,
        }}
      >
        {section.options.map((option, index) => (
          <View key={option.id}>
            <SettingOptionComponent option={option} />
            {index < section.options.length - 1 && (
              <View className="h-px bg-gray-100 ml-16" />
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const DeleteAccountButton: React.FC = () => (
    <TouchableOpacity
      className="bg-red-50 border border-red-200 rounded-3xl p-4 mx-5 mb-6 active:bg-red-100"
      onPress={handleDeleteAccount}
      activeOpacity={0.8}
    >
      <Text className="text-red-600 text-[14px] font-semibold text-center">
        Supprimer mon compte
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="bg-white border-b border-gray-100">
        <HStack className="justify-between items-center px-5 py-4">
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#1f2937" strokeWidth={1.8} />
          </TouchableOpacity>

          <Heading className="text-gray-900 font-bold flex-1 text-center">
            Paramètres
          </Heading>

          <View className="w-10" />
        </HStack>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-5 pt-6">
          {/* User Header */}
          <UserHeader />

          {/* Settings Sections */}
          {settingSections.map((section) => (
            <SettingSection key={section.id} section={section} />
          ))}

          {/* Delete Account */}
          <DeleteAccountButton />

          {/* App Version */}
          <Text className="text-gray-400 text-[12px] text-center mt-4">
            Version 2.1.0 • Build 247
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;