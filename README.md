# Frente Global

Tower defense táctico en un único `index.html` con Three.js. Funciona en escritorio y como PWA instalable en Android, con soporte sin conexión.

## Jugar en local

```bash
python3 -m http.server 4173
```

Abre `http://127.0.0.1:4173/`.

No abras `index.html` con doble clic: el service worker y el manifiesto necesitan un servidor HTTP.

## Controles

| Acción | Teclado | Táctil |
| --- | --- | --- |
| Construir torre | `1`–`5` | Toca una tarjeta del arsenal |
| Iniciar oleada / pausa | `Espacio` | Botón «Iniciar oleada» |
| Pausa | `P` | Botón ❚❚ |
| Sonido | `M` | Botón ♪ |
| Pantalla completa | `F` | Ajustes |
| Cancelar selección | `Esc` | Botón «Cancelar» |
| Mover cámara | `WASD` / flechas | Arrastrar con un dedo |
| Rotar cámara | `Q` / `E` | Dos dedos |
| Zoom | Rueda | Pellizcar / botones `+` `−` |

En móvil en vertical el arsenal pasa a una bandeja inferior deslizable. La app instalada se abre en horizontal para aprovechar el mapa.

## PWA

- `manifest.webmanifest`: instalación, iconos y orientación.
- `sw.js`: precache del shell, navegación red-primero y recursos caché-primero.
- Three.js está vendorizado en `vendor/three.min.js`, así que no hay dependencias externas.
- Ajustes, récords y ejército se guardan en `localStorage`.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube este proyecto a la rama `main`.
2. En el repositorio entra en **Settings → Pages** y elige **Source: GitHub Actions**.
3. El workflow `.github/workflows/deploy.yml` se ejecuta en cada push a `main`.
4. La URL pública aparecerá en **Settings → Pages** y en la pestaña **Actions**.

No hacen falta secrets: GitHub Actions usa el token integrado y el permiso `pages: write` declarado en el workflow. El workflow sustituye `__BUILD__` en `sw.js` por el SHA del commit para invalidar la caché en cada despliegue.

## Estructura

```
index.html              Juego completo (HTML, CSS y lógica)
manifest.webmanifest    Manifiesto PWA
sw.js                   Service worker
vendor/three.min.js     Three.js r128 local
icons/                  Iconos PWA (192, 512, maskable, Apple)
.github/workflows/      Despliegue automático en GitHub Pages
```

## Notas

- La calidad gráfica se adapta automáticamente; también puede fijarse en Ajustes.
- El sonido se sintetiza con Web Audio, sin archivos de audio.
- El progreso es local al dispositivo: no hay cuentas ni servidores.
