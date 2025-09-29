import React, { useState } from "react";
import { 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  View,
} from "react-native";
import { 
  ChevronLeft,
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone
} from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import SearchBar from "@/components/common/search-bar";

// Types
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
}

type RootStackParamList = {
  FAQs: undefined;
};

type FAQsScreenNavigationProp = {
  navigation: StackNavigationProp<RootStackParamList, 'FAQs'>;
  route: RouteProp<RootStackParamList, 'FAQs'>;
};

const FAQsScreen: React.FC<FAQsScreenNavigationProp> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const categories: FAQCategory[] = [
    { id: 'orders', name: 'Commandes', icon: HelpCircle, color: '#F97316' },
    { id: 'delivery', name: 'Livraison', icon: MessageCircle, color: '#3B82F6' },
    { id: 'payment', name: 'Paiement', icon: Mail, color: '#10B981' },
    { id: 'account', name: 'Compte', icon: Phone, color: '#8B5CF6' },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      category: 'orders',
      question: 'Comment puis-je passer une commande ?',
      answer: 'Pour passer une commande, il vous suffit de parcourir les restaurants disponibles, sélectionner vos plats préférés, les ajouter au panier et procéder au paiement. C\'est simple et rapide !'
    },
    {
      id: '2',
      category: 'orders',
      question: 'Puis-je modifier ma commande après l\'avoir passée ?',
      answer: 'Vous pouvez modifier votre commande dans les 5 minutes suivant la confirmation, avant que le restaurant ne commence la préparation. Contactez le support client pour toute modification.'
    },
    {
      id: '3',
      category: 'orders',
      question: 'Comment annuler ma commande ?',
      answer: 'Vous pouvez annuler votre commande gratuitement avant que le restaurant ne commence la préparation. Une fois la préparation commencée, des frais d\'annulation peuvent s\'appliquer.'
    },
    {
      id: '4',
      category: 'delivery',
      question: 'Combien de temps prend la livraison ?',
      answer: 'Le temps de livraison varie généralement entre 20 à 45 minutes selon la distance et la charge du restaurant. Vous pouvez suivre votre commande en temps réel dans l\'application.'
    },
    {
      id: '5',
      category: 'delivery',
      question: 'Quels sont les frais de livraison ?',
      answer: 'Les frais de livraison varient selon la distance et le restaurant. Certains restaurants offrent la livraison gratuite pour les commandes supérieures à un montant minimum.'
    },
    {
      id: '6',
      category: 'delivery',
      question: 'Livrez-vous dans ma zone ?',
      answer: 'Entrez votre adresse dans l\'application pour voir les restaurants qui livrent dans votre zone. Nous étendons constamment notre zone de livraison.'
    },
    {
      id: '7',
      category: 'payment',
      question: 'Quels modes de paiement acceptez-vous ?',
      answer: 'Nous acceptons les cartes de crédit/débit, PayPal, Apple Pay, Google Pay et les paiements en espèces à la livraison selon la disponibilité.'
    },
    {
      id: '8',
      category: 'payment',
      question: 'Mes informations de paiement sont-elles sécurisées ?',
      answer: 'Oui, toutes vos informations de paiement sont cryptées et sécurisées selon les standards de l\'industrie. Nous ne stockons jamais vos informations de carte complètes.'
    },
    {
      id: '9',
      category: 'account',
      question: 'Comment créer un compte ?',
      answer: 'Téléchargez l\'application, cliquez sur "S\'inscrire", entrez votre email/téléphone et suivez les instructions. Vous pouvez aussi vous connecter via Google ou Facebook.'
    },
    {
      id: '10',
      category: 'account',
      question: 'Comment réinitialiser mon mot de passe ?',
      answer: 'Cliquez sur "Mot de passe oublié" sur la page de connexion, entrez votre email et suivez les instructions dans l\'email de réinitialisation que vous recevrez.'
    }
  ];

  // Filtrer les FAQs selon la recherche
  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Grouper par catégorie
  const groupedFAQs = categories.map(category => ({
    ...category,
    faqs: filteredFAQs.filter(faq => faq.category === category.id)
  })).filter(category => category.faqs.length > 0);

  // Toggle expansion
  const toggleExpansion = (id: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(id)) {
      newExpandedItems.delete(id);
    } else {
      newExpandedItems.add(id);
    }
    setExpandedItems(newExpandedItems);
  };

  const FAQItemComponent: React.FC<{ faq: FAQItem }> = ({ faq }) => {
    const isExpanded = expandedItems.has(faq.id);
    
    return (
      <TouchableOpacity
        className="mb-3 active:scale-[0.99]"
        onPress={() => toggleExpansion(faq.id)}
        activeOpacity={0.9}
      >
        <View
          className="bg-white rounded-2xl overflow-hidden"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <View className="p-4">
            <HStack className="justify-between items-center">
              <Text className="text-gray-900 text-[15px] font-semibold flex-1 mr-3 leading-6">
                {faq.question}
              </Text>
              <View className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center">
                {isExpanded ? (
                  <ChevronUp size={16} color="#6B7280" strokeWidth={2} />
                ) : (
                  <ChevronDown size={16} color="#6B7280" strokeWidth={2} />
                )}
              </View>
            </HStack>
            
            {isExpanded && (
              <View className="mt-4 pt-4 border-t border-gray-100">
                <Text className="text-gray-600 text-[14px] leading-6">
                  {faq.answer}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const CategorySection: React.FC<{ category: FAQCategory & { faqs: FAQItem[] } }> = ({ category }) => {
    const IconComponent = category.icon;
    
    return (
      <View className="mb-8">
        <HStack className="items-center mb-4">
          <View 
            className="w-10 h-10 rounded-2xl items-center justify-center mr-3"
            style={{ backgroundColor: category.color + '20' }}
          >
            <IconComponent size={18} color={category.color} strokeWidth={2} />
          </View>
          <Text className="text-gray-900 text-[18px] font-bold">
            {category.name}
          </Text>
          <View className="ml-3 bg-gray-100 px-2.5 py-1 rounded-full">
            <Text className="text-gray-600 text-[11px] font-bold">
              {category.faqs.length}
            </Text>
          </View>
        </HStack>
        
        {category.faqs.map(faq => (
          <FAQItemComponent key={faq.id} faq={faq} />
        ))}
      </View>
    );
  };

  const ContactSection: React.FC = () => (
    <View
      className="bg-white rounded-3xl p-6 mx-5 mb-6"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      <VStack className="items-center">
        <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center mb-4">
          <MessageCircle size={24} color="#F97316" strokeWidth={2} />
        </View>
        
        <Text className="text-gray-900 text-[18px] font-bold mb-2 text-center">
          Besoin d'aide supplémentaire ?
        </Text>
        
        <Text className="text-gray-600 text-[14px] text-center leading-6 mb-6">
          Notre équipe support est disponible 24h/7j pour vous aider
        </Text>
        
        <HStack className="gap-3">
          <TouchableOpacity 
            className="flex-1 bg-orange-500 rounded-2xl py-3 px-4 active:bg-orange-600"
            activeOpacity={0.8}
          >
            <HStack className="items-center justify-center">
              <MessageCircle size={16} color="#FFFFFF" strokeWidth={2} />
              <Text className="text-white text-[14px] font-semibold ml-2">
                Chat
              </Text>
            </HStack>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 bg-gray-100 rounded-2xl py-3 px-4 active:bg-gray-200"
            activeOpacity={0.8}
          >
            <HStack className="items-center justify-center">
              <Mail size={16} color="#6B7280" strokeWidth={2} />
              <Text className="text-gray-700 text-[14px] font-semibold ml-2">
                Email
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </View>
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
            FAQ
          </Heading>
          
          <View className="w-10" />
        </HStack>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Search Bar */}
        <View className="px-5 pt-6 pb-2">
          <View className="relative">
            <SearchBar />
          </View>
        </View>

        {/* FAQ Content */}
        <View className="px-5 pt-4">
          {groupedFAQs.length > 0 ? (
            groupedFAQs.map(category => (
              <CategorySection key={category.id} category={category} />
            ))
          ) : (
            <View className="flex-1 items-center justify-center py-16">
              <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                <Search size={28} color="#6B7280" strokeWidth={1.5} />
              </View>
              <Text className="text-gray-900 text-[18px] font-bold mb-2 text-center">
                Aucun résultat trouvé
              </Text>
              <Text className="text-gray-500 text-[14px] text-center">
                Essayez avec d'autres mots-clés
              </Text>
            </View>
          )}
        </View>

        {/* Contact Support Section */}
        <ContactSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQsScreen;