import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Button, ButtonText } from './components/ui/button';

const App: React.FC = () => {
    return (
        
    <GluestackUIProvider mode="dark">
      <View style={styles.container}>
            <Text >App</Text>
            <Button >
            <ButtonText>Click me</ButtonText>
            </Button>
        </View>
    </GluestackUIProvider>
  
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;