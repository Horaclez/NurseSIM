# Simulador de Enfermería Chile: app sin internet (Android + Windows + web)

Un solo código fuente (`www/`) para tres formatos:
- **Android** (APK) con Capacitor
- **Windows** (instalador y .exe portable) con Electron
- **Web / PWA** (se instala desde el navegador)

Todo funciona **sin conexión**: la app es un solo archivo sin dependencias externas.

## Opción A: que GitHub lo compile por ti (no necesitas instalar nada)
1. Crea un repositorio en GitHub y sube TODO el contenido de esta carpeta (incluida `.github/`).
2. Ve a la pestaña **Actions**: se ejecuta "Build apps" en cada push a `main`.
3. Al terminar (10 a 15 minutos), descarga los archivos en **Actions > ejecución > Artifacts** o en **Releases**:
   - `Instalador-Simulador-Enfermeria-Chile-1.0.0.exe` (instalador de Windows)
   - `Simulador-Enfermeria-Chile-1.0.0-portable.exe` (sin instalar)
   - `Simulador-Enfermeria-Chile.apk` (Android)

## Opción B: compilar en tu computador
Requisitos: Node.js 20 o superior. Para Android: Android Studio y JDK 17. Para el .exe: Windows.

### Windows (.exe)
```
npm install
npm run electron:start      # probar
npm run electron:dist       # crea el instalador y el portable en dist-electron/
```

### Android (APK)
```
npm install
npm run android:add         # crea la carpeta android/ (una sola vez)
npm run android:assets      # genera los iconos desde assets/ (opcional)
npm run android:sync
cd android
gradlew assembleDebug       # en Mac/Linux: ./gradlew assembleDebug
```
El APK queda en `android/app/build/outputs/apk/debug/app-debug.apk`. Cópialo al teléfono y ábrelo
(Android pedirá permitir "instalar apps de orígenes desconocidos").

### Web / PWA
Sube la carpeta `www/` a un hosting con HTTPS (Netlify, GitHub Pages) y ábrelo desde Chrome: "Instalar app".

## Notas importantes
- El APK generado es de **depuración**: sirve para instalar en teléfonos. Para publicar en Google Play se necesita un paquete firmado (AAB) con tu keystore.
- El instalador de Windows **no está firmado**: Windows mostrará "Windows protegió su PC". Pulsa "Más información" y "Ejecutar de todas formas".
- Cambia `author` en `package.json` y, si quieres un identificador propio, `appId` en `package.json` y `capacitor.config.json` ANTES de crear la carpeta `android/`.
- Para actualizar el simulador: reemplaza `www/index.html` y sube un commit; si usas la versión web, cambia `VERSION` en `www/sw.js`.
- El progreso de cada persona (✔, puntajes, repaso de errores) se guarda en su propio dispositivo.

## Estructura
```
www/                 app (index.html, manifest, sw.js, js/env.js, icons/)
electron/main.js     ventana de escritorio
build/               iconos de Windows (icon.ico, icon.png)
assets/              iconos fuente para Android (@capacitor/assets)
capacitor.config.json
package.json
.github/workflows/build.yml
```

Contenido con fines educativos. Normas, guías y dosis están escritas de memoria y conviene verificarlas con los textos vigentes antes de usarlas con estudiantes o en entornos reales.
