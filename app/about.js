import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function About() {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Acerca de Rick y Morty App</Text>
        
        <Text style={styles.subtitle}>Sobre la Serie</Text>
        <Text style={styles.text}>
          Rick y Morty es una serie de televisión estadounidense de animación para adultos 
          creada por Dan Harmon y Justin Roiland para Adult Swim. La serie sigue las 
          desventuras de un científico loco llamado Rick Sanchez y su nieto fácilmente 
          influenciable Morty Smith.
        </Text>

        <Text style={styles.subtitle}>Sobre esta App</Text>
        <Text style={styles.text}>
          Esta aplicación utiliza la API oficial de Rick y Morty para mostrar información 
          sobre los personajes de la serie. Desarrollada con React Native y Expo Router.
        </Text>

        <Text style={styles.subtitle}>Tecnologías Utilizadas</Text>
        <Text style={styles.tech}>• React Native</Text>
        <Text style={styles.tech}>• Expo Router</Text>
        <Text style={styles.tech}>• Rick and Morty API</Text>
        <Text style={styles.tech}>• React Native SVG</Text>
        <Text style={styles.tech}>• Redux for React Native</Text>

        <Link href="/" style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver al inicio</Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 15,
    textAlign: 'justify',
  },
  tech: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});