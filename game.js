'use strict';
/* =========================================================================
   FRENTE GLOBAL · motor de juego
   Costa, una pista terrestre de dos carriles, una ruta aérea y flota propia.
   Modelos procedurales detallados, sin assets externos.
   ========================================================================= */

/* ------------------------------------------------------------------ datos */
const ARMIES = [
  {
    id: 'usa', name: 'Estados Unidos', nameEn: 'United States', flag: '🇺🇸', bonus: 'Cadencia +12%', bonusEn: 'Fire rate +12%',
    weapons: 'M134 · M777 · M270 · Patriot · HELIOS · EA-18G · Arleigh Burke · Gerald R. Ford',
    cash: 660, color: 0x68764a,
    mults: { gun: 1.12, mortar: 1, art: 1, rocket: 1.05, aa: 1.08, laser: 1, ew: 1, destroyer: 1.05, carrier: 1.1 },
    kit: { gun: 'gatling', art: 'truck', rocket: 'tracked', aa: 'canister', laser: 'container', ew: 'dish', destroyer: 'burke', carrier: 'ford' },
    perk: 'Cadencia elevada', perkEn: 'Elevated rate of fire'
  },
  {
    id: 'china', name: 'China', nameEn: 'China', flag: '🇨🇳', bonus: 'Torres −10%', bonusEn: 'Towers −10%',
    weapons: 'Type 1130 · PLL-05 · PCL-181 · PHL-03 · HQ-17 · GuoRong · DWL-002 · Type 055 · Fujian',
    cash: 700, color: 0x9a4935, discount: .9,
    mults: { gun: 1, mortar: 1.05, art: 1.05, rocket: 1.08, aa: 1.05, laser: 1.08, ew: 1, destroyer: 1.08, carrier: 1.05 },
    kit: { gun: 'ciws', art: 'truck', rocket: 'truck', aa: 'box', laser: 'container', ew: 'array', destroyer: 'type055', carrier: 'fujian' },
    perk: 'Construcción eficiente', perkEn: 'Efficient construction'
  },
  {
    id: 'russia', name: 'Rusia', nameEn: 'Russia', flag: '🇷🇺', bonus: 'Artillería +18%', bonusEn: 'Artillery +18%',
    weapons: 'GSh-6-30 · 2B25 · 2S19 Msta · BM-30 Smerch · S-400 · Peresvet · Krasukha · Slava · Kuznetsov',
    cash: 640, color: 0x647486,
    mults: { gun: 1, mortar: 1.15, art: 1.18, rocket: 1.12, aa: 1.1, laser: 1, ew: 1.1, destroyer: 1.1, carrier: 1 },
    kit: { gun: 'rotary', art: 'tracked', rocket: 'truck', aa: 'tube', laser: 'container', ew: 'dish', destroyer: 'slava', carrier: 'kuznetsov' },
    perk: 'Artillería devastadora', perkEn: 'Devastating artillery'
  },
  {
    id: 'israel', name: 'Israel', nameEn: 'Israel', flag: '🇮🇱', bonus: 'Láser +25%', bonusEn: 'Laser +25%',
    weapons: 'MAG · Keshet · ATMOS · Lynx · Cúpula de Hierro · Iron Beam · Scorpius · Sa’ar 6 · Sa’ar 5',
    weaponsEn: 'MAG · Keshet · ATMOS · Lynx · Iron Dome · Iron Beam · Scorpius · Sa’ar 6 · Sa’ar 5',
    cash: 640, color: 0x7d8b77,
    mults: { gun: 1, mortar: 1, art: 1, rocket: 1.05, aa: 1.08, laser: 1.25, ew: 1.08, destroyer: 1.05, carrier: 1 },
    kit: { gun: 'mg', art: 'truck', rocket: 'truck', aa: 'rail', laser: 'turret', ew: 'array', destroyer: 'saar6', carrier: 'saar5' },
    perk: 'Energía dirigida mejorada', perkEn: 'Enhanced directed energy'
  },
  {
    id: 'uk', name: 'Reino Unido', nameEn: 'United Kingdom', flag: '🇬🇧', bonus: 'Antiaéreo +18%', bonusEn: 'Anti-air +18%',
    weapons: 'L7 Minigun · 81 mm · AS-90 · M270 · Sky Sabre · DragonFire · Land Ceptor · Type 45 · Queen Elizabeth',
    cash: 640, color: 0x586783,
    mults: { gun: 1.05, mortar: 1, art: 1.08, rocket: 1.04, aa: 1.18, laser: 1.1, ew: 1, destroyer: 1.1, carrier: 1.05 },
    kit: { gun: 'rotary', art: 'tracked', rocket: 'tracked', aa: 'rail', laser: 'turret', ew: 'array', destroyer: 'type45', carrier: 'queen' },
    perk: 'Defensa aérea superior', perkEn: 'Superior air defense'
  },
  {
    id: 'france', name: 'Francia', nameEn: 'France', flag: '🇫🇷', bonus: 'Láser +12% · apoyo', bonusEn: 'Laser +12% · support',
    weapons: 'Nexter 20 mm · MO-120 · CAESAR · LRU · VL MICA · HELMA-P · Brouilleur · FREMM · Charles de Gaulle',
    weaponsEn: 'Nexter 20 mm · MO-120 · CAESAR · LRU · VL MICA · HELMA-P · Jammer · FREMM · Charles de Gaulle',
    cash: 670, color: 0x596f8a,
    mults: { gun: 1.05, mortar: 1.05, art: 1.1, rocket: 1.05, aa: 1.05, laser: 1.12, ew: 1.12, destroyer: 1.05, carrier: 1.1 },
    kit: { gun: 'rotary', art: 'truck', rocket: 'truck', aa: 'box', laser: 'turret', ew: 'array', destroyer: 'fremm', carrier: 'charles' },
    perk: 'Doctrina versátil', perkEn: 'Versatile doctrine'
  },
  {
    id: 'korea', name: 'Corea del Sur', nameEn: 'South Korea', flag: '🇰🇷', bonus: 'Cadencia +8%', bonusEn: 'Fire rate +8%',
    weapons: 'K6 · KM114 · K9 Thunder · Chunmoo · Cheongung · Laser AA · KJ-100 · Sejong · Dokdo',
    cash: 650, color: 0x65745c,
    mults: { gun: 1.08, mortar: 1.05, art: 1.1, rocket: 1.08, aa: 1.1, laser: 1.05, ew: 1, destroyer: 1.08, carrier: 1 },
    kit: { gun: 'gatling', art: 'tracked', rocket: 'tracked', aa: 'box', laser: 'turret', ew: 'array', destroyer: 'sejong', carrier: 'dokdo' },
    perk: 'Respuesta rápida', perkEn: 'Rapid response'
  },
  {
    id: 'turkey', name: 'Turquía', nameEn: 'Turkey', flag: '🇹🇷', bonus: 'EW +20%', bonusEn: 'EW +20%',
    weapons: 'Korkut · MKE 81 mm · T-155 Fırtına · T-300 · Hisar · Gökberk · Koral · Barbaros · Anadolu',
    cash: 650, color: 0x8c4c42,
    mults: { gun: 1.05, mortar: 1.05, art: 1.12, rocket: 1.08, aa: 1.08, laser: 1.05, ew: 1.2, destroyer: 1.05, carrier: 1.05 },
    kit: { gun: 'rotary', art: 'tracked', rocket: 'truck', aa: 'box', laser: 'turret', ew: 'array', destroyer: 'barbaros', carrier: 'anadolu' },
    perk: 'Guerra electrónica potente', perkEn: 'Powerful electronic warfare'
  }
];

const WEAPONS = {
  usa: { gun: 'M134 Minigun', mortar: 'M120', art: 'M777', rocket: 'M270 MLRS', aa: 'Patriot', laser: 'HELIOS', ew: 'EA-18G', destroyer: 'USS Arleigh Burke', carrier: 'USS Gerald R. Ford' },
  china: { gun: 'Type 1130 CIWS', mortar: 'PLL-05', art: 'PCL-181', rocket: 'PHL-03', aa: 'HQ-17', laser: 'GuoRong', ew: 'DWL-002', destroyer: 'Type 055 Nanchang', carrier: 'Fujian' },
  russia: { gun: 'GSh-6-30', mortar: '2B25 Gall', art: '2S19 Msta', rocket: 'BM-30 Smerch', aa: 'S-400', laser: 'Peresvet', ew: 'Krasukha', destroyer: 'Slava Marshal Ustinov', carrier: 'Admiral Kuznetsov' },
  israel: { gun: 'MAG', mortar: 'Keshet', art: 'ATMOS', rocket: 'Lynx', aa: 'Cúpula de Hierro', laser: 'Iron Beam', ew: 'Scorpius', destroyer: 'INS Sa’ar 6', carrier: 'INS Sa’ar 5' },
  uk: { gun: 'L7 Minigun', mortar: '81 mm L16', art: 'AS-90', rocket: 'M270', aa: 'Sky Sabre', laser: 'DragonFire', ew: 'Land Ceptor', destroyer: 'HMS Type 45', carrier: 'HMS Queen Elizabeth' },
  france: { gun: 'Nexter 20 mm', mortar: 'MO-120 RT', art: 'CAESAR', rocket: 'LRU', aa: 'VL MICA', laser: 'HELMA-P', ew: 'Brouilleur', destroyer: 'FREMM Aquitaine', carrier: 'Charles de Gaulle' },
  korea: { gun: 'K6', mortar: 'KM114', art: 'K9 Thunder', rocket: 'Chunmoo', aa: 'Cheongung', laser: 'Laser AA', ew: 'KJ-100', destroyer: 'Sejong the Great', carrier: 'ROKS Dokdo' },
  turkey: { gun: 'Korkut', mortar: 'MKE 81 mm', art: 'T-155 Fırtına', rocket: 'T-300 Kasırga', aa: 'Hisar', laser: 'Gökberk', ew: 'Koral', destroyer: 'TCG Barbaros', carrier: 'TCG Anadolu' }
};

const TOWERS = [
  { id: 'gun', name: 'Ametralladora', nameEn: 'Machine gun', icon: '✣', cost: 120, range: 4.7, damage: 9, rate: .22, targets: ['ground'], desc: 'Tiro rápido de defensa cercana', descEn: 'Rapid-fire close defense', domain: 'land', pierce: .12 },
  { id: 'mortar', name: 'Mortero', nameEn: 'Mortar', icon: '◒', cost: 145, range: 5.2, damage: 22, rate: 1.05, targets: ['ground'], splash: 1.05, desc: 'Fuego indirecto de cadencia media', descEn: 'Medium-rate indirect fire', domain: 'land', pierce: .25 },
  { id: 'art', name: 'Artillería', nameEn: 'Artillery', icon: '◉', cost: 195, range: 6.6, damage: 42, rate: 2.25, targets: ['ground'], splash: 1.55, desc: 'Obús de alto impacto en área', descEn: 'High-impact area howitzer', domain: 'land', pierce: .35 },
  { id: 'rocket', name: 'Lanzacohetes', nameEn: 'Rocket launcher', icon: '⌁', cost: 245, range: 7.6, damage: 27, rate: 3.4, targets: ['ground'], splash: 1.5, desc: 'Salva de cohetes de saturación', descEn: 'Saturation rocket salvo', domain: 'land', pierce: .4, salvo: 4 },
  { id: 'aa', name: 'Misil antiaéreo', nameEn: 'Surface-to-air missile', icon: '⌃', cost: 170, range: 7.4, damage: 48, rate: 1.45, targets: ['air'], desc: 'Lanzador guiado contra aeronaves', descEn: 'Guided launcher against aircraft', domain: 'land', pierce: .2 },
  { id: 'laser', name: 'Láser', nameEn: 'Laser', icon: '⌇', cost: 225, range: 5.8, damage: 16, rate: .12, targets: ['ground', 'air'], desc: 'Haz continuo de energía dirigida', descEn: 'Continuous directed-energy beam', domain: 'land', pierce: 1 },
  { id: 'ew', name: 'Guerra electrónica', nameEn: 'Electronic warfare', icon: '⌘', cost: 180, range: 5.2, damage: 0, rate: .5, targets: ['ground', 'air'], slow: .5, desc: 'Interferencia: ralentiza y repele drones', descEn: 'Jamming: slows and repels drones', domain: 'land', pierce: 0 },
  { id: 'destroyer', name: 'Destructor', nameEn: 'Destroyer', icon: '⚓', cost: 330, range: 9.2, damage: 72, rate: 2.7, targets: ['ground', 'air'], splash: 1.7, desc: 'Misiles de crucero desde el mar', descEn: 'Cruise missiles from the sea', domain: 'sea', pierce: .55 },
  { id: 'carrier', name: 'Portaaviones', nameEn: 'Aircraft carrier', icon: '✈', cost: 490, range: 12.5, damage: 62, rate: 5.2, targets: ['ground', 'air'], splash: 2.3, desc: 'Ataque aéreo embarcado de largo alcance', descEn: 'Long-range carrier air strike', domain: 'sea', pierce: .5 }
];

const ENEMIES = {
  infantry: { name: 'Infantería', nameEn: 'Infantry', kind: 'ground', hp: 46, speed: 1.15, reward: 13, radius: .16, color: 0x66714a, damage: 4, armor: .02, tier: 1, icon: '▮', desc: 'Escuadra ligera', descEn: 'Light squad' },
  jeep: { name: 'Vehículo ligero', nameEn: 'Light vehicle', kind: 'ground', hp: 82, speed: 1.8, reward: 20, radius: .23, color: 0x8b7b50, damage: 5, armor: .08, tier: 1, icon: '▰', desc: 'Reconocimiento rápido', descEn: 'Fast recon' },
  apc: { name: 'Blindado 8×8', nameEn: '8×8 armored', kind: 'ground', hp: 260, speed: .95, reward: 38, radius: .28, color: 0x5d6850, damage: 9, armor: .28, tier: 2, icon: '◆', desc: 'Transporte blindado', descEn: 'Armored transport' },
  tank: { name: 'Carro de combate', nameEn: 'Main battle tank', kind: 'ground', hp: 370, speed: .68, reward: 50, radius: .34, color: 0x576348, damage: 13, armor: .42, tier: 3, icon: '⬟', desc: 'Blindaje pesado', descEn: 'Heavy armor' },
  mlrs: { name: 'Artillería móvil', nameEn: 'Mobile artillery', kind: 'ground', hp: 215, speed: .8, reward: 44, radius: .3, color: 0x6b6247, damage: 11, armor: .18, tier: 2, icon: '≋', desc: 'Lanzacohetes enemigo', descEn: 'Enemy rocket launcher' },
  heli: { name: 'Helicóptero de ataque', nameEn: 'Attack helicopter', kind: 'air', hp: 165, speed: 1.25, reward: 35, radius: .28, color: 0x687b70, damage: 8, armor: .05, tier: 2, icon: '✚', desc: 'Ataque a baja cota', descEn: 'Low-altitude attack' },
  drone: { name: 'Dron de combate', nameEn: 'Combat drone', kind: 'air', hp: 92, speed: 2.5, reward: 29, radius: .18, color: 0x7d817c, damage: 6, armor: 0, tier: 1, icon: '⌖', desc: 'Blanco rápido y frágil', descEn: 'Fast, fragile target' },
  fighter: { name: 'Caza', nameEn: 'Fighter jet', kind: 'air', hp: 195, speed: 2.8, reward: 46, radius: .25, color: 0x909a9a, damage: 10, armor: .05, tier: 3, icon: '➤', desc: 'Aeronave supersónica', descEn: 'Supersonic aircraft' },
  bomber: { name: 'Bombardero', nameEn: 'Bomber', kind: 'air', hp: 540, speed: 1.1, reward: 92, radius: .42, color: 0x777f80, damage: 19, armor: .12, tier: 4, icon: '✥', desc: 'Plataforma pesada', descEn: 'Heavy platform' },
  boss: { name: 'Coloso acorazado', nameEn: 'Armored colossus', kind: 'ground', hp: 2800, speed: .42, reward: 330, radius: .72, color: 0x46523b, damage: 30, armor: .5, tier: 5, icon: '☠', desc: 'Jefe de oleada', descEn: 'Wave boss', boss: true }
};

const MAP = { w: 30, h: 18, cell: 1 };
const SEA_ROWS = 4;                 // filas cz 0..3
const SEA_LIMIT = -4.5;             // z < SEA_LIMIT es agua

/* Una única pista terrestre de dos carriles. Así las unidades no se cruzan,
   la carretera ocupa una sola celda y queda espacio de construcción limpio. */
const ROUTES = [
  {
    id: 'main', name: 'Pista principal', nameEn: 'Main road', color: 0x706554,
    points: [
      [-14.5, -2.5], [-11.5, -2.5], [-11.5, 2.5], [-7.5, 2.5], [-7.5, -1.5],
      [-3.5, -1.5], [-3.5, 4.5], [.5, 4.5], [.5, .5], [4.5, .5],
      [4.5, 6.5], [8.5, 6.5], [8.5, 2.5], [13.5, 2.5], [13.5, -1.5]
    ]
  }
];
const AIR_ROUTE = { id: 'air', name: 'Corredor aéreo', nameEn: 'Air corridor', points: [[-14.5, -6.5], [-5, -7.5], [3, -5.5], [9, -3.5], [14.5, -1.5]] };

const APP_VERSION = '2.2.0';
const STORE_SETTINGS = 'frente-global:settings:v1';
const STORE_RECORDS = 'frente-global:records:v1';
function loadStore(key, fallback) {
  try { const raw = localStorage.getItem(key); if (!raw) return { ...fallback }; return { ...fallback, ...JSON.parse(raw) }; }
  catch { return { ...fallback }; }
}
const DEFAULT_LANGUAGE = (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
const settings = loadStore(STORE_SETTINGS, { quality: 'auto', sound: true, volume: .65, army: 0, labels: true, language: DEFAULT_LANGUAGE });
if (settings.language !== 'en' && settings.language !== 'es') settings.language = DEFAULT_LANGUAGE;
const records = loadStore(STORE_RECORDS, { bestWave: 0, bestScore: 0, totalKills: 0, plays: 0 });
function persistSettings() { try { localStorage.setItem(STORE_SETTINGS, JSON.stringify(settings)); } catch { } }
function persistRecords() { try { localStorage.setItem(STORE_RECORDS, JSON.stringify(records)); } catch { } }

/* --------------------------------------------------------------- idiomas */
const I18N = {
  es: {
    'doc.title': 'Frente Global | Defensa táctica',
    'doc.description': 'Tower defense táctico con ocho doctrinas militares, guerra naval y apoyo de mando. Defiende la línea en Android y escritorio.',
    'brand.sub': 'Comando de defensa',
    'stat.credits': 'Créditos', 'stat.integrity': 'Integridad', 'stat.wave': 'Oleada', 'stat.enemies': 'Enemigos', 'stat.threat': 'Amenaza',
    'action.army': 'Ejército', 'action.armyTitle': 'Cambiar ejército', 'action.centerTitle': 'Centrar cámara',
    'action.soundOn': 'Silenciar (M)', 'action.soundOff': 'Activar sonido (M)',
    'action.pause': 'Pausa (P)', 'action.resume': 'Reanudar (P)',
    'action.fullscreen': 'Pantalla completa (F)', 'action.exitFullscreen': 'Salir de pantalla completa (F)', 'action.settings': 'Ajustes',
    'build.kicker': 'Arsenal de campo', 'build.title': 'Construir',
    'build.hint': 'Sistemas terrestres y navales. Elige uno y colócalo en una casilla libre. Teclas 1–9. Esc cancela.',
    'inspect.kicker': 'Control táctico', 'inspect.title': 'Inspección',
    'inspect.empty': 'Selecciona una torre del mapa para ver sus parámetros y órdenes disponibles.',
    'wave.start': 'Iniciar oleada', 'zoom.out': 'Alejar cámara', 'zoom.in': 'Acercar cámara', 'common.cancel': 'Cancelar',
    'ability.strike': 'Ataque aéreo', 'ability.strikeHint': 'Z · 120 cr', 'ability.strikeTitle': 'Ataque aéreo (Z) · 120 créditos',
    'ability.emp': 'Pulso EMP', 'ability.empHint': 'X · 90 cr', 'ability.empTitle': 'Pulso EMP (X) · 90 créditos',
    'ability.repair': 'Reparar base', 'ability.repairHint': 'C · 80 cr', 'ability.repairTitle': 'Reparar base (C) · 80 créditos',
    'map.sector': 'SECTOR 07 / CUADRÍCULA 01',
    'menu.eyebrow': 'Protocolo de despliegue · Operación indefinida', 'menu.title': 'Elige tu fuerza',
    'menu.copyHtml': 'Una pista de dos carriles. Un mar. Un corredor aéreo.<br>Tu doctrina define cada defensa.',
    'menu.note': 'Los parámetros son valores de equilibrio de juego.',
    'menu.bestWave': 'Mejor oleada', 'menu.record': 'Récord', 'menu.runs': 'Partidas',
    'menu.install': 'Instalar app', 'menu.deploy': 'Desplegar fuerza →', 'menu.roster': 'Dotación:',
    'defeat.eyebrow': 'Fin de la operación', 'defeat.title': 'Línea perdida',
    'defeat.text': 'La base resistió {wave} oleadas y neutralizó {score} créditos en amenazas.', 'defeat.textOne': 'La base resistió 1 oleada y neutralizó {score} créditos en amenazas.', 'defeat.retry': 'Reintentar',
    'pause.eyebrow': 'Operación en espera', 'pause.title': 'Pausa',
    'pause.text': 'La simulación está detenida. Tu posición se mantiene intacta.',
    'pause.resume': 'Reanudar', 'pause.settings': 'Ajustes', 'pause.quit': 'Salir al menú',
    'pause.restart': 'Reiniciar partida',
    'language.eyebrow': 'Configuración inicial', 'language.title': 'Elige tu idioma',
    'language.copy': 'Puedes cambiarlo después en Ajustes.', 'language.esSub': 'Jugar en español', 'language.enSub': 'Play in English',
    'settings.kicker': 'Configuración', 'settings.title': 'Ajustes', 'settings.close': 'Cerrar',
    'settings.language': 'Idioma', 'settings.languageHint': 'Cambia el idioma de la interfaz al instante.',
    'settings.quality': 'Calidad gráfica', 'quality.auto': 'Automática', 'quality.high': 'Alta', 'quality.medium': 'Media', 'quality.low': 'Baja',
    'settings.sound': 'Sonido', 'settings.soundHint': 'Efectos sintetizados, sin descargas.',
    'settings.labels': 'Etiquetas enemigas', 'settings.labelsHint': 'Muestra el tipo y el rango de veterano o élite sobre cada unidad.',
    'settings.volume': 'Volumen', 'settings.fullscreen': 'Pantalla completa', 'settings.fullscreenHint': 'Útil en escritorio y Android.',
    'settings.fullscreenUnavailable': 'Tu navegador no permite pantalla completa.',
    'settings.install': 'Instalar aplicación', 'settings.installHint': 'Añádela a tu pantalla de inicio para jugar sin conexión.',
    'settings.installHintInstalled': 'Aplicación instalada. Se actualiza sola al abrirla.',
    'settings.installHintBrowser': 'Abre el menú del navegador y elige «Añadir a pantalla de inicio» para instalar.',
    'settings.progress': 'Progreso local', 'settings.progressHint': 'Récords y preferencias se guardan en este dispositivo.',
    'settings.reset': 'Borrar récord', 'settings.modeInstalled': 'instalada', 'settings.modeBrowser': 'navegador',
    'settings.shortcutsHtml': '<b>Teclado</b><br><kbd>1</kbd>–<kbd>9</kbd> construir · <kbd>Espacio</kbd> oleada/pausa · <kbd>P</kbd> pausa<br><kbd>Z</kbd> ataque aéreo · <kbd>X</kbd> EMP · <kbd>C</kbd> reparar base<br><kbd>M</kbd> sonido · <kbd>F</kbd> pantalla completa · <kbd>Esc</kbd> cancelar<br><kbd>WASD</kbd>/flechas mover cámara · <kbd>Q</kbd><kbd>E</kbd> rotar · rueda zoom<br><b>Táctil:</b> un dedo desplaza, dos dedos hacen zoom, toca para construir.<br><b>Mar:</b> destructores y portaaviones se despliegan en el agua.',
    'install.button': 'Instalar', 'update.available': 'Nueva versión disponible', 'update.reload': 'Actualizar',
    'quality.hintAuto': 'Automática: {level} en este dispositivo.', 'quality.hintForced': 'Forzada: {level}{shadows}.',
    'quality.withShadows': ', con sombras', 'quality.withoutShadows': ', sin sombras',
    'sound.on': 'Activado', 'sound.off': 'Silenciado', 'labels.visible': 'Visibles', 'labels.hidden': 'Ocultas',
    'labels.toastOn': 'Etiquetas enemigas visibles', 'labels.toastOff': 'Etiquetas enemigas ocultas',
    'fullscreen.activate': 'Activar', 'fullscreen.deactivate': 'Desactivar',
    'tower.level': 'NIVEL {level} / 5', 'tower.damage': 'Daño por impacto', 'tower.range': 'Alcance operativo',
    'tower.rate': 'Cadencia', 'tower.priority': 'Prioridad', 'tower.upgrade': '↑ Mejorar · {cost}', 'tower.max': 'MAX',
    'tower.sell': 'Vender · +{cost}', 'tower.all': 'Tierra y aire', 'tower.air': 'Solo aire', 'tower.ground': 'Solo tierra',
    'tower.naval': 'Naval', 'tower.domainSea': 'MAR', 'tower.domainLand': 'TIE',
    'tower.title': '{name} · alcance {range} · tecla {key}',
    'tower.mode.first': 'Primero', 'tower.mode.last': 'Último', 'tower.mode.strong': 'Más fuerte', 'tower.mode.close': 'Más cercano',
    'toast.noPosition': 'Posición no disponible para este sistema', 'toast.noCredits': 'Créditos insuficientes',
    'toast.deployed': 'Sistema desplegado', 'toast.place': 'Coloca: {name}', 'toast.placeSea': 'Coloca en el mar: {name}',
    'toast.priority': 'Prioridad: {mode}', 'toast.upgrade': 'Mejora completada · nivel {level}',
    'toast.sold': 'Sistema vendido · 60% recuperado', 'toast.waveStart': 'Oleada {wave}: {summary}',
    'toast.waveClear': 'Oleada {wave} contenida · bonificación recibida', 'toast.reloading': '{name} recargando · {s} s',
    'toast.strikeSelect': 'Ataque aéreo: selecciona el punto de impacto', 'toast.emp': 'Pulso EMP · amenazas ralentizadas y drones repelidos',
    'toast.repair': 'Base reparada · +22% de integridad', 'toast.strikeActive': 'Ataque aéreo en curso',
    'toast.army': '{name} desplegado · pista de dos carriles y flota disponibles', 'toast.armyNew': '{name} desplegado · nueva partida iniciada', 'toast.restart': 'Partida reiniciada', 'toast.language': 'Idioma: {language}',
    'toast.camera': 'Cámara centrada', 'toast.recordsCleared': 'Récords borrados', 'toast.quality': 'Calidad gráfica: {level}',
    'toast.qualityReduced': 'Calidad gráfica reducida para mantener la fluidez', 'toast.qualityMinimum': 'Calidad gráfica al mínimo',
    'toast.fullscreenUnavailable': 'Pantalla completa no disponible en este navegador', 'toast.fullscreenFailed': 'No se pudo activar pantalla completa',
    'toast.installMenu': 'Usa el menú del navegador → Añadir a pantalla de inicio', 'toast.installing': 'Instalando aplicación…',
    'toast.installed': 'Aplicación instalada · lista sin conexión', 'confirm.clearRecords': '¿Borrar los récords guardados en este dispositivo?',
    'threat.none': 'Sin contacto', 'threat.low': 'Baja', 'threat.medium': 'Media', 'threat.high': 'Alta', 'threat.severe': 'Severa', 'threat.critical': 'Crítica',
    'intel.inProgress': 'en curso', 'intel.planned': 'prevista', 'intel.head': 'Oleada {wave} <em>{state}</em>',
    'intel.scaling': 'HP enemigo ×{hp} · daño ×{dmg}', 'intel.noThreats': 'Sin amenazas confirmadas',
    'intel.routes': 'Pista terrestre', 'intel.routesDetail': 'Única · dos carriles', 'intel.airRoute': 'Corredor aéreo',
    'intel.support': 'Apoyo de mando', 'intel.supportHtml': '<kbd>Z</kbd> ataque aéreo · <kbd>X</kbd> EMP · <kbd>C</kbd> reparar',
    'intel.air': 'Aire', 'intel.boss': 'Jefe', 'intel.ground': 'Tierra', 'intel.armor': 'blindaje {n}%',
    'rank.elite': 'ÉLITE', 'rank.veteran': 'VETERANO'
  },
  en: {
    'doc.title': 'Frente Global | Tactical defense',
    'doc.description': 'Tactical tower defense with eight military doctrines, naval warfare and command support. Hold the line on Android and desktop.',
    'brand.sub': 'Defense command',
    'stat.credits': 'Credits', 'stat.integrity': 'Integrity', 'stat.wave': 'Wave', 'stat.enemies': 'Enemies', 'stat.threat': 'Threat',
    'action.army': 'Army', 'action.armyTitle': 'Change army', 'action.centerTitle': 'Center camera',
    'action.soundOn': 'Mute (M)', 'action.soundOff': 'Enable sound (M)',
    'action.pause': 'Pause (P)', 'action.resume': 'Resume (P)',
    'action.fullscreen': 'Fullscreen (F)', 'action.exitFullscreen': 'Exit fullscreen (F)', 'action.settings': 'Settings',
    'build.kicker': 'Field arsenal', 'build.title': 'Build',
    'build.hint': 'Land and naval systems. Pick one and place it on a free tile. Keys 1–9. Esc cancels.',
    'inspect.kicker': 'Tactical control', 'inspect.title': 'Inspect',
    'inspect.empty': 'Select a tower on the map to view its stats and available orders.',
    'wave.start': 'Start wave', 'zoom.out': 'Zoom out', 'zoom.in': 'Zoom in', 'common.cancel': 'Cancel',
    'ability.strike': 'Airstrike', 'ability.strikeHint': 'Z · 120 cr', 'ability.strikeTitle': 'Airstrike (Z) · 120 credits',
    'ability.emp': 'EMP pulse', 'ability.empHint': 'X · 90 cr', 'ability.empTitle': 'EMP pulse (X) · 90 credits',
    'ability.repair': 'Repair base', 'ability.repairHint': 'C · 80 cr', 'ability.repairTitle': 'Repair base (C) · 80 credits',
    'map.sector': 'SECTOR 07 / GRID 01',
    'menu.eyebrow': 'Deployment protocol · Indefinite operation', 'menu.title': 'Choose your force',
    'menu.copyHtml': 'One two-lane road. One sea. One air corridor.<br>Your doctrine shapes every defense.',
    'menu.note': 'Values shown are gameplay balance parameters.',
    'menu.bestWave': 'Best wave', 'menu.record': 'High score', 'menu.runs': 'Runs',
    'menu.install': 'Install app', 'menu.deploy': 'Deploy force →', 'menu.roster': 'Loadout:',
    'defeat.eyebrow': 'Operation ended', 'defeat.title': 'Line lost',
    'defeat.text': 'The base held for {wave} waves and neutralized {score} credits in threats.', 'defeat.textOne': 'The base held for 1 wave and neutralized {score} credits in threats.', 'defeat.retry': 'Retry',
    'pause.eyebrow': 'Operation on hold', 'pause.title': 'Paused',
    'pause.text': 'The simulation is stopped. Your position remains intact.',
    'pause.resume': 'Resume', 'pause.settings': 'Settings', 'pause.quit': 'Quit to menu',
    'pause.restart': 'Restart match',
    'language.eyebrow': 'Initial setup', 'language.title': 'Choose your language',
    'language.copy': 'You can change it later in Settings.', 'language.esSub': 'Jugar en español', 'language.enSub': 'Play in English',
    'settings.kicker': 'Configuration', 'settings.title': 'Settings', 'settings.close': 'Close',
    'settings.language': 'Language', 'settings.languageHint': 'Changes the interface language instantly.',
    'settings.quality': 'Graphics quality', 'quality.auto': 'Automatic', 'quality.high': 'High', 'quality.medium': 'Medium', 'quality.low': 'Low',
    'settings.sound': 'Sound', 'settings.soundHint': 'Synthesized effects, no downloads.',
    'settings.labels': 'Enemy labels', 'settings.labelsHint': 'Shows unit type and veteran or elite rank above each unit.',
    'settings.volume': 'Volume', 'settings.fullscreen': 'Fullscreen', 'settings.fullscreenHint': 'Useful on desktop and Android.',
    'settings.fullscreenUnavailable': 'Your browser does not allow fullscreen.',
    'settings.install': 'Install app', 'settings.installHint': 'Add it to your home screen to play offline.',
    'settings.installHintInstalled': 'App installed. It updates itself when opened.',
    'settings.installHintBrowser': 'Open the browser menu and choose “Add to Home Screen” to install.',
    'settings.progress': 'Local progress', 'settings.progressHint': 'Records and preferences are stored on this device.',
    'settings.reset': 'Clear records', 'settings.modeInstalled': 'installed', 'settings.modeBrowser': 'browser',
    'settings.shortcutsHtml': '<b>Keyboard</b><br><kbd>1</kbd>–<kbd>9</kbd> build · <kbd>Space</kbd> wave/pause · <kbd>P</kbd> pause<br><kbd>Z</kbd> airstrike · <kbd>X</kbd> EMP · <kbd>C</kbd> repair base<br><kbd>M</kbd> sound · <kbd>F</kbd> fullscreen · <kbd>Esc</kbd> cancel<br><kbd>WASD</kbd>/arrows move camera · <kbd>Q</kbd><kbd>E</kbd> rotate · wheel zoom<br><b>Touch:</b> one finger pans, two fingers zoom, tap to build.<br><b>Sea:</b> destroyers and carriers deploy on water.',
    'install.button': 'Install', 'update.available': 'New version available', 'update.reload': 'Update',
    'quality.hintAuto': 'Automatic: {level} on this device.', 'quality.hintForced': 'Forced: {level}{shadows}.',
    'quality.withShadows': ', with shadows', 'quality.withoutShadows': ', without shadows',
    'sound.on': 'On', 'sound.off': 'Muted', 'labels.visible': 'Shown', 'labels.hidden': 'Hidden',
    'labels.toastOn': 'Enemy labels shown', 'labels.toastOff': 'Enemy labels hidden',
    'fullscreen.activate': 'Enable', 'fullscreen.deactivate': 'Disable',
    'tower.level': 'LEVEL {level} / 5', 'tower.damage': 'Damage per hit', 'tower.range': 'Operational range',
    'tower.rate': 'Fire rate', 'tower.priority': 'Priority', 'tower.upgrade': '↑ Upgrade · {cost}', 'tower.max': 'MAX',
    'tower.sell': 'Sell · +{cost}', 'tower.all': 'Ground & air', 'tower.air': 'Air only', 'tower.ground': 'Ground only',
    'tower.naval': 'Naval', 'tower.domainSea': 'SEA', 'tower.domainLand': 'LAND',
    'tower.title': '{name} · range {range} · key {key}',
    'tower.mode.first': 'First', 'tower.mode.last': 'Last', 'tower.mode.strong': 'Strongest', 'tower.mode.close': 'Closest',
    'toast.noPosition': 'Position unavailable for this system', 'toast.noCredits': 'Insufficient credits',
    'toast.deployed': 'System deployed', 'toast.place': 'Place: {name}', 'toast.placeSea': 'Place at sea: {name}',
    'toast.priority': 'Priority: {mode}', 'toast.upgrade': 'Upgrade complete · level {level}',
    'toast.sold': 'System sold · 60% recovered', 'toast.waveStart': 'Wave {wave}: {summary}',
    'toast.waveClear': 'Wave {wave} contained · bonus received', 'toast.reloading': '{name} reloading · {s} s',
    'toast.strikeSelect': 'Airstrike: select the impact point', 'toast.emp': 'EMP pulse · threats slowed and drones repelled',
    'toast.repair': 'Base repaired · +22% integrity', 'toast.strikeActive': 'Airstrike in progress',
    'toast.army': '{name} deployed · two-lane road and fleet available', 'toast.armyNew': '{name} deployed · new match started', 'toast.restart': 'Match restarted', 'toast.language': 'Language: {language}',
    'toast.camera': 'Camera centered', 'toast.recordsCleared': 'Records cleared', 'toast.quality': 'Graphics quality: {level}',
    'toast.qualityReduced': 'Graphics quality reduced to keep frame rate smooth', 'toast.qualityMinimum': 'Graphics quality set to minimum',
    'toast.fullscreenUnavailable': 'Fullscreen is not available in this browser', 'toast.fullscreenFailed': 'Could not enable fullscreen',
    'toast.installMenu': 'Use the browser menu → Add to Home Screen', 'toast.installing': 'Installing app…',
    'toast.installed': 'App installed · ready offline', 'confirm.clearRecords': 'Clear the records saved on this device?',
    'threat.none': 'No contact', 'threat.low': 'Low', 'threat.medium': 'Medium', 'threat.high': 'High', 'threat.severe': 'Severe', 'threat.critical': 'Critical',
    'intel.inProgress': 'in progress', 'intel.planned': 'planned', 'intel.head': 'Wave {wave} <em>{state}</em>',
    'intel.scaling': 'Enemy HP ×{hp} · damage ×{dmg}', 'intel.noThreats': 'No confirmed threats',
    'intel.routes': 'Land road', 'intel.routesDetail': 'Single · two lanes', 'intel.airRoute': 'Air corridor',
    'intel.support': 'Command support', 'intel.supportHtml': '<kbd>Z</kbd> airstrike · <kbd>X</kbd> EMP · <kbd>C</kbd> repair',
    'intel.air': 'Air', 'intel.boss': 'Boss', 'intel.ground': 'Ground', 'intel.armor': 'armor {n}%',
    'rank.elite': 'ELITE', 'rank.veteran': 'VETERAN'
  }
};
function tr(key, vars) {
  const table = I18N[settings.language === 'en' ? 'en' : 'es'] || I18N.es;
  let text = table[key];
  if (text == null) text = I18N.es[key];
  if (text == null) return key;
  if (vars) text = text.replace(/\{(\w+)\}/g, (match, name) => (vars[name] != null ? vars[name] : match));
  return text;
}
function loc(obj, field = 'name') {
  if (!obj) return '';
  if (settings.language === 'en') {
    const key = field + 'En';
    if (obj[key]) return obj[key];
  }
  return obj[field] || '';
}
const WEAPONS_EN = { israel: { aa: 'Iron Dome' }, france: { ew: 'Jammer' } };

const coarsePointer = matchMedia('(pointer: coarse)').matches;
const QUALITY_PRESETS = {
  high: { pixel: 2, shadows: true, shadow: 2048, particles: 1.15, label: 'Alta' },
  medium: { pixel: 1.5, shadows: true, shadow: 1024, particles: .8, label: 'Media' },
  low: { pixel: 1, shadows: false, shadow: 512, particles: .45, label: 'Baja' }
};
if (!QUALITY_PRESETS[settings.quality] && settings.quality !== 'auto') settings.quality = 'auto';
if (!Number.isFinite(settings.volume)) settings.volume = .65;
let qualityLevel = settings.quality === 'auto' ? (coarsePointer ? 'medium' : 'high') : settings.quality;
function quality() { return QUALITY_PRESETS[qualityLevel] || QUALITY_PRESETS.medium; }

const state = {
  army: ARMIES[0], cash: 660, hp: 100, wave: 0, active: false, speed: 1,
  spawnQueue: [], spawnTimer: 0, spawned: 0, enemies: [], towers: [], effects: [],
  selectedTower: null, buildType: null, abilityMode: null, gameOver: false,
  selectedArmy: Number.isInteger(settings.army) && ARMIES[settings.army] ? settings.army : 0,
  clock: 0, score: 0, paused: false, deployed: false, base: null,
  waveIntel: [], abilities: {
    strike: { cd: 0, max: 22, cost: 120, name: 'Ataque aéreo', key: 'Z', icon: '✈' },
    emp: { cd: 0, max: 26, cost: 90, name: 'Pulso EMP', key: 'X', icon: '⌁' },
    repair: { cd: 0, max: 34, cost: 80, name: 'Reparar base', key: 'C', icon: '✚' }
  }
};

/* --------------------------------------------------------------- renderer */
const canvas = document.getElementById('view');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality().pixel));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = quality().shadows;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8292a0);
scene.fog = new THREE.Fog(0x8292a0, 42, 96);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 160);
const target = new THREE.Vector3(0, 0, 1);
let yaw = 0;
const DEFAULT_DISTANCE = 26;
let distance = DEFAULT_DISTANCE;
let targetDistance = DEFAULT_DISTANCE;
const minDistance = 12, maxDistance = 54;
const inclination = 55 * Math.PI / 180;

const hemi = new THREE.HemisphereLight(0xdfe9ee, 0x35402f, .58);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffe6bd, 1.35);
sun.position.set(-16, 26, 12);
sun.castShadow = quality().shadows;
sun.shadow.mapSize.set(quality().shadow, quality().shadow);
sun.shadow.camera.left = -24; sun.shadow.camera.right = 24;
sun.shadow.camera.top = 22; sun.shadow.camera.bottom = -22;
sun.shadow.bias = -.00025; sun.shadow.radius = 4;
scene.add(sun);
const rimLight = new THREE.DirectionalLight(0x9fc6e6, .35);
rimLight.position.set(18, 12, -16);
scene.add(rimLight);

/* ---------------------------------------------------------------- helpers */
const geoCache = new Map();
const matCache = new Map();
const camoMaterials = new Map();

function mat(color, rough = .82, metal = 0) {
  const key = `${color}:${rough}:${metal}`;
  if (matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });
  matCache.set(key, m);
  return m;
}

function camoMaterial(color) {
  const base = new THREE.Color(color), key = base.getHexString();
  if (camoMaterials.has(key)) return camoMaterials.get(key);
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const shades = [
    base.clone().multiplyScalar(.48), base.clone().multiplyScalar(.7),
    base.clone().lerp(new THREE.Color(0xc0ad7b), .5), base.clone().lerp(new THREE.Color(0x202820), .72)
  ];
  const css = x => `#${x.getHexString()}`;
  g.fillStyle = css(shades[0]); g.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 22; i++) {
    g.beginPath();
    g.ellipse(Math.random() * 128, Math.random() * 128, 8 + Math.random() * 24, 5 + Math.random() * 16, Math.random() * Math.PI, 0, Math.PI * 2);
    g.fillStyle = css(shades[1 + Math.random() * 3 | 0]); g.fill();
  }
  for (let i = 0; i < 2000; i++) {
    const v = Math.random(), shade = v > .73 ? shades[2] : v < .2 ? shades[3] : shades[0];
    g.fillStyle = css(shade); g.globalAlpha = .13 + Math.random() * .34;
    g.fillRect(Math.random() * 128, Math.random() * 128, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  for (let i = 0; i < 26; i++) {
    g.strokeStyle = css(i % 2 ? shades[1] : shades[3]); g.globalAlpha = .26; g.lineWidth = 1;
    g.beginPath(); const x = Math.random() * 128, y = Math.random() * 128;
    g.moveTo(x, y); g.lineTo(x + 2 + Math.random() * 8, y - 1 - Math.random() * 3); g.stroke();
  }
  g.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1.5, 1.5);
  tex.encoding = THREE.sRGBEncoding;
  tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  const m = new THREE.MeshStandardMaterial({ map: tex, color: 0xffffff, roughness: .91, metalness: .03 });
  camoMaterials.set(key, m);
  return m;
}

function cacheGeo(key, build) {
  if (!geoCache.has(key)) geoCache.set(key, build());
  return geoCache.get(key);
}
function cylGeo(rt, rb, h, seg = 16) {
  return cacheGeo(`c:${rt}:${rb}:${h}:${seg}`, () => new THREE.CylinderGeometry(rt, rb, h, seg));
}
function sphGeo(r, seg = 16) {
  return cacheGeo(`s:${r}:${seg}`, () => new THREE.SphereGeometry(r, seg, Math.max(8, seg - 4)));
}
function boxGeo(w, h, d) {
  return cacheGeo(`b:${w}:${h}:${d}`, () => new THREE.BoxGeometry(w, h, d));
}
function coneGeo(r, h, seg = 12) {
  return cacheGeo(`co:${r}:${h}:${seg}`, () => new THREE.ConeGeometry(r, h, seg));
}
/* Caja con aristas suavizadas: rompe el aspecto de bloque tipo Lego. */
function rboxGeo(w, h, d, r = .035) {
  return cacheGeo(`r:${w}:${h}:${d}:${r}`, () => {
    const s = new THREE.Shape(), hw = w / 2 - r, hd = d / 2 - r;
    s.moveTo(-hw, -d / 2);
    s.lineTo(hw, -d / 2);
    s.quadraticCurveTo(w / 2, -d / 2, w / 2, -hd);
    s.lineTo(w / 2, hd);
    s.quadraticCurveTo(w / 2, d / 2, hw, d / 2);
    s.lineTo(-hw, d / 2);
    s.quadraticCurveTo(-w / 2, d / 2, -w / 2, hd);
    s.lineTo(-w / 2, -hd);
    s.quadraticCurveTo(-w / 2, -d / 2, -hw, -d / 2);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: h, bevelEnabled: true, bevelSegments: 2, steps: 1,
      bevelSize: Math.min(r * .45, .02), bevelThickness: Math.min(r * .45, .02), curveSegments: 4
    });
    geo.rotateX(-Math.PI / 2);
    geo.center();
    geo.computeVertexNormals();
    return geo;
  });
}

const world = new THREE.Group();
scene.add(world);
const gridCells = new Set();
const towerCells = new Map();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const tmpObj = new THREE.Object3D();
const tmpVec = new THREE.Vector3();
let groundHit = null;
let ghost = null;
let hoverCell = null;
let lastSelected = null;
let cameraShake = 0;
let frame = 0;
let lowFpsTime = 0;

function cellKey(x, z) { return `${x},${z}`; }
function worldCell(x, z) { return { x: Math.floor(x + MAP.w / 2), z: Math.floor(z + MAP.h / 2) }; }
function cellCenter(cx, cz) { return { x: cx - MAP.w / 2 + .5, z: cz - MAP.h / 2 + .5 }; }
function insideCell(cx, cz) { return cx >= 0 && cz >= 0 && cx < MAP.w && cz < MAP.h; }
function isWaterCell(cx, cz) { return cz < SEA_ROWS; }
function isWaterAt(x, z) { return z < SEA_LIMIT; }

function routeLength(route) {
  if (route.length === undefined) {
    let total = 0;
    for (let i = 1; i < route.points.length; i++) total += Math.hypot(route.points[i][0] - route.points[i - 1][0], route.points[i][1] - route.points[i - 1][1]);
    route.length = total;
  }
  return route.length;
}
routeLength(AIR_ROUTE);
ROUTES.forEach(routeLength);

function nearestPath(x, z) {
  let best = 1e9;
  for (const route of ROUTES) {
    const p = route.points;
    for (let i = 0; i < p.length - 1; i++) {
      const [ax, az] = p[i], [bx, bz] = p[i + 1];
      const dx = bx - ax, dz = bz - az, len2 = dx * dx + dz * dz;
      let t = len2 ? ((x - ax) * dx + (z - az) * dz) / len2 : 0;
      t = Math.max(0, Math.min(1, t));
      const px = ax + dx * t, pz = az + dz * t;
      const d = (x - px) ** 2 + (z - pz) ** 2;
      if (d < best) best = d;
    }
  }
  return Math.sqrt(best) < 1.02;
}

function forEachRouteCell(route, visit) {
  const p = route.points;
  for (let i = 0; i < p.length - 1; i++) {
    const [x1, z1] = p[i], [x2, z2] = p[i + 1];
    const length = Math.hypot(x2 - x1, z2 - z1);
    const steps = Math.max(1, Math.ceil(length * 4));
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      visit(worldCell(x1 + (x2 - x1) * t, z1 + (z2 - z1) * t));
    }
  }
}

function buildPathCells() {
  gridCells.clear();
  for (const route of ROUTES) forEachRouteCell(route, c => gridCells.add(cellKey(c.x, c.z)));
}

/* Decoración retirable: si se construye encima, el objeto desaparece para que
   nunca atraviese una estructura. */
const decorCells = new Map();
function registerDecor(object, x, z, radius = .55) {
  const a = worldCell(x - radius, z - radius), b = worldCell(x + radius, z + radius);
  for (let cz = Math.max(0, a.z); cz <= Math.min(MAP.h - 1, b.z); cz++) {
    for (let cx = Math.max(0, a.x); cx <= Math.min(MAP.w - 1, b.x); cx++) {
      const key = cellKey(cx, cz);
      let set = decorCells.get(key);
      if (!set) { set = new Set(); decorCells.set(key, set); }
      set.add(object);
    }
  }
}
function clearDecorAt(cx, cz) {
  const set = decorCells.get(cellKey(cx, cz));
  if (!set) return;
  for (const object of [...set]) {
    if (object.parent) object.parent.remove(object);
    for (const other of decorCells.values()) other.delete(object);
  }
  decorCells.delete(cellKey(cx, cz));
}

/* ----------------------------------------------------------- texturas */
function makeNoiseTexture(base, light, dark, blades = false) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 22; i++) {
    const x = Math.random() * 128, y = Math.random() * 128, r = 8 + Math.random() * 20;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, Math.random() < .5 ? light : dark);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    g.globalAlpha = .05 + Math.random() * .11; g.fillStyle = grad;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  for (let i = 0; i < 1700; i++) {
    g.globalAlpha = .04 + Math.random() * .15; g.fillStyle = Math.random() < .5 ? light : dark;
    g.fillRect(Math.random() * 128, Math.random() * 128, .8 + Math.random() * 1.4, .8 + Math.random() * 1.4);
  }
  if (blades) {
    g.lineCap = 'round';
    for (let i = 0; i < 170; i++) {
      g.globalAlpha = .1 + Math.random() * .24; g.strokeStyle = dark; g.lineWidth = .6;
      g.beginPath(); const x = Math.random() * 128, y = Math.random() * 128;
      g.moveTo(x, y); g.lineTo(x + (Math.random() - .5) * 4, y - 2 - Math.random() * 5); g.stroke();
    }
  }
  g.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(c);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  return texture;
}

const flagCache = new Map();
function flagTexture(id) {
  if (flagCache.has(id)) return flagCache.get(id);
  const c = document.createElement('canvas'); c.width = 96; c.height = 64;
  const g = c.getContext('2d');
  const drawStar = (cx, cy, r, points = 5, color = '#fff') => {
    g.save(); g.translate(cx, cy); g.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const rr = i % 2 ? r * .42 : r, a = -Math.PI / 2 + i * Math.PI / points;
      const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.closePath(); g.fillStyle = color; g.fill(); g.restore();
  };
  if (id === 'usa') {
    g.fillStyle = '#fff'; g.fillRect(0, 0, 96, 64);
    for (let i = 0; i < 7; i++) { g.fillStyle = '#b22234'; g.fillRect(0, i * 9.2, 96, 4.6); }
    g.fillStyle = '#3c3b6e'; g.fillRect(0, 0, 42, 32); drawStar(21, 16, 9, 5, '#fff');
  } else if (id === 'china') {
    g.fillStyle = '#de2910'; g.fillRect(0, 0, 96, 64); drawStar(20, 18, 12, 5, '#ffde00');
  } else if (id === 'russia') {
    g.fillStyle = '#fff'; g.fillRect(0, 0, 96, 22); g.fillStyle = '#0039a6'; g.fillRect(0, 21, 96, 22); g.fillStyle = '#d52b1e'; g.fillRect(0, 42, 96, 22);
  } else if (id === 'israel') {
    g.fillStyle = '#fff'; g.fillRect(0, 0, 96, 64);
    g.strokeStyle = '#0038b8'; g.lineWidth = 4;
    g.beginPath(); g.moveTo(48, 14); g.lineTo(66, 46); g.lineTo(30, 46); g.closePath(); g.stroke();
    g.beginPath(); g.moveTo(48, 50); g.lineTo(30, 18); g.lineTo(66, 18); g.closePath(); g.stroke();
  } else if (id === 'uk') {
    g.fillStyle = '#012169'; g.fillRect(0, 0, 96, 64);
    g.strokeStyle = '#fff'; g.lineWidth = 13; g.beginPath(); g.moveTo(0, 0); g.lineTo(96, 64); g.moveTo(96, 0); g.lineTo(0, 64); g.stroke();
    g.strokeStyle = '#c8102e'; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 0); g.lineTo(96, 64); g.moveTo(96, 0); g.lineTo(0, 64); g.stroke();
    g.fillStyle = '#fff'; g.fillRect(0, 25, 96, 14); g.fillRect(40, 0, 16, 64);
    g.fillStyle = '#c8102e'; g.fillRect(0, 29, 96, 6); g.fillRect(44, 0, 8, 64);
  } else if (id === 'france') {
    g.fillStyle = '#0055a4'; g.fillRect(0, 0, 32, 64); g.fillStyle = '#fff'; g.fillRect(32, 0, 32, 64); g.fillStyle = '#ef4135'; g.fillRect(64, 0, 32, 64);
  } else if (id === 'korea') {
    g.fillStyle = '#fff'; g.fillRect(0, 0, 96, 64);
    g.fillStyle = '#cd2e3a'; g.beginPath(); g.arc(48, 32, 17, Math.PI, 0); g.fill();
    g.fillStyle = '#0047a0'; g.beginPath(); g.arc(48, 32, 17, 0, Math.PI); g.fill();
    g.fillStyle = '#111'; g.fillRect(16, 14, 10, 3); g.fillRect(16, 20, 10, 3); g.fillRect(70, 40, 10, 3); g.fillRect(70, 46, 10, 3);
  } else if (id === 'turkey') {
    g.fillStyle = '#e30a17'; g.fillRect(0, 0, 96, 64);
    g.fillStyle = '#fff'; g.beginPath(); g.arc(41, 32, 16, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#e30a17'; g.beginPath(); g.arc(47, 32, 13, 0, Math.PI * 2); g.fill();
    drawStar(65, 32, 8, 5, '#fff');
  } else {
    g.fillStyle = '#556'; g.fillRect(0, 0, 96, 64);
  }
  g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 2; g.strokeRect(1, 1, 94, 62);
  const tex = new THREE.CanvasTexture(c);
  tex.encoding = THREE.sRGBEncoding;
  tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  flagCache.set(id, tex);
  return tex;
}

function flagMaterial(army) {
  return new THREE.MeshBasicMaterial({ map: flagTexture(army.id), transparent: true, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 });
}

