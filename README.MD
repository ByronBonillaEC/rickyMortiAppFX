npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar expo-font expo-splash-screen

2.- package.json modificar el main a expo-router/entry

3.-app.json agregar la config de expo-router

4.- Logo al index

5.- COntenido de App.js al index.js

6.- Crear un archivo babel.config.js

7.- Reiniciar el proyecto.

8.- Crear un Link para el nuevo componente about.js
En el index.js se crea el Link para about
en \_layout.js se añade la configuracion para la nueva pantalla.

9.- En index.js se le añade los insets para el padding Top y Bottom con el fin de no tapar el status bar.

Para iconos: https://icons.expo.fyi/Index npm install @expo/vector-icons

## 10.- Implementar Rutas Dinámicas con Expo Router

### Paso 1: Crear función en lib/rickyMorty.js para obtener detalles del episodio

```javascript
export async function getEpisodeDetails(episodeId) {
  const EPISODE_URL = `https://rickandmortyapi.com/api/episode/${episodeId}`;

  try {
    const rawData = await fetch(EPISODE_URL);
    const json = await rawData.json();

    const { id, name, air_date, episode } = json;

    return {
      id,
      name,
      air_date,
      episode,
    };
  } catch (error) {
    console.error("Error fetching episode details:", error);
    throw error;
  }
}
```

### Paso 2: Crear componente EpisodeDetails.jsx

Crear un componente que muestre la información del episodio con estilos acordes a la aplicación.

### Paso 3: Crear archivo [id].js en la carpeta app

Este archivo maneja rutas dinámicas. El nombre entre corchetes [id] indica que es un parámetro dinámico.

```javascript
import { useLocalSearchParams } from "expo-router";

export default function EpisodePage() {
  const { id } = useLocalSearchParams(); // Obtiene el parámetro dinámico
  // ... resto del código
}
```

### Paso 4: Actualizar \_layout.js para incluir la nueva ruta

```javascript
<Stack.Screen
  name="[id]"
  options={{
    title: "Detalles del Episodio",
    headerStyle: { backgroundColor: "#333" },
    headerTintColor: "#fff",
  }}
/>
```

### Paso 5: Hacer navegable el CharacterCard

- Envolver la imagen en TouchableOpacity
- Extraer el ID del episodio de la URL: `character.episode[0]`
- Usar `router.push(`/${episodeId}`)` para navegar

### Funcionamiento de Rutas Dinámicas:

- **[id].js** → Acepta cualquier valor como parámetro
- **Navegación**: `/1`, `/2`, `/3`, etc.
- **Obtener parámetro**: `useLocalSearchParams()`
- **API Call**: Usar el ID para hacer fetch a la API correspondiente

### Resultado:

Al tocar la imagen de un personaje → Navega a los detalles de su primer episodio
