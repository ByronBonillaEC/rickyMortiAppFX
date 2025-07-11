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

-----------------Redux
npm install @reduxjs/toolkit react-redux

## 11.- Implementar Redux para Cache de Personajes

### Paso 1: Crear la estructura de carpetas

```
store/
├── index.js          (Store principal)
└── charactersSlice.js (Slice de personajes)
```

### Paso 2: Crear charactersSlice.js

- Definir estado inicial: `{ data: [], loading: false, error: null, lastFetch: null }`
- Crear `fetchCharacters` thunk con `createAsyncThunk`
- Definir reducers para manejar pending, fulfilled, rejected

### Paso 3: Configurar el store en store/index.js

```javascript
import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./charactersSlice";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});
```

### Paso 4: Configurar Provider en \_layout.js

```javascript
import { Provider } from "react-redux";
import { store } from "../store";

export default function RootLayout() {
  return <Provider store={store}>{/* ... resto del código */}</Provider>;
}
```

### Paso 5: Actualizar Main.jsx para usar Redux

- Reemplazar `useState` y `useEffect` con `useSelector` y `useDispatch`
- Implementar cache inteligente (solo fetch si no hay datos o han pasado 5 min)
- Agregar pull-to-refresh y manejo de errores

### Beneficios del Cache con Redux:

✅ **Performance**: No más fetch repetidos innecesarios
✅ **Offline**: Datos disponibles sin conexión
✅ **UX**: Carga instantánea en navegaciones
✅ **Pull-to-refresh**: Actualización manual disponible
✅ **Manejo de errores**: Botón de reintentar
✅ **Cache inteligente**: Auto-refresh cada 5 minutos

---

## 12.- Redux Explicado de Manera Sencilla

### 🏦 Analogía: Redux es como un Banco

Imagina que Redux es un **banco** y tu aplicación son las **personas** que necesitan dinero:

#### 🏪 **Store (Banco)**

- Es el **lugar central** donde se guarda todo el dinero (datos)
- Solo hay **UN banco** para toda la ciudad (aplicación)
- Todos pueden ver cuánto dinero hay, pero nadie puede tomarlo directamente

#### 📋 **State (Estado del Banco)**

```javascript
// Estado actual del banco
{
  dineroTotal: 1000,
  clientes: ['Juan', 'María'],
  sucursalesAbiertas: 3
}
```

#### 📝 **Actions (Solicitudes al Banco)**

Son como **formularios** que llenas para pedir algo al banco:

```javascript
// "Quiero depositar $100"
{
  type: 'DEPOSITAR',
  cantidad: 100,
  cliente: 'Juan'
}

// "Quiero retirar $50"
{
  type: 'RETIRAR',
  cantidad: 50,
  cliente: 'María'
}
```

#### 🏛️ **Reducer (Cajero del Banco)**

Es el **empleado** que recibe tu solicitud y actualiza los registros:

```javascript
function bancarioReducer(estadoActual, solicitud) {
  switch (solicitud.type) {
    case "DEPOSITAR":
      return {
        ...estadoActual,
        dineroTotal: estadoActual.dineroTotal + solicitud.cantidad,
      };
    case "RETIRAR":
      return {
        ...estadoActual,
        dineroTotal: estadoActual.dineroTotal - solicitud.cantidad,
      };
    default:
      return estadoActual;
  }
}
```

#### 📞 **Dispatch (Enviar Solicitud)**

Es como **entregar el formulario** al cajero:

```javascript
// Juan entrega su formulario de depósito
dispatch({ type: "DEPOSITAR", cantidad: 100, cliente: "Juan" });
```

### 🔄 **Flujo Completo de Redux:**

```
1. Juan quiere depositar dinero 💰
   ↓
2. Llena un formulario (Action) 📝
   ↓
3. Entrega el formulario (Dispatch) 📤
   ↓
4. El cajero procesa la solicitud (Reducer) 🏛️
   ↓
5. Se actualiza el registro del banco (State) 📊
   ↓
6. Todos pueden ver el nuevo saldo (Components) 👀
```

### 🎯 **¿Por qué usar Redux?**

#### ❌ **Sin Redux (Casa sin banco):**

```javascript
// Cada persona guarda su dinero en su casa
function PersonaJuan() {
  const [miDinero, setMiDinero] = useState(100);
  // Juan no sabe cuánto tiene María
}

function PersonaMaría() {
  const [miDinero, setMiDinero] = useState(200);
  // María no sabe cuánto tiene Juan
}
```

#### ✅ **Con Redux (Banco central):**

```javascript
// Todos pueden ver el estado del banco
function PersonaJuan() {
  const dineroTotal = useSelector((state) => state.dineroTotal);
  // Juan puede ver todo el dinero disponible
}

function PersonaMaría() {
  const dineroTotal = useSelector((state) => state.dineroTotal);
  // María también puede ver todo
}
```

### 🚀 **En tu App de Rick y Morty:**

#### 📦 **Store**: Almacén de personajes

#### 📋 **State**: Lista de personajes cargados