/* ------------------------------------------------------------- añadir malla */
function addMesh(parent, geometry, material, x, y, z, shadow = true, receive = true) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(x, y, z);
  if (shadow) m.castShadow = true;
  if (receive) m.receiveShadow = true;
  parent.add(m);
  return m;
}
function addFlag(parent, army, w, h, x, y, z, ry = 0) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), flagMaterial(army));
  mesh.position.set(x, y, z); mesh.rotation.y = ry;
  mesh.renderOrder = 2;
  parent.add(mesh);
  return mesh;
}
function addWheel(parent, x, y, z, radius, width, dark, hub) {
  const wheel = addMesh(parent, cylGeo(radius, radius, width, 20), dark, x, y, z);
  wheel.rotation.z = Math.PI / 2;
  const rim = addMesh(parent, cylGeo(radius * .48, radius * .48, width + .012, 16), hub, x, y, z);
  rim.rotation.z = Math.PI / 2;
  const cap = addMesh(parent, cylGeo(radius * .2, radius * .2, width + .02, 12), dark, x, y, z);
  cap.rotation.z = Math.PI / 2;
  return wheel;
}
function addTrack(parent, side, x, y, z, length, height, width, paint, dark, hub) {
  addMesh(parent, rboxGeo(width, height * .42, length, .03), dark, x, y, z);
  const wheelCount = Math.max(3, Math.round(length / .17));
  for (let i = 0; i < wheelCount; i++) {
    const wz = z - length * .42 + (i / (wheelCount - 1)) * length * .84;
    const w = addMesh(parent, cylGeo(height * .3, height * .3, width * .92, 18), dark, x, y - height * .04, wz);
    w.rotation.z = Math.PI / 2;
    const h = addMesh(parent, cylGeo(height * .13, height * .13, width * .94, 12), hub, x, y - height * .04, wz);
    h.rotation.z = Math.PI / 2;
  }
  addMesh(parent, rboxGeo(width * .78, height * .11, length * .98, .02), paint, x, y + height * .18, z);
  return addMesh(parent, rboxGeo(width * .55, height * .08, length * .9, .02), dark, x, y - height * .28, z);
}
/* --------------------------------------------------------------- terreno */
const waterUniforms = { uTime: { value: 0 } };
const waterGeometry = new THREE.PlaneGeometry(31.6, 5.4, 80, 18);
const waterMaterial = new THREE.ShaderMaterial({
  uniforms: waterUniforms,
  vertexShader: `
    uniform float uTime; varying float vWave; varying vec3 vWorld;
    void main(){
      vec3 p = position;
      float w = sin(p.x*.72 + uTime*1.15)*.055 + sin(p.y*1.35 - uTime*1.7)*.035 + sin(p.x*1.7 + p.y*.9 + uTime*.8)*.018;
      p.z += w; vWave = w;
      vec4 wp = modelMatrix * vec4(p,1.0);
      vWorld = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,
  fragmentShader: `
    uniform float uTime; varying float vWave; varying vec3 vWorld;
    void main(){
      vec3 deep = vec3(.025,.115,.155);
      vec3 shallow = vec3(.075,.31,.36);
      vec3 col = mix(deep, shallow, clamp(.5 + vWave*4.2,0.,1.));
      float ripple = pow(max(0., sin(vWorld.x*2.6 + uTime*2.1) * cos(vWorld.z*3.4 - uTime*1.4)), 8.)*.22;
      col += ripple;
      float foam = smoothstep(-4.95, -4.35, vWorld.z);
      col = mix(col, vec3(.62,.67,.6), foam*.55);
      float crest = smoothstep(.062,.095,vWave);
      col = mix(col, vec3(.72,.84,.82), crest*.45);
      gl_FragColor = vec4(col,1.0);
    }`,
  side: THREE.DoubleSide
});
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI / 2;
water.position.set(0, -.3, -7.0);
world.add(water);

function buildTerrain() {
  const landCells = [];
  for (let z = SEA_ROWS; z < MAP.h; z++) for (let x = 0; x < MAP.w; x++) landCells.push({ x, z });
  const geo = new THREE.BoxGeometry(1, .16, 1);
  const grassMat = new THREE.MeshStandardMaterial({ map: makeNoiseTexture('#a6ab9b', '#c6cbb8', '#878d7a', true), color: 0xffffff, roughness: .97, metalness: 0 });
  const grass = new THREE.InstancedMesh(geo, grassMat, landCells.length);
  const grassBase = new THREE.Color(0x64744e);
  let n = 0;
  for (const cell of landCells) {
    const c = cellCenter(cell.x, cell.z);
    tmpObj.position.set(c.x, -.08, c.z);
    tmpObj.rotation.set(0, 0, 0); tmpObj.scale.set(1, 1, 1); tmpObj.updateMatrix();
    grass.setMatrixAt(n, tmpObj.matrix);
    let color;
    if (cell.z === SEA_ROWS) {
      color = new THREE.Color(0xb4a37b).lerp(new THREE.Color(0xcbbd95), Math.random() * .4);
    } else {
      color = new THREE.Color([0x56693f, 0x5d7044, 0x647748, 0x51643c, 0x697c4d][Math.random() * 5 | 0]).lerp(grassBase, .45);
      if (Math.random() < .06) color.multiplyScalar(.93);
      else if (Math.random() < .2) color.multiplyScalar(1.04);
    }
    grass.setColorAt(n++, color);
  }
  grass.receiveShadow = true;
  world.add(grass);

  const sand = new THREE.InstancedMesh(new THREE.BoxGeometry(1.01, .15, 1.01), new THREE.MeshStandardMaterial({
    map: makeNoiseTexture('#c7b992', '#e1d6b5', '#a99a74'), color: 0xffffff, roughness: .99, metalness: 0
  }), MAP.w * 2);
  let sn = 0;
  for (let x = 0; x < MAP.w; x++) {
    for (const z of [SEA_ROWS - 1, SEA_ROWS]) {
      const c = cellCenter(x, z);
      tmpObj.position.set(c.x, -.1, c.z); tmpObj.updateMatrix();
      sand.setMatrixAt(sn++, tmpObj.matrix);
    }
  }
  sand.count = sn; sand.receiveShadow = true; world.add(sand);

  const allCells = new Map();
  for (const route of ROUTES) forEachRouteCell(route, c => {
    const key = cellKey(c.x, c.z);
    if (!allCells.has(key)) allCells.set(key, { cx: c.x, cz: c.z, route: route.id });
  });
  const roadMat = new THREE.MeshStandardMaterial({ map: makeNoiseTexture('#565650', '#76756d', '#3e3e3a'), color: 0xffffff, roughness: .96, metalness: .02 });
  const road = new THREE.InstancedMesh(new THREE.BoxGeometry(1.005, .17, 1.005), roadMat, allCells.size);
  const shoulder = new THREE.InstancedMesh(new THREE.BoxGeometry(1.04, .13, 1.04), mat(0x48453c, .99), allCells.size);
  let rn = 0;
  for (const item of allCells.values()) {
    const c = cellCenter(item.cx, item.cz);
    tmpObj.position.set(c.x, -.024, c.z); tmpObj.updateMatrix();
    road.setMatrixAt(rn, tmpObj.matrix);
    road.setColorAt(rn, new THREE.Color(item.route === 'main' ? 0xffffff : 0xd8d0bd));
    tmpObj.position.set(c.x, -.072, c.z); tmpObj.updateMatrix();
    shoulder.setMatrixAt(rn++, tmpObj.matrix);
  }
  road.receiveShadow = true; shoulder.receiveShadow = true;
  world.add(shoulder); world.add(road);

  // Línea central discontinua en la ruta principal.
  const dashMat = mat(0xc9c3a6, .9);
  for (const route of ROUTES) {
    const p = route.points;
    for (let i = 0; i < p.length - 1; i++) {
      const [x1, z1] = p[i], [x2, z2] = p[i + 1];
      const dx = x2 - x1, dz = z2 - z1, len = Math.hypot(dx, dz);
      if (len < 1.2) continue;
      const ang = Math.atan2(dx, dz);
      for (let d = .55; d < len - .3; d += 1.15) {
        const x = x1 + dx / len * d, z = z1 + dz / len * d;
        const dash = addMesh(world, new THREE.BoxGeometry(.045, .012, .42), dashMat, x, .072, z, false);
        dash.rotation.y = ang;
      }
    }
  }

  const rim = new THREE.Mesh(new THREE.BoxGeometry(31.6, .55, 19.6), mat(0x555c46));
  rim.position.y = -.44; rim.receiveShadow = true; world.add(rim);
  const edge = new THREE.Mesh(new THREE.BoxGeometry(30.7, .35, 18.7), mat(0x4c5844));
  edge.position.y = -.32; edge.receiveShadow = true; world.add(edge);

  // Rompeolas y espuma en la orilla.
  const foam = new THREE.Mesh(new THREE.PlaneGeometry(31.2, .38), new THREE.MeshBasicMaterial({ color: 0xd9e6dd, transparent: true, opacity: .3, depthWrite: false }));
  foam.rotation.x = -Math.PI / 2; foam.position.set(0, -.05, -4.72); world.add(foam);
  const rocks = [];
  for (let i = 0; i < 26; i++) {
    const x = -15 + i * 1.2 + Math.random() * .5, z = -4.72 + (Math.random() - .5) * .28;
    const rock = addMesh(world, new THREE.DodecahedronGeometry(.1 + Math.random() * .18, 0), mat(0x66675b), x, .02, z);
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    rock.scale.y = .55 + Math.random() * .4;
    rocks.push(rock);
  }
}
buildPathCells();
buildTerrain();

/* ----------------------------------------------------------- decoración */
function buildDecor() {
  const rng = Math.random;
  const decorScale = qualityLevel === 'low' ? .6 : 1;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(150, 110), mat(0x59674a, .99));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -.46; ground.receiveShadow = true; world.add(ground);

  const hillMats = [mat(0x48593e), mat(0x526244), mat(0x42523a)];
  for (let i = 0; i < 30; i++) {
    const angle = i / 30 * Math.PI * 2 + rng() * .24, radius = 28 + rng() * 20, height = 2.4 + rng() * 6;
    const hill = new THREE.Mesh(new THREE.ConeGeometry(4.6 + rng() * 6.5, height, 5 + (i % 2)), hillMats[i % 3]);
    hill.position.set(Math.cos(angle) * radius, -.4 + height / 2, Math.sin(angle) * radius * .72);
    hill.rotation.y = rng() * Math.PI; world.add(hill);
  }

  const tuftCount = Math.round(420 * decorScale);
  const tuft = new THREE.InstancedMesh(new THREE.ConeGeometry(.055, .32, 3), mat(0x4a5f3e), tuftCount);
  tuft.castShadow = false; tuft.receiveShadow = false;
  let tufts = 0, guard = 0;
  while (tufts < tuftCount && guard++ < tuftCount * 10) {
    const x = rng() * 29 - 14.5, z = rng() * 12.5 - 3.5;
    if (nearestPath(x, z) || Math.abs(x) > 14.6 || z < -4.2) continue;
    const c = worldCell(x, z);
    if (gridCells.has(cellKey(c.x, c.z))) continue;
    tmpObj.position.set(x, .16, z); tmpObj.rotation.set(0, rng() * Math.PI, 0);
    tmpObj.scale.set(1, .65 + rng() * .95, 1); tmpObj.updateMatrix();
    tuft.setMatrixAt(tufts++, tmpObj.matrix);
  }
  tuft.count = tufts; world.add(tuft);

  const propCount = Math.round(150 * decorScale);
  for (let i = 0; i < propCount; i++) {
    const x = rng() * 28.6 - 14.3, z = rng() * 11.8 - 3.2;
    if (nearestPath(x, z) || isWaterAt(x, z)) continue;
    const c = worldCell(x, z);
    if (gridCells.has(cellKey(c.x, c.z)) || towerCells.has(cellKey(c.x, c.z))) continue;
    if (rng() < .7) {
      const h = .7 + rng() * 1.05, tree = new THREE.Group(); tree.position.set(x, 0, z);
      addMesh(tree, cylGeo(.07, .13, h * .85, 7), mat(0x5b4a33), 0, h * .42, 0);
      for (let j = 0; j < 3; j++) addMesh(tree, new THREE.ConeGeometry(.48 - j * .1, .72, 7), matsFoliage[rng() * matsFoliage.length | 0], 0, h * .6 + j * .22, 0);
      registerDecor(tree, x, z, .55);
      world.add(tree);
    } else {
      const cluster = 1 + (rng() < .35 ? 1 : 0) + (rng() < .15 ? 1 : 0);
      for (let j = 0; j < cluster; j++) {
        const rock = addMesh(world, new THREE.DodecahedronGeometry(.16 + rng() * .24, 0), mat(0x777967), x + (rng() - .5) * .5, .12, z + (rng() - .5) * .5);
        rock.rotation.set(rng(), rng(), rng()); rock.scale.y = .7 + rng() * .5;
      }
    }
  }

  // Campamento de campaña junto a la base.
  const camp = [[10.5, 6.2], [12.0, 6.6], [8.7, 7.1]];
  for (const [x, z] of camp) {
    if (nearestPath(x, z) || isWaterAt(x, z)) continue;
    const tent = new THREE.Group(); tent.position.set(x, 0, z);
    addMesh(tent, rboxGeo(1.15, .42, .78, .05), mat(0x6b7054), 0, .28, 0);
    const roof = addMesh(tent, new THREE.CylinderGeometry(.56, .56, 1.2, 4, 1, false), mat(0x5c634a), 0, .6, 0);
    roof.rotation.z = Math.PI / 2; roof.rotation.y = Math.PI / 4; roof.scale.z = .62;
    addMesh(tent, new THREE.BoxGeometry(.3, .38, .04), mat(0x3d4438), 0, .25, .4);
    registerDecor(tent, x, z, .7);
    world.add(tent);
  }
  for (const [x, z] of [[-13, 6], [12, 7], [-12, -7], [12, -7]]) {
    if (nearestPath(x, z) || isWaterAt(x, z)) continue;
    const b = new THREE.Group(); b.position.set(x, 0, z);
    addMesh(b, rboxGeo(1.65, .95, 1.25, .05), mat(0x596052), 0, .5, 0);
    addMesh(b, new THREE.ConeGeometry(1.18, .62, 4), mat(0x4b5148), 0, 1.28, 0).rotation.y = Math.PI / 4;
    addMesh(b, new THREE.BoxGeometry(.46, .66, .05), mat(0x39423a), 0, .4, .64);
    addMesh(b, rboxGeo(.34, .34, .34, .03), mat(0x60533d), .95, .17, .55);
    addMesh(b, rboxGeo(.28, .28, .28, .03), mat(0x60533d), .95, .17, .15).rotation.y = .4;
    addMesh(b, cylGeo(.16, .16, .44, 12), mat(0x59614a), -.95, .22, .5);
    registerDecor(b, x, z, 1);
    world.add(b);
  }

  const sandbagMat = mat(0x6f6143, .97);
  const sandbagLine = (x, z, angle, count) => {
    for (let i = 0; i < count; i++) {
      const bx = x + Math.cos(angle) * i * .3, bz = z + Math.sin(angle) * i * .3;
      if (nearestPath(bx, bz) || isWaterAt(bx, bz)) continue;
      const bag = addMesh(world, rboxGeo(.3, .15, .17, .03), sandbagMat, bx, .1, bz);
      bag.rotation.y = -angle; bag.rotation.z = Math.sin(angle) * .06;
    }
  };
  for (const [x, z, a] of [[-12.9, -1.2, 0], [11.4, 2.6, Math.PI / 2], [-2.6, 6.4, 0], [5.6, -3.2, Math.PI]]) {
    sandbagLine(x, z, a, 4); sandbagLine(x + Math.sin(a) * .16, z + Math.cos(a) * .16, a, 4);
  }

  const craterMat = mat(0x504b3b, .99);
  for (let i = 0; i < 8; i++) {
    const x = rng() * 27 - 13.5, z = rng() * 11 - 2.8;
    if (nearestPath(x, z) || isWaterAt(x, z)) continue;
    const c = worldCell(x, z);
    if (gridCells.has(cellKey(c.x, c.z))) continue;
    const crater = new THREE.Mesh(new THREE.CircleGeometry(.18 + rng() * .3, 16), craterMat);
    crater.rotation.x = -Math.PI / 2; crater.position.set(x, .012, z); world.add(crater);
  }

  const trackMat = mat(0x675a43, .99);
  for (const route of ROUTES) {
    const p = route.points;
    for (let i = 0; i < p.length - 1; i++) {
      const [x1, z1] = p[i], [x2, z2] = p[i + 1];
      const dx = x2 - x1, dz = z2 - z1, len = Math.hypot(dx, dz), ang = Math.atan2(dx, dz);
      for (const side of [-.19, .19]) {
        const ox = Math.cos(ang) * side, oz = -Math.sin(ang) * side;
        const track = addMesh(world, new THREE.BoxGeometry(.065, .012, len * .9), trackMat, (x1 + x2) / 2 + ox, .074, (z1 + z2) / 2 + oz, false);
        track.rotation.y = ang; track.receiveShadow = true;
      }
    }
  }

  // Muelle y faro en la costa.
  const dock = new THREE.Group(); dock.position.set(-10.5, 0, -5.2);
  addMesh(dock, rboxGeo(2.4, .12, 1.8, .03), mat(0x6e6148), 0, -.02, -1.1);
  for (const [x, z] of [[-1, -1.8], [1, -1.8], [-1, -.2], [1, -.2]]) addMesh(dock, cylGeo(.09, .1, 1.25, 8), mat(0x514634), x, -.55, z);
  addMesh(dock, rboxGeo(.6, .55, .45, .04), mat(0x6a6c5c), 0, .3, -.4);
  addMesh(dock, cylGeo(.05, .07, .8, 8), mat(0x777f77, .5, .4), .18, .8, -.4);
  world.add(dock);
  const lighthouse = new THREE.Group(); lighthouse.position.set(14, 0, -4.15);
  addMesh(lighthouse, cylGeo(.28, .38, 1.8, 14), mat(0xd8d1bb), 0, .9, 0);
  addMesh(lighthouse, cylGeo(.34, .36, .25, 14), mat(0x9c4c3e), 0, 1.78, 0);
  addMesh(lighthouse, cylGeo(.18, .18, .3, 12), new THREE.MeshStandardMaterial({ color: 0xffdf9a, emissive: 0xffb545, emissiveIntensity: 1.2 }), 0, 1.98, 0);
  addMesh(lighthouse, coneGeo(.3, .28, 12), mat(0x9c4c3e), 0, 2.22, 0);
  world.add(lighthouse);

  // Boyas y balizas en el agua.
  for (const [x, z] of [[-6, -7.2], [2, -6.0], [10, -7.8]]) {
    const buoy = new THREE.Group(); buoy.position.set(x, -.22, z);
    addMesh(buoy, cylGeo(.12, .16, .3, 10), mat(0xc9c2a8), 0, .1, 0);
    addMesh(buoy, coneGeo(.14, .22, 10), mat(0xa64b3c), 0, .32, 0);
    world.add(buoy);
  }

  for (let i = 0; i < 18; i++) {
    const x = -13 + i * 1.5, z = 8.1;
    if (nearestPath(x, z) || isWaterAt(x, z)) continue;
    addMesh(world, new THREE.BoxGeometry(.09, .6, .09), mat(0x60533d), x, .3, z);
    if (i < 17) addMesh(world, new THREE.BoxGeometry(1.5, .08, .08), mat(0x60533d), x + .75, .4, z);
  }
}
const matsFoliage = [mat(0x29432d), mat(0x2f4c33), mat(0x355338)];
buildDecor();

/* ------------------------------------------------------------ base y bandera */
function buildBase() {
  const g = new THREE.Group();
  const paint = camoMaterial(0x5d694c), armor = mat(0x404a3b), dark = mat(0x303832);
  addMesh(g, rboxGeo(1.9, .72, 1.45, .06), armor, 0, .38, 0);
  addMesh(g, rboxGeo(1.68, .52, 1.24, .05), paint, 0, .53, 0);
  addMesh(g, rboxGeo(1.25, .3, 1.02, .04), camoMaterial(0x727b5d), 0, .94, 0);
  addMesh(g, rboxGeo(.8, .18, .72, .03), armor, 0, 1.14, 0);
  addMesh(g, cylGeo(.2, .2, .1, 16), mat(0xc0a052, .5, .35), 0, 1.22, 0);
  for (let i = 0; i < 3; i++) addMesh(g, new THREE.BoxGeometry(.12, .13, .05), mat(0x9fc0c4, .18, .05), -.32 + i * .32, 1.04, -.54);
  addMesh(g, cylGeo(.025, .04, .85, 8), mat(0x777f77, .5, .4), .62, 1.48, -.3);
  addMesh(g, new THREE.SphereGeometry(.06, 10, 8), mat(0xb34d3c), .62, 1.93, -.3);
  addMesh(g, rboxGeo(.38, .09, .09, .02), mat(0xb34d3c), -.6, 1.08, .44);
  for (const side of [-1, 1]) {
    addMesh(g, rboxGeo(.1, .5, .12, .02), mat(0xc0a052, .55, .25), side * .78, .46, 0);
    for (const z of [-.42, .42]) {
      addMesh(g, cylGeo(.19, .19, .12, 14), dark, side * .84, .18, z).rotation.z = Math.PI / 2;
      addMesh(g, cylGeo(.08, .08, .13, 10), mat(0x777f77, .5, .4), side * .84, .18, z).rotation.z = Math.PI / 2;
    }
  }
  // Radar de defensa y puesto de mando.
  const radar = new THREE.Group(); radar.position.set(-1.15, .0, -1.25);
  addMesh(radar, rboxGeo(.75, .38, .6, .04), armor, 0, .2, 0);
  addMesh(radar, cylGeo(.035, .06, .8, 8), mat(0x777f77, .5, .4), 0, .75, 0);
  addMesh(radar, new THREE.SphereGeometry(.36, 18, 10, 0, Math.PI * 2, 0, Math.PI * .52), mat(0x9aa39a, .4, .3), 0, 1.15, 0).rotation.x = Math.PI;
  world.add(radar); g.add(radar);
  // Mástil y bandera.
  addMesh(g, cylGeo(.035, .05, 1.5, 8), mat(0x777f77, .5, .4), -.95, .75, .72);
  g.userData.flag = addFlag(g, state.army, .62, .38, -.62, 1.42, .72);
  g.position.set(13.2, 0, -1.5);
  world.add(g);
  state.base = g;
  state.basePaint = [paint, armor];
}
function buildStartFlag() {
  const g = new THREE.Group();
  addMesh(g, cylGeo(.04, .05, 1.8, 8), mat(0x777f77, .5, .4), 0, .9, 0);
  addMesh(g, cylGeo(.1, .14, .14, 10), darkMat(), 0, .08, 0);
  g.userData.flag = addFlag(g, state.army, .6, .36, .3, 1.5, 0);
  addMesh(g, coneGeo(.12, .22, 4), mat(0xb34d3c), .55, 1.5, 0).rotation.z = -Math.PI / 2;
  g.position.set(-14.6, .02, -2.5);
  world.add(g);
  state.startFlag = g;
}
function darkMat() { return mat(0x2d3430); }
buildBase(); buildStartFlag();

/* ---------------------------------------------------------- selección visual */
function makeGroundGrid() {
  const geo = new THREE.BufferGeometry(); const vertices = [];
  for (let x = 0; x <= MAP.w; x++) { const wx = x - MAP.w / 2; vertices.push(wx, .014, -MAP.h / 2, wx, .014, MAP.h / 2); }
  for (let z = 0; z <= MAP.h; z++) { const wz = z - MAP.h / 2; vertices.push(-MAP.w / 2, .014, wz, MAP.w / 2, .014, wz); }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const lines = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0xe4dfc8, transparent: true, opacity: .22 }));
  lines.visible = false; world.add(lines); return lines;
}
const gridLines = makeGroundGrid();
function makeRangeRing(color = 0x84b65f) {
  const g = new THREE.RingGeometry(.96, 1, 72);
  const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .2, side: THREE.DoubleSide, depthWrite: false });
  const ring = new THREE.Mesh(g, m); ring.rotation.x = -Math.PI / 2; ring.position.y = .12; ring.visible = false;
  world.add(ring); return ring;
}
const placementRing = makeRangeRing();
const cursorMat = new THREE.MeshBasicMaterial({ color: 0xe9e5d4, transparent: true, opacity: .28, side: THREE.DoubleSide, depthWrite: false });
const cursorCell = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), cursorMat);
cursorCell.rotation.x = -Math.PI / 2; cursorCell.position.y = .025; cursorCell.visible = false; world.add(cursorCell);
const targetPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const hitPoint = new THREE.Vector3();

function updateCamera() {
  const d = distance, horizontal = d * Math.cos(inclination), vertical = d * Math.sin(inclination);
  camera.position.set(target.x + Math.sin(yaw) * horizontal, target.y + vertical, target.z + Math.cos(yaw) * horizontal);
  camera.lookAt(target);
}
updateCamera();
function pointerGround(clientX, clientY) {
  pointer.x = clientX / window.innerWidth * 2 - 1;
  pointer.y = -(clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  return raycaster.ray.intersectPlane(targetPlane, hitPoint) ? hitPoint.clone() : null;
}
function updatePointer(clientX, clientY) {
  const p = pointerGround(clientX, clientY);
  groundHit = p;
  if (!p) return;
  const c = worldCell(p.x, p.z);
  if (!insideCell(c.x, c.z)) return;
  const center = cellCenter(c.x, c.z);
  hoverCell = { cellX: c.x, cellZ: c.z, ...center };
  cursorCell.position.set(center.x, .025, center.z); cursorCell.visible = true; gridLines.visible = true;
  if (state.abilityMode === 'strike') {
    cursorCell.scale.set(1, 1, 1);
    cursorMat.color.set(0xdf6653);
    placementRing.position.set(center.x, .1, center.z);
    placementRing.material.color.set(0xdf6551);
    placementRing.visible = true; placementRing.scale.setScalar(2.5);
    return;
  }
  if (state.buildType) {
    ensureGhost();
    const def = TOWERS.find(t => t.id === state.buildType);
    const fp = def ? footprintOf(def) : { w: 1, d: 1 };
    cursorCell.scale.set(fp.w, 1, fp.d);
    ghost.position.set(center.x, def && def.domain === 'sea' ? -.22 : .08, center.z); ghost.visible = true;
    const ok = validPlacement(c.x, c.z);
    cursorMat.color.set(ok ? 0x8fcb6d : 0xdf6653);
    placementRing.position.set(center.x, .1, center.z);
    placementRing.material.color.set(ok ? 0x7fcf6a : 0xdf6551);
    placementRing.visible = true;
    placementRing.scale.setScalar(def ? def.range : 1);
  } else { cursorCell.scale.set(1, 1, 1); if (ghost) ghost.visible = false; }
}

/* ------------------------------------------------------- modelos de torre */
const TOWER_MATS = {
  concrete: () => mat(0x7b7c6c, .98),
  sandbag: () => mat(0x8a7a58, .97),
  dark: () => mat(0x2d3430, .9),
  metal: () => mat(0x7b837d, .42, .62),
  steel: () => mat(0x8b938d, .38, .7),
  rubber: () => mat(0x1b201c, .97),
  glass: () => mat(0x9fc0c4, .12, .05),
  gold: () => mat(0xc0a052, .45, .45),
  warn: () => mat(0xb34d3c, .72, .1),
  white: () => mat(0xdad7c7, .7, .05)
};
const glowMaterial = () => new THREE.MeshStandardMaterial({ color: 0x8ce8ff, emissive: 0x1b9cc2, emissiveIntensity: 1.9, roughness: .2, metalness: .2 });
const jetGlow = () => new THREE.MeshBasicMaterial({ color: 0xffb15c, transparent: true, opacity: .9 });

function landPad(root, army) {
  const concrete = TOWER_MATS.concrete(), sandbag = TOWER_MATS.sandbag();
  addMesh(root, cylGeo(.48, .52, .08, 26), concrete, 0, .04, 0);
  const bags = qualityLevel === 'low' ? 6 : 11;
  for (let i = 0; i < bags; i++) {
    const a = i / bags * Math.PI * 2;
    const bag = addMesh(root, rboxGeo(.16, .09, .1, .03), sandbag, Math.cos(a) * .44, .1, Math.sin(a) * .44);
    bag.rotation.y = -a; bag.rotation.z = Math.sin(a) * .07;
  }
  addMesh(root, rboxGeo(.16, .13, .21, .03), mat(0x5b5b45), -.38, .12, .33);
  addMesh(root, rboxGeo(.12, .1, .15, .03), mat(0x6d6248), -.5, .16, .18);
  addFlag(root, army, .22, .14, 0, .13, .5);
}

function gunTower(root, army, kit) {
  const paint = camoMaterial(army.color), armor = mat(0x3f4a3b), metal = TOWER_MATS.metal(), dark = TOWER_MATS.dark(), gold = TOWER_MATS.gold();
  const pivot = new THREE.Group(); pivot.position.y = .36; root.add(pivot);
  addMesh(pivot, cylGeo(.27, .32, .12, 20), armor, 0, .02, 0);
  const barrels = [];
  let spinner = null;
  if (kit.gun === 'ciws') {
    const white = TOWER_MATS.white();
    addMesh(pivot, rboxGeo(.58, .22, .56, .06), white, 0, .14, 0);
    addMesh(pivot, cylGeo(.19, .21, .34, 20), white, 0, .28, -.08).rotation.x = Math.PI / 2;
    const cluster = new THREE.Group(); cluster.position.set(0, .28, -.3); pivot.add(cluster);
    for (let i = 0; i < 11; i++) {
      const a = i / 11 * Math.PI * 2;
      const b = addMesh(cluster, cylGeo(.012, .014, .5, 8), dark, Math.cos(a) * .055, Math.sin(a) * .055, -.2);
      b.rotation.x = Math.PI / 2; barrels.push(b);
    }
    addMesh(pivot, sphGeo(.17, 18), white, 0, .46, .12);
    addMesh(pivot, rboxGeo(.18, .12, .18, .03), dark, 0, .56, -.02);
    addMesh(pivot, cylGeo(.025, .025, .24, 8), metal, 0, .69, -.02);
    addMesh(pivot, torusGeo(.11, .018, 6, 18), gold, 0, .28, -.55).rotation.x = Math.PI / 2;
  } else if (kit.gun === 'rotary') {
    addMesh(pivot, rboxGeo(.6, .22, .52, .05), paint, 0, .14, 0);
    addMesh(pivot, rboxGeo(.5, .09, .4, .03), armor, 0, .29, .02);
    addMesh(pivot, cylGeo(.18, .2, .2, 18), armor, 0, .34, .04);
    const b = addMesh(pivot, cylGeo(.032, .048, .9, 16), metal, 0, .37, -.57); b.rotation.x = Math.PI / 2; barrels.push(b);
    addMesh(pivot, cylGeo(.052, .052, .14, 12), dark, 0, .37, -1.03).rotation.x = Math.PI / 2;
    const rev = addMesh(pivot, cylGeo(.085, .085, .18, 14), metal, 0, .37, -.16); rev.rotation.x = Math.PI / 2;
    for (const side of [-1, 1]) {
      addMesh(pivot, rboxGeo(.14, .18, .28, .03), paint, side * .34, .14, .08);
      addMesh(pivot, rboxGeo(.06, .06, .04, .01), gold, side * .34, .14, .23);
    }
    addMesh(pivot, rboxGeo(.48, .22, .06, .03), paint, 0, .2, -.28).rotation.x = -.18;
    addMesh(pivot, sphGeo(.07, 12), TOWER_MATS.glass(), 0, .44, .1);
  } else if (kit.gun === 'mg') {
    addMesh(pivot, rboxGeo(.56, .2, .54, .05), paint, 0, .12, 0);
    addMesh(pivot, cylGeo(.3, .34, .1, 20), armor, 0, .02, 0);
    addMesh(pivot, cylGeo(.045, .06, .34, 10), metal, 0, .26, -.05);
    addMesh(pivot, rboxGeo(.54, .34, .045, .02), paint, 0, .28, -.24).rotation.x = -.15;
    const b = addMesh(pivot, cylGeo(.022, .028, .8, 12), metal, .08, .3, -.58); b.rotation.x = Math.PI / 2; barrels.push(b);
    addMesh(pivot, cylGeo(.045, .045, .12, 10), dark, .08, .3, -.97).rotation.x = Math.PI / 2;
    addMesh(pivot, rboxGeo(.14, .16, .26, .03), mat(0x4d563e), -.22, .2, -.02);
    addMesh(pivot, rboxGeo(.18, .05, .1, .02), gold, .24, .2, .04);
    addMesh(pivot, sphGeo(.055, 10), TOWER_MATS.glass(), 0, .48, .1);
  } else {
    addMesh(pivot, rboxGeo(.62, .22, .54, .05), paint, 0, .14, 0);
    addMesh(pivot, rboxGeo(.54, .08, .44, .03), armor, 0, .3, .03);
    const cluster = new THREE.Group(); cluster.position.set(0, .33, -.16); pivot.add(cluster); spinner = cluster;
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      const b = addMesh(cluster, cylGeo(.018, .022, .72, 10), metal, Math.cos(a) * .055, Math.sin(a) * .055, -.3);
      b.rotation.x = Math.PI / 2; barrels.push(b);
    }
    addMesh(cluster, cylGeo(.1, .11, .18, 16), armor, 0, 0, -.02).rotation.x = Math.PI / 2;
    addMesh(cluster, torusGeo(.07, .014, 6, 16), gold, 0, 0, -.68).rotation.x = Math.PI / 2;
    const drum = addMesh(pivot, cylGeo(.11, .11, .2, 16), armor, .33, .17, .07); drum.rotation.z = Math.PI / 2;
    addMesh(pivot, sphGeo(.05, 10), gold, .36, .18, .2);
    addMesh(pivot, sphGeo(.065, 12), TOWER_MATS.glass(), 0, .44, .1);
    addMesh(pivot, rboxGeo(.08, .3, .06, .02), paint, -.32, .17, -.06);
  }
  root.userData.pivot = pivot; root.userData.barrels = barrels; root.userData.spinner = spinner;
  root.userData.muzzleY = .85;
}

function mortarTower(root, army) {
  const paint = camoMaterial(army.color), armor = mat(0x3f4a3b), metal = TOWER_MATS.metal(), dark = TOWER_MATS.dark();
  addMesh(root, cylGeo(.36, .4, .06, 22), mat(0x5d5f50, .97), 0, .05, 0);
  const pivot = new THREE.Group(); pivot.position.y = .25; root.add(pivot);
  addMesh(pivot, cylGeo(.26, .3, .1, 18), paint, 0, .04, 0);
  const elev = new THREE.Group(); elev.position.set(0, .12, 0); elev.rotation.x = -.48; pivot.add(elev);
  addMesh(elev, cylGeo(.055, .075, .78, 14), metal, 0, .36, 0);
  addMesh(elev, cylGeo(.082, .082, .13, 12), dark, 0, .76, 0);
  addMesh(elev, rboxGeo(.16, .05, .18, .02), armor, 0, .18, .06);
  addMesh(elev, cylGeo(.025, .025, .2, 8), dark, -.08, .35, .02).rotation.z = .25;
  for (const side of [-1, 1]) {
    const leg = addMesh(pivot, cylGeo(.018, .024, .5, 8), metal, side * .2, .18, .18);
    leg.rotation.z = side * .55; leg.rotation.x = -.35;
  }
  for (let i = 0; i < 3; i++) {
    const shell = addMesh(root, cylGeo(.04, .04, .22, 10), mat(0x8e7b4e), .44 + i * .08, .14, -.3 + i * .1);
    shell.rotation.z = .4;
    addMesh(root, coneGeo(.04, .08, 10), TOWER_MATS.gold(), .44 + i * .08, .26, -.3 + i * .1).rotation.x = Math.PI;
  }
  addMesh(root, cylGeo(.02, .03, .55, 8), metal, -.42, .3, .3);
  addMesh(root, sphGeo(.05, 10), TOWER_MATS.glass(), -.42, .6, .3);
  root.userData.pivot = pivot; root.userData.elev = elev; root.userData.muzzleY = .82;
}

function truckChassis(root, paint, armor, dark, hub, length = .95, wheelZ = [-.34, .02, .38]) {
  addMesh(root, rboxGeo(.5, .16, length, .04), paint, 0, .25, 0);
  addMesh(root, rboxGeo(.54, .08, length * .95, .03), armor, 0, .17, 0);
  for (const side of [-1, 1]) for (const z of wheelZ) addWheel(root, side * .28, .14, z, .12, .08, dark, hub);
  return { dark, armor };
}

function artTower(root, army, kit) {
  const paint = camoMaterial(army.color), armor = mat(0x3f4a3b), metal = TOWER_MATS.metal(), dark = TOWER_MATS.dark(), hub = mat(0x8b938d, .4, .6);
  const tracked = kit.art === 'tracked';
  if (tracked) {
    addMesh(root, rboxGeo(.54, .2, .84, .04), paint, 0, .28, 0);
    addTrack(root, -1, -.32, .18, 0, .78, .3, .13, paint, dark, hub);
    addTrack(root, 1, .32, .18, 0, .78, .3, .13, paint, dark, hub);
    addMesh(root, rboxGeo(.5, .1, .62, .03), armor, 0, .4, .02);
  } else {
    truckChassis(root, paint, armor, dark, hub, 1.02, [-.4, -.1, .3, .44]);
    addMesh(root, rboxGeo(.46, .34, .34, .04), paint, 0, .49, -.34);
    addMesh(root, rboxGeo(.36, .2, .02, .01), TOWER_MATS.glass(), 0, .52, -.52);
    addMesh(root, rboxGeo(.42, .12, .3, .03), armor, 0, .31, .27);
    addMesh(root, rboxGeo(.3, .04, .2, .02), mat(0x4a4e3d), 0, .24, .31);
  }
  const turret = new THREE.Group(); turret.position.y = tracked ? .56 : .58; root.add(turret);
  addMesh(turret, rboxGeo(.5, .24, .46, .05), paint, 0, .02, tracked ? .02 : .2);
  addMesh(turret, rboxGeo(.42, .09, .34, .03), armor, 0, .18, tracked ? .04 : .2);
  addMesh(turret, rboxGeo(.23, .2, .2, .04), armor, 0, .02, tracked ? -.26 : -.04);
  const elev = new THREE.Group(); elev.position.set(0, .06, tracked ? -.28 : -.06); turret.add(elev);
  addMesh(elev, cylGeo(.034, .045, 1.0, 16), metal, 0, 0, -.48).rotation.x = Math.PI / 2;
  addMesh(elev, cylGeo(.05, .05, .12, 12), dark, 0, 0, -1.02).rotation.x = Math.PI / 2;
  addMesh(elev, rboxGeo(.16, .06, .18, .02), armor, 0, .03, -.42);
  addMesh(turret, sphGeo(.07, 12), TOWER_MATS.glass(), .2, .2, tracked ? -.04 : .16);
  addMesh(turret, cylGeo(.02, .03, .5, 8), metal, -.22, .38, tracked ? .12 : .28);
  addMesh(turret, rboxGeo(.16, .1, .12, .02), TOWER_MATS.warn(), -.22, .18, tracked ? .2 : .44);
  if (!tracked) {
    for (const side of [-1, 1]) {
      addMesh(root, rboxGeo(.05, .05, .5, .01), metal, side * .35, .12, .28).rotation.x = .2;
    }
  }
  for (let i = 0; i < 4; i++) addMesh(turret, rboxGeo(.07, .05, .12, .01), mat(0x4a513d), -.2 + i * .13, .2, tracked ? .2 : .4);
  root.userData.pivot = turret; root.userData.elev = elev; root.userData.muzzleY = tracked ? 1.05 : 1.0;
}

function rocketTower(root, army, kit) {
  const paint = camoMaterial(army.color), armor = mat(0x3f4a3b), dark = TOWER_MATS.dark(), hub = mat(0x8b938d, .4, .6), metal = TOWER_MATS.metal();
  const tracked = kit.rocket === 'tracked';
  if (tracked) {
    addMesh(root, rboxGeo(.55, .18, .88, .04), paint, 0, .27, 0);
    addTrack(root, -1, -.32, .18, 0, .82, .3, .13, paint, dark, hub);
    addTrack(root, 1, .32, .18, 0, .82, .3, .13, paint, dark, hub);
    addMesh(root, rboxGeo(.46, .2, .4, .04), paint, 0, .46, -.32);
    addMesh(root, rboxGeo(.3, .14, .02, .01), TOWER_MATS.glass(), 0, .5, -.53);
  } else {
    truckChassis(root, paint, armor, dark, hub, 1.06, [-.4, -.1, .3, .46]);
    addMesh(root, rboxGeo(.46, .36, .34, .04), paint, 0, .5, -.36);
    addMesh(root, rboxGeo(.34, .2, .02, .01), TOWER_MATS.glass(), 0, .53, -.55);
    addMesh(root, rboxGeo(.5, .06, .3, .02), armor, 0, .37, .2);
  }
  const frame = new THREE.Group(); frame.position.set(0, tracked ? .56 : .3, tracked ? .16 : .3); frame.rotation.x = .18; root.add(frame);
  addMesh(frame, rboxGeo(.54, .08, .5, .02), armor, 0, -.02, 0);
  addMesh(frame, rboxGeo(.54, .28, .56, .04), paint, 0, .16, 0);
  const cols = 3, rows = 2;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = (c - (cols - 1) / 2) * .15, y = .1 + r * .13;
    addMesh(frame, cylGeo(.045, .045, .55, 12), dark, x, y, -.31).rotation.x = Math.PI / 2;
    addMesh(frame, cylGeo(.052, .052, .06, 12), metal, x, y, -.59).rotation.x = Math.PI / 2;
  }
  addMesh(frame, rboxGeo(.56, .05, .4, .02), armor, 0, .29, -.04);
  if (tracked) addMesh(root, rboxGeo(.1, .18, .12, .02), TOWER_MATS.warn(), .34, .52, .3);
  root.userData.pivot = frame; root.userData.elev = frame; root.userData.muzzleY = tracked ? 1.1 : .95;
  root.userData.salvo = 4;
}

function aaTower(root, army, kit) {
  const paint = camoMaterial(army.color), armor = mat(0x3f4a3b), dark = TOWER_MATS.dark(), hub = mat(0x8b938d, .4, .6), metal = TOWER_MATS.metal(), gold = TOWER_MATS.gold();
  const style = kit.aa;
  if (style === 'tube') {
    truckChassis(root, paint, armor, dark, hub, 1.12, [-.42, -.1, .34, .48]);
    addMesh(root, rboxGeo(.46, .36, .34, .04), paint, 0, .5, -.38);
    addMesh(root, rboxGeo(.34, .2, .02, .01), TOWER_MATS.glass(), 0, .53, -.57);
    addMesh(root, rboxGeo(.58, .14, .66, .03), armor, 0, .36, .18);
    const rack = new THREE.Group(); rack.position.set(0, .5, .16); rack.rotation.x = .62; root.add(rack);
    for (let c = 0; c < 4; c++) {
      const x = (c - 1.5) * .13;
      addMesh(rack, cylGeo(.07, .08, 1.0, 16), paint, x, 0, -.28);
      addMesh(rack, cylGeo(.082, .082, .1, 16), dark, x, 0, -.8);
      addMesh(rack, coneGeo(.07, .18, 12), gold, x, 0, -1.0).rotation.x = -Math.PI / 2;
    }
    addMesh(rack, rboxGeo(.6, .08, .3, .02), armor, 0, -.04, .1);
    root.userData.pivot = rack; root.userData.elev = rack;
    addMesh(root, cylGeo(.05, .07, .55, 8), metal, -.4, .62, .18);
    addMesh(root, sphGeo(.12, 12), armor, -.4, .9, .18);
    root.userData.muzzleY = 1.25;
  } else if (style === 'box' || style === 'canister') {
    if (style === 'box') {
      addMesh(root, rboxGeo(.56, .2, .82, .04), paint, 0, .28, 0);
      addTrack(root, -1, -.33, .18, 0, .78, .3, .13, paint, dark, hub);
      addTrack(root, 1, .33, .18, 0, .78, .3, .13, paint, dark, hub);
      addMesh(root, rboxGeo(.44, .2, .36, .04), paint, 0, .48, -.24);
      addMesh(root, rboxGeo(.3, .12, .02, .01), TOWER_MATS.glass(), 0, .52, -.43);
    } else {
      truckChassis(root, paint, armor, dark, hub, 1.0, [-.36, -.02, .34]);
      addMesh(root, rboxGeo(.44, .3, .32, .04), paint, 0, .46, -.35);
      addMesh(root, rboxGeo(.32, .17, .02, .01), TOWER_MATS.glass(), 0, .49, -.52);
      addMesh(root, rboxGeo(.56, .12, .52, .03), armor, 0, .33, .22);
    }
    const rack = new THREE.Group(); rack.position.y = style === 'box' ? .58 : .46; rack.rotation.x = .55; root.add(rack);
    addMesh(rack, rboxGeo(.56, .22, .58, .05), paint, 0, .06, 0);
    addMesh(rack, rboxGeo(.58, .05, .5, .02), armor, 0, .18, 0);
    for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) {
      addMesh(rack, cylGeo(.062, .062, .5, 14), dark, (c - .5) * .16, .07 + r * .1, -.3).rotation.x = Math.PI / 2;
      addMesh(rack, cylGeo(.07, .07, .06, 14), gold, (c - .5) * .16, .07 + r * .1, -.57).rotation.x = Math.PI / 2;
    }
    root.userData.pivot = rack; root.userData.elev = rack;
    addMesh(root, cylGeo(.035, .05, .45, 8), metal, .42, .66, .12);
    addMesh(root, sphGeo(.1, 12), armor, .42, .9, .12);
    root.userData.muzzleY = 1.15;
  } else {
    truckChassis(root, paint, armor, dark, hub, .96, [-.34, 0, .34]);
    addMesh(root, rboxGeo(.46, .3, .32, .04), paint, 0, .46, -.34);
    addMesh(root, rboxGeo(.34, .18, .02, .01), TOWER_MATS.glass(), 0, .49, -.5);
    const rack = new THREE.Group(); rack.position.set(0, .4, .1); rack.rotation.x = .5; root.add(rack);
    addMesh(rack, rboxGeo(.6, .08, .44, .02), armor, 0, 0, 0);
    for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) {
      const x = (c - 2.5) * .09, y = .04 + r * .1;
      addMesh(rack, cylGeo(.025, .025, .34, 8), metal, x, y, -.24).rotation.x = Math.PI / 2;
      addMesh(rack, coneGeo(.025, .06, 8), gold, x, y, -.44).rotation.x = -Math.PI / 2;
    }
    addMesh(root, cylGeo(.02, .035, .5, 8), metal, -.38, .68, .2);
    addMesh(root, sphGeo(.07, 10), TOWER_MATS.glass(), -.38, .94, .2);
    root.userData.pivot = rack; root.userData.elev = rack; root.userData.muzzleY = 1.0;
  }
}

function laserTower(root, army, kit) {
  const paint = camoMaterial(army.color), armor = mat(0x3f4a3b), dark = TOWER_MATS.dark(), hub = mat(0x8b938d, .4, .6), metal = TOWER_MATS.metal(), glow = glowMaterial();
  if (kit.laser === 'turret') {
    addMesh(root, rboxGeo(.58, .16, .62, .04), paint, 0, .28, 0);
    for (const side of [-1, 1]) for (const z of [-.22, .22]) addWheel(root, side * .3, .16, z, .11, .08, dark, hub);
    addMesh(root, cylGeo(.3, .34, .16, 20), armor, 0, .38, 0);
    const turret = new THREE.Group(); turret.position.y = .5; root.add(turret);
    addMesh(turret, rboxGeo(.46, .26, .5, .05), paint, 0, .06, 0);
    addMesh(turret, rboxGeo(.3, .08, .34, .02), armor, 0, .23, .02);
    const emitter = addMesh(turret, cylGeo(.15, .2, .44, 20), armor, 0, .14, -.34); emitter.rotation.x = Math.PI / 2;
    addMesh(turret, cylGeo(.11, .13, .16, 18), glow, 0, .14, -.58).rotation.x = Math.PI / 2;
    addMesh(turret, torusGeo(.14, .025, 6, 18), TOWER_MATS.gold(), 0, .14, -.66).rotation.x = Math.PI / 2;
    for (const side of [-1, 1]) addMesh(turret, rboxGeo(.06, .12, .16, .01), metal, side * .32, .14, .08);
    root.userData.pivot = turret; root.userData.emitter = emitter; root.userData.muzzleY = 1.1;
  } else {
    truckChassis(root, paint, armor, dark, hub, 1.04, [-.4, -.08, .34, .46]);
    addMesh(root, rboxGeo(.48, .36, .34, .04), paint, 0, .5, -.37);
    addMesh(root, rboxGeo(.35, .2, .02, .01), TOWER_MATS.glass(), 0, .53, -.55);
    addMesh(root, rboxGeo(.52, .32, .52, .04), paint, 0, .45, .18);
    addMesh(root, rboxGeo(.54, .04, .54, .02), armor, 0, .62, .18);
    for (let i = 0; i < 6; i++) addMesh(root, rboxGeo(.03, .22, .44, .01), metal, -.24 + i * .095, .69, .18);
    const turret = new THREE.Group(); turret.position.set(0, .72, -.24); root.add(turret);
    addMesh(turret, cylGeo(.22, .26, .12, 20), armor, 0, .02, 0);
    const emitter = addMesh(turret, cylGeo(.12, .18, .42, 20), glow, 0, .16, -.2); emitter.rotation.x = Math.PI / 2;
    addMesh(turret, torusGeo(.17, .025, 6, 18), TOWER_MATS.gold(), 0, .16, -.42).rotation.x = Math.PI / 2;
    addMesh(turret, rboxGeo(.5, .18, .34, .03), paint, 0, -.02, .16);
    root.userData.pivot = turret; root.userData.emitter = emitter; root.userData.muzzleY = 1.0;
  }
}

function ewTower(root, army, kit) {
  const paint = camoMaterial(army.color), armor = mat(0x3f4a3b), dark = TOWER_MATS.dark(), hub = mat(0x8b938d, .4, .6), metal = TOWER_MATS.metal(), gold = TOWER_MATS.gold();
  truckChassis(root, paint, armor, dark, hub, 1.02, [-.38, -.04, .34]);
  addMesh(root, rboxGeo(.46, .34, .34, .04), paint, 0, .49, -.36);
  addMesh(root, rboxGeo(.34, .19, .02, .01), TOWER_MATS.glass(), 0, .52, -.54);
  addMesh(root, rboxGeo(.5, .26, .46, .04), paint, 0, .42, .2);
  if (kit.ew === 'dish') {
    const stem = addMesh(root, cylGeo(.05, .08, .42, 10), metal, 0, .68, .18);
    const dish = new THREE.Group(); dish.position.set(0, .92, .18); root.add(dish);
    addMesh(dish, new THREE.SphereGeometry(.42, 20, 12, 0, Math.PI * 2, 0, Math.PI * .5), metal, 0, 0, 0).rotation.x = Math.PI;
    addMesh(dish, torusGeo(.36, .025, 6, 20), gold, 0, .01, 0).rotation.x = Math.PI / 2;
    addMesh(dish, cylGeo(.03, .03, .36, 8), metal, 0, 0, -.26).rotation.x = Math.PI / 2;
    addMesh(dish, sphGeo(.06, 10), TOWER_MATS.warn(), 0, 0, -.44);
    for (let i = 0; i < 3; i++) {
      const a = i / 3 * Math.PI * 2, arm = addMesh(dish, cylGeo(.018, .018, .34, 6), armor, Math.cos(a) * .17, 0, Math.sin(a) * .17);
      arm.rotation.z = Math.PI / 2; arm.rotation.y = a;
    }
    root.userData.pivot = dish; root.userData.dish = dish;
  } else {
    addMesh(root, rboxGeo(.48, .4, .04, .02), armor, 0, .65, .35);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) addMesh(root, rboxGeo(.07, .07, .02, .01), metal, (c - 1.5) * .1, .56 + r * .09, .38);
    for (let i = 0; i < 3; i++) addMesh(root, cylGeo(.018, .025, .9 + i * .18, 6), metal, -.24 + i * .12, .95 + i * .06, .2);
    addMesh(root, rboxGeo(.3, .18, .18, .02), armor, .24, .58, .2);
    const piv = new THREE.Group(); piv.position.set(0, .75, .18); root.add(piv);
    addMesh(piv, rboxGeo(.42, .3, .04, .02), dark, 0, 0, .1);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) addMesh(piv, rboxGeo(.055, .055, .02, .01), TOWER_MATS.gold(), (c - 2) * .075, (r - 1) * .075, .13);
    root.userData.pivot = piv;
  }
  root.userData.muzzleY = 1.0;
}

function torusGeo(r, tube, radial = 8, tubular = 20) {
  return cacheGeo(`t:${r}:${tube}:${radial}:${tubular}`, () => new THREE.TorusGeometry(r, tube, radial, tubular));
}

function shipHull(root, len, beam, depth, paint, dark, steel) {
  const s = new THREE.Shape();
  s.moveTo(-beam * .34, len * .5);
  s.lineTo(beam * .34, len * .5);
  s.lineTo(beam * .5, len * .1);
  s.lineTo(beam * .5, -len * .18);
  s.quadraticCurveTo(beam * .48, -len * .38, 0, -len * .5);
  s.quadraticCurveTo(-beam * .48, -len * .38, -beam * .5, -len * .18);
  s.lineTo(-beam * .5, len * .1);
  s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSize: .018, bevelThickness: .018, bevelSegments: 1, curveSegments: 10 });
  geo.rotateX(-Math.PI / 2); geo.center();
  const hull = addMesh(root, geo, paint, 0, depth * .5 - .045, 0);
  addMesh(root, rboxGeo(beam * .94, .045, len * .86, .02), mat(0x5d625d, .9), 0, depth - .035, .02);
  addMesh(root, rboxGeo(beam * .98, .06, len * .18, .02), dark, 0, depth * .2, len * .4);
  // Línea de flotación y detalles del casco.
  addMesh(root, rboxGeo(beam * 1.005, .03, len * .76, .01), steel, 0, .04, .02);
  addMesh(root, cylGeo(.035, .045, .12, 8), dark, 0, depth + .02, -len * .44);
  for (let i = 0; i < 5; i++) {
    const z = -len * .1 + i * len * .13;
    addMesh(root, rboxGeo(.018, .018, .11, .005), steel, beam * .42, depth + .035, z);
    addMesh(root, rboxGeo(.018, .018, .11, .005), steel, -beam * .42, depth + .035, z);
  }
  return hull;
}

function destroyerModel(root, army, kit) {
  const paint = camoMaterial(army.color), dark = TOWER_MATS.dark(), steel = TOWER_MATS.steel(), metal = TOWER_MATS.metal(), glass = TOWER_MATS.glass(), gold = TOWER_MATS.gold();
  const style = kit.destroyer;
  const smaller = style === 'saar6' || style === 'saar5' || style === 'barbaros';
  const len = smaller ? 1.78 : 2.12, beam = smaller ? .48 : .56, depth = .22;
  shipHull(root, len, beam, depth, paint, dark, steel);
  const deck = depth - .012;
  const h = deck;
  // Castillete y puente.
  addMesh(root, rboxGeo(beam * .72, .24, len * .3, .04), paint, 0, h + .12, .05);
  addMesh(root, rboxGeo(beam * .56, .16, len * .16, .03), paint, 0, h + .3, -.02);
  addMesh(root, rboxGeo(beam * .5, .045, .03, .01), glass, 0, h + .34, -.1);
  addMesh(root, rboxGeo(beam * .46, .05, len * .16, .02), dark, 0, h + .38, .06);
  // Mástil y sensores.
  addMesh(root, cylGeo(.025, .04, .5, 8), metal, 0, h + .6, .08);
  if (style === 'type455' || style === 'type055' || style === 'fujian') {
    addMesh(root, rboxGeo(.3, .18, .12, .03), paint, 0, h + .6, .08);
    for (const side of [-1, 1]) addMesh(root, rboxGeo(.04, .12, .09, .01), dark, side * .15, h + .65, .08);
  } else if (style === 'slava') {
    addMesh(root, rboxGeo(.38, .22, .1, .02), paint, 0, h + .55, .08);
    addMesh(root, new THREE.SphereGeometry(.22, 16, 10), metal, 0, h + .82, .08);
  } else if (style === 'fremm' || style === 'barbaros' || style === 'saar6') {
    addMesh(root, new THREE.SphereGeometry(.17, 16, 10), metal, 0, h + .78, .08);
    addMesh(root, cylGeo(.08, .1, .16, 12), paint, 0, h + .92, .08);
  } else {
    for (const side of [-1, 1]) addMesh(root, rboxGeo(.14, .14, .05, .02), paint, side * .15, h + .64, .08);
    addMesh(root, cylGeo(.04, .05, .24, 8), metal, 0, h + .9, .08);
  }
  // Radares Aegis / paneles.
  if (style === 'burke' || style === 'sejong' || style === 'type055') {
    for (const side of [-1, 1]) {
      addMesh(root, rboxGeo(.045, .13, .16, .01), dark, side * (beam * .28), h + .34, .02).rotation.y = side * .2;
    }
  }
  // VLS o lanzadores laterales.
  if (style === 'slava' || style === 'kuznetsov') {
    for (const side of [-1, 1]) for (let i = 0; i < 3; i++) {
      const tube = addMesh(root, cylGeo(.055, .055, .5, 12), paint, side * beam * .3, h + .16, -.35 + i * .13);
      tube.rotation.x = Math.PI / 2; tube.rotation.z = side * .18;
      addMesh(root, cylGeo(.062, .062, .06, 12), gold, side * beam * .3, h + .16, -.61 + i * .13).rotation.x = Math.PI / 2;
    }
  } else {
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
      addMesh(root, cylGeo(.033, .033, .02, 10), dark, (c - 1.5) * .075, h + .01, -.48 + r * .09);
    }
    addMesh(root, rboxGeo(beam * .58, .03, .2, .01), paint, 0, h + .005, -.44);
  }
  // Cañón principal.
  const gun = new THREE.Group(); gun.position.set(0, h + .03, -len * .34); root.add(gun);
  addMesh(gun, cylGeo(.12, .14, .12, 16), paint, 0, .06, 0);
  addMesh(gun, rboxGeo(.2, .1, .24, .03), paint, 0, .14, -.02);
  addMesh(gun, cylGeo(.025, .032, .42, 12), metal, 0, .14, -.26).rotation.x = Math.PI / 2;
  addMesh(gun, cylGeo(.04, .04, .05, 10), dark, 0, .14, -.48).rotation.x = Math.PI / 2;
  addMesh(gun, sphGeo(.045, 10), glass, 0, .21, .02);
  // CIWS trasero.
  const ciws = new THREE.Group(); ciws.position.set(0, h + .02, len * .34); root.add(ciws);
  addMesh(ciws, cylGeo(.08, .1, .1, 14), TOWER_MATS.white(), 0, .05, 0);
  addMesh(ciws, sphGeo(.075, 12), TOWER_MATS.white(), 0, .14, 0);
  addMesh(ciws, cylGeo(.015, .02, .28, 8), metal, 0, .14, -.2).rotation.x = Math.PI / 2;
  // Helipuerto y botes.
  addMesh(root, new THREE.CircleGeometry(.24, 24), mat(0x4f554d), 0, h + .005, len * .38).rotation.x = -Math.PI / 2;
  for (const side of [-1, 1]) {
    addMesh(root, rboxGeo(.07, .05, .2, .02), mat(0x2b302c), side * beam * .38, h + .02, .15);
    addMesh(root, cylGeo(.025, .035, .28, 8), metal, side * beam * .31, h + .2, .22);
  }
  addFlag(root, army, .26, .17, 0, h + .35, len * .46);
  root.userData.muzzleY = h + .55;
  root.userData.pivot = gun;
  root.userData.navyLength = len;
}

function carrierModel(root, army, kit) {
  const paint = camoMaterial(army.color), dark = TOWER_MATS.dark(), steel = TOWER_MATS.steel(), metal = TOWER_MATS.metal(), glass = TOWER_MATS.glass(), white = TOWER_MATS.white(), gold = TOWER_MATS.gold();
  const style = kit.carrier;
  const lhd = style === 'dokdo' || style === 'anadolu';
  const corvette = style === 'saar5';
  const len = corvette ? 1.82 : lhd ? 2.3 : 2.68;
  const beam = corvette ? .48 : lhd ? .64 : .74;
  const depth = .24;
  if (corvette) { destroyerModel(root, army, { destroyer: 'saar6' }); root.userData.carrierRole = 'corvette'; return; }
  shipHull(root, len, beam, depth, paint, dark, steel);
  const h = depth - .01;
  // Cubierta de vuelo.
  addMesh(root, rboxGeo(beam * 1.02, .07, len * .96, .02), mat(0x5b605c), 0, h + .04, 0);
  addMesh(root, rboxGeo(.025, .012, len * .8, .005), white, -.16, h + .08, 0);
  addMesh(root, rboxGeo(.025, .012, len * .8, .005), white, .16, h + .08, 0);
  for (let i = 0; i < 7; i++) addMesh(root, rboxGeo(.24, .01, .045, .005), white, 0, h + .08, -len * .34 + i * len * .1);
  // Pista oblicua.
  const angled = addMesh(root, rboxGeo(.26, .045, len * .66, .01), mat(0x555a56), -beam * .22, h + .09, .13);
  angled.rotation.y = -.16;
  // Isla.
  const island = new THREE.Group(); island.position.set(beam * .27, h + .12, .12); root.add(island);
  addMesh(island, rboxGeo(.25, .28, .64, .05), paint, 0, .08, 0);
  addMesh(island, rboxGeo(.21, .16, .24, .03), paint, 0, .3, -.06);
  addMesh(island, rboxGeo(.18, .04, .2, .01), glass, 0, .33, -.14);
  addMesh(island, cylGeo(.024, .04, .55, 8), metal, 0, .55, .12);
  addMesh(island, rboxGeo(.18, .12, .08, .02), dark, 0, .6, .12);
  addMesh(island, cylGeo(.03, .04, .3, 8), metal, 0, .68, .24);
  addFlag(island, army, .26, .17, -.02, .2, .34);
  // Proa: ski jump o catapulta.
  if (style === 'kuznetsov' || style === 'queen') {
    const ramp = addMesh(root, rboxGeo(beam * .68, .06, .5, .02), mat(0x575c58), 0, h + .1, -len * .4);
    ramp.rotation.x = -.16;
    addMesh(root, rboxGeo(beam * .6, .03, .2, .01), white, 0, h + .16, -len * .46).rotation.x = -.16;
  } else {
    for (const side of [-1, 1]) addMesh(root, rboxGeo(.035, .02, .7, .005), white, side * .12, h + .09, -len * .25);
  }
  // Aeronaves embarcadas.
  const jetPositions = lhd ? [] : [[-.18, .52, .9], [.16, .42, .22]];
  for (const [x, z, s] of jetPositions) {
    const jet = new THREE.Group(); jet.position.set(x, h + .12, z); jet.scale.setScalar(s); jet.rotation.y = -.2; root.add(jet);
    addMesh(jet, cylGeo(.045, .075, .34, 10), mat(0x7e8787, .4, .35), 0, .05, 0).rotation.x = Math.PI / 2;
    addMesh(jet, coneGeo(.04, .16, 8), mat(0x7e8787, .4, .35), 0, .05, -.24).rotation.x = -Math.PI / 2;
    addMesh(jet, rboxGeo(.4, .02, .12, .01), mat(0x7e8787, .4, .35), 0, .05, .02);
    addMesh(jet, rboxGeo(.13, .02, .08, .01), mat(0x7e8787, .4, .35), 0, .08, .16);
    addMesh(jet, sphGeo(.035, 8), glass, 0, .09, -.04);
  }
  if (lhd) {
    for (let i = 0; i < 2; i++) {
      const heli = new THREE.Group(); heli.position.set(.12, h + .13, .4 + i * .5); heli.scale.setScalar(.55); root.add(heli);
      addMesh(heli, cylGeo(.04, .055, .26, 10), mat(0x5c685c), 0, .05, 0).rotation.x = Math.PI / 2;
      addMesh(heli, rboxGeo(.36, .015, .03, .005), dark, 0, .15, 0);
      addMesh(heli, rboxGeo(.03, .015, .36, .005), dark, 0, .15, 0);
    }
  }
  // Defensa puntual.
  const gun = new THREE.Group(); gun.position.set(-beam * .12, h + .12, -len * .3); root.add(gun);
  addMesh(gun, cylGeo(.07, .09, .09, 12), paint, 0, .04, 0);
  addMesh(gun, rboxGeo(.14, .08, .16, .02), paint, 0, .1, 0);
  addMesh(gun, cylGeo(.02, .025, .3, 8), metal, 0, .1, -.2).rotation.x = Math.PI / 2;
  addMesh(root, rboxGeo(.05, .05, .2, .01), dark, -beam * .32, h + .04, .5);
  root.userData.muzzleY = h + .6;
  root.userData.pivot = gun;
  root.userData.navyLength = len;
  root.userData.carrierRole = 'carrier';
}

function addUpgradeDetails(root, type, army, level) {
  if (level <= 1) return;
  const gold = TOWER_MATS.gold(), steel = TOWER_MATS.steel(), dark = TOWER_MATS.dark();
  const paint = camoMaterial(army.color), warn = TOWER_MATS.warn();
  const navy = type === 'destroyer' || type === 'carrier';
  if (navy) {
    const len = root.userData.navyLength || 2.2;
    const deckY = .26;
    // Nivel 2: cajas de misiles y aros de salvamento.
    addMesh(root, rboxGeo(.24, .13, .3, .03), steel, .19, deckY, -len * .16);
    for (let i = 0; i < 2; i++) addMesh(root, cylGeo(.025, .025, .26, 6), dark, .13 + i * .11, deckY + .1, -len * .16).rotation.x = Math.PI / 2;
    if (level >= 3) {
      // Nivel 3: mástil secundario con radar.
      addMesh(root, cylGeo(.02, .03, .5, 8), steel, -.16, deckY + .3, len * .2);
      addMesh(root, rboxGeo(.3, .04, .1, .01), steel, -.16, deckY + .55, len * .2);
      addMesh(root, sphGeo(.035, 8), warn, -.16, deckY + .58, len * .2);
    }
    if (level >= 4) {
      // Nivel 4: CIWS adicional y blindaje de cubierta.
      addMesh(root, cylGeo(.06, .07, .08, 10), paint, .18, deckY + .04, len * .3);
      addMesh(root, sphGeo(.06, 10), steel, .18, deckY + .11, len * .3);
      addMesh(root, cylGeo(.012, .016, .2, 6), dark, .18, deckY + .11, len * .3 - .14).rotation.x = Math.PI / 2;
      addMesh(root, rboxGeo(.12, .035, len * .34, .01), steel, -.2, deckY + .03, -.1);
    }
    if (level >= 5) {
      // Nivel 5: distintivo dorado y núcleo de mando.
      addMesh(root, torusGeo(.26, .015, 6, 20), gold, 0, deckY + .03, 0).rotation.x = Math.PI / 2;
      addMesh(root, sphGeo(.06, 10), glowMaterial(), 0, deckY + .09, 0);
    }
    return;
  }
  // Nivel 2: placas de refuerzo, munición y sacos adicionales.
  for (let i = 0; i < 4; i++) {
    const a = i / 4 * Math.PI * 2 + Math.PI / 4;
    const plate = addMesh(root, rboxGeo(.2, .05, .13, .015), steel, Math.cos(a) * .47, .14, Math.sin(a) * .47);
    plate.rotation.y = -a;
  }
  addMesh(root, rboxGeo(.17, .11, .13, .02), dark, -.34, .15, .28);
  if (level >= 3) {
    // Nivel 3: mástil de sensores con radar y baliza.
    addMesh(root, cylGeo(.022, .03, .44, 8), steel, .4, .33, -.33);
    addMesh(root, rboxGeo(.26, .035, .09, .01), steel, .4, .55, -.33);
    addMesh(root, sphGeo(.03, 8), warn, .4, .6, -.33);
  }
  if (level >= 4) {
    // Nivel 4: blindaje lateral, cajas de carga y antena.
    for (const side of [-1, 1]) addMesh(root, rboxGeo(.09, .17, .32, .02), paint, side * .4, .21, .18);
    addMesh(root, rboxGeo(.22, .11, .15, .02), gold, .32, .17, .21);
    addMesh(root, cylGeo(.012, .018, .34, 6), steel, -.4, .4, -.2);
  }
  if (level >= 5) {
    // Nivel 5: anillo dorado, estandarte y núcleo de energía.
    addMesh(root, torusGeo(.45, .017, 6, 24), gold, 0, .1, 0).rotation.x = Math.PI / 2;
    addMesh(root, sphGeo(.07, 12), glowMaterial(), 0, .34, -.04);
    addMesh(root, rboxGeo(.018, .34, .12, .01), gold, -.48, .28, .1);
  }
}

function buildTowerModel(type, army, level = 1, preview = false) {
  const root = new THREE.Group();
  const kit = army.kit || {};
  if (type === 'destroyer') {
    destroyerModel(root, army, kit);
  } else if (type === 'carrier') {
    carrierModel(root, army, kit);
  } else {
    landPad(root, army);
    if (type === 'gun') gunTower(root, army, kit);
    else if (type === 'mortar') mortarTower(root, army);
    else if (type === 'art') artTower(root, army, kit);
    else if (type === 'rocket') rocketTower(root, army, kit);
    else if (type === 'aa') aaTower(root, army, kit);
    else if (type === 'laser') laserTower(root, army, kit);
    else if (type === 'ew') ewTower(root, army, kit);
  }
  addUpgradeDetails(root, type, army, level);
  if (level > 1) {
    const marks = Math.min(4, level - 1);
    for (let i = 0; i < marks; i++) {
      const m = addMesh(root, rboxGeo(.11, .028, .04, .01), TOWER_MATS.gold(), -.22 + i * .145, .135, .47);
      m.rotation.y = .08;
    }
  }
  const domain = TOWERS.find(t => t.id === type).domain;
  if (domain === 'land') {
    // Ajusta el ancho real del modelo (incluidos cañones y detalles de mejora)
    // para que nunca invada la celda vecina; la altura sí puede crecer.
    const size = new THREE.Box3().setFromObject(root).getSize(new THREE.Vector3());
    const span = Math.max(size.x, size.z);
    const fit = span > .96 ? .96 / span : 1;
    root.scale.set(fit, 1.06 + (level - 1) * .018, fit);
  }
  root.userData = { ...root.userData, type, level, domain };
  if (preview) {
    root.traverse(o => {
      if (o.isMesh) {
        o.material = o.material.clone();
        o.material.transparent = true; o.material.opacity = .52; o.material.depthWrite = false;
        o.castShadow = false;
      }
    });
  }
  return root;
}

/* ------------------------------------------------------ modelos enemigos */
const ALTITUDE = { heli: 2.8, drone: 3.4, fighter: 4.5, bomber: 5.2 };
const labelCache = new Map();
function enemyLabelAccent(type) { return type === 'boss' ? '#e8c468' : type === 'bomber' ? '#e0a06a' : '#d8c78a'; }
function labelSprite(text, accent = '#d8c78a') {
  const key = text + accent;
  if (labelCache.has(key)) return labelCache.get(key).clone();
  const c = document.createElement('canvas'); c.width = 320; c.height = 72;
  const g = c.getContext('2d');
  g.fillStyle = 'rgba(13,18,14,.78)';
  g.beginPath(); g.roundRect(2, 4, 316, 62, 10); g.fill();
  g.strokeStyle = 'rgba(220,215,190,.5)'; g.lineWidth = 2; g.stroke();
  g.fillStyle = accent; g.fillRect(10, 16, 5, 40);
  g.fillStyle = '#f1ead7'; g.font = '700 27px Verdana, sans-serif'; g.textBaseline = 'middle';
  g.fillText(text, 24, 37);
  const tex = new THREE.CanvasTexture(c); tex.encoding = THREE.sRGBEncoding;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
  sprite.scale.set(1.18, .27, 1); sprite.renderOrder = 5;
  labelCache.set(key, sprite);
  return sprite;
}
function addMissilePylon(parent, x, y, z, color, dark) {
  const m = new THREE.Group(); m.position.set(x, y, z); parent.add(m);
  addMesh(m, cylGeo(.032, .04, .34, 8), mat(0x9a9f92, .5, .3), 0, 0, 0).rotation.x = Math.PI / 2;
  addMesh(m, coneGeo(.032, .1, 8), color, 0, 0, -.21).rotation.x = -Math.PI / 2;
  addMesh(m, rboxGeo(.11, .012, .08, .005), dark, 0, 0, .12);
  return m;
}
function addRotor(parent, y, radius, blades, dark, glass) {
  const rotor = new THREE.Group(); rotor.position.y = y; parent.add(rotor);
  addMesh(rotor, cylGeo(.06, .09, .06, 12), dark, 0, 0, 0);
  for (let i = 0; i < blades; i++) {
    const a = i / blades * Math.PI * 2;
    const blade = addMesh(rotor, rboxGeo(radius, .012, .055, .01), dark, Math.cos(a) * radius * .48, 0, Math.sin(a) * radius * .48);
    blade.rotation.y = -a;
  }
  const disc = addMesh(rotor, new THREE.CircleGeometry(radius * .95, 24), glass, 0, -.005, 0);
  disc.rotation.x = -Math.PI / 2; disc.material = new THREE.MeshBasicMaterial({ color: 0x222722, transparent: true, opacity: .13, side: THREE.DoubleSide, depthWrite: false });
  return rotor;
}
function addSoldier(parent, x, z, phase, paint, dark, skin) {
  const unit = new THREE.Group(); unit.position.set(x, 0, z); parent.add(unit);
  const legs = [];
  addMesh(unit, rboxGeo(.13, .17, .09, .02), paint, 0, .37, 0);
  addMesh(unit, rboxGeo(.14, .13, .1, .02), mat(0x4e5540), 0, .37, .01);
  addMesh(unit, sphGeo(.045, 10), skin, 0, .51, 0);
  addMesh(unit, new THREE.SphereGeometry(.052, 12, 8, 0, Math.PI * 2, 0, Math.PI * .62), mat(0x4b543c), 0, .525, 0);
  addMesh(unit, rboxGeo(.1, .14, .07, .02), mat(0x4a513c), 0, .4, .065);
  for (const side of [-1, 1]) {
    const hip = new THREE.Group(); hip.position.set(side * .045, .29, 0); unit.add(hip);
    addMesh(hip, cylGeo(.026, .034, .15, 8), paint, 0, -.075, 0);
    addMesh(hip, rboxGeo(.06, .04, .11, .01), dark, 0, -.15, .02);
    legs.push(hip);
    const shoulder = new THREE.Group(); shoulder.position.set(side * .08, .43, 0); unit.add(shoulder);
    addMesh(shoulder, cylGeo(.02, .028, .14, 8), paint, 0, -.06, 0);
    shoulder.rotation.z = side * .18; shoulder.userData.side = side; legs.push(shoulder);
  }
  const rifle = new THREE.Group(); rifle.position.set(.08, .37, -.08); unit.add(rifle);
  addMesh(rifle, rboxGeo(.035, .04, .22, .01), dark, 0, 0, 0);
  addMesh(rifle, cylGeo(.008, .01, .2, 6), mat(0x2a2f2a), 0, 0, -.2).rotation.x = Math.PI / 2;
  addMesh(rifle, rboxGeo(.025, .05, .06, .005), dark, 0, -.03, .02);
  unit.userData.phase = phase;
  return unit;
}

function enemyModel(type) {
  const d = ENEMIES[type];
  const g = new THREE.Group();
  const paint = camoMaterial(d.color);
  const dark = mat(0x2d3430), armor = mat(0x424b3f), steel = mat(0x7b837d, .45, .55), metal = steel;
  const glass = mat(0x9fc0c4, .13, .05), black = mat(0x1b201c, .9), white = mat(0xd9d4c2), gold = mat(0xc0a052, .45, .45);
  let mover = null, rotor = null, tailRotor = null, propeller = null, legs = [];
  let labelY = 1.02, scale = 1.5;

  if (type === 'infantry') {
    const units = [];
    for (let i = 0; i < 4; i++) {
      const unit = addSoldier(g, (i - 1.5) * .19, (i % 2 ? .06 : -.04), i * 1.7, paint, dark, mat(0x9a7d62));
      units.push(unit);
    }
    legs = units;
    scale = 1.55; labelY = 1.08;
  } else if (type === 'jeep') {
    addMesh(g, rboxGeo(.64, .16, .82, .05), paint, 0, .24, 0);
    addMesh(g, rboxGeo(.58, .06, .3, .02), paint, 0, .34, -.28);
    addMesh(g, rboxGeo(.5, .13, .34, .03), paint, 0, .37, .02);
    addMesh(g, rboxGeo(.44, .12, .03, .01), glass, 0, .45, -.16).rotation.x = -.16;
    addMesh(g, rboxGeo(.46, .12, .02, .01), glass, 0, .43, .2);
    addMesh(g, rboxGeo(.55, .045, .74, .01), dark, 0, .2, 0);
    for (const side of [-1, 1]) {
      addMesh(g, rboxGeo(.03, .34, .03, .01), metal, side * .3, .5, .22);
      addMesh(g, rboxGeo(.03, .34, .03, .01), metal, side * .3, .5, -.08);
      addMesh(g, rboxGeo(.03, .03, .34, .01), metal, side * .3, .67, .07);
      for (const z of [-.25, .26]) addWheel(g, side * .32, .12, z, .11, .075, black, metal);
    }
    addMesh(g, rboxGeo(.34, .04, .2, .01), dark, 0, .63, .07);
    const turret = new THREE.Group(); turret.position.set(0, .69, -.02); g.add(turret);
    addMesh(turret, cylGeo(.055, .07, .08, 10), dark, 0, 0, 0);
    addMesh(turret, rboxGeo(.07, .06, .2, .01), dark, 0, .04, -.08);
    addMesh(turret, cylGeo(.015, .02, .34, 8), metal, 0, .04, -.24).rotation.x = Math.PI / 2;
    addMesh(turret, rboxGeo(.09, .12, .1, .01), paint, 0, .04, .08);
    addMesh(g, rboxGeo(.16, .18, .06, .02), dark, 0, .28, .44);
    addMesh(g, cylGeo(.03, .04, .3, 8), metal, -.32, .58, .22);
    mover = turret; labelY = 1.12;
  } else if (type === 'apc') {
    addMesh(g, rboxGeo(.6, .22, .86, .05), paint, 0, .28, 0);
    addMesh(g, rboxGeo(.5, .12, .42, .04), paint, 0, .42, -.12).rotation.x = -.14;
    addMesh(g, rboxGeo(.54, .08, .14, .02), armor, 0, .18, -.43).rotation.x = -.4;
    addMesh(g, rboxGeo(.12, .1, .03, .01), glass, .38, .38, -.2).rotation.y = -.3;
    addMesh(g, rboxGeo(.12, .1, .03, .01), glass, -.38, .38, -.2).rotation.y = .3;
    for (const side of [-1, 1]) for (const z of [-.34, -.1, .16, .4]) addWheel(g, side * .34, .13, z, .12, .08, black, metal);
    const turret = new THREE.Group(); turret.position.set(0, .48, .0); g.add(turret);
    addMesh(turret, rboxGeo(.28, .16, .3, .04), paint, 0, 0, 0);
    addMesh(turret, rboxGeo(.18, .09, .18, .02), armor, 0, .11, .02);
    addMesh(turret, cylGeo(.025, .03, .36, 10), metal, 0, .04, -.26).rotation.x = Math.PI / 2;
    addMesh(turret, rboxGeo(.05, .05, .09, .01), gold, .1, .1, .03);
    addMesh(g, cylGeo(.02, .03, .4, 8), metal, .22, .62, .25);
    mover = turret; labelY = 1.18;
  } else if (type === 'tank') {
    addMesh(g, rboxGeo(.58, .2, .9, .04), paint, 0, .3, 0);
    addMesh(g, rboxGeo(.52, .08, .26, .03), paint, 0, .38, -.44).rotation.x = -.28;
    addTrack(g, -1, -.35, .18, 0, .86, .32, .14, paint, black, metal);
    addTrack(g, 1, .35, .18, 0, .86, .32, .14, paint, black, metal);
    const turret = new THREE.Group(); turret.position.set(0, .55, .04); g.add(turret);
    addMesh(turret, rboxGeo(.5, .22, .56, .05), paint, 0, 0, 0);
    addMesh(turret, rboxGeo(.38, .1, .4, .03), armor, 0, .13, 0);
    addMesh(turret, rboxGeo(.24, .18, .24, .04), armor, 0, .02, -.32);
    const barrel = addMesh(turret, cylGeo(.028, .036, .82, 14), metal, 0, .04, -.7); barrel.rotation.x = Math.PI / 2;
    addMesh(turret, cylGeo(.05, .05, .08, 10), dark, 0, .04, -1.1).rotation.x = Math.PI / 2;
    addMesh(turret, rboxGeo(.08, .06, .14, .01), dark, 0, .04, -1.03);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) addMesh(turret, rboxGeo(.1, .04, .12, .01), mat(0x4a513d), -.17 + i * .11, .14, -.15 + j * .16);
    for (const side of [-1, 1]) {
      addMesh(turret, cylGeo(.025, .025, .16, 8), dark, side * .22, .12, .18).rotation.z = side * .5;
      addMesh(g, rboxGeo(.16, .12, .1, .02), armor, side * .39, .37, -.05);
    }
    addMesh(turret, sphGeo(.055, 10), glass, .26, .12, .18);
    addMesh(g, cylGeo(.015, .02, .6, 6), metal, -.34, .56, .36);
    mover = turret; labelY = 1.22;
  } else if (type === 'mlrs') {
    addMesh(g, rboxGeo(.58, .16, .96, .04), paint, 0, .25, 0);
    addMesh(g, rboxGeo(.46, .3, .3, .04), paint, 0, .47, -.36);
    addMesh(g, rboxGeo(.34, .18, .02, .01), glass, 0, .5, -.52);
    for (const side of [-1, 1]) for (const z of [-.38, -.12, .28, .44]) addWheel(g, side * .31, .13, z, .12, .08, black, metal);
    const rack = new THREE.Group(); rack.position.set(0, .55, .18); rack.rotation.x = .32; g.add(rack);
    addMesh(rack, rboxGeo(.56, .3, .64, .04), paint, 0, 0, 0);
    for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) {
      addMesh(rack, cylGeo(.05, .05, .48, 10), dark, (c - 1) * .16, -.06 + r * .12, -.34).rotation.x = Math.PI / 2;
      addMesh(rack, cylGeo(.057, .057, .05, 10), gold, (c - 1) * .16, -.06 + r * .12, -.58).rotation.x = Math.PI / 2;
    }
    addMesh(rack, rboxGeo(.6, .05, .26, .02), armor, 0, .17, .08);
    addMesh(g, cylGeo(.02, .03, .45, 8), metal, -.25, .66, .34);
    mover = rack; labelY = 1.18;
  } else if (type === 'heli') {
    addMesh(g, new THREE.SphereGeometry(.26, 18, 12), paint, 0, .36, 0).scale.set(1.45, .8, 1);
    addMesh(g, new THREE.SphereGeometry(.17, 14, 10), glass, 0, .4, -.23).scale.set(1.1, .8, 1.1);
    addMesh(g, cylGeo(.07, .11, .68, 12), paint, 0, .4, .46).rotation.x = Math.PI / 2;
    addMesh(g, coneGeo(.08, .42, 10), paint, 0, .43, .8).rotation.x = -Math.PI / 2;
    addMesh(g, rboxGeo(.12, .18, .04, .01), paint, 0, .56, .74).rotation.x = -.25;
    for (const side of [-1, 1]) {
      const wing = addMesh(g, rboxGeo(.34, .035, .16, .01), paint, side * .26, .38, .02);
      addMissilePylon(g, side * .38, .33, .02, paint, dark);
      addMissilePylon(g, side * .38, .33, .12, paint, dark);
      addMesh(g, cylGeo(.022, .022, .38, 6), dark, side * .17, .12, .02).rotation.z = side * .25;
      addMesh(g, rboxGeo(.03, .02, .48, .005), metal, side * .23, .04, .04);
      addMesh(g, rboxGeo(.035, .06, .035, .005), metal, side * .26, .02, .04);
    }
    addMesh(g, cylGeo(.06, .08, .08, 12), dark, 0, .58, 0);
    rotor = addRotor(g, .62, 1.05, 4, dark, glass);
    tailRotor = addRotor(g, .43, .18, 3, dark, glass);
    tailRotor.position.set(.06, .48, .93); tailRotor.rotation.z = Math.PI / 2;
    addMesh(g, rboxGeo(.1, .1, .14, .02), armor, .2, .36, -.02);
    mover = rotor; labelY = 1.4;
  } else if (type === 'drone') {
    addMesh(g, rboxGeo(.11, .1, .62, .04), mat(0x858c8c, .4, .2), 0, .3, 0);
    addMesh(g, coneGeo(.055, .2, 8), mat(0x858c8c, .4, .2), 0, .3, -.41).rotation.x = -Math.PI / 2;
    addMesh(g, rboxGeo(.96, .025, .16, .01), mat(0x858c8c, .4, .2), 0, .31, -.02);
    addMesh(g, rboxGeo(.22, .02, .1, .01), mat(0x858c8c, .4, .2), 0, .36, .25);
    for (const side of [-1, 1]) addMesh(g, rboxGeo(.02, .18, .12, .01), mat(0x858c8c, .4, .2), side * .1, .44, .3).rotation.z = side * .3;
    addMesh(g, sphGeo(.045, 10), glass, 0, .25, -.18);
    addMesh(g, cylGeo(.02, .02, .12, 8), dark, 0, .3, .34).rotation.x = Math.PI / 2;
    propeller = new THREE.Group(); propeller.position.set(0, .3, .41); g.add(propeller);
    addMesh(propeller, rboxGeo(.3, .008, .03, .003), dark, 0, 0, 0);
    addMesh(propeller, rboxGeo(.03, .008, .3, .003), dark, 0, 0, 0);
    addMissilePylon(g, -.28, .25, -.02, paint, dark); addMissilePylon(g, .28, .25, -.02, paint, dark);
    mover = propeller; labelY = 1.05;
  } else if (type === 'fighter') {
    addMesh(g, cylGeo(.09, .16, .8, 14), steel, 0, .34, 0).rotation.x = Math.PI / 2;
    addMesh(g, coneGeo(.09, .34, 12), steel, 0, .34, -.55).rotation.x = -Math.PI / 2;
    addMesh(g, sphGeo(.08, 12), glass, 0, .41, -.2).scale.set(.85, .75, 1.5);
    addMesh(g, rboxGeo(1.2, .035, .34, .02), steel, 0, .33, .02);
    addMesh(g, rboxGeo(.42, .03, .22, .01), steel, 0, .33, .27);
    for (const side of [-1, 1]) {
      addMesh(g, rboxGeo(.2, .035, .14, .01), steel, side * .28, .35, .36).rotation.y = side * .2;
      addMesh(g, rboxGeo(.04, .18, .18, .01), steel, side * .12, .47, .3).rotation.z = side * .18;
      addMesh(g, cylGeo(.055, .07, .26, 10), dark, side * .2, .26, .12).rotation.x = Math.PI / 2;
      addMesh(g, cylGeo(.05, .05, .02, 10), jetGlow(), side * .2, .26, .25).rotation.x = Math.PI / 2;
      addMissilePylon(g, side * .5, .28, -.02, paint, dark);
    }
    addMesh(g, coneGeo(.035, .22, 8), dark, 0, .34, -.75).rotation.x = -Math.PI / 2;
    labelY = 1.16;
  } else if (type === 'bomber') {
    addMesh(g, cylGeo(.13, .2, 1.25, 14), steel, 0, .42, 0).rotation.x = Math.PI / 2;
    addMesh(g, coneGeo(.13, .4, 12), steel, 0, .42, -.78).rotation.x = -Math.PI / 2;
    addMesh(g, new THREE.SphereGeometry(.11, 12, 8), glass, 0, .5, -.55).scale.set(.9, .8, 1.5);
    addMesh(g, rboxGeo(1.9, .04, .38, .02), steel, 0, .4, .03);
    addMesh(g, rboxGeo(.42, .04, .24, .02), steel, 0, .4, .52);
    for (const side of [-1, 1]) {
      addMesh(g, rboxGeo(.5, .03, .2, .01), steel, side * .5, .4, .52).rotation.y = side * .25;
      for (const z of [-.05, .18]) {
        addMesh(g, cylGeo(.055, .07, .28, 10), dark, side * (z < 0 ? .5 : .36), .36, z).rotation.x = Math.PI / 2;
        addMesh(g, cylGeo(.05, .05, .02, 10), jetGlow(), side * (z < 0 ? .5 : .36), .36, z + .15).rotation.x = Math.PI / 2;
      }
      addMesh(g, rboxGeo(.16, .12, .3, .02), dark, side * .22, .36, -.02);
    }
    addMesh(g, rboxGeo(.06, .28, .3, .02), steel, 0, .6, .58).rotation.x = -.18;
    scale = 1.7; labelY = 1.55;
  } else if (type === 'boss') {
    addMesh(g, rboxGeo(1.35, .42, 1.7, .06), paint, 0, .42, 0);
    addMesh(g, rboxGeo(1.15, .18, .5, .04), paint, 0, .55, -.82).rotation.x = -.2;
    addTrack(g, -1, -.72, .26, 0, 1.65, .5, .22, paint, black, metal);
    addTrack(g, 1, .72, .26, 0, 1.65, .5, .22, paint, black, metal);
    const turret = new THREE.Group(); turret.position.set(0, .78, .08); g.add(turret);
    addMesh(turret, rboxGeo(.9, .32, .92, .06), paint, 0, 0, 0);
    addMesh(turret, rboxGeo(.68, .14, .7, .03), armor, 0, .2, 0);
    addMesh(turret, rboxGeo(.44, .28, .4, .05), armor, 0, .03, -.48);
    for (const side of [-1, 1]) {
      addMesh(turret, cylGeo(.055, .065, 1.1, 14), metal, side * .18, .08, -.85).rotation.x = Math.PI / 2;
      addMesh(turret, cylGeo(.08, .08, .1, 10), gold, side * .18, .08, -1.4).rotation.x = Math.PI / 2;
      addMesh(g, rboxGeo(.65, .3, .5, .04), armor, side * .45, .72, .7);
      for (let i = 0; i < 3; i++) addMesh(g, cylGeo(.09, .09, .42, 12), dark, side * .45, .72, .66 + i * .02).rotation.x = Math.PI / 2;
      addMesh(g, sphGeo(.07, 10), mat(0xb34d3c), side * .45, .92, .72);
    }
    addMesh(turret, sphGeo(.11, 12), glass, .3, .16, .22);
    addMesh(g, cylGeo(.025, .04, .9, 8), metal, -.55, .95, .5);
    addMesh(g, cylGeo(.04, .055, .8, 8), metal, .58, .9, -.1);
    mover = turret; scale = 1.15; labelY = 1.85;
  }

  const alt = ALTITUDE[type] || 0;
  const blob = new THREE.Mesh(new THREE.CircleGeometry(1, 18), new THREE.MeshBasicMaterial({ color: 0x1c2418, transparent: true, opacity: .3, depthWrite: false }));
  blob.rotation.x = -Math.PI / 2; blob.position.y = -alt + .02;
  blob.scale.setScalar(type === 'boss' ? .82 : type === 'bomber' ? .7 : type === 'tank' ? .55 : .4);
  g.add(blob);
  const hpbg = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0x171b17, transparent: true, opacity: .9, depthTest: false }));
  hpbg.scale.set(type === 'boss' ? 1.55 : .78, .085, 1); hpbg.position.y = labelY;
  g.add(hpbg);
  const hpfg = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0x9b443a, depthTest: false }));
  hpfg.scale.set(type === 'boss' ? 1.45 : .7, .052, 1); hpfg.position.set(0, labelY, .008);
  g.add(hpfg);
  const label = labelSprite(loc(d, 'name'), enemyLabelAccent(type));
  label.position.y = labelY + .22; label.visible = settings.labels !== false;
  g.add(label);
  g.scale.setScalar(scale);
  g.userData = { mover, hpfg, hpbg, label, type, legs, rotor, tailRotor, propeller, labelY };
  return g;
}

/* ------------------------------------------------------------ construcción */
function ensureGhost() {
  if (ghost && ghost.userData.type === state.buildType) return;
  if (ghost) world.remove(ghost);
  ghost = buildTowerModel(state.buildType, state.army, 1, true);
  world.add(ghost);
}
function footprintOf(def) {
  // Los cascos navales ocupan tres celdas de eslora; el resto, una sola celda.
  return def.domain === 'sea' ? { w: 1, d: 3 } : { w: 1, d: 1 };
}
function footprintCells(cx, cz, def) {
  const f = footprintOf(def), ox = Math.floor((f.w - 1) / 2), oz = Math.floor((f.d - 1) / 2);
  const cells = [];
  for (let dz = 0; dz < f.d; dz++) for (let dx = 0; dx < f.w; dx++) cells.push({ x: cx - ox + dx, z: cz - oz + dz });
  return cells;
}
function validPlacement(cx, cz) {
  if (!insideCell(cx, cz)) return false;
  const def = TOWERS.find(t => t.id === state.buildType);
  if (!def) return false;
  const cells = footprintCells(cx, cz, def);
  for (const cell of cells) {
    if (!insideCell(cell.x, cell.z)) return false;
    if (towerCells.has(cellKey(cell.x, cell.z))) return false;
    if (def.domain === 'sea') {
      if (!isWaterCell(cell.x, cell.z)) return false;
    } else {
      if (isWaterCell(cell.x, cell.z)) return false;
      if (gridCells.has(cellKey(cell.x, cell.z))) return false;
      const p = cellCenter(cell.x, cell.z);
      if (state.base && Math.hypot(p.x - state.base.position.x, p.z - state.base.position.z) < 1.3) return false;
    }
  }
  if (def.domain === 'sea') {
    const center = cellCenter(cx, cz);
    if (Math.abs(center.x) > 14.4) return false;
  }
  return true;
}
function armyMods(army, type) {
  const factor = (army.mults && army.mults[type]) || 1;
  const bias = factor - 1;
  return {
    damage: factor,
    range: 1 + bias * .5,
    rate: 1 / (1 + bias * .35)
  };
}
function makeTower(type, cx, cz) {
  const data = TOWERS.find(t => t.id === type);
  const center = cellCenter(cx, cz);
  const group = buildTowerModel(type, state.army);
  group.position.set(center.x, data.domain === 'sea' ? -.22 : 0, center.z);
  world.add(group);
  const cells = footprintCells(cx, cz, data);
  for (const cell of cells) clearDecorAt(cell.x, cell.z);
  const mods = armyMods(state.army, type);
  const tower = {
    type, data, group, pivot: group.userData.pivot, level: 1,
    cooldown: Math.random() * .2, target: null, cell: { x: cx, z: cz },
    barrels: group.userData.barrels || [], mode: 'first',
    stats: {
      damage: data.damage * mods.damage, range: data.range * mods.range, rate: data.rate * mods.rate,
      splash: data.splash || 0, pierce: data.pierce || 0, slow: data.slow || 0,
      salvo: data.salvo || 1, muzzleY: group.userData.muzzleY || 1
    }
  };
  state.towers.push(tower);
  for (const cell of cells) towerCells.set(cellKey(cell.x, cell.z), tower);
  return tower;
}
function getCost(type) { return Math.ceil(TOWERS.find(t => t.id === type).cost * (state.army.discount || 1)); }
function placeTower() {
  if (!state.buildType || !hoverCell) return;
  const { cellX, cellZ } = hoverCell;
  if (!validPlacement(cellX, cellZ)) { Sound.error(); toast(tr('toast.noPosition')); return; }
  const cost = getCost(state.buildType);
  if (state.cash < cost) { Sound.error(); toast(tr('toast.noCredits')); return; }
  state.cash -= cost;
  makeTower(state.buildType, cellX, cellZ);
  state.buildType = null; removeGhost(); updateHud(); renderTowerList();
  selectTower(towerCells.get(cellKey(cellX, cellZ)));
  Sound.build(); toast(tr('toast.deployed'));
}
function removeGhost() {
  if (ghost) { world.remove(ghost); ghost = null; }
  placementRing.visible = false; cursorCell.visible = false; gridLines.visible = false;
}
function setBuild(type) {
  if (state.gameOver) return;
  state.abilityMode = null;
  state.selectedTower = null; state.buildType = type;
  updateInspect(); renderTowerList(); renderAbilities(); ensureGhost();
  const def = TOWERS.find(t => t.id === type);
  toast(def.domain === 'sea' ? tr('toast.placeSea', { name: loc(def, 'name') }) : tr('toast.place', { name: loc(def, 'name') }));
}
function selectTower(tower) {
  state.buildType = null; state.abilityMode = null; removeGhost();
  state.selectedTower = tower; lastSelected = tower;
  showTowerRange(tower); updateInspect(); renderTowerList(); renderAbilities();
}
function showTowerRange(tower) {
  if (!tower) { placementRing.visible = false; return; }
  const c = tower.group.position;
  placementRing.position.set(c.x, tower.data.domain === 'sea' ? .02 : .1, c.z);
  placementRing.scale.setScalar(tower.stats.range);
  placementRing.material.color.set(tower.data.domain === 'sea' ? 0x6fc2cf : 0x88c974);
  placementRing.visible = true;
}
function renderTowerList() {
  const host = document.getElementById('towerList'); host.innerHTML = '';
  for (let i = 0; i < TOWERS.length; i++) {
    const t = TOWERS[i];
    const el = document.createElement('div');
    el.className = 'tower-card' + (state.buildType === t.id ? ' selected' : '') + (t.domain === 'sea' ? ' naval' : '');
    el.innerHTML = `<div class="tower-icon">${t.icon}</div><div><div class="tower-name">${loc(t, 'name')}<span class="domain-tag ${t.domain}">${tr(t.domain === 'sea' ? 'tower.domainSea' : 'tower.domainLand')}</span></div><div class="tower-meta">${loc(t, 'desc')}</div></div><div class="tower-cost">${getCost(t.id)} ◈</div>`;
    el.title = tr('tower.title', { name: loc(t, 'name'), range: t.range, key: i + 1 });
    el.addEventListener('click', () => setBuild(t.id));
    host.appendChild(el);
  }
  document.getElementById('buildHint').textContent = state.buildType ? 'ESC' : '1-9';
}
function armyWeapon(type) {
  const base = (WEAPONS[state.army.id] || WEAPONS.usa)[type] || '';
  return settings.language === 'en' ? ((WEAPONS_EN[state.army.id] || {})[type] || base) : base;
}
function targetText(targets) { return targets.length === 2 ? tr('tower.all') : targets[0] === 'air' ? tr('tower.air') : tr('tower.ground'); }
function modeText(mode) { return tr('tower.mode.' + mode) || tr('tower.mode.first'); }
function updateInspect() {
  const body = document.getElementById('inspectBody'), level = document.getElementById('inspectLevel');
  const t = state.selectedTower, panel = document.getElementById('inspectPanel');
  panel.classList.toggle('has-selection', !!t);
  if (!t) {
    level.textContent = '';
    body.className = 'intel-panel';
    renderIntel();
    return;
  }
  const nextCost = Math.ceil(t.data.cost * (.8 + t.level * .48));
  level.textContent = tr('tower.level', { level: t.level });
  body.className = 'action-panel';
  body.innerHTML = `
    <div class="selected-name">${armyWeapon(t.type)}</div>
    <div class="selected-detail">${loc(t.data, 'name')} · ${targetText(t.data.targets)}${t.data.domain === 'sea' ? ' · ' + tr('tower.naval') : ''}</div>
    <div class="meter-line"><span>${tr('tower.damage')}</span><b>${Math.round(t.stats.damage)}</b></div>
    <div class="meter"><i style="width:${Math.min(100, t.stats.damage / 1.6)}%"></i></div>
    <div class="meter-line"><span>${tr('tower.range')}</span><b>${t.stats.range.toFixed(1)}</b></div>
    <div class="meter"><i style="width:${Math.min(100, t.stats.range * 7)}%"></i></div>
    <div class="meter-line"><span>${tr('tower.rate')}</span><b>${(1 / t.stats.rate).toFixed(1)}/s</b></div>
    <div class="meter"><i style="width:${Math.min(100, 24 / t.stats.rate)}%"></i></div>
    <div class="target-row"><span>${tr('tower.priority')}</span><button class="target-btn" id="targetMode">${modeText(t.mode)} ↻</button></div>
    <div class="upgrade-row"><button class="action-btn" id="upgradeTower" ${t.level >= 5 ? 'disabled' : ''}>${tr('tower.upgrade', { cost: t.level >= 5 ? tr('tower.max') : nextCost })}</button><button class="action-btn sell" id="sellTower">${tr('tower.sell', { cost: Math.floor(t.data.cost * .6) })}</button></div>`;
  document.getElementById('upgradeTower').addEventListener('click', upgradeSelected);
  document.getElementById('sellTower').addEventListener('click', sellSelected);
  document.getElementById('targetMode').addEventListener('click', () => {
    const order = ['first', 'last', 'strong', 'close'];
    t.mode = order[(order.indexOf(t.mode) + 1) % order.length];
    updateInspect(); toast(tr('toast.priority', { mode: modeText(t.mode) })); Sound.ui();
  });
}
function upgradeSelected() {
  const t = state.selectedTower;
  if (!t || t.level >= 5) return;
  const cost = Math.ceil(t.data.cost * (.8 + t.level * .48));
  if (state.cash < cost) { Sound.error(); toast(tr('toast.noCredits')); return; }
  state.cash -= cost; t.level++;
  t.stats.damage *= 1.34; t.stats.range *= 1.07; t.stats.rate *= .94;
  const pos = t.group.position.clone(), old = t.group;
  world.remove(old);
  t.group = buildTowerModel(t.type, state.army, t.level);
  t.group.position.copy(pos); world.add(t.group);
  t.pivot = t.group.userData.pivot; t.barrels = t.group.userData.barrels || [];
  t.stats.muzzleY = t.group.userData.muzzleY || t.stats.muzzleY;
  showTowerRange(t); updateInspect(); updateHud(); Sound.upgrade();
  toast(tr('toast.upgrade', { level: t.level }));
}
function sellSelected() {
  const t = state.selectedTower;
  if (!t) return;
  state.cash += Math.floor(t.data.cost * .6);
  world.remove(t.group);
  for (const cell of footprintCells(t.cell.x, t.cell.z, t.data)) towerCells.delete(cellKey(cell.x, cell.z));
  state.towers = state.towers.filter(x => x !== t);
  state.selectedTower = null; placementRing.visible = false;
  updateInspect(); updateHud(); Sound.sell(); toast(tr('toast.sold'));
}

/* ------------------------------------------------------------ oleadas e IA */
const WAVE_UNLOCK = { apc: 3, heli: 4, tank: 5, drone: 6, mlrs: 7, fighter: 9, bomber: 11 };
const WAVE_WEIGHT = { infantry: 3.4, jeep: 2.6, apc: 2.7, tank: 2.3, mlrs: 1.8, heli: 1.9, drone: 2.2, fighter: 1.6, bomber: .9 };
function buildWavePlan(wave) {
  const total = Math.min(64, Math.round(7 + wave * 2.3));
  const pool = [];
  for (const [type, weight] of Object.entries(WAVE_WEIGHT)) {
    if ((WAVE_UNLOCK[type] || 1) <= wave) pool.push({ type, weight });
  }
  let seed = (wave * 9301 + 49297) % 233280;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const plan = [];
  const bossCount = wave % 5 === 0 ? 1 + Math.floor(wave / 20) : 0;
  for (let i = 0; i < bossCount; i++) plan.push('boss');
  // Garantiza que el arma recién desbloqueada aparezca en su oleada.
  for (const [type, unlock] of Object.entries(WAVE_UNLOCK)) if (unlock === wave) plan.push(type);
  while (plan.length < total) {
    let roll = rnd() * pool.reduce((s, p) => s + p.weight, 0), chosen = pool[0].type;
    for (const p of pool) { roll -= p.weight; if (roll <= 0) { chosen = p.type; break; } }
    plan.push(chosen);
  }
  return plan.slice(0, Math.max(total, plan.length));
}
function planCounts(plan) {
  const counts = new Map();
  for (const type of plan) counts.set(type, (counts.get(type) || 0) + 1);
  return counts;
}
function planSummary(plan) {
  const counts = planCounts(plan);
  return [...counts.entries()].map(([type, n]) => `${loc(ENEMIES[type], 'name')} ×${n}`).join(' · ');
}
function waveScalars(wave) {
  return {
    hp: 1 + Math.max(0, wave - 1) * .3 + Math.pow(Math.max(0, wave - 12), 1.4) * .055,
    damage: 1 + Math.max(0, wave - 1) * .085 + Math.max(0, wave - 15) * .02,
    speed: 1 + Math.min(.44, Math.max(0, wave - 1) * .016)
  };
}
function threatKey(wave) {
  if (wave <= 0) return 'none';
  if (wave < 4) return 'low';
  if (wave < 8) return 'medium';
  if (wave < 13) return 'high';
  if (wave < 20) return 'severe';
  return 'critical';
}
function threatLevel(wave) { return tr('threat.' + threatKey(wave)); }
function threatClass(wave) {
  return { none: 'sin-contacto', low: 'baja', medium: 'media', high: 'alta', severe: 'severa', critical: 'critica' }[threatKey(wave)];
}
function renderIntel() {
  const body = document.getElementById('inspectBody');
  if (!body || state.selectedTower) return;
  const nextWave = state.active ? state.wave : state.wave + 1;
  const plan = state.active ? (state.currentPlan || []) : buildWavePlan(nextWave);
  const counts = planCounts(plan);
  const scalars = waveScalars(nextWave);
  const rows = [...counts.entries()].map(([type, n]) => {
    const d = ENEMIES[type];
    const kind = d.kind === 'air' ? tr('intel.air') : d.boss ? tr('intel.boss') : tr('intel.ground');
    return `<div class="intel-row"><span class="intel-icon t${d.tier}">${d.icon}</span><span class="intel-name">${loc(d, 'name')}<em>${kind} · ${tr('intel.armor', { n: Math.round(d.armor * 100) })}</em></span><b>×${n}</b></div>`;
  }).join('');
  const extra = state.active ? tr('intel.inProgress') : tr('intel.planned');
  body.innerHTML = `
    <div class="intel-head"><span>${tr('intel.head', { wave: nextWave, state: extra })}</span><b class="threat threat-${threatClass(nextWave)}">${threatLevel(nextWave)}</b></div>
    <div class="intel-sub">${tr('intel.scaling', { hp: scalars.hp.toFixed(1), dmg: scalars.damage.toFixed(1) })}</div>
    <div class="intel-list">${rows || `<div class="intel-row"><span class="intel-name">${tr('intel.noThreats')}</span></div>`}</div>
    <div class="intel-routes"><b>${tr('intel.routes')}</b><span>${tr('intel.routesDetail')}</span><b>${tr('intel.airRoute')}</b></div>
    <div class="intel-abilities"><b>${tr('intel.support')}</b><span>${tr('intel.supportHtml')}</span></div>`;
}
function makeWave() {
  if (state.active || state.gameOver) return;
  state.wave++;
  state.active = true;
  state.currentPlan = buildWavePlan(state.wave);
  state.spawnQueue = state.currentPlan.map((type, i) => ({ type, delay: type === 'boss' ? 1.2 : Math.max(.26, 1.05 - state.wave * .02) }));
  state.spawnTimer = .25;
  state.spawned = 0;
  document.getElementById('waveBtn').disabled = true;
  updateHud(); renderIntel();
  Sound.wave();
  toast(tr('toast.waveStart', { wave: state.wave, summary: planSummary(state.currentPlan) }));
}
function spawnEnemy(type) {
  const d = ENEMIES[type];
  const scalars = waveScalars(state.wave);
  const rankRoll = Math.random();
  const rank = state.wave >= 11 && rankRoll > .7 ? 'elite' : state.wave >= 7 && rankRoll > .5 ? 'veteran' : '';
  const rankMul = rank === 'elite' ? 1.7 : rank === 'veteran' ? 1.3 : 1;
  const model = enemyModel(type);
  const isAir = d.kind === 'air';
  const route = isAir ? AIR_ROUTE : ROUTES[0];
  const lane = state.spawned % 2 === 0 ? -1 : 1;
  state.spawned++;
  const hp = d.hp * scalars.hp * rankMul;
  const armorBonus = Math.min(.12, Math.max(0, state.wave - 1) * .006);
  const e = {
    type, data: d, model, hp, maxHp: hp, speed: d.speed * scalars.speed,
    damage: d.damage * scalars.damage * (rank ? 1.12 : 1),
    armor: Math.min(.82, d.armor + armorBonus),
    progress: 0, traveled: 0, routeIndex: 0, route, routeLength: routeLength(route), lane,
    reward: Math.round(d.reward * (rank === 'elite' ? 1.8 : rank === 'veteran' ? 1.25 : 1) * .9),
    slowTimer: 0, repelTimer: 0, air: isAir, rank, x: route.points[0][0], z: route.points[0][1]
  };
  model.position.set(e.x, isAir ? ALTITUDE[type] : 0, e.z);
  world.add(model);
  if (rank) {
    const tag = labelSprite(tr(rank === 'elite' ? 'rank.elite' : 'rank.veteran'), rank === 'elite' ? '#e8a06a' : '#b9c47e');
    tag.position.y = (model.userData.labelY || 1) + .46; tag.scale.set(.78, .18, 1); tag.visible = settings.labels !== false;
    model.add(tag); e.rankTag = tag;
  }
  state.enemies.push(e);
}
function updateSpawn(dt) {
  if (!state.active) return;
  if (state.spawnQueue.length) {
    state.spawnTimer -= dt;
    if (state.spawnTimer <= 0) {
      const item = state.spawnQueue.shift();
      spawnEnemy(item.type);
      state.spawnTimer = item.delay;
    }
  }
  if (!state.spawnQueue.length && state.enemies.length === 0) {
    state.active = false;
    document.getElementById('waveBtn').disabled = false;
    state.cash += 35 + state.wave * 4;
    if (state.wave > records.bestWave) { records.bestWave = state.wave; persistRecords(); updateRecordUI(); }
    Sound.cleared();
    toast(tr('toast.waveClear', { wave: state.wave }));
    updateHud(); renderIntel();
  }
}
function advanceEnemyAlongRoute(e, amount) {
  const p = e.route.points;
  let moved = 0;
  if (amount >= 0) {
    let left = amount;
    while (left > 0 && e.routeIndex < p.length - 1) {
      const next = p[e.routeIndex + 1];
      const dx = next[0] - e.x, dz = next[1] - e.z, len = Math.hypot(dx, dz);
      if (len < 1e-6) { e.routeIndex++; continue; }
      const step = Math.min(left, len);
      e.x += dx / len * step; e.z += dz / len * step;
      left -= step; moved += step;
      if (step >= len - 1e-6) { e.x = next[0]; e.z = next[1]; e.routeIndex++; }
    }
  } else {
    let left = -amount;
    while (left > 0 && e.routeIndex >= 0) {
      const prev = p[e.routeIndex];
      const dx = prev[0] - e.x, dz = prev[1] - e.z, len = Math.hypot(dx, dz);
      if (len < 1e-6) {
        // En el primer waypoint ya no hay segmento anterior: el retroceso termina.
        if (e.routeIndex === 0) break;
        e.routeIndex--; continue;
      }
      const step = Math.min(left, len);
      e.x += dx / len * step; e.z += dz / len * step;
      left -= step; moved -= step;
      if (step >= len - 1e-6) {
        e.x = prev[0]; e.z = prev[1];
        if (e.routeIndex === 0) break;
        e.routeIndex--;
      }
    }
  }
  return moved;
}
function enemyLaneOffset(e) {
  const p = e.route.points;
  let dx = 0, dz = 1;
  if (e.routeIndex < p.length - 1) { dx = p[e.routeIndex + 1][0] - e.x; dz = p[e.routeIndex + 1][1] - e.z; }
  else if (e.routeIndex > 0) { dx = e.x - p[e.routeIndex - 1][0]; dz = e.z - p[e.routeIndex - 1][1]; }
  const len = Math.hypot(dx, dz) || 1, width = e.air ? .12 : .17;
  return { x: (dz / len) * e.lane * width, z: (-dx / len) * e.lane * width };
}
function laneSpeedFactor(e) {
  if (e.air || e.repelTimer > 0) return 1;
  let nearest = Infinity;
  for (const other of state.enemies) {
    if (other === e || other.air || other.lane !== e.lane || other.repelTimer > 0) continue;
    const gap = other.traveled - e.traveled;
    if (gap > 0 && gap < .7) nearest = Math.min(nearest, gap);
  }
  return nearest === Infinity ? 1 : Math.max(.25, nearest / .7);
}
function updateEnemy(e, dt) {
  if (e.slowTimer > 0) e.slowTimer = Math.max(0, e.slowTimer - dt);
  if (e.repelTimer > 0) e.repelTimer = Math.max(0, e.repelTimer - dt);
  const jammed = e.repelTimer > 0;
  const slowMult = e.slowTimer > 0 ? .52 : 1;
  const speed = jammed ? -e.speed * .85 : e.speed * slowMult * laneSpeedFactor(e);
  const moved = advanceEnemyAlongRoute(e, speed * dt);
  e.traveled = Math.max(0, Math.min(e.routeLength, e.traveled + moved));
  e.progress = Math.min(1, e.traveled / e.routeLength);
  const alt = ALTITUDE[e.type] || 0;
  const bob = alt ? Math.sin(state.clock * 2.1 + e.traveled * .6) * .08 : 0;
  const offset = enemyLaneOffset(e);
  let jitterX = 0, jitterZ = 0;
  if (jammed) {
    jitterX = Math.sin(state.clock * 37 + e.traveled * 9) * .05;
    jitterZ = Math.cos(state.clock * 31 + e.traveled * 7) * .05;
    if (Math.random() < dt * 7) makeSparks(e.x, alt + .4, e.z, 0x8ce8ff, 1);
  }
  e.model.position.set(e.x + offset.x + jitterX, alt + bob, e.z + offset.z + jitterZ);
  if (e.routeIndex < e.route.points.length - 1) {
    const next = e.route.points[e.routeIndex + 1];
    const desired = Math.atan2(next[0] - e.x, next[1] - e.z);
    let delta = ((desired - e.model.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    e.model.rotation.y += delta * Math.min(1, dt * 5);
  }
  const ud = e.model.userData;
  if (ud.mover && !e.air && e.type !== 'infantry') ud.mover.rotation.y += dt * (e.type === 'tank' || e.type === 'boss' ? .35 : .15);
  if (ud.rotor) ud.rotor.rotation.y += dt * (jammed ? 46 : 20);
  if (ud.tailRotor) ud.tailRotor.rotation.z += dt * 34;
  if (ud.propeller) ud.propeller.rotation.z += dt * (jammed ? 60 : 30);
  if (e.type === 'infantry' && Array.isArray(ud.legs)) {
    for (const unit of ud.legs) {
      const phase = state.clock * 8 + unit.userData.phase;
      const parts = unit.children.filter(c => c.isGroup && c.children.length && c.children[0].geometry && c.children[0].geometry.type === 'CylinderGeometry');
      parts.forEach((part, i) => { part.rotation.x = Math.sin(phase + i * Math.PI) * .45; });
      unit.position.y = Math.abs(Math.sin(phase * 2)) * .012;
    }
  }
  const ratio = Math.max(0, e.hp / e.maxHp);
  ud.hpfg.scale.x = (e.type === 'boss' ? 1.45 : .7) * ratio;
  ud.hpfg.material.color.set(ratio < .3 ? 0xe17950 : 0x9b443a);
  ud.hpbg.visible = ratio > 0;
  if (e.routeIndex >= e.route.points.length - 1) {
    Sound.leak();
    state.hp -= e.damage;
    cameraShake = Math.min(.5, cameraShake + .12);
    explode(e.x, alt, e.z, e.data.boss ? 0xf0b14f : 0xb96a4e, e.data.boss ? 32 : 12);
    removeEnemy(e, false);
    if (state.hp <= 0) endGame();
  }
}
function applyDamage(e, amount, pierce = 0) {
  if (!e || e.hp <= 0 || !state.enemies.includes(e)) return 0;
  const armor = Math.max(0, Math.min(.82, (e.armor || 0) - pierce + (e.rank === 'elite' ? .06 : 0)));
  const dealt = amount * (1 - armor);
  e.hp -= dealt;
  if (e.hp <= 0) removeEnemy(e, true);
  return dealt;
}
function acquireTarget(t) {
  let best = null, bestScore = -Infinity;
  const px = t.group.position.x, pz = t.group.position.z;
  const py = t.group.position.y + (t.stats.muzzleY || 1);
  for (const e of state.enemies) {
    if (!t.data.targets.includes(e.data.kind)) continue;
    const ey = e.air ? ALTITUDE[e.type] : .4;
    const dist = Math.hypot(e.x - px, ey - py, e.z - pz);
    if (dist > t.stats.range) continue;
    let score;
    if (t.mode === 'last') score = -e.progress;
    else if (t.mode === 'strong') score = e.hp + (e.data.boss ? 9999 : 0);
    else if (t.mode === 'close') score = -dist;
    else score = e.progress;
    if (score > bestScore) { bestScore = score; best = e; }
  }
  return best;
}

/* --------------------------------------------------------------- proyectiles */
const projectilePools = new Map();
function getProjectile(color = 0xffd074, kind = 'ball') {
  const pool = projectilePools.get(kind) || [];
  let o = pool.pop();
  if (!o) {
    const geo = kind === 'rocket' ? new THREE.CylinderGeometry(.018, .028, .22, 8) :
      kind === 'missile' ? new THREE.CylinderGeometry(.022, .034, .32, 8) :
        kind === 'cruise' ? new THREE.CylinderGeometry(.028, .042, .44, 8) :
          new THREE.SphereGeometry(.09, 8, 6);
    o = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color }));
    world.add(o);
    o.userData.kind = kind;
  }
  o.material.color.set(color);
  o.visible = true;
  o.rotation.x = Math.PI / 2;
  return o;
}
function recycleProjectile(o) {
  o.visible = false;
  const pool = projectilePools.get(o.userData.kind || 'ball') || [];
  pool.push(o); projectilePools.set(o.userData.kind || 'ball', pool);
}
function fire(t, e) {
  const type = t.type;
  const start = new THREE.Vector3(t.group.position.x, t.group.position.y + (t.stats.muzzleY || 1), t.group.position.z);
  if (type === 'ew') {
    for (const enemy of state.enemies) {
      if (Math.hypot(enemy.x - t.group.position.x, enemy.z - t.group.position.z) <= t.stats.range) {
        enemy.slowTimer = Math.max(enemy.slowTimer, 1.6);
        // La guerra electrónica secuestra los drones: retroceden por la pista.
        if (enemy.type === 'drone') {
          enemy.repelTimer = Math.max(enemy.repelTimer, 2);
          enemy.slowTimer = Math.max(enemy.slowTimer, 2.4);
        }
      }
    }
    makePulse(t.group.position.x, t.group.position.z, t.stats.range); Sound.ew();
    return;
  }
  if (type === 'gun') {
    applyDamage(e, t.stats.damage, t.stats.pierce);
    Sound.gun(); muzzleFlash(t);
    const tracer = makeLine(start, new THREE.Vector3(e.x, (ALTITUDE[e.type] || 0) + .4, e.z), 0xffd887, .14);
    setTimeout(() => { if (tracer.parent) world.remove(tracer); }, 55);
    if (t.barrels.length) t.barrels.forEach(b => { b.position.z += .07; setTimeout(() => { b.position.z -= .07; }, 60); });
    if (Math.random() < .35) makeSparks(e.x, (ALTITUDE[e.type] || 0) + .5, e.z, 0xffd887, 2);
    return;
  }
  if (type === 'mortar') {
    const shell = getProjectile(0xffc878, 'ball');
    Sound.mortar(); muzzleFlash(t, 1.1);
    shell.position.copy(start); shell.scale.setScalar(.75);
    state.effects.push({ kind: 'shell', active: true, life: .95, data: { mesh: shell, target: e, start, elapsed: 0, duration: .95, damage: t.stats.damage, splash: t.data.splash, pierce: t.stats.pierce, arc: 1.7 } });
    return;
  }
  if (type === 'art') {
    const shell = getProjectile(0xffc878, 'ball');
    Sound.mortar(); muzzleFlash(t, 1.4);
    shell.position.copy(start); shell.scale.setScalar(.9);
    state.effects.push({ kind: 'shell', active: true, life: .82, data: { mesh: shell, target: e, start, elapsed: 0, duration: .82, damage: t.stats.damage, splash: t.data.splash, pierce: t.stats.pierce, arc: 2.7 } });
    return;
  }
  if (type === 'rocket') {
    Sound.rocket();
    for (let i = 0; i < (t.stats.salvo || 4); i++) {
      const rocket = getProjectile(0xffc362, 'rocket');
      const spread = 1.15;
      const tx = e.x + (Math.random() - .5) * spread, tz = e.z + (Math.random() - .5) * spread;
      rocket.position.copy(start);
      state.effects.push({
        kind: 'rocket', active: true, life: 1.2, data: {
          mesh: rocket, start: start.clone(), targetPos: new THREE.Vector3(tx, .4, tz),
          elapsed: -i * .11, duration: .72, damage: t.stats.damage, splash: t.data.splash, pierce: t.stats.pierce, arc: 1.6
        }
      });
    }
    return;
  }
  if (type === 'aa') {
    const missile = getProjectile(0xffc362, 'missile');
    Sound.missile(); muzzleFlash(t, 1.2);
    missile.position.copy(start);
    state.effects.push({ kind: 'missile', active: true, life: 2.2, data: { mesh: missile, target: e, life: 2.2, damage: t.stats.damage, pierce: t.stats.pierce, splash: 0 } });
    return;
  }
  if (type === 'destroyer') {
    Sound.navalGun();
    for (let i = 0; i < 2; i++) {
      const missile = getProjectile(0xffbc6a, 'cruise');
      missile.position.copy(start);
      state.effects.push({
        kind: 'cruise', active: true, life: 2.4, data: {
          mesh: missile, target: e, life: 2.4, damage: t.stats.damage, pierce: t.stats.pierce,
          splash: t.data.splash, delay: i * .18
        }
      });
    }
    return;
  }
  if (type === 'carrier') {
    carrierStrike(t, e);
    return;
  }
}
function carrierStrike(t, e) {
  Sound.jet();
  const deck = t.group.position.clone();
  const from = new THREE.Vector3(deck.x, .55, deck.z + .3);
  const target = new THREE.Vector3(e.x, .5, e.z);
  const jet = new THREE.Group();
  addMesh(jet, cylGeo(.05, .08, .42, 10), mat(0x828a8a, .4, .35), 0, 0, 0).rotation.x = Math.PI / 2;
  addMesh(jet, coneGeo(.05, .18, 8), mat(0x828a8a, .4, .35), 0, 0, -.3).rotation.x = -Math.PI / 2;
  addMesh(jet, rboxGeo(.6, .025, .16, .01), mat(0x828a8a, .4, .35), 0, 0, .04);
  addMesh(jet, rboxGeo(.18, .02, .1, .01), mat(0x828a8a, .4, .35), 0, .05, .22);
  jet.position.copy(from);
  world.add(jet);
  const distance = from.distanceTo(target);
  state.effects.push({
    kind: 'airstrike', active: true, life: 6, data: {
      mesh: jet, jet, from: from.clone(), target: target.clone(), elapsed: 0, returning: false,
      outDuration: Math.max(.55, distance / 12), backDuration: Math.max(.55, distance / 10),
      damage: t.stats.damage, splash: t.data.splash, pierce: t.stats.pierce, impacted: false
    }
  });
}
function impactArtillery(x, z, damage, splash, pierce = 0) {
  for (const enemy of [...state.enemies]) {
    const dist = Math.hypot(enemy.x - x, enemy.z - z);
    if (dist <= splash) applyDamage(enemy, damage * (1 - .3 * dist / splash), pierce);
  }
  explosionEffect(x, .25, z);
}
function updateTowers(dt) {
  for (const t of state.towers) {
    t.cooldown -= dt;
    if ((t.type === 'ew' || t.type === 'carrier' || t.type === 'destroyer') && t.pivot) t.pivot.rotation.y += dt * .4;
    const target = acquireTarget(t);
    t.target = target;
    if (!target) continue;
    const dx = target.x - t.group.position.x, dz = target.z - t.group.position.z;
    const desired = Math.atan2(-dx, -dz);
    if (t.pivot) {
      let delta = ((desired - t.pivot.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      t.pivot.rotation.y += delta * Math.min(1, dt * 7);
    }
    if (t.type === 'art' && t.group.userData.elev) {
      t.group.userData.elev.rotation.x = .12 + Math.min(.38, Math.hypot(dx, dz) * .025);
    }
    if (t.type === 'laser') {
      const from = new THREE.Vector3(t.group.position.x, t.group.position.y + (t.stats.muzzleY || 1), t.group.position.z);
      const to = new THREE.Vector3(target.x, (ALTITUDE[target.type] || 0) + .45, target.z);
      beam(from, to, .22);
      Sound.laser();
      applyDamage(target, t.stats.damage * dt, t.stats.pierce);
    } else if (t.cooldown <= 0) {
      fire(t, target);
      t.cooldown = t.stats.rate;
    }
  }
}

/* ----------------------------------------------------------------- efectos */
function makeLine(a, b, color, opacity = 1) {
  const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
  world.add(line);
  return line;
}
function beam(a, b, width = .18) {
  const key = 'beam';
  let fx = state.effects.find(x => x.kind === key && !x.active);
  if (!fx) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, 1, 7), new THREE.MeshBasicMaterial({ color: 0x62e7ff, transparent: true, opacity: .9 }));
    world.add(mesh);
    fx = { kind: key, mesh, life: 0, active: false };
    state.effects.push(fx);
  }
  fx.active = true; fx.life = .06;
  const d = b.clone().sub(a);
  fx.mesh.position.copy(a).add(b).multiplyScalar(.5);
  fx.mesh.scale.set(width, d.length(), width);
  fx.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
}
function makeSparks(x, y, z, color, n) {
  const count = Math.max(2, Math.round(n * quality().particles));
  for (let i = 0; i < count; i++) spawnParticle(x, y, z, color, 1.8 + Math.random() * 1.8, .24 + Math.random() * .35);
}
function muzzleFlash(t, size = 1) {
  const p = t.group.position.clone(); p.y += (t.stats.muzzleY || 1.05);
  let fx = state.effects.find(e => e.kind === 'muzzle' && !e.active);
  if (!fx) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(.16, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe0a0, transparent: true, opacity: .95, depthWrite: false }));
    world.add(mesh);
    fx = { kind: 'muzzle', mesh, active: false, life: 0 };
    state.effects.push(fx);
  }
  fx.active = true; fx.life = .08; fx.maxLife = .08;
  fx.mesh.position.copy(p);
  fx.mesh.scale.setScalar((.8 + Math.random() * .7) * size);
  fx.mesh.material.opacity = .95; fx.mesh.visible = true;
}
function spawnParticle(x, y, z, color, speed, life) {
  let fx = state.effects.find(e => e.kind === 'particle' && !e.active);
  if (!fx) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(.075, 6, 4), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 }));
    world.add(mesh);
    fx = { kind: 'particle', mesh, active: false, life: 0 };
    state.effects.push(fx);
  }
  fx.active = true; fx.life = life; fx.maxLife = life;
  fx.mesh.position.set(x, y, z); fx.mesh.material.color.set(color); fx.mesh.material.opacity = 1;
  fx.velocity = new THREE.Vector3((Math.random() - .5) * speed, Math.random() * speed * .6, (Math.random() - .5) * speed);
  fx.mesh.scale.setScalar(.6 + Math.random() * 1.4);
}
function explode(x, y, z, color = 0xe29b54, n = 15) {
  const count = Math.max(3, Math.round(n * quality().particles));
  for (let i = 0; i < count; i++) spawnParticle(x, y, z, color, 1.3 + Math.random() * 3, .45 + Math.random() * .6);
  makePulse(x, z, 1.4);
}
function explosionEffect(x, y, z) {
  explode(x, y, z, 0xf5a753, 22);
  Sound.explosion();
  const flash = new THREE.Mesh(new THREE.SphereGeometry(.45, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe6ae, transparent: true, opacity: .8 }));
  flash.position.set(x, y, z); world.add(flash);
  state.effects.push({ kind: 'flash', mesh: flash, life: .2, maxLife: .2, active: true });
  cameraShake = Math.min(.35, cameraShake + .1);
}
function makePulse(x, z, scale) {
  let fx = state.effects.find(e => e.kind === 'pulse' && !e.active);
  if (!fx) {
    const mesh = new THREE.Mesh(new THREE.RingGeometry(.86, 1, 28), new THREE.MeshBasicMaterial({ color: 0x9ecf79, transparent: true, opacity: .7, side: THREE.DoubleSide }));
    mesh.rotation.x = -Math.PI / 2; world.add(mesh);
    fx = { kind: 'pulse', mesh, life: 0, active: false };
    state.effects.push(fx);
  }
  fx.active = true; fx.life = .38; fx.maxLife = .38;
  fx.mesh.position.set(x, .12, z); fx.mesh.scale.setScalar(.2); fx.maxScale = scale;
}
function removeEnemy(e, killed) {
  if (!state.enemies.includes(e)) return;
  state.enemies = state.enemies.filter(x => x !== e);
  world.remove(e.model);
  if (killed) {
    state.cash += e.reward; state.score += e.reward;
    explode(e.x, e.data.kind === 'air' ? (ALTITUDE[e.type] || 2) : .3, e.z, e.data.boss ? 0xf1ba56 : 0xc7834c, e.data.boss ? 45 : 9);
    if (e.data.boss) cameraShake = .48;
    updateHud();
  }
}
function updateEffects(dt) {
  for (const fx of state.effects) {
    if (!fx.active) continue;
    if (fx.kind === 'missile' || fx.kind === 'cruise') {
      const p = fx.data, e = p.target;
      if (!e || !state.enemies.includes(e)) { recycleProjectile(p.mesh); fx.active = false; continue; }
      if (p.delay > 0) { p.delay -= dt; continue; }
      const destination = new THREE.Vector3(e.x, (ALTITUDE[e.type] || 0) + .45, e.z);
      const direction = destination.clone().sub(p.mesh.position);
      const dist = direction.length(), step = Math.min(dist, dt * (fx.kind === 'cruise' ? 9 : 11));
      p.mesh.position.add(direction.normalize().multiplyScalar(step));
      p.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
      if (Math.random() < .85) spawnParticle(p.mesh.position.x, p.mesh.position.y, p.mesh.position.z, 0x9d9b8d, .45, .28);
      if (step >= dist - .08) {
        if (p.splash) impactArtillery(destination.x, destination.z, p.damage, p.splash, p.pierce);
        else { applyDamage(e, p.damage, p.pierce); explosionEffect(e.x, destination.y, e.z); }
        recycleProjectile(p.mesh); fx.active = false;
      }
      continue;
    }
    if (fx.kind === 'shell') {
      const p = fx.data, e = p.target;
      p.elapsed += dt;
      const progress = Math.min(1, p.elapsed / p.duration);
      const destination = new THREE.Vector3(e.x, (ALTITUDE[e.type] || 0) + .35, e.z);
      p.mesh.position.lerpVectors(p.start, destination, progress);
      p.mesh.position.y += Math.sin(progress * Math.PI) * (p.arc || 2.2);
      if (Math.random() < .32) spawnParticle(p.mesh.position.x, p.mesh.position.y, p.mesh.position.z, 0x827d6a, .35, .32);
      if (progress >= 1) { impactArtillery(destination.x, destination.z, p.damage, p.splash, p.pierce); recycleProjectile(p.mesh); fx.active = false; }
      continue;
    }
    if (fx.kind === 'rocket') {
      const p = fx.data;
      p.elapsed += dt;
      if (p.elapsed < 0) continue;
      const progress = Math.min(1, p.elapsed / p.duration);
      p.mesh.position.lerpVectors(p.start, p.targetPos, progress);
      p.mesh.position.y += Math.sin(progress * Math.PI) * (p.arc || 1.4);
      const prev = p.mesh.position.clone();
      if (Math.random() < .6) spawnParticle(prev.x, prev.y, prev.z, 0xb9b4a4, .3, .24);
      if (progress >= 1) { impactArtillery(p.targetPos.x, p.targetPos.z, p.damage, p.splash, p.pierce); recycleProjectile(p.mesh); fx.active = false; }
      continue;
    }
    if (fx.kind === 'airstrike') {
      const p = fx.data;
      p.elapsed += dt;
      const jet = p.jet;
      const dir = (p.returning ? p.from.clone().sub(p.target) : p.target.clone().sub(p.from));
      jet.rotation.y = Math.atan2(dir.x, dir.z);
      if (!p.returning) {
        const progress = Math.min(1, p.elapsed / (p.outDuration || 1.1));
        jet.position.lerpVectors(p.from, p.target, progress);
        jet.position.y += Math.sin(progress * Math.PI) * .85;
        jet.rotation.z = Math.sin(progress * Math.PI) * .32;
        if (progress > .62 && !p.impacted) {
          p.impacted = true;
          for (let i = 0; i < 3; i++) {
            const ox = (Math.random() - .5) * p.splash * 1.1, oz = (Math.random() - .5) * p.splash * 1.1;
            setTimeout(() => impactArtillery(p.target.x + ox, p.target.z + oz, p.damage, p.splash * .55, p.pierce), i * 90);
          }
        }
        if (progress >= 1) { p.returning = true; p.elapsed = 0; }
      } else {
        // Regreso al portaaviones / punto de origen: el avión nunca desaparece en el aire.
        const progress = Math.min(1, p.elapsed / (p.backDuration || 1.1));
        jet.position.lerpVectors(p.target, p.from, progress);
        jet.position.y += Math.sin(progress * Math.PI) * .55;
        jet.rotation.z = -Math.sin(progress * Math.PI) * .3;
        if (progress >= 1) {
          world.remove(jet); fx.active = false;
        }
      }
      continue;
    }
    fx.life -= dt;
    if (fx.kind === 'particle') {
      fx.mesh.position.addScaledVector(fx.velocity, dt); fx.velocity.y -= 2.2 * dt;
      fx.mesh.material.opacity = Math.max(0, fx.life / fx.maxLife); fx.mesh.scale.multiplyScalar(1 + dt);
    } else if (fx.kind === 'pulse') {
      const progress = 1 - fx.life / fx.maxLife;
      fx.mesh.scale.setScalar(.2 + progress * fx.maxScale);
      fx.mesh.material.opacity = .7 * (1 - progress);
    } else if (fx.kind === 'flash') {
      fx.mesh.scale.multiplyScalar(1 + dt * 9); fx.mesh.material.opacity = Math.max(0, fx.life / fx.maxLife);
    } else if (fx.kind === 'muzzle') {
      fx.mesh.material.opacity = Math.max(0, fx.life / fx.maxLife); fx.mesh.scale.multiplyScalar(1 + dt * 6);
    } else if (fx.kind === 'beam') fx.active = fx.life > 0;
    if (fx.life <= 0) {
      fx.active = false;
      if (fx.mesh && fx.kind !== 'particle' && fx.kind !== 'pulse' && fx.kind !== 'beam') fx.mesh.visible = false;
    }
  }
}

/* --------------------------------------------------------------- habilidades */
function activateAbility(name) {
  const ab = state.abilities[name];
  if (!ab || state.gameOver) return;
  const abName = tr('ability.' + name);
  if (ab.cd > 0) { Sound.error(); toast(tr('toast.reloading', { name: abName, s: Math.ceil(ab.cd) })); return; }
  if (state.cash < ab.cost) { Sound.error(); toast(tr('toast.noCredits')); return; }
  if (name === 'strike') {
    state.abilityMode = 'strike'; state.buildType = null; state.selectedTower = null;
    removeGhost(); updateInspect(); renderTowerList(); renderAbilities();
    toast(tr('toast.strikeSelect')); Sound.ui();
    return;
  }
  state.cash -= ab.cost; ab.cd = ab.max;
  if (name === 'emp') {
    for (const e of state.enemies) {
      e.slowTimer = Math.max(e.slowTimer, 4.5);
      if (e.type === 'drone') e.repelTimer = Math.max(e.repelTimer, 2.8);
    }
    makePulse(0, 0, 14); makePulse(0, 3, 14); Sound.emp();
    toast(tr('toast.emp'));
  } else if (name === 'repair') {
    state.hp = Math.min(100, state.hp + 22); Sound.upgrade();
    toast(tr('toast.repair'));
  }
  updateHud(); renderAbilities();
}
function executeStrike(x, z) {
  const ab = state.abilities.strike;
  if (state.abilityMode !== 'strike' || ab.cd > 0) return;
  if (state.cash < ab.cost) { Sound.error(); toast(tr('toast.noCredits')); return; }
  state.cash -= ab.cost; ab.cd = ab.max;
  state.abilityMode = null;
  Sound.jet();
  const jet = new THREE.Group();
  addMesh(jet, cylGeo(.055, .09, .46, 10), mat(0x828a8a, .4, .35), 0, 0, 0).rotation.x = Math.PI / 2;
  addMesh(jet, coneGeo(.055, .2, 8), mat(0x828a8a, .4, .35), 0, 0, -.33).rotation.x = -Math.PI / 2;
  addMesh(jet, rboxGeo(.72, .03, .18, .01), mat(0x828a8a, .4, .35), 0, 0, .04);
  addMesh(jet, rboxGeo(.22, .025, .12, .01), mat(0x828a8a, .4, .35), 0, .06, .24);
  jet.position.set(x - 8, 4, z - 5);
  jet.rotation.y = Math.PI / 4;
  world.add(jet);
  state.effects.push({
    kind: 'airstrike', active: true, life: 1.7, data: {
      mesh: jet, jet, from: jet.position.clone(), target: new THREE.Vector3(x, .5, z), elapsed: 0,
      damage: 95, splash: 2.6, pierce: .7, impacted: false
    }
  });
  updateHud(); renderAbilities(); updateInspect();
  toast(tr('toast.strikeActive'));
}
function updateAbilities(dt) {
  let changed = false;
  for (const key of Object.keys(state.abilities)) {
    const ab = state.abilities[key];
    if (ab.cd > 0) { ab.cd = Math.max(0, ab.cd - dt); changed = true; }
  }
  if (changed) renderAbilities();
}

/* --------------------------------------------------------------------- HUD */
let toastTimer;
function toast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2300);
}
function updateHud() {
  const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  set('cash', Math.floor(state.cash));
  set('baseHp', Math.max(0, Math.ceil(state.hp)));
  set('waveLabel', String(state.wave).padStart(2, '0'));
  set('enemyCount', state.enemies.length);
  set('hudFlag', state.army.flag);
  set('hudArmy', loc(state.army, 'name'));
  set('threatLevel', state.wave <= 0 ? '—' : threatLevel(state.wave));
}
function renderAbilities() {
  const map = { strike: 'abilityStrike', emp: 'abilityEmp', repair: 'abilityRepair' };
  for (const key of Object.keys(map)) {
    const btn = document.getElementById(map[key]);
    if (!btn) continue;
    const ab = state.abilities[key];
    const cooling = ab.cd > 0;
    btn.classList.toggle('cooling', cooling);
    btn.classList.toggle('active', state.abilityMode === 'strike' && key === 'strike');
    btn.disabled = cooling || state.gameOver;
    const cd = btn.querySelector('.ab-cd');
    if (cd) cd.textContent = cooling ? `${Math.ceil(ab.cd)}s` : '';
  }
}
function endGame() {
  if (state.gameOver) return;
  state.gameOver = true; state.active = false; state.paused = false;
  document.getElementById('pauseScreen').classList.add('hidden');
  records.plays++;
  if (state.score > records.bestScore) records.bestScore = state.score;
  if (state.wave > records.bestWave) records.bestWave = state.wave;
  persistRecords(); updateRecordUI();
  document.getElementById('defeatText').textContent = tr(state.wave === 1 ? 'defeat.textOne' : 'defeat.text', { wave: state.wave, score: state.score });
  document.getElementById('defeatRecordLine').innerHTML = `<span>${tr('menu.bestWave')}<b>${records.bestWave}</b></span><span>${tr('menu.record')}<b>${records.bestScore}</b></span><span>${tr('menu.runs')}<b>${records.plays}</b></span>`;
  document.getElementById('defeatScreen').classList.remove('hidden');
  Sound.defeat();
}
function chooseArmy(i) { state.selectedArmy = i; document.querySelectorAll('.army-card').forEach((el, n) => el.classList.toggle('chosen', n === i)); }
function renderArmies() {
  const grid = document.getElementById('armyGrid'); grid.innerHTML = '';
  ARMIES.forEach((a, i) => {
    const card = document.createElement('button');
    card.className = 'army-card' + (i === state.selectedArmy ? ' chosen' : '');
    card.innerHTML = `<div class="army-card-head"><span class="army-flag">${a.flag}</span><div><div class="army-title">${loc(a, 'name')}</div><div class="army-bonus">${loc(a, 'bonus')}</div></div></div><div class="army-weapons"><b>${tr('menu.roster')}</b> ${loc(a, 'weapons')}</div>`;
    card.addEventListener('click', () => chooseArmy(i));
    grid.appendChild(card);
  });
}
function repaintBase(army) {
  if (state.base) {
    state.base.traverse(o => {
      if (o.isMesh && o.material && o.material.map && o.material.map.image instanceof HTMLCanvasElement) {
        o.material = camoMaterial(new THREE.Color(army.color).lerp(new THREE.Color(0x30372e), .18));
      }
    });
    if (state.base.userData.flag) state.base.userData.flag.material = flagMaterial(army);
  }
  if (state.startFlag && state.startFlag.userData.flag) state.startFlag.userData.flag.material = flagMaterial(army);
}
function deploy() {
  const nextArmy = ARMIES[state.selectedArmy];
  const freshMatch = !state.deployed || state.gameOver || state.army.id !== nextArmy.id;
  state.army = nextArmy;
  settings.army = state.selectedArmy; persistSettings();
  if (freshMatch) {
    // Cambiar de facción (o desplegar desde el menú) empieza una partida nueva.
    resetGame();
  } else {
    state.paused = false;
    document.getElementById('pauseScreen').classList.add('hidden');
  }
  repaintBase(state.army);
  document.getElementById('armyScreen').classList.add('hidden');
  document.getElementById('hudArmy').textContent = loc(state.army, 'name');
  document.getElementById('hudFlag').textContent = state.army.flag;
  updateHud(); renderTowerList(); updateInspect(); renderAbilities(); updatePauseButton();
  Sound.init(); Sound.ui();
  toast(tr(freshMatch ? 'toast.armyNew' : 'toast.army', { name: loc(state.army, 'name') }));
}
function restartGame() {
  resetGame();
  setPaused(false);
  updatePauseButton();
  toast(tr('toast.restart'));
}
function resetGame() {
  for (const t of state.towers) world.remove(t.group);
  for (const e of state.enemies) world.remove(e.model);
  state.towers = []; state.enemies = [];
  state.effects.forEach(f => {
    if (f.mesh) world.remove(f.mesh);
    if (f.data && f.data.jet) world.remove(f.data.jet);
    if (f.kind !== 'airstrike' && f.data && f.data.mesh && f.active) recycleProjectile(f.data.mesh);
  });
  state.effects = [];
  towerCells.clear();
  state.wave = 0; state.hp = 100; state.cash = state.army.cash;
  state.active = false; state.gameOver = false; state.paused = false; state.deployed = true;
  state.speed = 1; state.score = 0; state.spawnQueue = []; state.currentPlan = [];
  state.selectedTower = null; state.buildType = null; state.abilityMode = null;
  state.spawned = 0; state.spawnTimer = 0;
  for (const ab of Object.values(state.abilities)) ab.cd = 0;
  removeGhost(); placementRing.visible = false;
  document.querySelectorAll('.speed-control button').forEach(x => x.classList.toggle('active', x.dataset.speed === '1'));
  document.getElementById('defeatScreen').classList.add('hidden');
  document.getElementById('pauseScreen').classList.add('hidden');
  document.getElementById('waveBtn').disabled = false;
  updateInspect(); updateHud(); renderTowerList(); renderAbilities();
  target.set(0, 0, .8); targetDistance = distance = DEFAULT_DISTANCE; yaw = 0; updateCamera();
  Sound.ui();
}

/* -------------------------------------------------------- sonido sintetizado */
const Sound = (() => {
  let ctx = null, master = null, noiseBuffer = null;
  const last = {};
  function ensure() {
    if (!settings.sound) return null;
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC(); master = ctx.createGain();
      master.gain.value = settings.volume; master.connect(ctx.destination);
      noiseBuffer = null;
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => { });
    return ctx;
  }
  function gate(name, ms) { const now = performance.now(); if (last[name] && now - last[name] < ms) return false; last[name] = now; return true; }
  function tone(freq, dur, type = 'square', vol = .15, slide = 0, delay = 0) {
    const c = ensure(); if (!c) return;
    const t0 = c.currentTime + delay, osc = c.createOscillator(), gain = c.createGain();
    osc.type = type; osc.frequency.setValueAtTime(Math.max(20, freq), t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t0 + dur);
    gain.gain.setValueAtTime(.0001, t0);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0002, vol), t0 + .008);
    gain.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
    osc.connect(gain); gain.connect(master); osc.start(t0); osc.stop(t0 + dur + .02);
  }
  function noise(dur, vol = .2, cutoff = 1000, delay = 0) {
    const c = ensure(); if (!c) return;
    if (!noiseBuffer) {
      const len = Math.floor(c.sampleRate);
      noiseBuffer = c.createBuffer(1, len, c.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    }
    const t0 = c.currentTime + delay, src = c.createBufferSource();
    src.buffer = noiseBuffer;
    const filter = c.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.setValueAtTime(cutoff, t0);
    const gain = c.createGain(); gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
    src.connect(filter); filter.connect(gain); gain.connect(master);
    src.start(t0); src.stop(t0 + Math.min(dur, .99));
  }
  return {
    init() { ensure(); },
    setVolume(v) { settings.volume = Math.max(0, Math.min(1, v)); persistSettings(); if (master) master.gain.value = settings.volume; },
    gun() { if (gate('gun', 55)) { tone(190 + Math.random() * 40, .05, 'square', .09, -110); noise(.04, .07, 2600); } },
    mortar() { if (gate('mortar', 120)) { tone(92, .18, 'sawtooth', .19, -52); noise(.16, .16, 520); } },
    rocket() { if (gate('rocket', 160)) { noise(.26, .17, 1500); tone(72, .3, 'sawtooth', .12, 120); } },
    missile() { if (gate('missile', 100)) { tone(430, .28, 'sawtooth', .08, 720); noise(.12, .07, 1900); } },
    navalGun() { if (gate('naval', 220)) { tone(110, .2, 'sawtooth', .16, -45); noise(.2, .14, 650); } },
    laser() { if (gate('laser', 110)) tone(860, .09, 'sine', .05, 340); },
    ew() { if (gate('ew', 170)) { tone(240, .22, 'triangle', .07, 190); tone(320, .18, 'sine', .04, 120, .04); } },
    emp() { if (gate('emp', 300)) { tone(540, .32, 'sine', .1, -420); tone(180, .45, 'triangle', .08, 60, .05); } },
    jet() { if (gate('jet', 300)) { noise(.55, .16, 2400); tone(280, .5, 'sawtooth', .06, 380); } },
    explosion() { if (gate('boom', 85)) { noise(.35, .3, 700); tone(60, .3, 'sine', .2, -25); } },
    leak() { if (gate('leak', 170)) { tone(230, .32, 'triangle', .16, -130); noise(.18, .1, 900); } },
    build() { tone(320, .08, 'square', .12, 130); tone(520, .1, 'square', .1, 110, .08); },
    sell() { tone(380, .1, 'triangle', .11, -160); tone(240, .12, 'triangle', .1, -90, .09); },
    upgrade() { [440, 660, 880].forEach((f, i) => tone(f, .12, 'square', .08, 70, i * .06)); },
    cleared() { [523, 659, 784].forEach((f, i) => tone(f, .16, 'triangle', .08, 30, i * .07)); },
    wave() { tone(140, .5, 'sawtooth', .11, 130); tone(210, .5, 'triangle', .07, 170, .08); },
    defeat() { [330, 262, 196, 131].forEach((f, i) => tone(f, .38, 'triangle', .13, -25, i * .14)); },
    error() { tone(150, .15, 'square', .1, -60); },
    click() { if (gate('click', 45)) tone(620, .035, 'square', .05, 90); },
    ui() { if (gate('ui', 60)) tone(480, .06, 'sine', .06, 130); },
    toggle(on) { settings.sound = on; persistSettings(); if (on) ensure(); updateSoundButton(); }
  };
})();

/* ------------------------------------------------------ ajustes y pantallas */
let settingsAutoPaused = false;
function updateSoundButton() {
  const b = document.getElementById('soundBtn');
  if (b) { b.textContent = settings.sound ? '♪' : '🔇'; b.classList.toggle('off', !settings.sound); b.title = settings.sound ? tr('action.soundOn') : tr('action.soundOff'); }
  const t = document.getElementById('soundToggle'); if (t) t.textContent = settings.sound ? tr('sound.on') : tr('sound.off');
}
function updateLabelsUI() {
  const b = document.getElementById('labelsToggle');
  if (b) b.textContent = settings.labels === false ? tr('labels.hidden') : tr('labels.visible');
  for (const e of state.enemies) {
    if (e.model.userData.label) e.model.userData.label.visible = settings.labels !== false;
    if (e.rankTag) e.rankTag.visible = settings.labels !== false;
  }
}
function toggleLabels() { settings.labels = settings.labels === false; persistSettings(); updateLabelsUI(); toast(settings.labels === false ? tr('labels.toastOff') : tr('labels.toastOn')); }
function updateRecordUI() {
  const w = document.getElementById('recordWave'), s = document.getElementById('recordScore'), r = document.getElementById('recordRuns');
  if (w) w.textContent = records.bestWave || 0;
  if (s) s.textContent = records.bestScore || 0;
  if (r) r.textContent = records.plays || 0;
}
function updatePauseButton() {
  const b = document.getElementById('pauseBtn'); if (!b) return;
  b.textContent = state.paused ? '▶' : '❚❚'; b.classList.toggle('active', state.paused);
  b.title = state.paused ? tr('action.resume') : tr('action.pause');
}
function setPaused(value, options = {}) {
  if (!state.deployed || state.gameOver) return;
  state.paused = !!value;
  const screen = document.getElementById('pauseScreen');
  if (screen) screen.classList.toggle('hidden', !(value && !options.silent));
  updatePauseButton();
}
function togglePause() { if (!state.deployed || state.gameOver) return; setPaused(!state.paused); }
function quitToMenu() {
  resetGame(); state.deployed = false; state.paused = false;
  document.getElementById('pauseScreen').classList.add('hidden');
  document.getElementById('armyScreen').classList.remove('hidden');
  renderArmies(); updateRecordUI(); updatePauseButton();
}
function updateQualityHint() {
  const hint = document.getElementById('qualityHint'); if (!hint) return;
  const q = quality();
  const level = tr('quality.' + qualityLevel).toLowerCase();
  hint.textContent = settings.quality === 'auto'
    ? tr('quality.hintAuto', { level })
    : tr('quality.hintForced', { level, shadows: q.shadows ? tr('quality.withShadows') : tr('quality.withoutShadows') });
}
function applyGraphicsQuality() {
  const q = quality();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q.pixel));
  renderer.shadowMap.enabled = q.shadows;
  sun.castShadow = q.shadows;
  if (sun.shadow.mapSize.x !== q.shadow) {
    sun.shadow.mapSize.set(q.shadow, q.shadow);
    if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; }
  }
  resize(); updateQualityHint();
}
function setQuality(mode) {
  settings.quality = QUALITY_PRESETS[mode] ? mode : 'auto';
  qualityLevel = settings.quality === 'auto' ? (coarsePointer ? 'medium' : 'high') : settings.quality;
  applyGraphicsQuality(); persistSettings(); toast(tr('toast.quality', { level: tr('quality.' + qualityLevel) }));
}
const fullscreenAvailable = Boolean(document.fullscreenEnabled || document.webkitFullscreenEnabled);
async function toggleFullscreen() {
  if (!fullscreenAvailable) { toast(tr('toast.fullscreenUnavailable')); return; }
  try {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      await (document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen());
    } else {
      const el = document.documentElement, request = el.requestFullscreen || el.webkitRequestFullscreen;
      if (!request) { toast(tr('toast.fullscreenUnavailable')); return; }
      await request.call(el, { navigationUI: 'hide' });
    }
  } catch { toast(tr('toast.fullscreenFailed')); }
}
function updateFullscreenUI() {
  const active = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
  const top = document.getElementById('fullscreenBtnTop');
  if (top) { top.textContent = active ? '🗗' : '⛶'; top.classList.toggle('active', active); top.title = active ? tr('action.exitFullscreen') : tr('action.fullscreen'); }
  const btn = document.getElementById('fullscreenBtn'); if (btn) btn.textContent = active ? tr('fullscreen.deactivate') : tr('fullscreen.activate');
  const hint = document.getElementById('fullscreenHint'); if (hint) hint.textContent = fullscreenAvailable ? tr('settings.fullscreenHint') : tr('settings.fullscreenUnavailable');
}
document.addEventListener('fullscreenchange', updateFullscreenUI);
document.addEventListener('webkitfullscreenchange', updateFullscreenUI);
function openSettings() {
  settingsAutoPaused = false;
  if (state.deployed && !state.gameOver && !state.paused) { setPaused(true, { silent: true }); settingsAutoPaused = true; }
  syncSettingsUI(); document.getElementById('settingsScreen').classList.remove('hidden');
}
function closeSettings() {
  document.getElementById('settingsScreen').classList.add('hidden');
  if (settingsAutoPaused) { settingsAutoPaused = false; setPaused(false); }
}
function syncSettingsUI() {
  const q = document.getElementById('qualitySelect'); if (q) q.value = settings.quality;
  const lang = document.getElementById('languageSelect'); if (lang) lang.value = settings.language;
  const v = document.getElementById('volumeRange'); if (v) v.value = Math.round(settings.volume * 100);
  const ver = document.getElementById('appVersion'); if (ver) ver.textContent = APP_VERSION;
  const mode = document.getElementById('installMode'); if (mode) mode.textContent = standalone ? tr('settings.modeInstalled') : tr('settings.modeBrowser');
  updateSoundButton(); updateQualityHint(); updateInstallUI(); updateFullscreenUI(); updateLabelsUI();
}

/* ---------------------------------------------------------------- PWA */
const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
let deferredPrompt = null, swRegistration = null, waitingWorker = null, refreshing = false;
function updateInstallUI() {
  const canInstall = Boolean(deferredPrompt) && !standalone;
  ['installBtn', 'installBtnMenu'].forEach(id => { const b = document.getElementById(id); if (b) b.hidden = !canInstall; });
  const hint = document.getElementById('installHint');
  if (hint) hint.textContent = canInstall ? tr('settings.installHint') : standalone ? tr('settings.installHintInstalled') : tr('settings.installHintBrowser');
  const mode = document.getElementById('installMode'); if (mode) mode.textContent = standalone ? tr('settings.modeInstalled') : tr('settings.modeBrowser');
}
async function installApp() {
  if (!deferredPrompt) { toast(tr('toast.installMenu')); return; }
  deferredPrompt.prompt();
  try { const choice = await deferredPrompt.userChoice; if (choice && choice.outcome === 'accepted') toast(tr('toast.installing')); } catch { }
  deferredPrompt = null; updateInstallUI();
}
window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); deferredPrompt = event; updateInstallUI(); });
window.addEventListener('appinstalled', () => { deferredPrompt = null; toast(tr('toast.installed')); updateInstallUI(); });
function showUpdate(worker) { if (!worker) return; waitingWorker = worker; const banner = document.getElementById('updateBanner'); if (banner) banner.hidden = false; }
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', async () => {
    try {
      swRegistration = await navigator.serviceWorker.register('sw.js');
      if (swRegistration.waiting && navigator.serviceWorker.controller) showUpdate(swRegistration.waiting);
      swRegistration.addEventListener('updatefound', () => {
        const worker = swRegistration.installing; if (!worker) return;
        worker.addEventListener('statechange', () => { if (worker.state === 'installed' && navigator.serviceWorker.controller) showUpdate(worker); });
      });
      navigator.serviceWorker.addEventListener('controllerchange', () => { if (refreshing) return; refreshing = true; location.reload(); });
      const check = () => swRegistration && swRegistration.update().catch(() => { });
      window.addEventListener('focus', check); setInterval(check, 30 * 60 * 1000);
    } catch (error) { console.warn('Service worker no disponible', error); }
  });
}

/* --------------------------------------------------------------- idioma UI */
function setMeta(name, content) {
  const el = document.querySelector(`meta[name="${name}"]`);
  if (el) el.setAttribute('content', content);
}
function refreshEnemyLabels() {
  for (const e of state.enemies) {
    const ud = e.model.userData;
    if (ud.label) {
      e.model.remove(ud.label);
      const label = labelSprite(loc(e.data, 'name'), enemyLabelAccent(e.type));
      label.position.y = (ud.labelY || 1) + .22;
      label.visible = settings.labels !== false;
      e.model.add(label); ud.label = label;
    }
    if (e.rankTag) {
      e.model.remove(e.rankTag);
      const tag = labelSprite(tr(e.rank === 'elite' ? 'rank.elite' : 'rank.veteran'), e.rank === 'elite' ? '#e8a06a' : '#b9c47e');
      tag.position.y = (ud.labelY || 1) + .46; tag.scale.set(.78, .18, 1); tag.visible = settings.labels !== false;
      e.model.add(tag); e.rankTag = tag;
    }
  }
}
function applyLanguage() {
  const lang = settings.language === 'en' ? 'en' : 'es';
  document.documentElement.lang = lang;
  document.title = tr('doc.title');
  setMeta('description', tr('doc.description'));
  setMeta('apple-mobile-web-app-title', 'Frente Global');
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = tr(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = tr(el.getAttribute('data-i18n-html')); });
  document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = tr(el.getAttribute('data-i18n-title')); });
  updateHud(); renderArmies(); renderTowerList(); updateInspect(); updateRecordUI();
  updateSoundButton(); updateLabelsUI(); updatePauseButton(); updateQualityHint();
  updateInstallUI(); updateFullscreenUI(); renderAbilities(); syncSettingsUI();
  refreshEnemyLabels();
}
function setLanguage(lang) {
  settings.language = lang === 'en' ? 'en' : 'es';
  persistSettings();
  applyLanguage();
}

/* ------------------------------------------------------------------ eventos */
document.getElementById('deployBtn').addEventListener('click', deploy);
document.getElementById('armySwitch').addEventListener('click', () => {
  if (state.deployed && !state.gameOver && !state.paused) setPaused(true, { silent: true });
  document.getElementById('armyScreen').classList.remove('hidden'); renderArmies();
});
document.getElementById('waveBtn').addEventListener('click', makeWave);
document.getElementById('retryBtn').addEventListener('click', resetGame);
document.getElementById('centerCam').addEventListener('click', () => { target.set(0, 0, .8); targetDistance = DEFAULT_DISTANCE; yaw = 0; toast(tr('toast.camera')); });
function zoomBy(factor) { targetDistance = THREE.MathUtils.clamp(targetDistance * factor, minDistance, maxDistance); distance = targetDistance; updateCamera(); }
document.getElementById('zoomIn').addEventListener('click', () => zoomBy(.8));
document.getElementById('zoomOut').addEventListener('click', () => zoomBy(1.28));
document.getElementById('cancelBuild').addEventListener('click', () => { state.buildType = null; state.abilityMode = null; removeGhost(); updateInspect(); renderTowerList(); renderAbilities(); });
document.getElementById('soundBtn').addEventListener('click', () => Sound.toggle(!settings.sound));
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('resumeBtn').addEventListener('click', () => setPaused(false));
document.getElementById('pauseRestartBtn').addEventListener('click', restartGame);
document.getElementById('settingsBtn').addEventListener('click', openSettings);
document.getElementById('pauseSettingsBtn').addEventListener('click', openSettings);
document.getElementById('pauseQuitBtn').addEventListener('click', quitToMenu);
document.getElementById('closeSettingsBtn').addEventListener('click', closeSettings);
document.getElementById('qualitySelect').addEventListener('change', event => setQuality(event.target.value));
document.getElementById('languageSelect').addEventListener('change', event => {
  setLanguage(event.target.value);
  toast(tr('toast.language', { language: event.target.value === 'en' ? 'English' : 'Español' }));
});
document.querySelectorAll('.language-option').forEach(btn => btn.addEventListener('click', () => {
  setLanguage(btn.dataset.lang);
  document.getElementById('languageScreen').classList.add('hidden');
  document.getElementById('armyScreen').classList.remove('hidden');
  Sound.init(); Sound.ui();
}));
document.getElementById('soundToggle').addEventListener('click', () => Sound.toggle(!settings.sound));
document.getElementById('labelsToggle').addEventListener('click', toggleLabels);
document.getElementById('volumeRange').addEventListener('input', event => Sound.setVolume(Number(event.target.value) / 100));
document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
document.getElementById('fullscreenBtnTop').addEventListener('click', toggleFullscreen);
document.getElementById('installBtn').addEventListener('click', installApp);
document.getElementById('installBtnMenu').addEventListener('click', installApp);
document.getElementById('abilityStrike').addEventListener('click', () => activateAbility('strike'));
document.getElementById('abilityEmp').addEventListener('click', () => activateAbility('emp'));
document.getElementById('abilityRepair').addEventListener('click', () => activateAbility('repair'));
document.getElementById('resetProgressBtn').addEventListener('click', () => {
  if (!confirm(tr('confirm.clearRecords'))) return;
  records.bestWave = 0; records.bestScore = 0; records.totalKills = 0; records.plays = 0;
  persistRecords(); updateRecordUI(); toast(tr('toast.recordsCleared')); Sound.ui();
});
document.getElementById('reloadBtn').addEventListener('click', () => { if (waitingWorker) waitingWorker.postMessage({ type: 'SKIP_WAITING' }); else location.reload(); });
document.getElementById('settingsScreen').addEventListener('click', event => { if (event.target === event.currentTarget) closeSettings(); });
document.addEventListener('click', event => { if (event.target.closest('button')) Sound.click(); });
document.addEventListener('pointerdown', () => Sound.init(), { once: true });
document.addEventListener('keydown', () => Sound.init(), { once: true });
document.querySelectorAll('.speed-control button').forEach(b => b.addEventListener('click', () => {
  state.speed = Number(b.dataset.speed);
  document.querySelectorAll('.speed-control button').forEach(x => x.classList.toggle('active', x === b)); Sound.ui();
}));

applyLanguage();
document.getElementById('languageScreen').classList.remove('hidden');
document.getElementById('armyScreen').classList.add('hidden');

/* -------------------------------------------------------------- teclado y puntero */
let keys = {};
function isTypingTarget(target) { return Boolean(target) && (/^(INPUT|SELECT|TEXTAREA)$/.test(target.tagName) || target.isContentEditable); }
window.addEventListener('keydown', e => {
  const settingsOpen = !document.getElementById('settingsScreen').classList.contains('hidden');
  if (e.key === 'Escape') {
    if (settingsOpen) { closeSettings(); return; }
    if (state.abilityMode) { state.abilityMode = null; removeGhost(); updateInspect(); renderAbilities(); return; }
    if (state.buildType || state.selectedTower) {
      state.buildType = null; removeGhost(); state.selectedTower = null; updateInspect(); renderTowerList();
    }
    return;
  }
  if (isTypingTarget(e.target) || settingsOpen) return;
  if (!document.getElementById('armyScreen').classList.contains('hidden')) return;
  keys[e.key.toLowerCase()] = true;
  if (/^[1-9]$/.test(e.key)) {
    e.preventDefault();
    if (state.deployed && !state.gameOver && TOWERS[Number(e.key) - 1]) setBuild(TOWERS[Number(e.key) - 1].id);
  } else if (/^f[1-9]$/i.test(e.key)) {
    e.preventDefault();
    if (state.deployed && !state.gameOver && TOWERS[Number(e.key[1]) - 1]) setBuild(TOWERS[Number(e.key[1]) - 1].id);
  } else if (e.code === 'Space') {
    e.preventDefault();
    if (!state.deployed || state.gameOver) return;
    if (state.paused) setPaused(false);
    else if (state.active) setPaused(true);
    else makeWave();
  } else {
    const k = e.key.toLowerCase();
    if (k === 'p' && !e.repeat) togglePause();
    else if (k === 'm' && !e.repeat) Sound.toggle(!settings.sound);
    else if (k === 'f' && !e.repeat) toggleFullscreen();
    else if (k === 'z' && !e.repeat) activateAbility('strike');
    else if (k === 'x' && !e.repeat) activateAbility('emp');
    else if (k === 'c' && !e.repeat) activateAbility('repair');
    else if (k === 'q') yaw += .1;
    else if (k === 'e') yaw -= .1;
  }
});
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);
window.addEventListener('blur', () => { keys = {}; });
document.addEventListener('visibilitychange', () => { if (document.hidden && state.deployed && !state.gameOver && !state.paused) setPaused(true); });

let pointers = new Map(), gesture = null, pinchStart = 0, lastPointer = { x: 0, y: 0 };
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('pointerdown', e => {
  try { canvas.setPointerCapture(e.pointerId); } catch { }
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, type: e.pointerType });
  lastPointer = { x: e.clientX, y: e.clientY };
  updatePointer(e.clientX, e.clientY);
  if (pointers.size === 2) {
    const ps = [...pointers.values()];
    pinchStart = Math.hypot(ps[1].x - ps[0].x, ps[1].y - ps[0].y);
    gesture = { kind: 'pinch', center: { x: (ps[0].x + ps[1].x) / 2, y: (ps[0].y + ps[1].y) / 2 } };
    return;
  }
  if (e.button === 1 || e.button === 2) { gesture = { kind: e.button === 2 ? 'rotate' : 'pan', x: e.clientX, y: e.clientY, button: e.button }; return; }
  if (e.pointerType === 'touch') { gesture = { kind: 'touch', x: e.clientX, y: e.clientY, moved: false }; return; }
  gesture = { kind: 'click', x: e.clientX, y: e.clientY, moved: false };
});
canvas.addEventListener('pointermove', e => {
  if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, type: e.pointerType });
  if (pointers.size >= 2 && gesture?.kind === 'pinch') {
    const ps = [...pointers.values()], d = Math.hypot(ps[1].x - ps[0].x, ps[1].y - ps[0].y), center = { x: (ps[0].x + ps[1].x) / 2, y: (ps[0].y + ps[1].y) / 2 };
    targetDistance = THREE.MathUtils.clamp(targetDistance * pinchStart / d, minDistance, maxDistance);
    distance = targetDistance;
    pinchStart = d;
    const dx = center.x - gesture.center.x, dy = center.y - gesture.center.y;
    panPixels(dx, dy); gesture.center = center;
    return;
  }
  if (gesture) {
    const dx = e.clientX - (gesture.x ?? e.clientX), dy = e.clientY - (gesture.y ?? e.clientY);
    if (gesture.kind === 'pan' || gesture.kind === 'touch' && gesture.moved) {
      panPixels(dx, dy); gesture.x = e.clientX; gesture.y = e.clientY; gesture.moved = true;
    } else if (gesture.kind === 'rotate') {
      yaw -= dx * .006; gesture.x = e.clientX; gesture.y = e.clientY;
    } else if (gesture.kind === 'touch' || gesture.kind === 'click') {
      if (Math.hypot(e.clientX - gesture.x, e.clientY - gesture.y) > 7) gesture.moved = true;
    }
  }
  lastPointer = { x: e.clientX, y: e.clientY };
  updatePointer(e.clientX, e.clientY);
});
canvas.addEventListener('pointerup', e => {
  const g = gesture; pointers.delete(e.pointerId);
  if (g && pointers.size === 0) {
    if ((g.kind === 'click' || g.kind === 'touch') && !g.moved) handleClick(e.clientX, e.clientY);
    gesture = null;
  } else if (pointers.size < 2 && gesture?.kind === 'pinch') gesture = null;
});
canvas.addEventListener('pointercancel', e => { pointers.delete(e.pointerId); gesture = null; });
function panPixels(dx, dy) {
  const scale = distance / Math.max(350, window.innerHeight);
  const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw)), forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
  target.addScaledVector(right, -dx * scale); target.addScaledVector(forward, dy * scale); clampTarget();
}
function handleClick(x, y) {
  const p = pointerGround(x, y);
  if (!p) return;
  if (state.abilityMode === 'strike') {
    const cx = THREE.MathUtils.clamp(p.x, -14, 14), cz = THREE.MathUtils.clamp(p.z, -8.5, 8.5);
    executeStrike(cx, cz);
    return;
  }
  const c = worldCell(p.x, p.z);
  if (!insideCell(c.x, c.z)) return;
  if (state.buildType) {
    hoverCell = { cellX: c.x, cellZ: c.z, ...cellCenter(c.x, c.z) };
    placeTower();
    return;
  }
  const hit = raycaster.intersectObjects(state.towers.map(t => t.group), true)[0];
  if (hit) {
    let root = hit.object;
    while (root.parent && root.parent !== world) root = root.parent;
    const t = state.towers.find(v => v.group === root);
    if (t) { selectTower(t); return; }
  }
  const tower = towerCells.get(cellKey(c.x, c.z));
  if (tower) { selectTower(tower); return; }
  state.selectedTower = null; placementRing.visible = false; updateInspect();
}
canvas.addEventListener('wheel', e => {
  e.preventDefault();
  const before = pointerGround(e.clientX, e.clientY);
  const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 120 : 1;
  targetDistance = THREE.MathUtils.clamp(targetDistance * Math.exp(e.deltaY * unit * .0018), minDistance, maxDistance);
  distance = targetDistance;
  updateCamera();
  const after = pointerGround(e.clientX, e.clientY);
  if (before && after) { target.add(before.sub(after)); clampTarget(); }
}, { passive: false });
function clampTarget() { target.x = THREE.MathUtils.clamp(target.x, -8.5, 8.5); target.z = THREE.MathUtils.clamp(target.z, -6, 5.8); }
function updateKeys(dt) {
  let dx = 0, dz = 0;
  if (keys.w || keys.arrowup) dz -= 1;
  if (keys.s || keys.arrowdown) dz += 1;
  if (keys.a || keys.arrowleft) dx -= 1;
  if (keys.d || keys.arrowright) dx += 1;
  if (dx || dz) {
    const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw)), forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
    target.addScaledVector(right, dx * dt * 9); target.addScaledVector(forward, dz * dt * 9); clampTarget();
  }
}
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality().pixel));
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => setTimeout(resize, 150));

/* -------------------------------------------------------------------- loop */
function tick(now) {
  requestAnimationFrame(tick);
  const dt = Math.min(.05, (now - (tick.last || now)) / 1000);
  tick.last = now;
  state.clock += dt; frame++;
  const running = state.deployed && !state.paused && !state.gameOver && !document.hidden;
  const gameDt = running ? dt * state.speed : 0;
  updateKeys(dt);
  distance = targetDistance;
  if (cameraShake > 0) {
    cameraShake = Math.max(0, cameraShake - dt);
    const shake = cameraShake * .12;
    camera.position.x += Math.sin(state.clock * 90) * shake;
    camera.position.y += Math.cos(state.clock * 73) * shake * .45;
  }
  updateCamera();
  waterUniforms.uTime.value = state.clock;
  updateSpawn(gameDt);
  for (const e of [...state.enemies]) updateEnemy(e, gameDt);
  updateTowers(gameDt);
  updateEffects(gameDt);
  updateAbilities(gameDt);
  if (frame % 15 === 0) updateHud();
  if (frame % 30 === 0 && !state.selectedTower) renderIntel();
  renderer.render(scene, camera);
  if (running && settings.quality === 'auto') {
    if (dt > .045) lowFpsTime += dt; else lowFpsTime = Math.max(0, lowFpsTime - dt * .5);
    if (lowFpsTime > 4) {
      if (qualityLevel === 'high') { qualityLevel = 'medium'; applyGraphicsQuality(); toast(tr('toast.qualityReduced')); }
      else if (qualityLevel === 'medium') { qualityLevel = 'low'; applyGraphicsQuality(); toast(tr('toast.qualityMinimum')); }
      lowFpsTime = 0;
    }
  }
}
requestAnimationFrame(tick);

