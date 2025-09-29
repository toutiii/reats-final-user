import React from "react";
import { 
  Alert, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  View,
  Switch 
} from "react-native";
import { 
  ChevronLeft,
  CreditCard,
  DollarSign,
  Smartphone,
  Trash2,
  Plus,
  Shield
} from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Types
type PaymentMethod = {
  id: string;
  type: "card" | "paypal" | "apple" | "google";
  isDefault: boolean;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  email?: string;
  icon: React.ComponentType<any>;
  backgroundColor: string;
  textColor: string;
};

type RootStackParamList = {
  PaymentMethods: undefined;
};

type PaymentMethodsScreenNavigationProp = {
  navigation: StackNavigationProp<RootStackParamList, 'PaymentMethods'>;
  route: RouteProp<RootStackParamList, 'PaymentMethods'>;
};

const PaymentMethodsScreen: React.FC<PaymentMethodsScreenNavigationProp> = ({ navigation }) => {
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([
    {
      id: "card1",
      type: "card",
      isDefault: true,
      cardNumber: "•••• •••• •••• 4242",
      cardHolder: "RONALD RICHARDS",
      expiryDate: "12/25",
      icon: CreditCard,
      backgroundColor: "#F97316",
      textColor: "#FFFFFF",
    },
    {
      id: "paypal1",
      type: "paypal",
      isDefault: false,
      email: "ronald.richards@example.com",
      icon: DollarSign,
      backgroundColor: "#3B82F6",
      textColor: "#FFFFFF",
    },
    {
      id: "apple1",
      type: "apple",
      isDefault: false,
      email: "ronald.richards@icloud.com",
      icon: Smartphone,
      backgroundColor: "#1F2937",
      textColor: "#FFFFFF",
    },
  ]);

  const [autoSaveCards, setAutoSaveCards] = React.useState(true);

  const setDefaultPaymentMethod = (id: string) => {
    const updatedMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }));
    setPaymentMethods(updatedMethods);
  };

  const deletePaymentMethod = (id: string) => {
    Alert.alert(
      "Supprimer la méthode de paiement", 
      "Êtes-vous sûr de vouloir supprimer cette méthode de paiement ?", 
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            const isDefault = paymentMethods.find((m) => m.id === id)?.isDefault;
            const filtered = paymentMethods.filter((method) => method.id !== id);

            if (isDefault && filtered.length > 0) {
              filtered[0].isDefault = true;
            }

            setPaymentMethods(filtered);
          },
        },
      ]
    );
  };


  const addNewCard = () => {
    Alert.alert("Ajouter une carte", "Fonctionnalité à venir", [{ text: "OK" }]);
  };

  const getPaymentMethodName = (type: string) => {
    switch (type) {
      case "card": return "Carte bancaire";
      case "paypal": return "PayPal";
      case "apple": return "Apple Pay";
      case "google": return "Google Pay";
      default: return "Autre";
    }
  };

  const PaymentMethodCard: React.FC<{ method: PaymentMethod; index: number }> = ({ method, index }) => {
    const IconComponent = method.icon;
    
    return (
      <View className="mb-4">
        <View
          className="bg-white rounded-3xl overflow-hidden"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <View className="p-5">
            {/* Header */}
            <HStack className="justify-between items-start mb-4">
              <HStack className="items-center flex-1">
                <View 
                  className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
                  style={{ backgroundColor: method.backgroundColor }}
                >
                  <IconComponent size={20} color="#FFFFFF" strokeWidth={2} />
                </View>
                <VStack className="flex-1">
                  <Text className="text-gray-900 text-[17px] font-bold">
                    {getPaymentMethodName(method.type)}
                  </Text>
                  {method.isDefault && (
                    <View className="bg-blue-100 self-start px-2.5 py-1 rounded-full mt-1">
                      <Text className="text-blue-600 text-[11px] font-bold">
                        PAR DÉFAUT
                      </Text>
                    </View>
                  )}
                </VStack>
              </HStack>
              
              <TouchableOpacity
                className="w-10 h-10 items-center justify-center rounded-full bg-red-50 active:bg-red-100"
                onPress={() => deletePaymentMethod(method.id)}
                activeOpacity={0.7}
              >
                <Trash2 size={18} color="#EF4444" strokeWidth={2} />
              </TouchableOpacity>
            </HStack>

            {/* Payment Details */}
            {method.type === "card" ? (
              <View 
                className="rounded-2xl p-4 mb-4"
                style={{ backgroundColor: method.backgroundColor }}
              >
                <VStack className="gap-3">
                  <Text className="text-white text-[18px] font-bold tracking-wider">
                    {method.cardNumber}
                  </Text>
                  <HStack className="justify-between">
                    <Text className="text-white/80 text-[11px] font-medium uppercase tracking-wide">
                      TITULAIRE: {method.cardHolder}
                    </Text>
                    <Text className="text-white/80 text-[11px] font-medium uppercase tracking-wide">
                      EXP: {method.expiryDate}
                    </Text>
                  </HStack>
                </VStack>
              </View>
            ) : (
              <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                <Text className="text-gray-700 text-[15px] font-medium">
                  Email: {method.email}
                </Text>
              </View>
            )}

            {/* Set Default Button */}
            {!method.isDefault && (
              <TouchableOpacity
                className="bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 self-start active:bg-orange-100"
                onPress={() => setDefaultPaymentMethod(method.id)}
                activeOpacity={0.8}
              >
                <Text className="text-orange-600 text-[14px] font-semibold">
                  Définir par défaut
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

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
            Méthodes de paiement
          </Heading>
          
          <View className="w-10" />
        </HStack>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-5 pt-6">
          {/* Description */}
          <Text className="text-gray-600 text-[15px] leading-6 mb-8">
            Gérez vos méthodes de paiement et définissez votre option par défaut
          </Text>

          {/* Payment Methods List */}
          {paymentMethods.map((method, index) => (
            <PaymentMethodCard key={method.id} method={method} index={index} />
          ))}

          {/* Add New Payment Method */}
          <TouchableOpacity
            className="bg-white rounded-3xl border-2 border-dashed border-orange-200 p-6 mb-6 active:bg-orange-50"
            onPress={addNewCard}
            activeOpacity={0.8}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.03,
              shadowRadius: 8,
              elevation: 1,
            }}
          >
            <HStack className="items-center justify-center">
              <View className="w-12 h-12 bg-orange-100 rounded-2xl items-center justify-center mr-4">
                <Plus size={20} color="#F97316" strokeWidth={2} />
              </View>
              <Text className="text-orange-600 text-[16px] font-semibold">
                Ajouter une méthode de paiement
              </Text>
            </HStack>
          </TouchableOpacity>

          {/* Payment Options */}
          <View
            className="bg-white rounded-3xl p-5 mb-6"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <Text className="text-gray-900 text-[17px] font-bold mb-4">
              Options de paiement
            </Text>

            <HStack className="justify-between items-center">
              <VStack className="flex-1 mr-4">
                <Text className="text-gray-900 text-[15px] font-semibold mb-1">
                  Enregistrer les nouvelles cartes
                </Text>
                <Text className="text-gray-500 text-[13px] leading-5">
                  Enregistrer automatiquement les nouvelles cartes pour les futurs achats
                </Text>
              </VStack>
              <Switch
                value={autoSaveCards}
                onValueChange={setAutoSaveCards}
                trackColor={{ false: '#E5E7EB', true: '#FED7AA' }}
                thumbColor={autoSaveCards ? '#F97316' : '#9CA3AF'}
              />
            </HStack>
          </View>

          {/* Security Info */}
          <HStack className="items-center justify-center px-4 py-3">
            <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center mr-3">
              <Shield size={16} color="#6B7280" strokeWidth={2} />
            </View>
            <Text className="text-gray-500 text-[13px] text-center flex-1 leading-5">
              Vos informations de paiement sont sécurisées et chiffrées selon les standards de l'industrie
            </Text>
          </HStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentMethodsScreen;