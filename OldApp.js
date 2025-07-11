import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Logo from './components/Logo';
import { Main } from './components/Main';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.main}>
        <Main />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    height: '15%',
    width: '100%',
    backgroundColor: '#333',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  }
});
