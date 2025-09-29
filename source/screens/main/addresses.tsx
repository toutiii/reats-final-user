import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  Save,
  Home,
  Building,
  MapPin,
  Check,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Types
interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  label: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

type AddressType = 'home' | 'work' | 'other';

interface AddressTypeOption {
  type: AddressType;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
}

// Navigation types
type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Addresses: undefined;
  AddAddress: { addressId?: string };
};

type AddAddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddAddress'
>;

type AddAddressScreenRouteProp = RouteProp<RootStackParamList, 'AddAddress'>;

const AddAddressScreen: React.FC = () => {
  const navigation = useNavigation<AddAddressScreenNavigationProp>();
  const route = useRoute<AddAddressScreenRouteProp>();
  const { addressId } = route.params || {};

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    label: '',
    type: 'home' as AddressType,
    address: '',
    city: '',
    postalCode: '',
    isDefault: false,
  });

  const addressTypes: AddressTypeOption[] = [
    {
      type: 'home',
      label: 'Home',
      icon: Home,
      color: '#10B981',
    },
    {
      type: 'work',
      label: 'Work',
      icon: Building,
      color: '#3B82F6',
    },
    {
      type: 'other',
      label: 'Other',
      icon: MapPin,
      color: '#F59E0B',
    },
  ];

  const isEditing = Boolean(addressId);

  useEffect(() => {
    if (isEditing && addressId) {
      setFormData({
        label: 'Home',
        type: 'home',
        address: '2118 Thornridge Cir',
        city: 'Syracuse, NY 13201',
        postalCode: '13201',
        isDefault: true,
      });
    }
  }, [isEditing, addressId]);

  const handleFieldChange = (field: string, value: string | boolean): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (): Promise<void> => {
    // Validate required fields
    if (!formData.label.trim()) {
      Alert.alert('Error', 'Please enter a label for this address');
      return;
    }
    if (!formData.address.trim()) {
      Alert.alert('Error', 'Please enter the address');
      return;
    }
    if (!formData.city.trim()) {
      Alert.alert('Error', 'Please enter the city');
      return;
    }

    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Success',
        `Address ${isEditing ? 'updated' : 'added'} successfully!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        `Failed to ${isEditing ? 'update' : 'add'} address. Please try again.`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const AddressTypeSelector: React.FC = () => (
    <View className="mb-8">
      <Text className="text-gray-900 text-sm font-medium mb-4">
        Address Type
      </Text>
      <HStack className="gap-3">
        {addressTypes.map((option) => {
          const IconComponent = option.icon;
          const isSelected = formData.type === option.type;
          
          return (
            <TouchableOpacity
              key={option.type}
              className={`flex-1 p-4 rounded-2xl border-2 ${
                isSelected 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 bg-white'
              }`}
              onPress={() => handleFieldChange('type', option.type)}
              activeOpacity={0.7}
            >
              <VStack className="items-center">
                <View className={`w-12 h-12 rounded-2xl items-center justify-center mb-2 ${
                  isSelected ? 'bg-orange-500' : 'bg-gray-100'
                }`}>
                  <IconComponent 
                    size={20} 
                    color={isSelected ? 'white' : option.color} 
                    strokeWidth={1.5} 
                  />
                </View>
                <Text className={`text-sm font-medium ${
                  isSelected ? 'text-orange-600' : 'text-gray-700'
                }`}>
                  {option.label}
                </Text>
              </VStack>
            </TouchableOpacity>
          );
        })}
      </HStack>
    </View>
  );

  const InputGroup: React.FC<{ 
    label: string; 
    value: string; 
    onChangeText: (text: string) => void;
    placeholder: string;
    required?: boolean;
    keyboardType?: 'default' | 'numeric';
  }> = ({ label, value, onChangeText, placeholder, required = false, keyboardType = 'default' }) => (
    <View className="mb-6">
      <Text className="text-gray-900 text-sm font-medium mb-3">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>
      <Input
        variant="outline"
        size="lg"
        isDisabled={isSaving}
        className="bg-white border-gray-200 rounded-full"
      >
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize="words"
          className="text-gray-900 text-base"
        />
      </Input>
    </View>
  );

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
            {isEditing ? 'Edit Address' : 'Add Address'}
          </Text>

          <View className="w-10" />
        </HStack>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Form */}
        <View className="px-6 pt-8">
          <AddressTypeSelector />

          <InputGroup
            label="Label"
            value={formData.label}
            onChangeText={(text) => handleFieldChange('label', text)}
            placeholder="e.g., Home, Office, Gym"
            required
          />

          <InputGroup
            label="Address"
            value={formData.address}
            onChangeText={(text) => handleFieldChange('address', text)}
            placeholder="Street address"
            required
          />

          <InputGroup
            label="City"
            value={formData.city}
            onChangeText={(text) => handleFieldChange('city', text)}
            placeholder="City, State ZIP"
            required
          />

          <InputGroup
            label="Postal Code"
            value={formData.postalCode}
            onChangeText={(text) => handleFieldChange('postalCode', text)}
            placeholder="ZIP code"
            keyboardType="numeric"
          />

          {/* Set as Default */}
          <TouchableOpacity
            className="py-6 border-t border-gray-100"
            onPress={() => handleFieldChange('isDefault', !formData.isDefault)}
            activeOpacity={0.6}
          >
            <HStack className="items-center justify-between">
              <VStack>
                <Text className="text-gray-900 text-base font-medium mb-1">
                  Set as default address
                </Text>
                <Text className="text-gray-500 text-sm">
                  This will be your primary delivery location
                </Text>
              </VStack>
              
              <View className={`w-6 h-6 rounded-md border-2 items-center justify-center ${
                formData.isDefault 
                  ? 'bg-orange-500 border-orange-500' 
                  : 'border-gray-300'
              }`}>
                {formData.isDefault && (
                  <Check size={14} color="white" strokeWidth={2} />
                )}
              </View>
            </HStack>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>

      {/* Action Buttons */}
      <View className="px-6 pt-6 pb-8 border-t border-gray-100">
        <HStack className="gap-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 border-gray-300 rounded-xl"
            onPress={() => navigation.goBack()}
            isDisabled={isSaving}
          >
            <ButtonText className="text-gray-700">
              Cancel
            </ButtonText>
          </Button>
          
          <Button
            size="lg"
            className="flex-1 bg-orange-500 rounded-xl"
            onPress={handleSave}
            isDisabled={isSaving}
          >
            <ButtonIcon as={Save} size="sm" className="mr-2" />
            <ButtonText>
              {isSaving ? 'Saving...' : isEditing ? 'Update' : 'Save'}
            </ButtonText>
          </Button>
        </HStack>
      </View>
    </SafeAreaView>
  );
};

export default AddAddressScreen;