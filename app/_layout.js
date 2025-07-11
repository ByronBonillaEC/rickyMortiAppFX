import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="about" 
          options={{ 
            title: 'Acerca de',
            headerStyle: {
              backgroundColor: '#333',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="[id]" 
          options={{ 
            title: 'Detalles del Episodio',
            headerStyle: {
              backgroundColor: '#333',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
      </Stack>
    </Provider>
  );
}