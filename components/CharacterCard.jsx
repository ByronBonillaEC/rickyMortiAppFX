import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { router } from 'expo-router';

export function CharacterCard({ character }) {
    // Función para extraer el ID del episodio de la URL
    const getEpisodeId = (episodeUrl) => {
        const parts = episodeUrl.split('/');
        return parts[parts.length - 1];
    };

    // Función para manejar el toque en la imagen
    const handleImagePress = () => {
        if (character.episode && character.episode.length > 0) {
            const firstEpisodeUrl = character.episode[0];
            const episodeId = getEpisodeId(firstEpisodeUrl);
            router.push(`/${episodeId}`);
        }
    };

    return(
       <View style={styles.card} key={character.id}>
                 <TouchableOpacity onPress={handleImagePress}>
                     <Image style={styles.image} source={{ uri: character.image}} />
                 </TouchableOpacity>
                 <Text style={styles.title}>{character.name}</Text>
                 <Text style={styles.species}>{character.species}</Text>
                 <Text style={styles.status}>{character.status}</Text>
                 <Text style={styles.gender}>{character.gender}</Text>
                 <Text style={styles.episodeHint}>Toca la imagen para ver el primer episodio</Text>
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
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff'
  },
  species: {
    fontSize:16,
    color: '#fff'
  },
  status: {
    fontSize: 16,
    color: '#33caff'
  },
  gender: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  episodeHint: {
    fontSize: 12,
    color: '#ccc',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  logo: {
    backgroundColor: '#333',
    padding: 20
  }
});
