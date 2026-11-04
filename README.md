# Frente Global

Tower defense táctico con Three.js. Funciona en escritorio y como PWA instalable en Android, con soporte sin conexión.

Ocho doctrinas militares, nueve sistemas de torre, dos rutas terrestres con flanqueo, un corredor aéreo y un teatro naval donde desplegar destructores y portaaviones. Cada país usa modelos y nombres inspirados en su equipo real.

Al entrar se elige idioma con las banderas de España y Estados Unidos. Toda la interfaz, facciones, torres, enemigos, ayudas y avisos están disponibles en español e inglés; el idioma se puede cambiar después desde Ajustes.

## Documentación

La arquitectura completa, el modelo de datos, la simulación, la internacionalización y la guía para ampliar el juego están en [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).

## Jugar en local

```bash
python3 -m http.server 4173
```

Abre `http://127.0.0.1:4173/`.

No abras `index.html` con doble clic: el service worker y el manifiesto necesitan un servidor HTTP.

## Controles

| Acción | Teclado | Táctil |
| --- | --- | --- |
| Construir torre (terrestre o naval) | `1`–`9` | Toca una tarjeta del arsenal |
| Iniciar oleada / pausa | `Espacio` | Botón «Iniciar oleada» |
| Pausa | `P` | Botón ❚❚ |
| Ataque aéreo | `Z` | Botón ✈ |
| Pulso EMP | `X` | Botón ⌁ |
| Reparar base | `C` | Botón ✚ |
| Sonido | `M` | Botón ♪ |
| Pantalla completa | `F` | Ajustes |
| Cancelar selección | `Esc` | Botón «Cancelar» |
| Mover cámara | `WASD` / flechas | Arrastrar con un dedo |
| Rotar cámara | `Q` / `E` | Dos dedos |
| Zoom | Rueda | Pellizcar / botones `+` `−` |

En móvil en vertical el arsenal pasa a una bandeja inferior deslizable. La app instalada se abre en horizontal para aprovechar el mapa.

## Mecánicas

- **Intel de oleada:** el panel derecho muestra composición enemiga, blindaje, escalado de HP/daño y nivel de amenaza antes de iniciar cada oleada.
- **Escalado enemigo:** blindados, MLRS, drones y bombarderos se suman con las oleadas; las unidades veteranas y de élite aparecen más adelante con etiquetas propias.
- **Prioridad de fuego:** cada torre puede apuntar al primero, al último, al más fuerte o al más cercano.
- **Apoyo de mando:** ataque aéreo dirigido, EMP que ralentiza y reparación de base, con coste y recarga.
- **Mar:** destructores y portaaviones solo se colocan en casillas de agua y cubren las rutas terrestres cercanas a la costa.

## PWA

- `manifest.webmanifest`: instalación, iconos y orientación.
- `sw.js`: precache del shell (incluido `game.js`), navegación red-primero y recursos caché-primero.
- Three.js está vendorizado en `vendor/three.min.js`, así que no hay dependencias externas.
- Ajustes, récords, ejército e idioma se guardan en `localStorage`.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube este proyecto a la rama `main`.
2. En el repositorio entra en **Settings → Pages** y elige **Source: GitHub Actions**.
3. El workflow `.github/workflows/deploy.yml` se ejecuta en cada push a `main`.
4. La URL pública aparecerá en **Settings → Pages** y en la pestaña **Actions**.

No hacen falta secrets: GitHub Actions usa el token integrado y el permiso `pages: write` declarado en el workflow. El workflow sustituye `__BUILD__` en `sw.js` por el SHA del commit para invalidar la caché en cada despliegue.

## Estructura

```
index.html              Shell, estilos y UI
game.js                 Motor del juego: escena, modelos, oleadas, i18n y lógica
manifest.webmanifest    Manifiesto PWA
sw.js                   Service worker
vendor/three.min.js     Three.js r128 local
icons/                  Iconos PWA (192, 512, maskable, Apple)
docs/                   Documentación técnica
.github/workflows/      Despliegue automático en GitHub Pages
```

## Notas

- La calidad gráfica se adapta automáticamente; también puede fijarse en Ajustes.
- El sonido se sintetiza con Web Audio, sin archivos de audio.
- El progreso es local al dispositivo: no hay cuentas ni servidores.
