import { StyleSheet, Text, View, Image } from 'react-native';

export function EpisodeDetails({ episode }) {
  if (!episode) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudieron cargar los detalles del episodio</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.episodeCode}>{episode.episode}</Text>
          <Text style={styles.episodeId}>#{episode.id}</Text>
        </View>
        
        <Text style={styles.title}>{episode.name}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Fecha de Emisión</Text>
            <Text style={styles.infoValue}>{episode.air_date}</Text>
          </View>
        </View>

        <View style={styles.episodeBadge}>
          <Text style={styles.episodeBadgeText}>Primer episodio del personaje</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  episodeCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  episodeId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  episodeBadge: {
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  episodeBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d8a2d',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    fontWeight: '500',
  },
});
