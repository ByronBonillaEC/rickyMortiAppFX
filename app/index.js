import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Link } from 'expo-router';
import Logo from '../components/Logo';
import { Main } from '../components/Main';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
   const insets = useSafeAreaInsets(); 
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.logo}>
        <Logo />
        <Link href="/about" asChild>
          <TouchableOpacity style={styles.aboutButton}>
            <Text style={styles.aboutButtonText}>ℹ️ Acerca de</Text>
          </TouchableOpacity>
        </Link>
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
    position: 'relative',
  },
  aboutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  aboutButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
   main: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  }
});