#### 📝 **Action**: "FETCH_CHARACTERS", "ADD_FAVORITE"

#### 🏛️ **Reducer**: Función que actualiza la lista

#### 📞 **Dispatch**: `dispatch(fetchCharacters())`

### 💡 **Conceptos Clave:**

1. **Un solo Store**: Una sola fuente de verdad
2. **Estado inmutable**: Nunca modificas directamente, siempre creas nuevo
3. **Flujo unidireccional**: Action → Reducer → State → Component
4. **Predictible**: Misma acción = mismo resultado

### 🔧 **Herramientas que usamos:**

- **@reduxjs/toolkit**: Redux moderno y fácil
- **react-redux**: Conecta React con Redux
- **useSelector**: Lee datos del Store
- **useDispatch**: Envía acciones al Store
- **createSlice**: Crea reducer + actions automáticamente

### 🎉 **Resultado:**

¡Datos centralizados, compartidos y fáciles de manejar en toda tu app!

---

## 13.- Construir y Distribuir la App con Expo

### 🔧 **Prerrequisitos:**

- Cuenta en Expo (ya la tienes ✅)
- Expo CLI actualizado
- Aplicación Expo Go en tu celular

### 📱 **Opción 1: Desarrollo (Expo Go) - Más Rápido**

#### Paso 1: Instalar Expo Go en tu celular

- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

#### Paso 2: Ejecutar en modo desarrollo

```bash
npx expo start
```

#### Paso 3: Escanear QR

- Abre Expo Go en tu celular
- Escanea el código QR que aparece en la terminal
- ¡Tu app se instalará automáticamente!

### 📦 **Opción 2: Build Nativo (APK/IPA) - Instalación Real**

#### Paso 1: Instalar EAS CLI

```bash
npm install -g eas-cli
```

#### Paso 2: Login en Expo

```bash
eas login
```

#### Paso 3: Configurar el proyecto

```bash
eas build:configure
```

#### Paso 4: Construir para Android (APK)

```bash
# Para desarrollo (APK que puedes instalar directamente)
eas build --platform android --profile preview

# Para producción (Google Play Store)
eas build --platform android --profile production
```

#### Paso 5: Construir para iOS (si tienes Mac)

```bash
# Para desarrollo (TestFlight)
eas build --platform ios --profile preview

# Para producción (App Store)
eas build --platform ios --profile production
```

### 📋 **Configuración en eas.json (se crea automáticamente):**

```json
{
  "cli": {
    "version": ">= 8.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### 🚀 **Proceso Completo para APK:**

```bash
# 1. Asegúrate de estar en la carpeta del proyecto
cd "c:\Frank\Cursos\reactNative\RickyAndMorti"

# 2. Login en Expo
eas login

# 3. Configurar EAS
eas build:configure

# 4. Construir APK
eas build --platform android --profile preview
```

### 📥 **Descargar e Instalar:**

1. **Espera el build** (5-15 minutos)
2. **Recibes notificación** en tu email/dashboard de Expo
3. **Descarga el APK** desde el link proporcionado
4. **Instala en Android**:
   - Habilita "Fuentes desconocidas" en configuración
   - Instala el APK descargado

### 📱 **Métodos para Instalar el APK (sin USB):**

#### ✅ **Método 1: Descarga directa en el celular (Más fácil)**
1. **Abre el email** en tu celular (que llega de Expo)
2. **Toca el link** de descarga del APK
3. **Descarga directamente** en tu celular
4. **Instala** desde las notificaciones o administrador de archivos

#### ✅ **Método 2: Dashboard de Expo**
1. Ve a [expo.dev](https://expo.dev) **en tu celular**
2. Login con tu cuenta
3. Ve a "Projects" → Tu proyecto
4. Toca "Download" en el build completado
5. Instala el APK descargado

#### ✅ **Método 3: Compartir desde PC**
1. **En tu PC**: Ve al dashboard de Expo
2. **Copia el link** de descarga del APK
3. **Envíate el link** por WhatsApp, Telegram, etc.
4. **Abre el link en tu celular** y descarga
5. **Instala el APK**

#### ⚡ **Método 4: QR Code (si está disponible)**
1. En el dashboard puede aparecer un **QR code**
2. **Escanéalo con tu celular**
3. **Descarga automática** del APK

### 🔧 **Configurar Android para instalar APKs:**

#### En Android 8+ (API 26+):
1. **Configuración** → **Seguridad**
2. **Fuentes desconocidas** → Habilitar
3. O cuando instales, Android te preguntará automáticamente

#### En Android moderno:
1. Cuando toques el APK, Android dirá: *"Esta aplicación no está disponible en Play Store"*
2. Toca **"Configuración"**
3. Habilita **"Permitir desde esta fuente"**
4. Vuelve e **instala normalmente**

### ❌ **Por qué no necesitas USB:**

- **EAS Build** genera un APK **independiente**
- Se **descarga directamente** del servidor de Expo
- **No requiere** Android Studio ni ADB
- **No necesitas** modo desarrollador ni depuración USB
