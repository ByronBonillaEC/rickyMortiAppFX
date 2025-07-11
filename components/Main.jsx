import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../store/charactersSlice";
import { CharacterCard } from "./CharacterCard";
import { ActivityIndicator, FlatList, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function Main() {
  const dispatch = useDispatch();
  const { data: personajes, loading, error, lastFetch } = useSelector(state => state.characters);

  useEffect(() => {
    // Solo hacer fetch si no hay datos o si han pasado más de 5 minutos desde el último fetch
    const shouldFetch = !personajes.length || 
      (lastFetch && (new Date() - new Date(lastFetch)) > 5 * 60 * 1000);
    
    if (shouldFetch) {
      dispatch(fetchCharacters());
    }
  }, [dispatch, personajes.length, lastFetch]);

  const handleRetry = () => {
    dispatch(fetchCharacters());
  };

  if (loading && personajes.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={styles.loadingText}>Cargando personajes...</Text>
      </View>
    );
  }

  if (error && personajes.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {loading && personajes.length > 0 && (
        <View style={styles.refreshingContainer}>
          <Text style={styles.refreshingText}>Actualizando...</Text>
        </View>
      )}
      <FlatList
        data={personajes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <CharacterCard character={item} index={index} />
        )}
        onRefresh={handleRetry}
        refreshing={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  refreshingContainer: {
    backgroundColor: '#e8f5e8',
    padding: 8,
    alignItems: 'center',
  },
  refreshingText: {
    color: '#2d8a2d',
    fontSize: 14,
    fontWeight: '500',
  },
});