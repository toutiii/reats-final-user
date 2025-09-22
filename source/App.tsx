import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

const App: React.FC = () => {
    return (
        
    <GluestackUIProvider mode="dark">
      <View style={styles.container}>
            <Text>App</Text>
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