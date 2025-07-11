import { StyleSheet, View, Image, Text } from "react-native";

export function CharacterCard({ character }) {
    return(
       <View style={styles.card} key={character.id}>
                 <Image style={styles.image} source={{ uri: character.image}} />
                 <Text style={styles.title}>{character.name}</Text>
                 <Text style={styles.species}>{character.species}</Text>
                 <Text style={styles.status}>{character.status}</Text>
                 <Text style={styles.gender}>{character.gender}</Text>
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
  logo: {
    backgroundColor: '#333',
    padding: 20
  }
});
