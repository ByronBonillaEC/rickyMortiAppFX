import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getEpisodeDetails } from '../lib/rickyMorty';
import { EpisodeDetails } from '../components/EpisodeDetails';

export default function EpisodePage() {
  const { id } = useLocalSearchParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        setLoading(true);
        const episodeData = await getEpisodeDetails(id);
        setEpisode(episodeData);
      } catch (error) {
        console.error('Error fetching episode:', error);
        Alert.alert(
          'Error',
          'No se pudieron cargar los detalles del episodio',
          [{ text: 'OK' }]
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEpisodeDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EpisodeDetails episode={episode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});