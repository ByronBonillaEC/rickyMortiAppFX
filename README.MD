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
