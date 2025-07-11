import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import Logo from './components/Logo';
import { Main } from './components/Main';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Logo style={styles.logo} />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    backgroundColor: '#333',
    padding: 20
  }
});
