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

// Dificultad: la economía es inversa a la dificultad. Cada nivel reduce (o
// aumenta) los créditos iniciales, el botín por baja y la bonificación de
// oleada; los niveles altos también endurecen ligeramente a los enemigos.
const DIFFICULTY_LEVELS = [
  {
    id: 'recruit', name: 'Recluta', nameEn: 'Recruit', icon: '🛡', tone: 'easy',
    tagline: 'Más créditos y enemigos algo más débiles.', taglineEn: 'More credits and slightly weaker enemies.',
    start: 1.35, bounty: 1.33, waveClear: 1.3, enemyHp: .92, enemyDamage: .92
  },
  {
    id: 'veteran', name: 'Veterano', nameEn: 'Veteran', icon: '⚖', tone: 'normal',
    tagline: 'La curva prevista: sin ventajas ni castigos.', taglineEn: 'The intended curve: no bonuses or penalties.',
    start: 1, bounty: 1, waveClear: 1, enemyHp: 1, enemyDamage: 1
  },
  {
    id: 'elite', name: 'Élite', nameEn: 'Elite', icon: '⚔', tone: 'hard',
    tagline: 'Economía reducida y enemigos endurecidos.', taglineEn: 'Reduced economy and tougher enemies.',
    start: .8, bounty: .8, waveClear: .78, enemyHp: 1.06, enemyDamage: 1.04
  },
  {
    id: 'nightmare', name: 'Pesadilla', nameEn: 'Nightmare', icon: '☠', tone: 'nightmare',
    tagline: 'Créditos mínimos. Solo una defensa perfecta aguanta.', taglineEn: 'Minimal credits. Only a flawless defense holds.',
    start: .65, bounty: .65, waveClear: .6, enemyHp: 1.12, enemyDamage: 1.08
  }
];
const DEFAULT_DIFFICULTY = 1;
function clampDifficulty(value) {
  const n = Number(value);
  return Number.isInteger(n) && DIFFICULTY_LEVELS[n] ? n : DEFAULT_DIFFICULTY;
}
function difficultyDef(index = state.difficultyIndex) {
  return DIFFICULTY_LEVELS[clampDifficulty(index)] || DIFFICULTY_LEVELS[DEFAULT_DIFFICULTY];
}

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
  { id: 'gun', name: 'Ametralladora', nameEn: 'Machine gun', icon: '✣', cost: 120, range: 4.7, damage: 7, rate: .22, targets: ['ground'], desc: 'Tiro rápido de defensa cercana', descEn: 'Rapid-fire close defense', domain: 'land', pierce: .12 },
  { id: 'mortar', name: 'Mortero', nameEn: 'Mortar', icon: '◒', cost: 145, range: 5.2, damage: 18, rate: 1.05, targets: ['ground'], splash: 1.05, desc: 'Fuego indirecto de cadencia media', descEn: 'Medium-rate indirect fire', domain: 'land', pierce: .25 },
  { id: 'art', name: 'Artillería', nameEn: 'Artillery', icon: '◉', cost: 195, range: 6.8, damage: 38, rate: 2.25, targets: ['ground'], splash: 1.7, desc: 'Obús de alto impacto en área', descEn: 'High-impact area howitzer', domain: 'land', pierce: .35 },
  { id: 'rocket', name: 'Lanzacohetes', nameEn: 'Rocket launcher', icon: '⌁', cost: 260, range: 7, damage: 20, rate: 3.4, targets: ['ground'], splash: 1.35, desc: 'Salva de cohetes de saturación', descEn: 'Saturation rocket salvo', domain: 'land', pierce: .4, salvo: 4 },
  { id: 'aa', name: 'Misil antiaéreo', nameEn: 'Surface-to-air missile', icon: '⌃', cost: 170, range: 9.2, damage: 70, rate: 1.15, targets: ['air'], desc: 'Lanzador guiado contra aeronaves', descEn: 'Guided launcher against aircraft', domain: 'land', pierce: .2 },
  { id: 'laser', name: 'Láser', nameEn: 'Laser', icon: '⌇', cost: 225, range: 5.8, damage: 34, rate: .12, targets: ['ground', 'air'], desc: 'Haz continuo de energía dirigida', descEn: 'Continuous directed-energy beam', domain: 'land', pierce: 1 },
  { id: 'ew', name: 'Guerra electrónica', nameEn: 'Electronic warfare', icon: '⌘', cost: 180, range: 5.2, damage: 0, rate: .5, targets: ['ground', 'air'], slow: .5, desc: 'Interferencia: solo afecta a unidades con guiado electrónico', descEn: 'Jamming: only affects electronically guided units', domain: 'land', pierce: 0 },
  { id: 'destroyer', name: 'Destructor', nameEn: 'Destroyer', icon: '⚓', cost: 360, range: 8.8, damage: 46, rate: 2.9, targets: ['ground', 'air'], splash: 1.55, desc: 'Misiles de crucero desde el mar', descEn: 'Cruise missiles from the sea', domain: 'sea', pierce: .5 },
  { id: 'carrier', name: 'Portaaviones', nameEn: 'Aircraft carrier', icon: '✈', cost: 520, range: 12, damage: 46, rate: 5.6, targets: ['ground', 'air'], splash: 2.1, desc: 'Ataque aéreo embarcado de largo alcance', descEn: 'Long-range carrier air strike', domain: 'sea', pierce: .45 }
];

// Habilidades especiales por tipo de estructura. Se pagan con créditos y
// comparten la recarga de la torre seleccionada.
const TOWER_SPECIALS = {
  gun: { name: 'Ráfaga de supresión', nameEn: 'Suppression burst', desc: 'Barrido de balas trazadoras sobre toda la infantería en alcance', descEn: 'Tracer sweep over all infantry in range', icon: '✣', cost: 60, cooldown: 18 },
  mortar: { name: 'Lluvia de mortero', nameEn: 'Mortar rain', desc: 'Batería de proyectiles en área sobre objetivos terrestres', descEn: 'Area shell battery on ground targets', icon: '◒', cost: 80, cooldown: 20 },
  art: { name: 'Barrera de fuego', nameEn: 'Fire barrage', desc: 'Impacto masivo de artillería con gran radio de explosión', descEn: 'Massive artillery impact with a wide blast radius', icon: '◉', cost: 100, cooldown: 24 },
  rocket: { name: 'Salva total', nameEn: 'Full salvo', desc: 'Descarga completa de cohetes sobre múltiples objetivos', descEn: 'Full rocket volley across multiple targets', icon: '⌁', cost: 120, cooldown: 26 },
  aa: { name: 'Intercepción total', nameEn: 'Total interception', desc: 'Misiles guiados contra todas las aeronaves en alcance', descEn: 'Guided missiles against every aircraft in range', icon: '⌃', cost: 90, cooldown: 20 },
  laser: { name: 'Sobrecarga de haz', nameEn: 'Beam overcharge', desc: 'Barrido de energía dirigida con penetración total', descEn: 'Directed-energy sweep with full penetration', icon: '⌇', cost: 110, cooldown: 22 },
  ew: { name: 'Apagón electrónico', nameEn: 'Electronic blackout', desc: 'Ralentiza y repele a las unidades guiadas del área', descEn: 'Slows and repels guided units in the area', icon: '⌘', cost: 85, cooldown: 24 },
  destroyer: { name: 'Bombardeo naval', nameEn: 'Naval bombardment', desc: 'Salva de misiles de crucero contra objetivos múltiples', descEn: 'Cruise missile salvo against multiple targets', icon: '⚓', cost: 140, cooldown: 30 },
  carrier: { name: 'Oleada aérea', nameEn: 'Air wing', desc: 'Tres ataques embarcados simultáneos de largo alcance', descEn: 'Three simultaneous long-range carrier strikes', icon: '✈', cost: 160, cooldown: 34 }
};

/* --------------------------------------------------------------- facciones enemigas */
// Cada ola pertenece a una facción. Cada facción tiene tropas comunes y un jefe final
// que aparece cada 3 olas de esa facción y puede dañar estructuras colocadas.
const ENEMY_FACTIONS = [
  {
    id: 'cavemen', name: 'Cavernícolas', nameEn: 'Cavemen', flag: '🦴', color: 0x8b7355,
    climate: 'templado', tempC: 22, tempF: 72,
    units: [
      { id: 'clubber', name: 'Portagarzos', kind: 'ground', hp: 70, speed: 0.85, reward: 16, radius: .2, color: 0x8b7355, damage: 6, armor: .1, tier: 1, desc: 'Garzó de piedra', counter: 'mortar' },
      { id: 'brute', name: 'Bruto cavernícola', kind: 'ground', hp: 200, speed: 0.6, reward: 32, radius: .3, color: 0x6b5545, damage: 12, armor: .35, tier: 2, desc: 'Fuerza bruta', counter: 'art' },
      { id: 'shaman', name: 'Chamán', kind: 'ground', hp: 100, speed: 0.9, reward: 24, radius: .22, color: 0x5d4a3a, damage: 5, armor: .08, tier: 2, desc: 'Magia primitiva', counter: 'laser' },
      { id: 'pterodactyl', name: 'Pterodáctilo de guerra', nameEn: 'War pterodactyl', kind: 'air', hp: 120, speed: 2.0, reward: 30, radius: .26, color: 0x7a6248, damage: 10, armor: .05, tier: 2, desc: 'Jinete de las alturas', descEn: 'High-altitude rider', counter: 'aa' }
    ],
    boss: { id: 'cavemenBoss', name: 'Jefe Cavernícola', kind: 'ground', hp: 3500, speed: 0.5, reward: 450, radius: .85, color: 0x4a352a, damage: 35, armor: .55, tier: 5, desc: 'Jefe de facción', boss: true, structureDamage: 20, counter: 'laser' }
  },
  {
    id: 'spartans', name: 'Espartanos', nameEn: 'Spartans', flag: '🛡️', color: 0xa67c52,
    climate: 'caluroso', tempC: 32, tempF: 90,
    units: [
      { id: 'hoplite', name: 'Hoplita gigante', kind: 'ground', hp: 140, speed: 0.75, reward: 20, radius: .25, color: 0xa67c52, damage: 9, armor: .25, tier: 1, desc: 'Lanza y escudo', counter: 'mortar' },
      { id: 'spartan', name: 'Espartano élite', kind: 'ground', hp: 260, speed: 0.9, reward: 40, radius: .3, color: 0x8b5a3c, damage: 15, armor: .4, tier: 3, desc: 'Guerrero legendario', counter: 'rocket' },
      { id: 'spearman', name: 'Lancero', kind: 'ground', hp: 110, speed: 1.0, reward: 18, radius: .22, color: 0x9a7048, damage: 8, armor: .18, tier: 1, desc: 'Larga lanza', counter: 'gun' },
      { id: 'pegasus', name: 'Jinete de Pegaso', nameEn: 'Pegasus rider', kind: 'air', hp: 150, speed: 2.1, reward: 34, radius: .27, color: 0xc9a35a, damage: 12, armor: .1, tier: 3, desc: 'Caballería alada', descEn: 'Winged cavalry', counter: 'aa' }
    ],
    boss: { id: 'spartanBoss', name: 'Rey Espartano', kind: 'ground', hp: 4500, speed: 0.65, reward: 550, radius: .9, color: 0x6b4a2e, damage: 45, armor: .6, tier: 5, desc: 'Jefe de facción', boss: true, structureDamage: 25, counter: 'art' }
  },
  {
    id: 'crusaders', name: 'Cruzados', nameEn: 'Crusaders', flag: '⚔️', color: 0x8b4513,
    climate: 'templado', tempC: 18, tempF: 64,
    units: [
      { id: 'crusader', name: 'Soldado cruzado', kind: 'ground', hp: 100, speed: 0.8, reward: 18, radius: .23, color: 0x8b4513, damage: 8, armor: .15, tier: 1, desc: 'Con bandera y espada', counter: 'rocket' },
      { id: 'knight', name: 'Caballero templario', kind: 'ground', hp: 300, speed: 0.65, reward: 42, radius: .32, color: 0x5a2d0c, damage: 18, armor: .45, tier: 3, desc: 'Blindaje de platesa', counter: 'art' },
      { id: 'archer', name: 'Arquero cruzado', kind: 'ground', hp: 85, speed: 1.1, reward: 22, radius: .2, color: 0x7a3c10, damage: 7, armor: .05, tier: 1, desc: 'Arco largo', counter: 'rocket' },
      { id: 'gryphon', name: 'Grifo cruzado', nameEn: 'Crusader gryphon', kind: 'air', hp: 180, speed: 1.8, reward: 36, radius: .3, color: 0xd4c6a0, damage: 14, armor: .15, tier: 3, desc: 'Bestia sagrada', descEn: 'Sacred beast', counter: 'aa' }
    ],
    boss: { id: 'crusaderBoss', name: 'Señor Cruzado', kind: 'ground', hp: 5000, speed: 0.7, reward: 600, radius: .95, color: 0x4a1e08, damage: 50, armor: .65, tier: 5, desc: 'Jefe de facción', boss: true, structureDamage: 30, counter: 'laser' }
  },
  {
    id: 'pirates', name: 'Piratas', nameEn: 'Pirates', flag: '☠️', color: 0x2c3e50,
    climate: 'tropical', tempC: 28, tempF: 82,
    units: [
      { id: 'cutlass', name: 'Pirata con sable', kind: 'ground', hp: 90, speed: 1.0, reward: 17, radius: .22, color: 0x2c3e50, damage: 7, armor: .1, tier: 1, desc: 'A abordaje', counter: 'gun' },
      { id: 'cannoneer', name: 'Artillero pirata', kind: 'ground', hp: 160, speed: 0.7, reward: 30, radius: .28, color: 0x1a2530, damage: 14, armor: .2, tier: 2, desc: 'Disparo de cañón', counter: 'mortar' },
      { id: 'buccaneer', name: 'Bucanero', kind: 'ground', hp: 130, speed: 1.2, reward: 26, radius: .24, color: 0x3d4e5f, damage: 10, armor: .12, tier: 2, desc: 'Rápido y peligroso', counter: 'gun' },
      { id: 'airship', name: 'Dirigible pirata', nameEn: 'Pirate airship', kind: 'air', hp: 260, speed: 1.1, reward: 44, radius: .4, color: 0x3a4a5a, damage: 16, armor: .18, tier: 3, desc: 'Bombardeo desde las nubes', descEn: 'Bombing from the clouds', counter: 'aa' }
    ],
    boss: { id: 'pirateBoss', name: 'Capitán Pirata', kind: 'ground', hp: 4200, speed: 0.8, reward: 520, radius: .9, color: 0x0f1a25, damage: 40, armor: .5, tier: 5, desc: 'Jefe de facción', boss: true, structureDamage: 28, counter: 'rocket' }
  },
  {
    id: 'wwi', name: 'EEUU Primera Guerra', nameEn: 'WWI USA', flag: '🇺🇸', color: 0x4a5568,
    climate: 'frío', tempC: 8, tempF: 46,
    units: [
      { id: 'doughboy', name: 'Infante estadounidense', kind: 'ground', hp: 85, speed: 0.9, reward: 15, radius: .2, color: 0x4a5568, damage: 7, armor: .08, tier: 1, desc: 'Trinchera 1918', counter: 'mortar' },
      { id: 'doughboyMG', name: 'Fusilero ametralladora', kind: 'ground', hp: 130, speed: 0.8, reward: 25, radius: .24, color: 0x3d4854, damage: 11, armor: .15, tier: 2, desc: 'Fuego de supresión', counter: 'art' },
      { id: 'doughboyTank', name: 'Tanque ligero Renault', kind: 'ground', hp: 320, speed: 0.55, reward: 45, radius: .35, color: 0x5a6472, damage: 20, armor: .45, tier: 3, desc: 'Blindaje ligero', counter: 'rocket' },
      { id: 'biplane', name: 'Biplano de reconocimiento', nameEn: 'Reconnaissance biplane', kind: 'air', hp: 130, speed: 2.6, reward: 30, radius: .24, color: 0x8a8258, damage: 9, armor: .05, tier: 2, desc: 'Aviación de 1918', descEn: '1918 aviation', counter: 'aa' }
    ],
    boss: { id: 'wwiBoss', name: 'Sargento Pershing', kind: 'ground', hp: 4800, speed: 0.7, reward: 580, radius: .95, color: 0x2d3a48, damage: 42, armor: .58, tier: 5, desc: 'Jefe de facción', boss: true, structureDamage: 32, counter: 'laser' }
  },
  {
    id: 'chinaTech', name: 'China Hi-Tech', nameEn: 'China Hi-Tech', flag: '🇨🇳', color: 0xde2910,
    climate: 'templado', tempC: 20, tempF: 68,
    units: [
      { id: 'cyberSoldier', name: 'Soldado cibernético', nameEn: 'Cyber soldier', kind: 'ground', hp: 120, speed: 1.1, reward: 24, radius: .22, color: 0xde2910, damage: 10, armor: .12, tier: 2, desc: 'Refuerzos sintéticos', descEn: 'Synthetic reinforcements', counter: 'ew' },
      { id: 'droneSoldier', name: 'Soldado dron', nameEn: 'Drone soldier', kind: 'ground', hp: 95, speed: 1.4, reward: 22, radius: .2, color: 0xa11212, damage: 8, armor: .05, tier: 2, desc: 'Unidad aérea terrestre', descEn: 'Ground air unit', counter: 'ew' },
      { id: 'mech', name: 'Mecha de combate', nameEn: 'Combat mech', kind: 'ground', hp: 400, speed: 0.65, reward: 55, radius: .4, color: 0x8b1a1a, damage: 25, armor: .5, tier: 4, desc: 'Armas hipertecnológicas', descEn: 'Hyper-tech weapons', counter: 'laser' },
      { id: 'fighter', name: 'Caza furtivo J-31', nameEn: 'J-31 stealth fighter', kind: 'air', hp: 210, speed: 2.6, reward: 48, radius: .26, color: 0x6a7080, damage: 14, armor: .1, tier: 4, desc: 'Caza supersónico furtivo', descEn: 'Supersonic stealth fighter', counter: 'aa' },
      { id: 'bomber', name: 'Bombardero invisible H-20', nameEn: 'H-20 stealth bomber', kind: 'air', hp: 620, speed: 1.1, reward: 96, radius: .48, color: 0x2f3540, damage: 26, armor: .22, tier: 5, desc: 'Ala volante furtiva', descEn: 'Stealth flying wing', counter: 'laser' }
    ],
    boss: { id: 'chinaTechBoss', name: 'Comandante Mecha', kind: 'ground', hp: 6000, speed: 0.75, reward: 700, radius: 1.0, color: 0x5a0a0a, damage: 55, armor: .7, tier: 5, desc: 'Jefe de facción', boss: true, structureDamage: 35, counter: 'ew' }
  },
  {
    id: 'zombies', name: 'Zombies', nameEn: 'Zombies', flag: '🧟', color: 0x556b2f,
    climate: 'radiactivo', tempC: 15, tempF: 59,
    units: [
      { id: 'walker', name: 'Caminante', kind: 'ground', hp: 250, speed: 0.7, reward: 14, radius: .24, color: 0x556b2f, damage: 9, armor: .2, tier: 1, desc: 'Superresistencia', counter: 'gun' },
      { id: 'runner', name: 'Corredor', kind: 'ground', hp: 120, speed: 2.2, reward: 20, radius: .2, color: 0x4a5a28, damage: 7, armor: .05, tier: 2, desc: 'Supervelocidad', counter: 'mortar' },
      { id: 'tankZombie', name: 'Zombie blindado', kind: 'ground', hp: 500, speed: 0.85, reward: 40, radius: .35, color: 0x3d4a22, damage: 16, armor: .45, tier: 3, desc: 'Carne y metal', counter: 'rocket' },
      { id: 'mutantBat', name: 'Murciélago mutante', nameEn: 'Mutant bat', kind: 'air', hp: 110, speed: 2.8, reward: 24, radius: .2, color: 0x6a5a3a, damage: 7, armor: .02, tier: 2, desc: 'Enjambre nocturno', descEn: 'Night swarm', counter: 'aa' }
    ],
    boss: { id: 'zombieBoss', name: 'Zombie Colosal', kind: 'ground', hp: 7000, speed: 1.1, reward: 800, radius: 1.1, color: 0x2d3a18, damage: 50, armor: .75, tier: 5, desc: 'Jefe de facción', boss: true, structureDamage: 40, counter: 'art' }
  },
  {
    id: 'ufos', name: 'OVNIs', nameEn: 'UFOs', flag: '🛸', color: 0x4a90e2,
    climate: 'desconocido', tempC: -10, tempF: 14,
    units: [
      { id: 'scout', name: 'OVNIs explorador', kind: 'air', hp: 110, speed: 2.0, reward: 28, radius: .22, color: 0x4a90e2, damage: 9, armor: .08, tier: 2, desc: 'Reconocimiento alien', counter: 'aa' },
      { id: 'interceptor', name: 'OVNIs interceptores', kind: 'air', hp: 180, speed: 3.5, reward: 42, radius: .26, color: 0x2c5aa0, damage: 14, armor: .12, tier: 3, desc: 'Interceptación hipersónica', counter: 'laser' },
      { id: 'mothershipScout', name: 'Nave nodriza menor', kind: 'air', hp: 300, speed: 1.5, reward: 55, radius: .4, color: 0x1a3a6a, damage: 20, armor: .25, tier: 4, desc: 'Hipertecnología avanzada', counter: 'ew' },
      { id: 'abductor', name: 'Saqueador alienígena', nameEn: 'Alien raider', kind: 'ground', hp: 200, speed: 1.0, reward: 34, radius: .26, color: 0x5a8ac0, damage: 14, armor: .2, tier: 3, desc: 'Infantería de asalto', descEn: 'Assault infantry', counter: 'gun' },
      { id: 'tripod', name: 'Trípode de asedio', nameEn: 'Siege tripod', kind: 'ground', hp: 500, speed: 0.65, reward: 60, radius: .4, color: 0x2c5aa0, damage: 22, armor: .4, tier: 4, desc: 'Blindaje alienígena', descEn: 'Alien armor', counter: 'rocket' }
    ],
    boss: { id: 'ufoBoss', name: 'Nave Madre Alienígena', kind: 'air', hp: 8000, speed: 1.8, reward: 900, radius: 1.2, color: 0x0a1a4a, damage: 60, armor: .8, tier: 5, desc: 'Jefe de facción', boss: true, structureDamage: 45, counter: 'aa' }
  },
  {
    id: 'demons', name: 'Demonios', nameEn: 'Demons', flag: '😈', color: 0x8b1a1a,
    climate: 'infernal', tempC: 45, tempF: 113,
    units: [
      { id: 'imp', name: 'Diablillo', nameEn: 'Imp', kind: 'ground', hp: 110, speed: 1.2, reward: 20, radius: .2, color: 0xb33a2a, damage: 9, armor: .08, tier: 2, desc: 'Legión menor', descEn: 'Lesser legion', counter: 'gun' },
      { id: 'hellKnight', name: 'Caballero infernal', nameEn: 'Hell knight', kind: 'ground', hp: 340, speed: 0.8, reward: 46, radius: .34, color: 0x6b1414, damage: 20, armor: .5, tier: 3, desc: 'Armadura de obsidiana', descEn: 'Obsidian armor', counter: 'rocket' },
      { id: 'demonWing', name: 'Ala infernal', nameEn: 'Infernal wing', kind: 'air', hp: 160, speed: 2.4, reward: 32, radius: .24, color: 0xd04a2a, damage: 12, armor: .1, tier: 3, desc: 'Cazador de los cielos', descEn: 'Sky hunter', counter: 'aa' },
      { id: 'hellBomber', name: 'Bombardero abisal', nameEn: 'Abyssal bomber', kind: 'air', hp: 420, speed: 1.3, reward: 70, radius: .4, color: 0x4a0a0a, damage: 24, armor: .2, tier: 4, desc: 'Fuego del abismo', descEn: 'Abyssal fire', counter: 'laser' }
    ],
    boss: { id: 'demonBoss', name: 'Señor de la Guerra Infernal', nameEn: 'Infernal Warlord', kind: 'ground', hp: 9200, speed: 0.8, reward: 1000, radius: 1.15, color: 0x3a0505, damage: 65, armor: .82, tier: 5, desc: 'Jefe de facción', boss: true, structureDamage: 48, counter: 'laser' }
  },
  {
    id: 'celestials', name: 'Seres Celestiales', nameEn: 'Celestials', flag: '✨', color: 0xfdd835,
    climate: 'divino', tempC: 35, tempF: 95,
    units: [
      { id: 'angel', name: 'Ángel mensajero', kind: 'air', hp: 160, speed: 1.8, reward: 32, radius: .24, color: 0xfdd835, damage: 12, armor: .15, tier: 3, desc: 'Luz celestial', counter: 'aa' },
      { id: 'archon', name: 'Arconte', kind: 'air', hp: 280, speed: 2.2, reward: 48, radius: .3, color: 0xe6c200, damage: 18, armor: .3, tier: 4, desc: 'Ser de energía', counter: 'laser' },
      { id: 'seraph', name: 'Serafín', kind: 'air', hp: 420, speed: 1.5, reward: 65, radius: .4, color: 0xffe066, damage: 25, armor: .4, tier: 5, desc: 'Ser supremo', counter: 'ew' },
      { id: 'guardian', name: 'Guardián celestial', nameEn: 'Celestial guardian', kind: 'ground', hp: 300, speed: 0.9, reward: 44, radius: .3, color: 0xf0d060, damage: 16, armor: .35, tier: 4, desc: 'Centinela del santuario', descEn: 'Sanctuary sentinel', counter: 'rocket' }
    ],
    boss: { id: 'celestialBoss', name: 'Ser Supremo', kind: 'air', hp: 10000, speed: 2.0, reward: 1100, radius: 1.3, color: 0xfff200, damage: 70, armor: .85, tier: 5, desc: 'Jefe de facción', boss: true, structureDamage: 50, counter: 'aa' }
  }
];

// Diálogos de radio enemiga antes de cada oleada (se muestran en el panel de
// inteligencia y en el aviso de oleada). Cada facción tiene tres líneas normales
// y una línea especial para su jefe final.
const FACTION_DIALOGUES = {
  cavemen: {
    lines: ['Fuego, piedra y garrotes. Vuestra base caerá.', 'La tribu ha despertado... y tiene hambre.', 'El chamán ha leído vuestro final en los huesos.', 'El suelo retumba bajo mil pies descalzos. No hay muro que detenga la estampida.'],
    linesEn: ['Fire, stone and clubs. Your base will fall.', 'The tribe has awakened... and it is hungry.', 'The shaman has read your end in the bones.', 'The ground rumbles under a thousand bare feet. No wall stops the stampede.'],
    boss: 'La montaña tiembla. El Jefe Cavernícola marcha a la cabeza.',
    bossEn: 'The mountain trembles. The Caveman Chief marches at the front.'
  },
  spartans: {
    lines: ['Esto no es una batalla. Es una lección de disciplina.', 'Nuestros escudos no conocen la retirada.', 'Cada lanza espartana busca un hueco en vuestra línea.', 'Formad la falange. Ni el acero ni el miedo romperán nuestra línea.'],
    linesEn: ['This is not a battle. It is a lesson in discipline.', 'Our shields know no retreat.', 'Every Spartan spear seeks a gap in your line.', 'Form the phalanx. Neither steel nor fear will break our line.'],
    boss: 'El Rey Espartano ha desenvainado. Que los cobardes huyan.',
    bossEn: 'The Spartan King has drawn his blade. Let cowards flee.'
  },
  crusaders: {
    lines: ['La fe es nuestra armadura. Vuestra base será el altar.', 'Los estandartes avanzan bajo un cielo de acero.', 'No pedimos clemencia. No la concedemos.', 'Las reliquias han sido despertadas. Marchad hasta la última muralla.'],
    linesEn: ['Faith is our armor. Your base shall be the altar.', 'The banners advance under a steel sky.', 'We ask no mercy. We grant none.', 'The relics have been awakened. March to the last wall.'],
    boss: 'El Señor Cruzado alza la espada. La cruzada final comienza.',
    bossEn: 'The Crusader Lord raises his sword. The final crusade begins.'
  },
  pirates: {
    lines: ['Vuestro oro y vuestra pólvora ya tienen dueño.', 'Cargad los cañones. Saquearemos hasta el último muro.', 'El capitán ha puesto precio a vuestra bandera.', 'La marea sube y con ella nuestra flota. Saquearemos hasta el amanecer.'],
    linesEn: ['Your gold and powder already have an owner.', 'Load the cannons. We will plunder every last wall.', 'The captain has put a price on your flag.', 'The tide rises, and our fleet with it. We will plunder until dawn.'],
    boss: 'El Capitán Pirata iza la calavera. ¡Abordaje!',
    bossEn: 'The Pirate Captain raises the skull. Board them!'
  },
  wwi: {
    lines: ['La artillería pesada abre el camino. Mantened la formación.', 'Vuestra línea está a tiro. Ajustad las miras.', '1918 ha llegado a este frente con acero y gas.', 'El frente se ha estabilizado. Ahora traed los obuses de asedio.'],
    linesEn: ['Heavy artillery clears the way. Hold formation.', 'Your line is in range. Adjust your sights.', '1918 has reached this front with steel and gas.', 'The front has stabilized. Now bring up the siege howitzers.'],
    boss: 'El Sargento Pershing ordena el asalto final. Que retumbe el frente.',
    bossEn: 'Sergeant Pershing orders the final assault. Let the front thunder.'
  },
  chinaTech: {
    lines: ['Redes neuronales ya han simulado vuestra derrota.', 'Drones y mechas avanzan en sincronía perfecta.', 'La tecnología no duda. La carne sí.', 'Los datos confirman vuestra fatiga. La siguiente simulación termina en derrota.'],
    linesEn: ['Neural networks have already simulated your defeat.', 'Drones and mechs advance in perfect sync.', 'Technology does not hesitate. Flesh does.', 'The data confirms your fatigue. The next simulation ends in defeat.'],
    boss: 'El Comandante Mecha ha despertado. Iniciad el protocolo de aniquilación.',
    bossEn: 'The Mech Commander has awakened. Initiate annihilation protocol.'
  },
  zombies: {
    lines: ['La horda no siente dolor. Solo hambre.', 'El aire radiactivo ya está aquí. Corred, si podéis.', 'Cada caído se levanta. Vuestra munición no es infinita.', 'La horda ha aprendido vuestros patrones. No volveréis a sorprendernos.'],
    linesEn: ['The horde feels no pain. Only hunger.', 'Radioactive air is here. Run, if you can.', 'Every fallen soldier rises. Your ammo is not infinite.', 'The horde has learned your patterns. You will not surprise us again.'],
    boss: 'El Zombie Colosal arrasa el horizonte. La horda ruge.',
    bossEn: 'The Colossal Zombie blots the horizon. The horde roars.'
  },
  ufos: {
    lines: ['Hemos catalogado vuestras defensas. Son... pintorescas.', 'El cielo pertenece a quienes lo comprenden.', 'La abducción comenzará por vuestra base.', 'Nuestros sensores detectan grietas en vuestro cielo. La invasión se acelera.'],
    linesEn: ['We have catalogued your defenses. They are... quaint.', 'The sky belongs to those who understand it.', 'The abduction will begin with your base.', 'Our sensors detect cracks in your sky. The invasion accelerates.'],
    boss: 'La Nave Madre alienígena ha entrado en órbita baja. No hay refugio.',
    bossEn: 'The Alien Mothership has entered low orbit. There is no shelter.'
  },
  demons: {
    lines: ['El abismo ha abierto sus puertas. Vuestra base huele a miedo.', 'Legiones de fuego han cruzado el velo. No hay vuelta atrás.', 'Cada alma en esa base arderá en nuestro nombre.', 'Los sellos se debilitan. Pronto caminaremos bajo vuestro sol.'],
    linesEn: ['The abyss has opened its gates. Your base smells of fear.', 'Fire legions have crossed the veil. There is no going back.', 'Every soul in that base will burn in our name.', 'The seals weaken. Soon we will walk under your sun.'],
    boss: 'El Señor de la Guerra Infernal desciende. Las murallas se agrietan.',
    bossEn: 'The Infernal Warlord descends. The walls crack.'
  },
  celestials: {
    lines: ['La luz no negocia con la oscuridad de vuestras máquinas.', 'Hemos visto el fin de vuestros siglos y no os incluye.', 'Nuestro coro no canta victorias. Pronuncia juicios.', 'El juicio se acerca. Cada torre que alzáis es un pecado que anotamos.'],
    linesEn: ['Light does not negotiate with the darkness of your machines.', 'We have seen the end of your centuries, and you are not in it.', 'Our choir does not sing victories. It pronounces judgment.', 'Judgment approaches. Every tower you raise is a sin we record.'],
    boss: 'El Ser Supremo desciende. Todo lo que alzasteis será humo.',
    bossEn: 'The Supreme Being descends. Everything you raised shall become smoke.'
  }
};
function factionDialogue(fac, wave, boss) {
  const d = FACTION_DIALOGUES[fac.id];
  if (!d) return '';
  if (boss) return settings.language === 'en' ? (d.bossEn || d.boss) : d.boss;
  const stage = waveInFaction(wave);
  const lines = settings.language === 'en' ? (d.linesEn || d.lines) : d.lines;
  return lines[Math.max(0, Math.min(lines.length - 1, stage - 1))] || '';
}

// Traducciones de apoyo para las tropas de facción (el resto de datos ya es bilingüe).
const ENEMY_EN = {
  clubber: 'Club brute', brute: 'Caveman brute', shaman: 'Shaman', cavemenBoss: 'Caveman Chief',
  hoplite: 'Giant hoplite', spartan: 'Elite Spartan', spearman: 'Spearman', spartanBoss: 'Spartan King',
  crusader: 'Crusader soldier', knight: 'Templar knight', archer: 'Crusader archer', crusaderBoss: 'Crusader Lord',
  cutlass: 'Cutlass pirate', cannoneer: 'Pirate gunner', buccaneer: 'Buccaneer', pirateBoss: 'Pirate Captain',
  doughboy: 'US infantryman', doughboyMG: 'Machine gunner', doughboyTank: 'Renault light tank', wwiBoss: 'Sergeant Pershing',
  cyberSoldier: 'Cyber soldier', droneSoldier: 'Drone soldier', mech: 'Combat mech', chinaTechBoss: 'Mech Commander',
  walker: 'Walker', runner: 'Runner', tankZombie: 'Armored zombie', zombieBoss: 'Colossal zombie',
  scout: 'UFO scout', interceptor: 'UFO interceptor', mothershipScout: 'Lesser mothership', ufoBoss: 'Alien mothership',
  angel: 'Messenger angel', archon: 'Archon', seraph: 'Seraph', celestialBoss: 'Supreme Being',
  pterodactyl: 'War pterodactyl', pegasus: 'Pegasus rider', gryphon: 'Crusader gryphon', airship: 'Pirate airship',
  biplane: 'Reconnaissance biplane', mutantBat: 'Mutant bat', abductor: 'Alien raider', tripod: 'Siege tripod',
  imp: 'Imp', hellKnight: 'Hell knight', demonWing: 'Infernal wing', hellBomber: 'Abyssal bomber', demonBoss: 'Infernal Warlord',
  guardian: 'Celestial guardian'
};
for (const fac of ENEMY_FACTIONS) {
  if (!fac.nameEn) fac.nameEn = fac.name;
  for (const u of fac.units) if (!u.nameEn) u.nameEn = ENEMY_EN[u.id] || u.name;
  if (!fac.boss.nameEn) fac.boss.nameEn = ENEMY_EN[fac.boss.id] || fac.boss.name;
}

// Vulnerabilidad a la guerra electrónica (0 = inmune, 1 = totalmente expuesta).
// Solo las unidades que dependen de radio, radar, GPS o sistemas de guiado
// pueden ser ralentizadas o repelidas por EW. Las criaturas, la magia y las
// aeronaves puramente mecánicas no se ven afectadas.
const JAM_BY_FACTION = {
  cavemen: 0, spartans: 0, crusaders: 0, pirates: .1, wwi: .35,
  chinaTech: 1, zombies: .05, ufos: 1, demons: .1, celestials: .15
};
const JAM_OVERRIDES = {
  // Fauna, magia y aviación sin electrónica de guiado.
  pterodactyl: 0, pegasus: 0, gryphon: 0, mutantBat: 0, demonWing: 0,
  hellBomber: 0, angel: 0, archon: .2, seraph: .25, guardian: .1,
  // Aviación con electrónica parcial: radio, brújula o navegación inercial.
  airship: .15, biplane: .25, bomber: .6,
  // Sistemas modernos dependientes de datos, radar y enlace.
  cyberSoldier: 1, droneSoldier: 1, mech: 1, fighter: 1,
  scout: 1, interceptor: 1, mothershipScout: 1, abductor: .8, tripod: 1,
  // Jefes: solo los tecnológicos son plenamente vulnerables.
  chinaTechBoss: 1, ufoBoss: 1, pirateBoss: .15, wwiBoss: .3,
  zombieBoss: 0, demonBoss: .1, celestialBoss: .15
};
// Habilidades especiales de los jefes contra estructuras. Se ejecutan con
// temporizadores de simulación, por lo que pausar o acelerar no altera el ritmo.
const BOSS_SKILLS = {
  smash: { name: 'Golpe sísmico', nameEn: 'Seismic smash', desc: 'Golpea la estructura más cercana y le arranca dos niveles; puede destruirla si está a nivel 1', descEn: 'Hits the nearest structure for two levels; may destroy it at level 1', icon: '✹', cooldown: 7.5, maxTargets: 1, radius: 2.2, levels: 2, stun: 4, destroyWeak: true },
  siege: { name: 'Asedio concentrado', nameEn: 'Focused siege', desc: 'Martillea las dos estructuras más cercanas y las deja aturdidas', descEn: 'Hammers the two nearest structures and stuns them', icon: '☄', cooldown: 8, maxTargets: 2, radius: 2.4, levels: 2, stun: 2.5 },
  sabotage: { name: 'Sabotaje', nameEn: 'Sabotage', desc: 'Intenta destruir la estructura más cercana; si no puede, la degrada por completo', descEn: 'Attempts to destroy the nearest structure; if it cannot, strips it completely', icon: '☠', cooldown: 12, maxTargets: 1, radius: 2.2, levels: 9, stun: 0, destroy: true },
  barrage: { name: 'Barrera de mando', nameEn: 'Command barrage', desc: 'Inhabilita las estructuras más cercanas en un área amplia', descEn: 'Disables the nearest structures over a wide area', icon: '✷', cooldown: 8.5, maxTargets: 3, radius: 3.4, levels: 1, stun: 5 },
  emp: { name: 'Pulso de apagón', nameEn: 'Blackout pulse', desc: 'Inhabilita las estructuras cercanas al jefe durante varios segundos', descEn: 'Disables structures near the boss for several seconds', icon: '⌁', cooldown: 10, maxTargets: 99, radius: 5.5, levels: 0, stun: 6, areaFromBoss: true },
  abduct: { name: 'Abducción estructural', nameEn: 'Structural abduction', desc: 'Intenta llevarse la estructura más cercana del tablero', descEn: 'Attempts to abduct the nearest structure', icon: '◉', cooldown: 13, maxTargets: 1, radius: 2.2, levels: 9, stun: 0, destroy: true },
  inferno: { name: 'Infierno de asedio', nameEn: 'Siege inferno', desc: 'Quema las estructuras más cercanas y puede destruir las de nivel bajo', descEn: 'Burns the nearest structures and may destroy low-level ones', icon: '🔥', cooldown: 9, maxTargets: 3, radius: 3, levels: 2, stun: 5, destroyWeak: true },
  judgment: { name: 'Juicio celestial', nameEn: 'Celestial judgment', desc: 'Degrada e inhabilita las estructuras más cercanas en un sector amplio', descEn: 'Degrades and disables the nearest structures in a wide sector', icon: '✦', cooldown: 12, maxTargets: 99, radius: 6.5, levels: 1, stun: 4.5, areaFromBoss: true }
};
const BOSS_SKILL_BY_ID = {
  cavemenBoss: 'smash', spartanBoss: 'siege', crusaderBoss: 'siege', pirateBoss: 'sabotage',
  wwiBoss: 'barrage', chinaTechBoss: 'emp', zombieBoss: 'smash', ufoBoss: 'abduct',
  demonBoss: 'inferno', celestialBoss: 'judgment'
};

// Índice plano de todos los tipos (mantiene compatibilidad con código existente)
const ENEMIES = {};
for (const fac of ENEMY_FACTIONS) {
  const bossSkill = BOSS_SKILL_BY_ID[fac.boss.id] || 'siege';
  fac.boss.bossSkill = bossSkill;
  for (const u of fac.units) ENEMIES[u.id] = { ...u, faction: fac.id, icon: u.icon || (u.kind === 'air' ? '✈' : '▮') };
  ENEMIES[fac.boss.id] = { ...fac.boss, faction: fac.id, icon: fac.boss.icon || '☠', bossSkill };
}
for (const type of Object.keys(ENEMIES)) {
  const d = ENEMIES[type];
  if (d.jam == null) d.jam = JAM_OVERRIDES[type] != null ? JAM_OVERRIDES[type] : (JAM_BY_FACTION[d.faction] || 0);
}
function enemyFaction(type) { return ENEMIES[type] ? ENEMIES[type].faction : null; }
// Cada facción domina 4 oleadas normales y después aparece su jefe final.
const WAVES_PER_FACTION = 4;
const FACTION_CYCLE = WAVES_PER_FACTION + 1;
function factionIndexForWave(wave) {
  const w = Math.max(1, wave | 0);
  return ((Math.floor((w - 1) / FACTION_CYCLE) % ENEMY_FACTIONS.length) + ENEMY_FACTIONS.length) % ENEMY_FACTIONS.length;
}
function factionByWave(wave) { return ENEMY_FACTIONS[factionIndexForWave(wave)]; }
function waveInFaction(wave) { return ((Math.max(1, wave | 0) - 1) % FACTION_CYCLE) + 1; }
function isBossWave(wave) { return ((Math.max(1, wave | 0) - 1) % FACTION_CYCLE) === WAVES_PER_FACTION; }
function wavesUntilBoss(wave) {
  const stage = waveInFaction(wave);
  return isBossWave(wave) ? 0 : FACTION_CYCLE - stage;
}

const MAP = { w: 44, h: 26, cell: 1 };
const SEA_ROWS = 5;                 // filas cz 0..4
const SEA_LIMIT = -6.5;             // z < SEA_LIMIT es agua

/* Una única pista terrestre de dos carriles. Así las unidades no se cruzan,
   la carretera ocupa una sola celda y queda espacio de construcción limpio. */
const ROUTES = [
  {
    id: 'main', name: 'Pista principal', nameEn: 'Main road', color: 0x706554,
    points: [
      [-21, -6], [-17, -6], [-17, -2], [-13, -2], [-13, 2],
      [-9, 2], [-9, -2], [-5, -2], [-5, 4],
      [-1, 4], [-1, 0], [3, 0], [3, 6],
      [7, 6], [7, 2], [11, 2], [11, -2],
      [15, -2], [13.5, -1.5]
    ]
  }
];
// La calzada se dibuja en el centro de sus celdas. Los puntos de ruta se
// normalizan a ese mismo centro para que las unidades caminen sobre el asfalto
// y no por el borde de la celda (donde un carril quedaría sobre la hierba).
for (const route of ROUTES) {
  route.points = route.points.map(([x, z]) => {
    const cell = worldCell(x, z);
    const center = cellCenter(cell.x, cell.z);
    return [center.x, center.z];
  });
}
const AIR_ROUTE = { id: 'air', name: 'Corredor aéreo', nameEn: 'Air corridor', points: [[-21, -10], [-14, -11], [-6, -10], [2, -8], [10, -6], [18, -4], [13.5, -1.5]] };

const APP_VERSION = '2.9.0';
const STORE_SETTINGS = 'frente-global:settings:v1';
const STORE_RECORDS = 'frente-global:records:v1';
function loadStore(key, fallback) {
  try { const raw = localStorage.getItem(key); if (!raw) return { ...fallback }; return { ...fallback, ...JSON.parse(raw) }; }
  catch { return { ...fallback }; }
}
const DEFAULT_LANGUAGE = (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
const settings = loadStore(STORE_SETTINGS, { quality: 'auto', sound: true, volume: .65, music: true, musicTrack: 'auto', army: 0, difficulty: DEFAULT_DIFFICULTY, labels: true, language: DEFAULT_LANGUAGE });
if (settings.language !== 'en' && settings.language !== 'es') settings.language = DEFAULT_LANGUAGE;
if (!['auto', 'march', 'ambient', 'electronic', 'infernal', 'celestial'].includes(settings.musicTrack)) settings.musicTrack = 'auto';
settings.difficulty = clampDifficulty(settings.difficulty);
const records = loadStore(STORE_RECORDS, { bestWave: 0, bestScore: 0, totalKills: 0, plays: 0 });
function persistSettings() { try { localStorage.setItem(STORE_SETTINGS, JSON.stringify(settings)); } catch { } }
function persistRecords() { try { localStorage.setItem(STORE_RECORDS, JSON.stringify(records)); } catch { } }

/* --------------------------------------------------------------- idiomas */
const I18N = {
  es: {
    'doc.title': 'Frente Global | Defensa táctica',
    'doc.description': 'Tower defense táctico con ocho doctrinas militares, guerra naval y apoyo de mando. Defiende la línea en Android y escritorio.',
    'brand.sub': 'Comando de defensa',
    'stat.credits': 'Créditos', 'stat.integrity': 'Integridad', 'stat.wave': 'Oleada', 'stat.enemies': 'Enemigos', 'stat.threat': 'Amenaza', 'stat.climate': 'Clima', 'stat.faction': 'Facción',
    'action.army': 'Ejército', 'action.armyTitle': 'Cambiar ejército', 'action.centerTitle': 'Centrar cámara',
    'action.soundOn': 'Silenciar (M)', 'action.soundOff': 'Activar sonido (M)',
    'action.pause': 'Pausa (P)', 'action.resume': 'Reanudar (P)',
    'action.fullscreen': 'Pantalla completa (F)', 'action.exitFullscreen': 'Salir de pantalla completa (F)', 'action.settings': 'Ajustes',
    'build.kicker': 'Arsenal de campo', 'build.title': 'Construir',
    'build.hint': 'Sistemas terrestres y navales. Elige uno y colócalo en una casilla libre. Teclas 1–9. El coste sube con cada estructura y oleada.',
    'build.hintLocked': 'Arsenal bloqueado durante el combate. Compra y mejora entre oleadas.', 'build.lockedShort': 'BLOQUEADO',
    'inspect.kicker': 'Control táctico', 'inspect.title': 'Inspección',
    'inspect.empty': 'Selecciona una torre del mapa para ver sus parámetros y órdenes disponibles.',
    'wave.start': 'Iniciar oleada', 'zoom.out': 'Alejar cámara', 'zoom.in': 'Acercar cámara', 'common.cancel': 'Cancelar',
    'wave.startFac': 'Iniciar oleada · {name}', 'wave.startBoss': '¡JEFE FINAL! · {name}', 'wave.inProgress': 'Oleada {wave} en curso',
    'faction.stage': 'Oleada {stage}/{total}', 'faction.bossNow': 'JEFE FINAL', 'faction.bossIn': 'Jefe en {n}',
    'waveBanner.boss': 'JEFE FINAL', 'waveBanner.stage': 'Oleada {stage} de {total}', 'waveBanner.climate': '{climate} · {temp}°C',
    'waveBanner.incoming': 'Nueva facción detectada', 'waveBanner.escorts': 'Escolta: {n} unidades',
    'waveBanner.infiltrators': 'Infiltrados: {n}', 'waveBanner.bossSkill': 'Habilidad: {name}',
    'climate.templado': 'Templado', 'climate.caluroso': 'Caluroso', 'climate.tropical': 'Tropical', 'climate.frío': 'Frío',
    'climate.radiactivo': 'Radiactivo', 'climate.desconocido': 'Desconocido', 'climate.infernal': 'Infernal', 'climate.divino': 'Divino',
    'ability.strike': 'Ataque aéreo', 'ability.strikeHint': 'Z · 120 cr', 'ability.strikeTitle': 'Ataque aéreo (Z) · 120 créditos',
    'ability.emp': 'Pulso EMP', 'ability.empHint': 'X · 90 cr', 'ability.empTitle': 'Pulso EMP (X) · 90 créditos',
    'ability.repair': 'Reparar base', 'ability.repairHint': 'C · {cost} cr', 'ability.repairTitle': 'Reparar base (C) · {cost} créditos',
    'map.sector': 'SECTOR 07 / CUADRÍCULA 01',
    'menu.eyebrow': 'Protocolo de despliegue · Operación indefinida', 'menu.title': 'Elige tu fuerza',
    'menu.copyHtml': 'Una pista de dos carriles. Un mar. Un corredor aéreo.<br>Tu doctrina define cada defensa.',
    'menu.note': 'Los parámetros son valores de equilibrio de juego.',
    'menu.bestWave': 'Mejor oleada', 'menu.record': 'Récord', 'menu.runs': 'Partidas',
    'menu.install': 'Instalar app', 'menu.deploy': 'Desplegar fuerza →', 'menu.roster': 'Dotación:',
    'menu.difficulty': 'Dificultad', 'menu.diffStart': 'Inicio', 'menu.diffBounty': 'Botín',
    'menu.difficultySummary': 'Créditos iniciales {cash} ◈ · Recompensas ×{bounty}',
    'menu.difficultyHint': 'La dificultad invierte la economía: menos créditos iniciales y por baja cuanto más dura sea.',
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
    'settings.music': 'Música', 'settings.musicHint': 'Banda sonora procedural distinta por facción, con variación de jefe. Sin archivos externos.',
    'settings.musicTrack': 'Pista musical',
    'music.auto': 'Automática (facción y jefe)', 'music.march': 'Marcha de acero', 'music.ambient': 'Horizonte de ceniza',
    'music.electronic': 'Protocolo neón', 'music.infernal': 'Cántico abisal', 'music.celestial': 'Coro de luz',
    'settings.labels': 'Etiquetas enemigas', 'settings.labelsHint': 'Muestra el tipo y el rango de veterano o élite sobre cada unidad.',
    'settings.volume': 'Volumen', 'settings.fullscreen': 'Pantalla completa', 'settings.fullscreenHint': 'Útil en escritorio y Android.',
    'settings.fullscreenUnavailable': 'Tu navegador no permite pantalla completa.',
    'settings.install': 'Instalar aplicación', 'settings.installHint': 'Añádela a tu pantalla de inicio para jugar sin conexión.',
    'settings.installHintInstalled': 'Aplicación instalada. Se actualiza sola al abrirla.',
    'settings.installHintBrowser': 'Abre el menú del navegador y elige «Añadir a pantalla de inicio» para instalar.',
    'settings.progress': 'Progreso local', 'settings.progressHint': 'Récords y preferencias se guardan en este dispositivo.',
    'settings.reset': 'Borrar récord', 'settings.modeInstalled': 'instalada', 'settings.modeBrowser': 'navegador',
    'settings.shortcutsHtml': '<b>Teclado</b><br><kbd>1</kbd>–<kbd>9</kbd> construir · <kbd>Espacio</kbd> oleada/pausa · <kbd>P</kbd> pausa<br><kbd>Z</kbd> ataque aéreo · <kbd>X</kbd> EMP · <kbd>C</kbd> reparar base · <kbd>R</kbd> habilidad de la torre<br><kbd>M</kbd> sonido · <kbd>F</kbd> pantalla completa · <kbd>Esc</kbd> cancelar<br><kbd>WASD</kbd>/flechas mover cámara · <kbd>Q</kbd><kbd>E</kbd> rotar · rueda zoom<br><b>Táctil:</b> un dedo desplaza, dos dedos hacen zoom, toca para construir.<br><b>Mar:</b> destructores y portaaviones se despliegan en el agua.',
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
    'tower.climate': 'Clima', 'tower.special': 'Habilidad especial', 'tower.specialCost': '{cost} cr',
    'tower.specialReady': 'Lista', 'tower.specialCd': 'Recarga {s} s',
    'mod.damage': 'daño', 'mod.range': 'alcance', 'mod.rate': 'cadencia', 'mod.none': 'sin modificadores',
    'toast.noPosition': 'Posición no disponible para este sistema', 'toast.noCredits': 'Créditos insuficientes',
    'toast.deployed': 'Sistema desplegado', 'toast.place': 'Coloca: {name}', 'toast.placeSea': 'Coloca en el mar: {name}',
    'toast.priority': 'Prioridad: {mode}', 'toast.upgrade': 'Mejora completada · nivel {level}',
    'toast.sold': 'Sistema vendido · 50% de la inversión recuperada', 'toast.waveStart': 'Oleada {wave}: {summary}',
    'toast.bossStructures': '¡El jefe está dañando tus estructuras!', 'toast.bossArrives': '¡{name} ha alcanzado el sector!',
    'toast.waveClear': 'Oleada {wave} contenida · bonificación recibida', 'toast.reloading': '{name} recargando · {s} s',
    'toast.strikeSelect': 'Ataque aéreo: selecciona el punto de impacto', 'toast.emp': 'Pulso EMP · amenazas ralentizadas y drones repelidos',
    'toast.repair': 'Base reparada · +{n}% de integridad', 'toast.repairFull': 'La base ya está a integridad completa', 'toast.strikeActive': 'Ataque aéreo en curso',
    'toast.bossSkill': '{name}: {skill}', 'toast.bossDestroy': '¡{name} ha destruido una estructura!',
    'toast.infiltratorStrike': '¡Un infiltrado ha saboteado una estructura!',
    'toast.army': '{name} desplegado · pista de dos carriles y flota disponibles', 'toast.armyNew': '{name} desplegado · nueva partida iniciada', 'toast.restart': 'Partida reiniciada', 'toast.language': 'Idioma: {language}',
    'toast.camera': 'Cámara centrada', 'toast.recordsCleared': 'Récords borrados', 'toast.quality': 'Calidad gráfica: {level}',
    'toast.qualityReduced': 'Calidad gráfica reducida para mantener la fluidez', 'toast.qualityMinimum': 'Calidad gráfica al mínimo',
    'toast.fullscreenUnavailable': 'Pantalla completa no disponible en este navegador', 'toast.fullscreenFailed': 'No se pudo activar pantalla completa',
    'toast.buildLocked': 'No se puede construir durante la oleada. Espera a que termine.',
    'toast.specialUsed': '{name} activada en {tower}',
    'toast.specialNoTargets': 'Sin objetivos válidos para {name}',
    'toast.installMenu': 'Usa el menú del navegador → Añadir a pantalla de inicio', 'toast.installing': 'Instalando aplicación…',
    'toast.installed': 'Aplicación instalada · lista sin conexión', 'confirm.clearRecords': '¿Borrar los récords guardados en este dispositivo?',
    'threat.none': 'Sin contacto', 'threat.low': 'Baja', 'threat.medium': 'Media', 'threat.high': 'Alta', 'threat.severe': 'Severa', 'threat.critical': 'Crítica',
    'intel.inProgress': 'en curso', 'intel.planned': 'prevista', 'intel.head': 'Oleada {wave} <em>{state}</em>',
    'intel.scaling': 'HP enemigo ×{hp} · daño ×{dmg}', 'intel.noThreats': 'Sin amenazas confirmadas',
    'intel.routes': 'Pista terrestre', 'intel.routesDetail': 'Única · dos carriles', 'intel.airRoute': 'Corredor aéreo',
    'intel.support': 'Apoyo de mando', 'intel.supportHtml': '<kbd>Z</kbd> ataque aéreo · <kbd>X</kbd> EMP · <kbd>C</kbd> reparar',
    'intel.air': 'Aire', 'intel.boss': 'Jefe', 'intel.ground': 'Tierra', 'intel.armor': 'blindaje {n}%',
    'intel.counter': 'Débil ante {name}', 'intel.bossWave': 'Oleada de jefe final',
    'intel.infiltrator': 'Infiltrado', 'intel.infiltrators': 'Infiltrados: {n} · halo violeta',
    'intel.pressure': 'Presión adaptativa ×{x}', 'intel.bossSkill': 'Habilidad de jefe: {name} · {desc}',
    'intel.siegeCap': 'Asedio limitado (escala con la oleada y tu defensa): hasta {dmg} estructuras · hasta {destroy} destruidas',
    'intel.ewFull': 'EW total', 'intel.ewPartial': 'EW {n}%', 'intel.ewImmune': 'EW inmune',
    'rank.elite': 'ÉLITE', 'rank.veteran': 'VETERANO'
  },
  en: {
    'doc.title': 'Frente Global | Tactical defense',
    'doc.description': 'Tactical tower defense with eight military doctrines, naval warfare and command support. Hold the line on Android and desktop.',
    'brand.sub': 'Defense command',
    'stat.credits': 'Credits', 'stat.integrity': 'Integrity', 'stat.wave': 'Wave', 'stat.enemies': 'Enemies', 'stat.threat': 'Threat', 'stat.climate': 'Climate', 'stat.faction': 'Faction',
    'action.army': 'Army', 'action.armyTitle': 'Change army', 'action.centerTitle': 'Center camera',
    'action.soundOn': 'Mute (M)', 'action.soundOff': 'Enable sound (M)',
    'action.pause': 'Pause (P)', 'action.resume': 'Resume (P)',
    'action.fullscreen': 'Fullscreen (F)', 'action.exitFullscreen': 'Exit fullscreen (F)', 'action.settings': 'Settings',
    'build.kicker': 'Field arsenal', 'build.title': 'Build',
    'build.hint': 'Land and naval systems. Pick one and place it on a free tile. Keys 1–9. Cost rises with every structure and wave.',
    'build.hintLocked': 'Arsenal locked during combat. Buy and upgrade between waves.', 'build.lockedShort': 'LOCKED',
    'inspect.kicker': 'Tactical control', 'inspect.title': 'Inspect',
    'inspect.empty': 'Select a tower on the map to view its stats and available orders.',
    'wave.start': 'Start wave', 'zoom.out': 'Zoom out', 'zoom.in': 'Zoom in', 'common.cancel': 'Cancel',
    'wave.startFac': 'Start wave · {name}', 'wave.startBoss': 'FINAL BOSS! · {name}', 'wave.inProgress': 'Wave {wave} in progress',
    'faction.stage': 'Wave {stage}/{total}', 'faction.bossNow': 'FINAL BOSS', 'faction.bossIn': 'Boss in {n}',
    'waveBanner.boss': 'FINAL BOSS', 'waveBanner.stage': 'Wave {stage} of {total}', 'waveBanner.climate': '{climate} · {temp}°C',
    'waveBanner.incoming': 'New faction detected', 'waveBanner.escorts': 'Escort: {n} units',
    'waveBanner.infiltrators': 'Infiltrators: {n}', 'waveBanner.bossSkill': 'Ability: {name}',
    'climate.templado': 'Temperate', 'climate.caluroso': 'Hot', 'climate.tropical': 'Tropical', 'climate.frío': 'Cold',
    'climate.radiactivo': 'Radioactive', 'climate.desconocido': 'Unknown', 'climate.infernal': 'Infernal', 'climate.divino': 'Divine',
    'ability.strike': 'Airstrike', 'ability.strikeHint': 'Z · 120 cr', 'ability.strikeTitle': 'Airstrike (Z) · 120 credits',
    'ability.emp': 'EMP pulse', 'ability.empHint': 'X · 90 cr', 'ability.empTitle': 'EMP pulse (X) · 90 credits',
    'ability.repair': 'Repair base', 'ability.repairHint': 'C · {cost} cr', 'ability.repairTitle': 'Repair base (C) · {cost} credits',
    'map.sector': 'SECTOR 07 / GRID 01',
    'menu.eyebrow': 'Deployment protocol · Indefinite operation', 'menu.title': 'Choose your force',
    'menu.copyHtml': 'One two-lane road. One sea. One air corridor.<br>Your doctrine shapes every defense.',
    'menu.note': 'Values shown are gameplay balance parameters.',
    'menu.bestWave': 'Best wave', 'menu.record': 'High score', 'menu.runs': 'Runs',
    'menu.install': 'Install app', 'menu.deploy': 'Deploy force →', 'menu.roster': 'Loadout:',
    'menu.difficulty': 'Difficulty', 'menu.diffStart': 'Start', 'menu.diffBounty': 'Bounty',
    'menu.difficultySummary': 'Starting credits {cash} ◈ · Rewards ×{bounty}',
    'menu.difficultyHint': 'Difficulty inverts the economy: higher difficulty means fewer starting and kill credits.',
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
    'settings.music': 'Music', 'settings.musicHint': 'A distinct procedural soundtrack per faction, with a boss variation. No external files.',
    'settings.musicTrack': 'Music track',
    'music.auto': 'Automatic (faction & boss)', 'music.march': 'Steel march', 'music.ambient': 'Ash horizon',
    'music.electronic': 'Neon protocol', 'music.infernal': 'Abyssal chant', 'music.celestial': 'Choir of light',
    'settings.labels': 'Enemy labels', 'settings.labelsHint': 'Shows unit type and veteran or elite rank above each unit.',
    'settings.volume': 'Volume', 'settings.fullscreen': 'Fullscreen', 'settings.fullscreenHint': 'Useful on desktop and Android.',
    'settings.fullscreenUnavailable': 'Your browser does not allow fullscreen.',
    'settings.install': 'Install app', 'settings.installHint': 'Add it to your home screen to play offline.',
    'settings.installHintInstalled': 'App installed. It updates itself when opened.',
    'settings.installHintBrowser': 'Open the browser menu and choose “Add to Home Screen” to install.',
    'settings.progress': 'Local progress', 'settings.progressHint': 'Records and preferences are stored on this device.',
    'settings.reset': 'Clear records', 'settings.modeInstalled': 'installed', 'settings.modeBrowser': 'browser',
    'settings.shortcutsHtml': '<b>Keyboard</b><br><kbd>1</kbd>–<kbd>9</kbd> build · <kbd>Space</kbd> wave/pause · <kbd>P</kbd> pause<br><kbd>Z</kbd> airstrike · <kbd>X</kbd> EMP · <kbd>C</kbd> repair base · <kbd>R</kbd> tower special<br><kbd>M</kbd> sound · <kbd>F</kbd> fullscreen · <kbd>Esc</kbd> cancel<br><kbd>WASD</kbd>/arrows move camera · <kbd>Q</kbd><kbd>E</kbd> rotate · wheel zoom<br><b>Touch:</b> one finger pans, two fingers zoom, tap to build.<br><b>Sea:</b> destroyers and carriers deploy on water.',
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
    'tower.climate': 'Climate', 'tower.special': 'Special ability', 'tower.specialCost': '{cost} cr',
    'tower.specialReady': 'Ready', 'tower.specialCd': 'Cooldown {s} s',
    'mod.damage': 'damage', 'mod.range': 'range', 'mod.rate': 'fire rate', 'mod.none': 'no modifiers',
    'toast.noPosition': 'Position unavailable for this system', 'toast.noCredits': 'Insufficient credits',
    'toast.deployed': 'System deployed', 'toast.place': 'Place: {name}', 'toast.placeSea': 'Place at sea: {name}',
    'toast.priority': 'Priority: {mode}', 'toast.upgrade': 'Upgrade complete · level {level}',
    'toast.sold': 'System sold · 50% of the investment recovered', 'toast.waveStart': 'Wave {wave}: {summary}',
    'toast.bossStructures': 'The boss is damaging your structures!', 'toast.bossArrives': '{name} reached the sector!',
    'toast.waveClear': 'Wave {wave} contained · bonus received', 'toast.reloading': '{name} reloading · {s} s',
    'toast.strikeSelect': 'Airstrike: select the impact point', 'toast.emp': 'EMP pulse · threats slowed and drones repelled',
    'toast.repair': 'Base repaired · +{n}% integrity', 'toast.repairFull': 'Base is already at full integrity', 'toast.strikeActive': 'Airstrike in progress',
    'toast.bossSkill': '{name}: {skill}', 'toast.bossDestroy': '{name} destroyed a structure!',
    'toast.infiltratorStrike': 'An infiltrator sabotaged a structure!',
    'toast.army': '{name} deployed · two-lane road and fleet available', 'toast.armyNew': '{name} deployed · new match started', 'toast.restart': 'Match restarted', 'toast.language': 'Language: {language}',
    'toast.camera': 'Camera centered', 'toast.recordsCleared': 'Records cleared', 'toast.quality': 'Graphics quality: {level}',
    'toast.qualityReduced': 'Graphics quality reduced to keep frame rate smooth', 'toast.qualityMinimum': 'Graphics quality set to minimum',
    'toast.fullscreenUnavailable': 'Fullscreen is not available in this browser', 'toast.fullscreenFailed': 'Could not enable fullscreen',
    'toast.buildLocked': 'You cannot build during a wave. Wait until it ends.',
    'toast.specialUsed': '{name} activated on {tower}',
    'toast.specialNoTargets': 'No valid targets for {name}',
    'toast.installMenu': 'Use the browser menu → Add to Home Screen', 'toast.installing': 'Installing app…',
    'toast.installed': 'App installed · ready offline', 'confirm.clearRecords': 'Clear the records saved on this device?',
    'threat.none': 'No contact', 'threat.low': 'Low', 'threat.medium': 'Medium', 'threat.high': 'High', 'threat.severe': 'Severe', 'threat.critical': 'Critical',
    'intel.inProgress': 'in progress', 'intel.planned': 'planned', 'intel.head': 'Wave {wave} <em>{state}</em>',
    'intel.scaling': 'Enemy HP ×{hp} · damage ×{dmg}', 'intel.noThreats': 'No confirmed threats',
    'intel.routes': 'Land road', 'intel.routesDetail': 'Single · two lanes', 'intel.airRoute': 'Air corridor',
    'intel.support': 'Command support', 'intel.supportHtml': '<kbd>Z</kbd> airstrike · <kbd>X</kbd> EMP · <kbd>C</kbd> repair',
    'intel.air': 'Air', 'intel.boss': 'Boss', 'intel.ground': 'Ground', 'intel.armor': 'armor {n}%',
    'intel.counter': 'Weak vs {name}', 'intel.bossWave': 'Final boss wave',
    'intel.infiltrator': 'Infiltrator', 'intel.infiltrators': 'Infiltrators: {n} · violet halo',
    'intel.pressure': 'Adaptive pressure ×{x}', 'intel.bossSkill': 'Boss ability: {name} · {desc}',
    'intel.siegeCap': 'Limited siege (scales with wave and defense size): up to {dmg} structures · up to {destroy} destroyed',
    'intel.ewFull': 'EW full', 'intel.ewPartial': 'EW {n}%', 'intel.ewImmune': 'EW immune',
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
  difficultyIndex: clampDifficulty(settings.difficulty), selectedDifficulty: clampDifficulty(settings.difficulty),
  clock: 0, combatTime: 0, score: 0, paused: false, deployed: false, base: null,
  climate: 'templado', tempC: 22, repairUses: 0, wavePressure: 1,
  waveIntel: [], abilities: {
    strike: { cd: 0, max: 22, cost: 120, name: 'Ataque aéreo', key: 'Z', icon: '✈' },
    emp: { cd: 0, max: 26, cost: 90, name: 'Pulso EMP', key: 'X', icon: '⌁' },
    repair: { cd: 0, max: 40, cost: 80, name: 'Reparar base', key: 'C', icon: '✚' }
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
renderer.toneMapping = THREE.NoToneMapping;
renderer.toneMappingExposure = 1;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8292a0);
scene.fog = new THREE.Fog(0x8292a0, 42, 96);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 160);
const target = new THREE.Vector3(0, 0, 1);
let yaw = 0;
const DEFAULT_DISTANCE = 26;
let distance = DEFAULT_DISTANCE;
let targetDistance = DEFAULT_DISTANCE;
const minDistance = 6.5, maxDistance = 54;
const inclination = 55 * Math.PI / 180;

const hemi = new THREE.HemisphereLight(0xdfe9ee, 0x35402f, .38);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffe6bd, 1.25);
sun.position.set(-16, 26, 12);
sun.castShadow = quality().shadows;
sun.shadow.mapSize.set(quality().shadow, quality().shadow);
sun.shadow.camera.left = -24; sun.shadow.camera.right = 24;
sun.shadow.camera.top = 22; sun.shadow.camera.bottom = -22;
sun.shadow.bias = -.00025; sun.shadow.radius = 4;
scene.add(sun);
const rimLight = new THREE.DirectionalLight(0x9fc6e6, .5);
rimLight.position.set(18, 12, -16);
scene.add(rimLight);

/* ------------------------------------------------------------ clima */
const CLIMATE_PRESETS = {
  templado:   { bg: 0x8292a0, fog: 0x8292a0, sun: 0xffe6bd, waterDeep: 0x025072, waterShallow: 0x075036 },
  caluroso:   { bg: 0xe8d4a0, fog: 0xe8d4a0, sun: 0xffdd8a, waterDeep: 0x1a5a8a, waterShallow: 0x4daa8a },
  tropical:   { bg: 0x4fc3a0, fog: 0x4fc3a0, sun: 0xffd477, waterDeep: 0x0b6e6e, waterShallow: 0x4fc3a0 },
  frío:       { bg: 0xb8c4d4, fog: 0xb8c4d4, sun: 0xdfe9ee, waterDeep: 0x2a4a5a, waterShallow: 0x6ea0b8 },
  radiactivo: { bg: 0x3d2a1a, fog: 0x3d2a1a, sun: 0xaa8844, waterDeep: 0x1a1a2a, waterShallow: 0x5a4a3a },
  desconocido:{ bg: 0x2a1a4a, fog: 0x2a1a4a, sun: 0x88aaff, waterDeep: 0x0a0a2a, waterShallow: 0x2a2a5a },
  infernal:   { bg: 0x3a0a0a, fog: 0x3a0a0a, sun: 0xff6a3a, waterDeep: 0x3a0808, waterShallow: 0x8a2a1a },
  divino:     { bg: 0xfff0d4, fog: 0xfff0d4, sun: 0xfff2cc, waterDeep: 0xd4b880, waterShallow: 0xffeaa8 }
};
function applyClimate(climate, tempC) {
  const p = CLIMATE_PRESETS[climate] || CLIMATE_PRESETS.templado;
  state.climate = climate;
  state.tempC = tempC;
  scene.background.setHex(p.bg);
  scene.fog.color.setHex(p.fog);
  sun.color.setHex(p.sun);
  waterUniforms.uDeep.value.setHex(p.waterDeep);
  waterUniforms.uShallow.value.setHex(p.waterShallow);
  waterMaterial.needsUpdate = true;
  const el = document.getElementById('climateLabel');
  if (el) el.textContent = tempC != null ? `${tempC}°C · ${tr('climate.' + climate)}` : tr('climate.' + climate);
  const overlay = document.getElementById('weatherOverlay');
  if (overlay) {
    overlay.className = 'weather-overlay climate-' + climate;
    overlay.dataset.temp = tempC != null ? `${tempC}°C` : '';
  }
  document.body.classList.remove('climate-templado', 'climate-caluroso', 'climate-tropical', 'climate-frío', 'climate-radiactivo', 'climate-desconocido', 'climate-infernal', 'climate-divino');
  document.body.classList.add('climate-' + climate);
  refreshClimateTowers();
}

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
const waterUniforms = { uTime: { value: 0 }, uDeep: { value: new THREE.Color(0x025072) }, uShallow: { value: new THREE.Color(0x075036) } };
const waterGeometry = new THREE.PlaneGeometry(46.6, 7.4, 110, 24);
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
    uniform float uTime; uniform vec3 uDeep; uniform vec3 uShallow; varying float vWave; varying vec3 vWorld;
    void main(){
      vec3 col = mix(uDeep, uShallow, clamp(.5 + vWave*4.2,0.,1.));
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
water.position.set(0, -.3, -10.5);
world.add(water);

// Clima inicial templado (se aplica una vez existen los uniforms del agua)
applyClimate('templado', 22);

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

  const rim = new THREE.Mesh(new THREE.BoxGeometry(46.6, .55, 27.6), mat(0x555c46));
  rim.position.y = -.44; rim.receiveShadow = true; world.add(rim);
  const edge = new THREE.Mesh(new THREE.BoxGeometry(45.7, .35, 26.7), mat(0x4c5844));
  edge.position.y = -.32; edge.receiveShadow = true; world.add(edge);

  // Rompeolas y espuma en la orilla.
  const foam = new THREE.Mesh(new THREE.PlaneGeometry(46.2, .5), new THREE.MeshBasicMaterial({ color: 0xd9e6dd, transparent: true, opacity: .3, depthWrite: false }));
  foam.rotation.x = -Math.PI / 2; foam.position.set(0, -.05, -10.22); world.add(foam);
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
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), mat(0x59674a, .99));
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
  // El emisor solo debe iluminar mientras dispara. Se apaga de fábrica y el
  // bucle de torres lo enciende con un pulso durante el haz continuo.
  glow.emissiveIntensity = 0;
  root.userData.laserGlow = glow;
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
  } else {
    // Naves: ajustan al casco 2×2 sin invadir celdas vecinas.
    const size = new THREE.Box3().setFromObject(root).getSize(new THREE.Vector3());
    const span = Math.max(size.x, size.z);
    const fit = span > 1.9 ? 1.9 / span : 1;
    root.scale.set(fit, 1, fit);
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
const ALTITUDE = { scout: 3.0, interceptor: 4.0, mothershipScout: 3.5, angel: 3.2, archon: 3.8, seraph: 4.2, fighter: 4.2, bomber: 3.4, ufoBoss: 4.5, celestialBoss: 5.0, pterodactyl: 2.8, pegasus: 3.0, gryphon: 3.2, airship: 3.4, biplane: 4.0, mutantBat: 2.6, demonWing: 3.0, hellBomber: 3.6 };
const labelCache = new Map();
function enemyLabelAccent(type) { return ENEMIES[type] && ENEMIES[type].boss ? '#e8c468' : type === 'bomber' ? '#e0a06a' : '#d8c78a'; }
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
/* ============================================================ arte de unidades
   Estilo "miniatura táctica": figuras compactas y legibles, paletas de facción
   saturadas, armas en mano y siluetas claras. Todo procedural y cacheado. */

const FACTION_PALETTE = {
  cavemen:    { cloth: 0x8a6036, cloth2: 0x4e3418, armor: 0x6b4e2a, accent: 0xd9a94e, skin: 0xb87a4a, metal: 0x8a7248, fur: 0x3a2412 },
  spartans:   { cloth: 0x8f1e18, cloth2: 0x5c120e, armor: 0xb07a22, accent: 0xf0c052, skin: 0xb87a4a, metal: 0xd9a83a, fur: 0x6e1712 },
  crusaders:  { cloth: 0xe4dcc2, cloth2: 0xb0a68a, armor: 0x6e747c, accent: 0xa51f1a, skin: 0xb87a4a, metal: 0xc9b06a, fur: 0x7a1c18 },
  pirates:    { cloth: 0x24313d, cloth2: 0x101820, armor: 0x3a4a5a, accent: 0xd9a83a, skin: 0xa86a42, metal: 0xb0b0a0, fur: 0x0a1117 },
  wwi:        { cloth: 0x6a6a48, cloth2: 0x454632, armor: 0x4e5548, accent: 0x8f3024, skin: 0xae7a52, metal: 0x8e8e80, fur: 0x33392c },
  chinaTech:  { cloth: 0xb01515, cloth2: 0x5e0a0a, armor: 0x22262d, accent: 0x4fd8f5, skin: 0xb9875c, metal: 0x8a9aa8, fur: 0x14181e },
  zombies:    { cloth: 0x4c5c2c, cloth2: 0x2e3a1a, armor: 0x5d6b32, accent: 0xc8d95c, skin: 0x7e9445, metal: 0x6a6a58, fur: 0x222c14 },
  ufos:       { cloth: 0x2f5c9a, cloth2: 0x16305a, armor: 0x7fb0d8, accent: 0x55e8ff, skin: 0x8ec8dc, metal: 0xa8c8dc, fur: 0x0e2244 },
  demons:     { cloth: 0x5a0f0f, cloth2: 0x2a0505, armor: 0x8a2418, accent: 0xff6a2a, skin: 0xb34a32, metal: 0xc9a24a, fur: 0x1a0202 },
  celestials: { cloth: 0xf7f2e0, cloth2: 0xd9c07c, armor: 0xf2dd9a, accent: 0xffdf63, skin: 0xf0c98a, metal: 0xe9c45e, fur: 0xc9a24a }
};

const basicMatCache = new Map();
function basicMat(color, opacity = 1) {
  const key = `${color}:${opacity}`;
  if (!basicMatCache.has(key)) basicMatCache.set(key, new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: opacity >= 1 }));
  return basicMatCache.get(key);
}
const outlineMat = new THREE.MeshBasicMaterial({ color: 0x11140e, side: THREE.BackSide, depthWrite: true });
function outlineGroup(group, thickness = 1.06) {
  const meshes = [];
  group.traverse(o => { if (o.isMesh && !o.userData.noOutline && !(o.material && o.material.transparent)) meshes.push(o); });
  for (const mesh of meshes) {
    const shell = new THREE.Mesh(mesh.geometry, outlineMat);
    shell.position.copy(mesh.position);
    shell.rotation.copy(mesh.rotation);
    shell.scale.copy(mesh.scale).multiplyScalar(thickness);
    shell.renderOrder = mesh.renderOrder;
    mesh.parent.add(shell);
  }
}
const energyMatCache = new Map();
function energyMat(color, intensity = 1.7) {
  const key = `${color}:${intensity}`;
  if (!energyMatCache.has(key)) energyMatCache.set(key, new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity, roughness: .25, metalness: .1 }));
  return energyMatCache.get(key);
}
const unitMatCache = new Map();
function umat(color, rough = .78, metal = 0) {
  const key = `${color}:${rough}:${metal}`;
  if (!unitMatCache.has(key)) unitMatCache.set(key, new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, flatShading: true }));
  return unitMatCache.get(key);
}
function paletteMats(P) {
  return {
    skin: umat(P.skin, .72), cloth: umat(P.cloth, .82), cloth2: umat(P.cloth2, .88),
    armor: umat(P.armor, .42, .35), accent: umat(P.accent, .55, .15),
    dark: umat(0x15181c, .92), metal: umat(P.metal, .28, .7), fur: umat(P.fur, .95),
    bone: umat(0xd9d0b2, .72), glow: energyMat(P.accent, 1.4), basic: basicMat(P.accent)
  };
}

/* --- rostros y cascos ------------------------------------------------ */
function addFace(fig, kind, M, P) {
  const head = addMesh(fig, sphGeo(.09, 14), M.skin, 0, .8, .005);
  head.scale.set(1, 1.05, .96);
  const helmet = kind || 'dome';
  if (helmet === 'horns' || helmet === 'hornsBig') {
    const big = helmet === 'hornsBig';
    addMesh(fig, new THREE.SphereGeometry(.112, 14, 8, 0, Math.PI * 2, 0, Math.PI * .62), M.fur, 0, .805, 0);
    addMesh(fig, rboxGeo(.2, .05, .22, .02), M.fur, 0, .86, -.02);
    for (const side of [-1, 1]) {
      const horn = addMesh(fig, coneGeo(big ? .04 : .03, big ? .28 : .2, 6), M.bone, side * .1, .9, 0);
      horn.rotation.z = side * (big ? .75 : .6); horn.rotation.x = -.12;
      if (big) addMesh(fig, coneGeo(.026, .14, 6), M.bone, side * .13, .78, .04).rotation.z = side * .95;
    }
    for (const side of [-1, 1]) addMesh(fig, sphGeo(.013, 6), M.glow, side * .034, .79, .096);
    addMesh(fig, rboxGeo(.05, .022, .022, .005), M.bone, 0, .755, .098);
  } else if (helmet === 'skull') {
    addMesh(fig, sphGeo(.112, 12), M.bone, 0, .805, .01);
    addMesh(fig, rboxGeo(.1, .07, .06, .015), M.bone, 0, .755, .07);
    for (const side of [-1, 1]) addMesh(fig, sphGeo(.022, 8), M.dark, side * .038, .81, .102);
    for (let i = 0; i < 4; i++) {
      const f = addMesh(fig, rboxGeo(.014, .14, .02, .004), M.bone, -.09 + i * .06, .95, -.02);
      f.rotation.x = -.35; f.rotation.z = (i - 1.5) * .18;
    }
    addMesh(fig, rboxGeo(.11, .018, .03, .004), M.bone, 0, .745, .1);
  } else if (helmet === 'corinthian' || helmet === 'corinthianCrest') {
    addMesh(fig, new THREE.SphereGeometry(.115, 14, 9, 0, Math.PI * 2, 0, Math.PI * .58), M.armor, 0, .805, 0);
    addMesh(fig, rboxGeo(.19, .14, .05, .015), M.armor, 0, .775, .1);
    addMesh(fig, rboxGeo(.045, .12, .03, .008), M.armor, 0, .75, .12);
    addMesh(fig, rboxGeo(.16, .025, .02, .005), M.dark, 0, .81, .125);
    const crestH = helmet === 'corinthianCrest' ? .26 : .17;
    addMesh(fig, rboxGeo(.035, crestH, .27, .012), M.cloth, 0, .9 + crestH * .3, -.015);
    addMesh(fig, rboxGeo(.055, .03, .29, .01), M.fur, 0, .89 + crestH * .3, -.015);
  } else if (helmet === 'greatHelm') {
    addMesh(fig, cylGeo(.105, .118, .2, 12), M.armor, 0, .81, 0);
    addMesh(fig, new THREE.SphereGeometry(.108, 12, 6, 0, Math.PI * 2, 0, Math.PI * .5), M.armor, 0, .9, 0);
    addMesh(fig, rboxGeo(.17, .025, .03, .005), M.dark, 0, .835, .098);
    addMesh(fig, rboxGeo(.03, .08, .04, .006), M.armor, 0, .8, .1);
    addMesh(fig, rboxGeo(.06, .1, .02, .006), M.accent, 0, .93, -.03);
  } else if (helmet === 'hood') {
    addMesh(fig, new THREE.SphereGeometry(.125, 12, 8, 0, Math.PI * 2, 0, Math.PI * .62), M.cloth2, 0, .805, -.01);
    addMesh(fig, coneGeo(.13, .18, 8), M.cloth2, 0, .86, -.12).rotation.x = -.4;
    addMesh(fig, rboxGeo(.08, .02, .02, .004), M.dark, 0, .81, .1);
    for (const side of [-1, 1]) addMesh(fig, sphGeo(.012, 6), M.glow, side * .032, .8, .103);
  } else if (helmet === 'crown') {
    addMesh(fig, new THREE.SphereGeometry(.115, 12, 8, 0, Math.PI * 2, 0, Math.PI * .55), M.armor, 0, .805, 0);
    const ring = addMesh(fig, new THREE.TorusGeometry(.095, .014, 6, 16), M.metal, 0, .885, 0);
    ring.rotation.x = Math.PI / 2;
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2;
      addMesh(fig, coneGeo(.022, .09, 4), M.metal, Math.cos(a) * .09, .94, Math.sin(a) * .09);
    }
    addMesh(fig, rboxGeo(.2, .04, .03, .005), M.accent, 0, .86, -.06);
  } else if (helmet === 'tricorn' || helmet === 'tricornBoss') {
    const big = helmet === 'tricornBoss';
    const R = big ? .24 : .205;
    addMesh(fig, cylGeo(R, R * 1.04, .026, 16), M.dark, 0, .895, 0);
    addMesh(fig, new THREE.TorusGeometry(R * .97, .012, 5, 18), M.metal, 0, .902, 0).rotation.x = Math.PI / 2;
    addMesh(fig, coneGeo(R * .66, big ? .19 : .15, 12), M.dark, 0, .972, 0);
    for (let i = 0; i < 3; i++) {
      const a = i / 3 * Math.PI * 2 + Math.PI * .5;
      const flap = addMesh(fig, rboxGeo(R * 1.9, .075, .03, .012), M.dark, Math.cos(a) * R * .62, .925, Math.sin(a) * R * .62);
      flap.rotation.y = -a + Math.PI / 2;
      flap.rotation.z = Math.sin(a) * .18;
    }
    // Emblema de calavera y huesos cruzados al frente.
    addMesh(fig, sphGeo(big ? .035 : .028, 8), M.bone, 0, .9, R * .72);
    addMesh(fig, rboxGeo(.05, .018, .025, .004), M.bone, 0, .868, R * .73);
    for (const side of [-1, 1]) {
      const bone = addMesh(fig, rboxGeo(.09, .012, .012, .003), M.bone, side * .022, .905, R * .73);
      bone.rotation.z = side * .7;
    }
    addMesh(fig, rboxGeo(.045, .1, .03, .01), M.accent, .0, .925, -R * .84);
    if (big) {
      for (let i = 0; i < 3; i++) {
        const plume = addMesh(fig, rboxGeo(.035, .3, .05, .01), M.accent, .16 + i * .02, 1.05, -.04 - i * .03);
        plume.rotation.z = -.45 - i * .12;
      }
    }
    for (const side of [-1, 1]) addMesh(fig, sphGeo(.012, 6), M.glow, side * .033, .79, .096);
  } else if (helmet === 'bandana') {
    addMesh(fig, rboxGeo(.21, .08, .21, .03), M.cloth2, 0, .865, 0);
    addMesh(fig, rboxGeo(.035, .12, .02, .005), M.cloth2, .1, .83, -.08).rotation.z = -.5;
    for (const side of [-1, 1]) addMesh(fig, sphGeo(.012, 6), M.glow, side * .033, .79, .096);
  } else if (helmet === 'brodie') {
    addMesh(fig, new THREE.SphereGeometry(.12, 12, 7, 0, Math.PI * 2, 0, Math.PI * .5), M.armor, 0, .825, 0);
    addMesh(fig, cylGeo(.19, .2, .028, 16), M.armor, 0, .828, 0);
    addMesh(fig, rboxGeo(.07, .03, .02, .004), M.dark, 0, .82, .1);
    addMesh(fig, rboxGeo(.12, .09, .02, .004), M.cloth2, 0, .76, .085);
  } else if (helmet === 'cap') {
    addMesh(fig, cylGeo(.115, .12, .09, 12), M.cloth2, 0, .855, 0);
    addMesh(fig, cylGeo(.17, .17, .022, 14), M.cloth2, 0, .905, 0).rotation.x = .08;
    addMesh(fig, rboxGeo(.18, .025, .12, .02), M.dark, 0, .85, .1);
    addMesh(fig, rboxGeo(.12, .03, .025, .005), M.metal, 0, .88, .1);
  } else if (helmet === 'tech') {
    addMesh(fig, new THREE.SphereGeometry(.112, 14, 8, 0, Math.PI * 2, 0, Math.PI * .6), M.armor, 0, .805, 0);
    addMesh(fig, rboxGeo(.2, .1, .06, .015), M.armor, 0, .775, .075);
    addMesh(fig, rboxGeo(.16, .028, .02, .005), M.glow, 0, .81, .106);
    for (const side of [-1, 1]) addMesh(fig, rboxGeo(.03, .07, .05, .008), M.metal, side * .1, .83, -.01);
    addMesh(fig, cylGeo(.008, .012, .18, 5), M.metal, .09, .92, -.02);
    addMesh(fig, sphGeo(.018, 6), M.glow, .09, 1.01, -.02);
  } else if (helmet === 'zombie' || helmet === 'zombieBoss') {
    const big = helmet === 'zombieBoss';
    addMesh(fig, sphGeo(big ? .13 : .105, 10), M.skin, 0, .79, .01);
    addMesh(fig, rboxGeo(.1, .05, .07, .012), M.skin, 0, .75, .06);
    for (const side of [-1, 1]) addMesh(fig, sphGeo(.015, 6), M.glow, side * .035, .8, .1);
    for (let i = 0; i < 3; i++) addMesh(fig, rboxGeo(.05, .018, .03, .004), M.bone, 0, .735 + i * .028, .085);
    addMesh(fig, rboxGeo(.12, .02, .03, .004), M.bone, 0, .745, .098);
    if (big) for (const side of [-1, 1]) {
      addMesh(fig, coneGeo(.03, .2, 5), M.bone, side * .11, .88, -.02).rotation.z = side * .8;
    }
  } else if (helmet === 'zombieHelm') {
    addMesh(fig, new THREE.SphereGeometry(.12, 10, 6, 0, Math.PI * 2, 0, Math.PI * .55), M.armor, 0, .815, 0);
    addMesh(fig, rboxGeo(.22, .03, .05, .006), M.armor, 0, .82, .09);
    for (const side of [-1, 1]) addMesh(fig, sphGeo(.016, 6), M.glow, side * .035, .8, .096);
    addMesh(fig, rboxGeo(.03, .16, .03, .006), M.metal, .11, .9, -.02).rotation.z = -.4;
  } else if (helmet === 'circlet') {
    addMesh(fig, rboxGeo(.18, .035, .18, .015), M.metal, 0, .87, 0);
    const halo = addMesh(fig, new THREE.TorusGeometry(.17, .014, 6, 20), M.glow, 0, .96, -.03);
    halo.rotation.x = Math.PI / 2;
    for (const side of [-1, 1]) addMesh(fig, sphGeo(.013, 6), M.glow, side * .034, .79, .095);
  } else if (helmet === 'goldhelm') {
    addMesh(fig, new THREE.SphereGeometry(.118, 14, 9, 0, Math.PI * 2, 0, Math.PI * .58), M.metal, 0, .805, 0);
    addMesh(fig, rboxGeo(.05, .16, .26, .01), M.glow, 0, .92, -.02);
    addMesh(fig, rboxGeo(.18, .03, .03, .005), M.glow, 0, .85, .1);
    for (const side of [-1, 1]) addMesh(fig, sphGeo(.013, 6), M.glow, side * .035, .8, .1);
  } else {
    addMesh(fig, new THREE.SphereGeometry(.115, 14, 8, 0, Math.PI * 2, 0, Math.PI * .58), M.armor, 0, .81, 0);
    addMesh(fig, cylGeo(.15, .16, .025, 14), M.armor, 0, .825, .01);
    for (const side of [-1, 1]) addMesh(fig, sphGeo(.012, 6), M.dark, side * .034, .79, .095);
  }
}
/* --- ropa, capas, escudos y estandartes ------------------------------ */
function addCape(fig, M, matColor, w = .42, h = .56, accentMat = null) {
  const cape = new THREE.Group();
  cape.position.set(0, .67, -.13);
  fig.add(cape);
  const panel = addMesh(cape, rboxGeo(w, h, .035, .015), matColor, 0, -h / 2, 0);
  panel.rotation.x = -.14;
  if (accentMat) addMesh(cape, rboxGeo(w * .92, .05, .04, .008), accentMat, 0, -h + .04, .005);
  for (const side of [-1, 1]) {
    const flap = addMesh(cape, rboxGeo(w * .2, h * .9, .03, .01), matColor, side * (w * .42), -h * .46, -.01);
    flap.rotation.z = side * .18; flap.rotation.x = -.14;
  }
  return cape;
}
function shieldGeoKite(w, h) {
  return cacheGeo(`kite:${w}:${h}`, () => {
    const sh = new THREE.Shape();
    sh.moveTo(0, -h * .52);
    sh.quadraticCurveTo(w * .52, -h * .18, w * .5, h * .14);
    sh.quadraticCurveTo(w * .48, h * .46, 0, h * .5);
    sh.quadraticCurveTo(-w * .48, h * .46, -w * .5, h * .14);
    sh.quadraticCurveTo(-w * .52, -h * .18, 0, -h * .52);
    const geo = new THREE.ExtrudeGeometry(sh, { depth: .035, bevelEnabled: true, bevelSize: .012, bevelThickness: .012, bevelSegments: 1, curveSegments: 6 });
    geo.center();
    return geo;
  });
}
function addShield(fig, M, kind, s = 1) {
  if (!kind) return;
  if (kind === 'round' || kind === 'roundBig') {
    const big = kind === 'roundBig';
    const r = (big ? .25 : .19) * s;
    const disc = addMesh(fig, cylGeo(r, r, .04, 20), M.armor, .21 * s, .55 * s, .12 * s);
    disc.rotation.x = Math.PI / 2;
    const rim = addMesh(fig, new THREE.TorusGeometry(r * .97, .015, 6, 22), M.metal, .21 * s, .55 * s, .145 * s);
    rim.rotation.x = 0;
    addMesh(fig, cylGeo(r * .34, r * .34, .03, 14), M.metal, .21 * s, .55 * s, .15 * s).rotation.x = Math.PI / 2;
    const barA = addMesh(fig, rboxGeo(.035 * s, r * .9, .022, .006), M.cloth, .21 * s, .55 * s, .155 * s);
    barA.rotation.z = .6;
    const barB = addMesh(fig, rboxGeo(.035 * s, r * .9, .022, .006), M.cloth, .2 * s, .55 * s, .156 * s);
    barB.rotation.z = -.6;
  } else {
    const big = kind === 'kiteBig';
    const w = (big ? .42 : .32) * s, h = (big ? .56 : .44) * s;
    const shield = new THREE.Mesh(shieldGeoKite(w / s, h / s), M.cloth);
    shield.position.set(.21 * s, .5 * s, .13 * s);
    shield.scale.setScalar(s);
    shield.castShadow = true;
    fig.add(shield);
    addMesh(fig, rboxGeo(.06 * s, h * .7, .025, .006), M.accent, .21 * s, .5 * s, .16 * s);
    addMesh(fig, rboxGeo(w * .55, .055 * s, .025, .006), M.accent, .21 * s, .56 * s, .16 * s);
    addMesh(fig, sphGeo(.028 * s, 8), M.metal, .21 * s, .5 * s, .17 * s);
  }
}
function addUnitBanner(fig, M, P) {
  const pole = addMesh(fig, cylGeo(.012, .016, 1.12, 6), M.dark, -.25, .62, -.12);
  addMesh(fig, sphGeo(.028, 6), M.metal, -.25, 1.2, -.12);
  const cloth = addMesh(fig, rboxGeo(.3, .24, .022, .006), M.cloth, -.1, 1.02, -.12);
  addMesh(fig, rboxGeo(.05, .18, .026, .004), M.accent, -.1, 1.02, -.115);
  addMesh(fig, rboxGeo(.2, .045, .026, .004), M.accent, -.1, 1.08, -.115);
  cloth.userData.banner = true;
  return cloth;
}

/* --- armas ------------------------------------------------------------ */
function makeWeapon(kind, M, P) {
  const w = new THREE.Group();
  if (!kind) return w;
  if (kind === 'sword' || kind === 'greatsword' || kind === 'cutlass' || kind === 'cutlass2') {
    const big = kind === 'greatsword', curve = kind.startsWith('cutlass');
    const L = big ? .78 : curve ? .5 : .46;
    addMesh(w, cylGeo(.024, .028, .16, 8), M.dark, 0, .03, 0);
    addMesh(w, rboxGeo(big ? .26 : .18, .03, .045, .008), M.metal, 0, .1, 0);
    addMesh(w, sphGeo(.032, 8), M.metal, 0, -.05, 0);
    const blade = addMesh(w, rboxGeo(big ? .075 : .052, L, .024, .008), M.metal, 0, .1 + L * .5, 0);
    if (curve) { blade.rotation.z = -.08; addMesh(w, rboxGeo(.05, L * .42, .022, .006), M.metal, .01, .1 + L * .82, 0).rotation.z = -.22; }
    addMesh(w, coneGeo(big ? .036 : .026, .1, 4), M.metal, 0, .1 + L + .04, 0);
    if (big) addMesh(w, rboxGeo(.05, .05, .03, .005), M.accent, 0, .15, .02);
  } else if (kind === 'spear' || kind === 'spearBig' || kind === 'trident') {
    const big = kind === 'spearBig';
    const L = big ? 1.5 : 1.2;
    addMesh(w, cylGeo(.017, .023, L, 6), M.cloth2, 0, L * .5, 0);
    addMesh(w, sphGeo(.026, 6), M.metal, 0, L * .5, 0);
    addMesh(w, coneGeo(.042, big ? .24 : .17, 5), M.metal, 0, L + .06, 0);
    addMesh(w, rboxGeo(.1, .025, .03, .005), M.metal, 0, L - .04, 0);
    if (kind === 'trident') {
      addMesh(w, coneGeo(.018, .14, 4), M.metal, .045, L + .04, 0).rotation.z = -.15;
      addMesh(w, coneGeo(.018, .14, 4), M.metal, -.045, L + .04, 0).rotation.z = .15;
    }
    addMesh(w, rboxGeo(.03, .13, .03, .005), M.accent, 0, .16, .015);
  } else if (kind === 'club' || kind === 'clubHeavy') {
    const big = kind === 'clubHeavy';
    const stone = umat(0x8f897a, .85);
    addMesh(w, cylGeo(big ? .045 : .035, big ? .06 : .05, big ? .78 : .58, 7), M.fur, 0, (big ? .39 : .29), 0);
    for (let i = 0; i < 3; i++) addMesh(w, cylGeo(.048, .05, .028, 7), M.cloth2, 0, .1 + i * .09, 0);
    addMesh(w, sphGeo(big ? .18 : .13, 9), stone, 0, big ? .84 : .63, 0);
    addMesh(w, sphGeo(big ? .12 : .085, 8), stone, .05, big ? .92 : .69, .02);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      addMesh(w, coneGeo(big ? .032 : .024, big ? .11 : .08, 5), M.bone, Math.cos(a) * (big ? .15 : .11), (big ? .85 : .64) + Math.sin(a) * .05, Math.sin(a) * (big ? .13 : .09)).rotation.z = Math.cos(a) * .5;
    }
    addMesh(w, rboxGeo(.06, .05, .06, .008), M.metal, 0, .08, 0);
  } else if (kind === 'staff') {
    addMesh(w, cylGeo(.018, .024, 1.25, 6), M.cloth2, 0, .55, 0);
    addMesh(w, sphGeo(.075, 10), M.glow, 0, 1.2, 0);
    const ring = addMesh(w, new THREE.TorusGeometry(.09, .012, 6, 16), M.bone, 0, 1.18, 0);
    ring.rotation.x = Math.PI / 2;
    addMesh(w, coneGeo(.03, .12, 5), M.bone, 0, 1.33, 0);
  } else if (kind === 'rifle' || kind === 'mg' || kind === 'mgBig' || kind === 'energy') {
    const big = kind === 'mgBig', mg = kind === 'mg' || big, tech = kind === 'energy';
    const matBody = tech ? M.armor : M.cloth2, matGun = tech ? M.metal : M.dark;
    addMesh(w, rboxGeo(.055, .07, .48, .012), matBody, 0, 0, .18);
    addMesh(w, cylGeo(.014, .018, .42, 6), matGun, 0, .01, .55).rotation.x = Math.PI / 2;
    addMesh(w, cylGeo(.024, .024, .06, 8), matGun, 0, .01, .76).rotation.x = Math.PI / 2;
    addMesh(w, rboxGeo(.05, .1, .15, .012), matBody, 0, -.04, .02);
    addMesh(w, rboxGeo(.03, .035, .08, .006), matGun, 0, .05, .28);
    if (mg) {
      addMesh(w, rboxGeo(.09, .12, .12, .012), M.metal, 0, -.07, .18);
      addMesh(w, cylGeo(.012, .012, .3, 5), M.metal, 0, .01, .6).rotation.x = Math.PI / 2;
      for (const side of [-1, 1]) addMesh(w, cylGeo(.01, .012, .24, 5), M.metal, side * .05, -.12, .46).rotation.x = .35;
      if (big) addMesh(w, cylGeo(.04, .045, .2, 8), M.dark, 0, .01, .62).rotation.x = Math.PI / 2;
    }
    if (tech) {
      addMesh(w, rboxGeo(.028, .03, .2, .005), M.glow, 0, .035, .32);
      addMesh(w, sphGeo(.026, 8), M.glow, 0, -.02, .08);
    }
  } else if (kind === 'bow') {
    const arc = addMesh(w, new THREE.TorusGeometry(.28, .013, 6, 18, Math.PI), M.cloth2, 0, .36, .02);
    arc.rotation.y = Math.PI / 2; arc.rotation.z = Math.PI / 2;
    addMesh(w, rboxGeo(.008, .56, .008, .002), M.bone, 0, .36, .015);
    addMesh(w, cylGeo(.008, .01, .42, 4), M.metal, 0, .36, .06).rotation.x = Math.PI / 2;
    addMesh(w, coneGeo(.018, .06, 4), M.metal, 0, .36, .3).rotation.x = Math.PI / 2;
  } else if (kind === 'cannon' || kind === 'cannonBig') {
    const big = kind === 'cannonBig';
    const iron = umat(0x4c555e, .5, .55);
    addMesh(w, cylGeo(big ? .08 : .06, big ? .1 : .075, big ? .58 : .42, 10), iron, 0, 0, .2).rotation.x = Math.PI / 2;
    addMesh(w, cylGeo(big ? .11 : .085, big ? .11 : .085, .07, 10), M.metal, 0, 0, big ? .5 : .4).rotation.x = Math.PI / 2;
    addMesh(w, cylGeo(big ? .085 : .067, big ? .085 : .067, .035, 10), M.accent, 0, 0, big ? .28 : .22).rotation.x = Math.PI / 2;
    addMesh(w, cylGeo(.03, .03, .03, 8), M.accent, 0, 0, big ? .47 : .37).rotation.x = Math.PI / 2;
    addMesh(w, rboxGeo(.1, .05, .14, .012), M.metal, 0, -.03, .08);
    addMesh(w, cylGeo(.03, .035, .1, 6), M.accent, 0, .07, .12);
  } else if (kind === 'claw' || kind === 'clawBig') {
    const big = kind === 'clawBig';
    for (let i = 0; i < 3; i++) {
      const c = addMesh(w, coneGeo(.014, big ? .24 : .17, 5), M.bone, (i - 1) * .04, .02, .12);
      c.rotation.x = Math.PI / 2 + .1; c.rotation.z = (i - 1) * .18;
    }
    addMesh(w, rboxGeo(.1, .07, .12, .012), M.skin, 0, 0, .04);
  }
  return w;
}
/* --- indumentaria por facción ---------------------------------------- */
function dressFigure(fig, M, P, outfit, opts = {}) {
  if (!outfit) return;
  if (outfit === 'fur' || outfit === 'furHeavy') {
    const heavy = outfit === 'furHeavy';
    addMesh(fig, cylGeo(heavy ? .27 : .235, heavy ? .22 : .2, .06, 12), M.fur, 0, .655, -.01);
    addMesh(fig, rboxGeo(heavy ? .3 : .26, .12, .24, .03), M.fur, 0, .6, .01);
    for (let i = 0; i < (heavy ? 7 : 5); i++) {
      const a = (i / (heavy ? 7 : 5) - .5) * 1.5;
      addMesh(fig, coneGeo(.014, .07, 5), M.bone, Math.sin(a) * .11, .56 - Math.abs(a) * .03, .115 + Math.cos(a) * .02).rotation.x = .4;
    }
    // Collar de colmillos y correa de cuero.
    for (let i = 0; i < 5; i++) {
      const a = (i / 4 - .5) * 1.5;
      addMesh(fig, sphGeo(.021, 6), M.bone, Math.sin(a) * .1, .7 - Math.abs(a) * .025, .1 + Math.cos(a) * .015);
    }
    const strap = addMesh(fig, rboxGeo(.045, .29, .022, .006), M.cloth2, .045, .61, .112);
    strap.rotation.z = .55;
    addMesh(fig, rboxGeo(.36, .09, .25, .02), M.fur, 0, .44, .01);
    if (heavy) for (const side of [-1, 1]) addMesh(fig, coneGeo(.03, .16, 5), M.bone, side * .19, .71, -.02).rotation.z = side * .7;
  } else if (outfit === 'robe') {
    addMesh(fig, cylGeo(.19, .3, .52, 10), M.cloth2, 0, .27, 0);
    addMesh(fig, rboxGeo(.34, .1, .24, .025), M.fur, 0, .58, 0);
    addMesh(fig, new THREE.TorusGeometry(.16, .018, 6, 16), M.bone, 0, .63, .02).rotation.x = Math.PI / 2;
  } else if (outfit === 'spartan' || outfit === 'spartanElite' || outfit === 'spartanLight' || outfit === 'spartanBoss') {
    const elite = outfit === 'spartanElite' || outfit === 'spartanBoss';
    const bronze = outfit === 'spartanBoss' ? M.metal : M.armor;
    addMesh(fig, rboxGeo(.3, .22, .25, .05), bronze, 0, .57, 0);
    addMesh(fig, rboxGeo(.2, .06, .02, .005), M.accent, 0, .6, .135);
    for (const side of [-1, 1]) {
      addMesh(fig, sphGeo(.07, 10), bronze, side * .185, .655, 0);
      addMesh(fig, cylGeo(.045, .055, .16, 8), bronze, side * .085, .3, .02);
    }
    for (let i = -2; i <= 2; i++) {
      addMesh(fig, rboxGeo(.055, .13, .02, .005), M.cloth2, i * .06, .4, .115);
      addMesh(fig, rboxGeo(.055, .13, .02, .005), M.cloth2, i * .06, .4, -.115);
    }
    if (elite) {
      addMesh(fig, rboxGeo(.32, .04, .26, .01), M.metal, 0, .67, 0);
      for (const side of [-1, 1]) addMesh(fig, rboxGeo(.04, .18, .04, .006), M.metal, side * .13, .69, .02).rotation.z = side * .3;
    }
    if (outfit === 'spartanLight') addMesh(fig, rboxGeo(.28, .05, .24, .015), M.cloth2, 0, .45, 0);
  } else if (outfit === 'crusader' || outfit === 'crusaderLight' || outfit === 'crusaderBoss') {
    const boss = outfit === 'crusaderBoss';
    addMesh(fig, rboxGeo(.3, .3, .24, .04), M.cloth, 0, .55, 0);
    addMesh(fig, rboxGeo(.055, .24, .02, .005), M.accent, 0, .55, .125);
    addMesh(fig, rboxGeo(.18, .055, .02, .005), M.accent, 0, .6, .125);
    addMesh(fig, rboxGeo(.055, .24, .02, .005), M.accent, 0, .55, -.125);
    addMesh(fig, rboxGeo(.18, .055, .02, .005), M.accent, 0, .6, -.125);
    addMesh(fig, rboxGeo(.32, .075, .25, .02), M.metal, 0, .43, 0);
    if (boss) {
      addMesh(fig, rboxGeo(.34, .05, .27, .01), M.metal, 0, .68, 0);
      addMesh(fig, sphGeo(.055, 8), M.metal, 0, .5, .15);
      for (const side of [-1, 1]) addMesh(fig, sphGeo(.07, 8), M.metal, side * .19, .65, 0);
    } else addMesh(fig, rboxGeo(.34, .08, .26, .02), M.armor, 0, .64, 0);
    if (outfit === 'crusaderLight') addMesh(fig, cylGeo(.17, .27, .38, 10), M.cloth, 0, .25, 0);
  } else if (outfit === 'plate') {
    addMesh(fig, rboxGeo(.34, .3, .25, .05), M.armor, 0, .55, 0);
    addMesh(fig, rboxGeo(.2, .05, .02, .005), M.metal, 0, .6, .13);
    addMesh(fig, rboxGeo(.34, .06, .26, .015), M.accent, 0, .44, 0);
    for (const side of [-1, 1]) {
      addMesh(fig, sphGeo(.075, 8), M.armor, side * .19, .65, 0);
      addMesh(fig, cylGeo(.05, .055, .2, 8), M.metal, side * .085, .28, .01);
    }
  } else if (outfit === 'pirate' || outfit === 'pirateHeavy' || outfit === 'pirateLight' || outfit === 'pirateBoss') {
    const boss = outfit === 'pirateBoss', heavy = outfit === 'pirateHeavy';
    addMesh(fig, rboxGeo(.32, .28, .23, .04), M.cloth, 0, .55, 0);
    if (outfit !== 'pirateLight') {
      addMesh(fig, rboxGeo(.24, .2, .02, .006), M.cloth2, 0, .61, .12);
      for (const side of [-1, 1]) {
        const tail = addMesh(fig, rboxGeo(.14, .34, .03, .008), M.cloth, side * .1, .32, -.13);
        tail.rotation.z = side * .08;
      }
    }
    addMesh(fig, rboxGeo(.33, .08, .24, .02), boss ? M.accent : M.cloth2, 0, .44, 0);
    const sash = addMesh(fig, rboxGeo(.06, .36, .02, .005), boss ? M.accent : M.cloth2, -.02, .57, .125);
    sash.rotation.z = .6;
    addMesh(fig, sphGeo(.035, 8), M.metal, .08, .44, .13);
    if (heavy || boss) {
      const band = addMesh(fig, rboxGeo(.055, .34, .02, .005), M.fur, .06, .58, .13);
      band.rotation.z = -.55;
      for (let i = 0; i < 3; i++) addMesh(fig, rboxGeo(.035, .05, .03, .004), M.metal, .02 + i * .05, .5 + i * .05, .14);
    }
    if (boss) {
      addMesh(fig, rboxGeo(.36, .04, .27, .01), M.accent, 0, .68, 0);
      addMesh(fig, sphGeo(.045, 8), M.metal, 0, .47, .14);
    }
  } else if (outfit === 'wwi' || outfit === 'wwiHeavy' || outfit === 'wwiBoss') {
    const heavy = outfit === 'wwiHeavy', boss = outfit === 'wwiBoss';
    addMesh(fig, rboxGeo(.33, .29, .23, .04), M.cloth, 0, .55, 0);
    addMesh(fig, rboxGeo(.34, .07, .24, .02), M.cloth2, 0, .44, 0);
    addMesh(fig, rboxGeo(.09, .07, .03, .006), M.metal, 0, .45, .135);
    addMesh(fig, rboxGeo(.24, .17, .12, .02), M.cloth2, 0, .56, -.18);
    addMesh(fig, rboxGeo(.2, .05, .13, .02), M.fur, 0, .66, -.18);
    if (heavy) for (const side of [-1, 1]) addMesh(fig, rboxGeo(.08, .1, .06, .01), M.fur, side * .12, .47, .14);
    if (boss) {
      addMesh(fig, cylGeo(.16, .21, .46, 10), M.cloth2, 0, .24, 0);
      for (let i = 0; i < 3; i++) addMesh(fig, rboxGeo(.028, .028, .02, .004), M.metal, -.03 + i * .03, .58 - i * .04, .13);
      addMesh(fig, rboxGeo(.33, .04, .25, .01), M.fur, 0, .69, 0);
    }
  } else if (outfit === 'tech' || outfit === 'techLight') {
    addMesh(fig, rboxGeo(.3, .26, .23, .04), M.cloth, 0, .55, 0);
    addMesh(fig, rboxGeo(.32, .16, .26, .03), M.armor, 0, .6, 0);
    addMesh(fig, rboxGeo(.2, .035, .02, .005), M.glow, 0, .57, .13);
    addMesh(fig, rboxGeo(.14, .14, .02, .005), M.armor, 0, .46, .12);
    addMesh(fig, sphGeo(.032, 8), M.glow, 0, .6, .135);
    for (const side of [-1, 1]) {
      addMesh(fig, rboxGeo(.1, .08, .16, .02), M.armor, side * .2, .66, 0);
      addMesh(fig, rboxGeo(.06, .12, .06, .01), M.armor, side * .1, .47, -.02);
    }
    addMesh(fig, rboxGeo(.2, .16, .09, .02), M.armor, 0, .58, -.18);
    for (const side of [-1, 1]) addMesh(fig, cylGeo(.025, .03, .08, 6), M.glow, side * .06, .58, -.23).rotation.x = Math.PI / 2;
    if (outfit === 'techLight') addMesh(fig, rboxGeo(.26, .04, .05, .008), M.glow, 0, .69, .05);
  } else if (outfit === 'zombie' || outfit === 'zombieRunner' || outfit === 'zombieArmor' || outfit === 'zombieBoss') {
    const heavy = outfit === 'zombieArmor', boss = outfit === 'zombieBoss';
    if (boss) {
      addMesh(fig, rboxGeo(.42, .34, .3, .06), M.skin, 0, .56, 0);
      addMesh(fig, rboxGeo(.44, .08, .31, .02), M.fur, 0, .43, 0);
      for (let i = 0; i < 4; i++) {
        addMesh(fig, rboxGeo(.22, .022, .02, .004), M.bone, 0, .48 + i * .05, .16);
        addMesh(fig, sphGeo(.02, 6), M.glow, .05, .5 + i * .05, .17);
      }
      addMesh(fig, sphGeo(.075, 8), M.glow, 0, .56, .17);
      for (const side of [-1, 1]) addMesh(fig, coneGeo(.04, .24, 5), M.bone, side * .24, .73, -.02).rotation.z = side * .6;
      addMesh(fig, rboxGeo(.3, .1, .03, .008), M.skin, .06, .5, .16).rotation.z = -.3;
    } else {
      addMesh(fig, rboxGeo(.3, .25, .21, .04), M.cloth, 0, .55, 0);
      for (let i = 0; i < 3; i++) addMesh(fig, rboxGeo(heavy ? .22 : .16, .02, .02, .004), M.bone, 0, .48 + i * .055, .115);
      addMesh(fig, rboxGeo(.12, .1, .02, .006), M.skin, .08, .54, .12).rotation.z = -.25;
      addMesh(fig, rboxGeo(.1, .08, .02, .006), M.skin, -.07, .6, .12).rotation.z = .2;
      addMesh(fig, rboxGeo(.06, .02, .02, .004), M.accent, -.02, .45, .115);
      if (heavy) {
        addMesh(fig, rboxGeo(.36, .22, .27, .04), M.armor, 0, .57, -.01);
        for (const side of [-1, 1]) addMesh(fig, rboxGeo(.12, .12, .04, .01), M.metal, side * .13, .66, .1);
        addMesh(fig, coneGeo(.035, .14, 5), M.metal, .18, .72, 0).rotation.z = -.5;
      }
      if (outfit === 'zombieRunner') addMesh(fig, rboxGeo(.3, .03, .22, .008), M.accent, 0, .44, 0);
    }
  } else if (outfit === 'celestial' || outfit === 'celestialArch' || outfit === 'celestialBoss') {
    const boss = outfit === 'celestialBoss', arch = outfit === 'celestialArch';
    addMesh(fig, cylGeo(.2, .3, .3, 12), M.cloth, 0, .3, 0);
    addMesh(fig, new THREE.TorusGeometry(.295, .014, 5, 18), M.metal, 0, .155, 0).rotation.x = Math.PI / 2;
    addMesh(fig, rboxGeo(.09, .28, .022, .006), M.metal, 0, .3, .19);
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2;
      const fold = addMesh(fig, rboxGeo(.016, .26, .012, .004), M.cloth2, Math.cos(a) * .255, .29, Math.sin(a) * .255);
      fold.rotation.y = -a;
    }
    addMesh(fig, rboxGeo(.3, .25, .23, .04), M.armor, 0, .57, 0);
    addMesh(fig, rboxGeo(.26, .035, .02, .006), M.glow, 0, .61, .125);
    addMesh(fig, rboxGeo(.2, .035, .02, .006), M.glow, 0, .53, .125);
    addMesh(fig, new THREE.TorusGeometry(.2, .016, 6, 18), M.metal, 0, .455, 0).rotation.x = Math.PI / 2;
    for (const side of [-1, 1]) {
      addMesh(fig, sphGeo(.075, 10), M.metal, side * .19, .66, 0);
      addMesh(fig, rboxGeo(.055, .17, .055, .008), M.metal, side * .1, .46, .02);
    }
    addMesh(fig, cylGeo(.06, .07, .05, 10), M.metal, 0, .735, 0);
    if (arch || boss) addMesh(fig, rboxGeo(.075, .3, .028, .006), M.glow, 0, .76, .02);
    if (boss) {
      addMesh(fig, rboxGeo(.36, .04, .26, .01), M.glow, 0, .7, 0);
      for (const side of [-1, 1]) addMesh(fig, coneGeo(.032, .2, 5), M.glow, side * .16, .87, 0).rotation.z = side * .5;
    }
  }
}

/* --- figura humana ---------------------------------------------------- */
function buildFigure(parent, opts) {
  const P = opts.palette, M = paletteMats(P);
  const fig = new THREE.Group();
  fig.scale.setScalar(opts.scale || 1);
  parent.add(fig);
  const walk = [];
  for (const side of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(side * .072, .43, 0);
    hip.userData.kind = 'leg'; hip.userData.phase = side > 0 ? Math.PI : 0;
    fig.add(hip); walk.push(hip);
    addMesh(hip, cylGeo(.038, .05, .34, 8), M.cloth2, 0, -.17, 0);
    addMesh(hip, rboxGeo(.1, .08, .19, .025), M.dark, 0, -.36, .04);
  }
  addMesh(fig, rboxGeo(.21, .13, .18, .03), M.cloth2, 0, .44, 0);
  addMesh(fig, rboxGeo(.27, .29, .19, .045), M.cloth, 0, .575, 0);
  addMesh(fig, rboxGeo(.31, .075, .205, .02), M.cloth, 0, .7, 0);
  addMesh(fig, cylGeo(.052, .058, .07, 10), M.skin, 0, .755, 0);
  addMesh(fig, cylGeo(.062, .066, .03, 10), M.dark, 0, .74, 0);
  dressFigure(fig, M, P, opts.outfit, opts);
  const arms = {};
  for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(side * .172, .685, 0);
    arm.rotation.z = side * .09;
    arm.userData.kind = 'arm'; arm.userData.phase = side > 0 ? Math.PI : 0;
    fig.add(arm); walk.push(arm); arms[side] = arm;
    addMesh(arm, sphGeo(.057, 9), M.cloth, 0, .01, 0);
    addMesh(arm, cylGeo(.035, .044, .24, 8), M.cloth, 0, -.12, 0);
    addMesh(arm, cylGeo(.05, .052, .035, 8), M.dark, 0, -.245, 0);
    addMesh(arm, sphGeo(.046, 8), M.skin, 0, -.27, .012);
    if (opts.bracer) addMesh(arm, cylGeo(.05, .056, .1, 8), M.armor, 0, -.17, 0);
  }
  const headGroup = new THREE.Group();
  headGroup.position.y = .045;
  fig.add(headGroup);
  addFace(headGroup, opts.head, M, P);
  outlineGroup(headGroup, 1.055);
  addShield(fig, M, opts.shield, opts.scale || 1);
  if (opts.cape) addCape(fig, M, opts.cape === 'accent' ? M.accent : opts.capeColor ? umat(opts.capeColor, .88) : M.cloth2, opts.capeW || .42, opts.capeH || .56, M.metal);
  if (opts.banner) addUnitBanner(fig, M, P);
  if (opts.weapon) {
    const weapon = makeWeapon(opts.weapon, M, P);
    weapon.scale.setScalar(opts.weaponScale || 1);
    const sideSign = (opts.weaponSide || -1) < 0 ? 1 : -1;
    const arm = arms[opts.weaponSide || -1];
    const gun = opts.weapon === 'rifle' || opts.weapon === 'mg' || opts.weapon === 'mgBig' || opts.weapon === 'energy';
    const cannon = opts.weapon === 'cannon' || opts.weapon === 'cannonBig';
    const club = opts.weapon === 'club' || opts.weapon === 'clubHeavy';
    weapon.position.set(0, -.25, .05);
    if (cannon) { weapon.rotation.y = sideSign * .85; weapon.position.x = sideSign * .06; }
    weapon.rotation.x = gun || cannon || opts.weapon === 'bow' ? -.2 : -.1;
    arm.add(weapon);
    arm.rotation.x = gun || cannon || opts.weapon === 'bow' ? -.62 : club ? -.3 : -.18;
    if (club) arm.rotation.z = sideSign * .38;
    fig.userData.weapon = weapon;
  }
  fig.userData.walk = walk;
  return fig;
}

function addUnitBase(g, radius, P, spikes = 0) {
  const disc = addMesh(g, cylGeo(radius, radius * 1.03, .035, 24), basicMat(0x141a13, .5), 0, .018, 0, false, false);
  disc.receiveShadow = true;
  const ring = addMesh(g, new THREE.TorusGeometry(radius * .93, .011, 6, 26), basicMat(P.accent, .65), 0, .04, 0, false, false);
  ring.rotation.x = Math.PI / 2;
  for (let i = 0; i < spikes; i++) {
    const a = i / spikes * Math.PI * 2;
    addMesh(g, coneGeo(.045, .2, 5), basicMat(P.accent, .5), Math.cos(a) * radius, .09, Math.sin(a) * radius, false, false);
  }
}
/* --- mechas ----------------------------------------------------------- */
function buildMech(parent, P, opts = {}) {
  const M = paletteMats(P);
  const g = new THREE.Group();
  const boss = opts.boss === true;
  g.scale.setScalar(opts.scale || 1);
  parent.add(g);
  const walk = [];
  for (const side of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(side * .17, .82, 0);
    hip.userData.kind = 'leg'; hip.userData.phase = side > 0 ? Math.PI : 0;
    g.add(hip); walk.push(hip);
    addMesh(hip, rboxGeo(.16, .34, .19, .03), M.armor, 0, -.16, 0);
    addMesh(hip, rboxGeo(.18, .12, .21, .03), M.cloth, 0, -.02, 0);
    const knee = new THREE.Group(); knee.position.set(0, -.34, 0); hip.add(knee);
    addMesh(knee, rboxGeo(.12, .32, .15, .025), M.metal, 0, -.15, .01);
    addMesh(knee, rboxGeo(.17, .09, .3, .03), M.dark, 0, -.32, .06);
    addMesh(knee, rboxGeo(.14, .06, .18, .02), M.cloth, 0, -.28, .02);
  }
  addMesh(g, rboxGeo(.4, .18, .26, .04), M.dark, 0, .85, 0);
  addMesh(g, rboxGeo(.5, .38, .3, .05), M.armor, 0, 1.1, 0);
  addMesh(g, rboxGeo(.34, .24, .05, .02), M.cloth, 0, 1.12, .17);
  addMesh(g, rboxGeo(.24, .05, .03, .008), M.accent, 0, 1.16, .195);
  addMesh(g, rboxGeo(.1, .22, .03, .008), M.cloth2, 0, 1.1, .195);
  addMesh(g, sphGeo(.075, 10), M.glow, 0, 1.1, .2);
  for (const side of [-1, 1]) {
    addMesh(g, rboxGeo(.2, .18, .26, .04), M.armor, side * .33, 1.25, 0);
    addMesh(g, rboxGeo(.16, .05, .2, .02), M.cloth, side * .34, 1.36, 0);
    for (let i = 0; i < 2; i++) addMesh(g, cylGeo(.032, .036, .16, 8), M.dark, side * .36, 1.36, -.12 + i * .06).rotation.x = Math.PI / 2;
    const arm = new THREE.Group(); arm.position.set(side * .38, 1.15, 0); g.add(arm);
    addMesh(arm, cylGeo(.06, .07, .3, 8), M.armor, 0, -.15, 0);
    addMesh(arm, rboxGeo(.16, .16, .16, .03), M.metal, 0, -.33, 0);
    const cannon = addMesh(arm, cylGeo(.05, .06, .4, 10), M.dark, 0, -.34, .2);
    cannon.rotation.x = Math.PI / 2;
    addMesh(arm, cylGeo(.075, .075, .06, 10), M.accent, 0, -.34, .4).rotation.x = Math.PI / 2;
    walk.push(arm); arm.userData.kind = 'arm'; arm.userData.phase = side > 0 ? Math.PI : 0;
  }
  addMesh(g, rboxGeo(.24, .2, .22, .04), M.armor, 0, 1.45, .02);
  addMesh(g, rboxGeo(.2, .05, .03, .006), M.glow, 0, 1.45, .14);
  addMesh(g, rboxGeo(.16, .03, .02, .004), M.cloth, 0, 1.36, .13);
  addMesh(g, cylGeo(.012, .016, .26, 5), M.metal, .1, 1.63, 0);
  addMesh(g, sphGeo(.02, 6), M.glow, .1, 1.76, 0);
  addMesh(g, rboxGeo(.3, .24, .12, .03), M.dark, 0, 1.12, -.2);
  for (const side of [-1, 1]) addMesh(g, cylGeo(.045, .05, .1, 8), M.glow, side * .08, 1.12, -.27).rotation.x = Math.PI / 2;
  if (boss) {
    for (const side of [-1, 1]) {
      const blade = addMesh(g, rboxGeo(.06, .5, .12, .015), M.metal, side * .45, 1.5, -.05);
      blade.rotation.z = side * .32;
      addMesh(g, coneGeo(.04, .16, 5), M.accent, side * .52, 1.76, -.05).rotation.z = side * .32;
      addMesh(g, rboxGeo(.2, .06, .3, .02), M.cloth, side * .28, .98, .05);
    }
    addMesh(g, new THREE.TorusGeometry(.34, .02, 6, 22), M.glow, 0, 1.1, 0).rotation.x = Math.PI / 2;
  }
  return { group: g, walk };
}

/* --- blindados -------------------------------------------------------- */
function buildTank(parent, P) {
  const M = paletteMats(P);
  const g = new THREE.Group();
  parent.add(g);
  addTrack(g, -1, -.36, .17, 0, .98, .36, .16, M.cloth, M.dark, M.metal);
  addTrack(g, 1, .36, .17, 0, .98, .36, .16, M.cloth, M.dark, M.metal);
  addMesh(g, rboxGeo(.64, .3, 1.02, .06), M.cloth, 0, .33, 0);
  addMesh(g, rboxGeo(.54, .12, .3, .03), M.cloth2, 0, .42, -.38).rotation.x = -.3;
  addMesh(g, rboxGeo(.66, .07, .96, .02), M.dark, 0, .19, 0);
  addMesh(g, rboxGeo(.4, .07, .18, .02), M.armor, 0, .3, .46).rotation.x = .25;
  addMesh(g, rboxGeo(.16, .1, .18, .02), M.armor, 0, .46, .34);
  const turret = new THREE.Group(); turret.position.set(0, .5, .06); g.add(turret);
  addMesh(turret, cylGeo(.2, .25, .16, 14), M.cloth, 0, .08, 0);
  addMesh(turret, new THREE.SphereGeometry(.22, 14, 8, 0, Math.PI * 2, 0, Math.PI * .5), M.cloth, 0, .16, 0).scale.set(1, .8, 1);
  addMesh(turret, rboxGeo(.18, .09, .2, .02), M.armor, 0, .15, .16);
  addMesh(turret, cylGeo(.03, .04, .34, 8), M.dark, 0, .12, .36).rotation.x = Math.PI / 2;
  addMesh(turret, cylGeo(.05, .05, .05, 8), M.metal, 0, .12, .54).rotation.x = Math.PI / 2;
  addMesh(turret, rboxGeo(.05, .05, .08, .01), M.metal, .2, .13, 0);
  for (const side of [-1, 1]) {
    addMesh(g, rboxGeo(.1, .08, .14, .015), M.metal, side * .28, .42, .38);
    addMesh(g, cylGeo(.02, .025, .3, 6), M.dark, side * .3, .48, -.32);
    addMesh(g, sphGeo(.035, 6), M.accent, side * .33, .34, -.12);
  }
  addMesh(g, rboxGeo(.26, .03, .26, .006), M.cloth2, 0, .585, 0);
  return { group: g, walk: [] };
}

/* --- aviación --------------------------------------------------------- */
function addStar(parent, x, y, z, r, color = 0xd42b25) {
  const disc = addMesh(parent, cylGeo(r, r, .012, 14), basicMat(color), x, y, z);
  disc.rotation.x = Math.PI / 2;
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * Math.PI * 2;
    const p = addMesh(parent, coneGeo(r * .34, r * .8, 3), basicMat(0xffd34a), x + Math.cos(a) * r * .32, y, z + Math.sin(a) * r * .32);
    p.rotation.x = Math.PI / 2; p.rotation.z = a;
  }
}
function buildFlyer(parent, P, opts = {}) {
  const M = paletteMats(P);
  const g = new THREE.Group();
  g.scale.setScalar(opts.scale || 1);
  parent.add(g);
  const wingMat = opts.wingColor != null ? umat(opts.wingColor, .8) : M.cloth2;
  const bodyMat = opts.bodyColor != null ? umat(opts.bodyColor, .7) : M.cloth;
  const flap = [];
  // Cuerpo alargado y cabeza con cuernos/ojos brillantes.
  addMesh(g, sphGeo(.22, 12), bodyMat, 0, 0, 0).scale.set(.78, .62, 1.45);
  addMesh(g, sphGeo(.12, 10), bodyMat, 0, .03, .32).scale.set(.9, .9, 1.05);
  addMesh(g, sphGeo(.05, 8), M.skin, 0, .04, .43).scale.set(.9, .75, 1);
  for (const side of [-1, 1]) {
    addMesh(g, sphGeo(.024, 6), M.glow, side * .055, .07, .39);
    if (opts.horns) addMesh(g, coneGeo(.028, .16, 5), M.bone, side * .07, .12, .28).rotation.z = side * .7;
  }
  addMesh(g, coneGeo(.07, .38, 8), M.cloth2, 0, 0, -.38).rotation.x = Math.PI / 2;
  addMesh(g, coneGeo(.02, .16, 5), M.accent, 0, .02, -.6).rotation.x = Math.PI / 2;
  // Alas con membrana y costillas.
  for (const side of [-1, 1]) {
    const wing = new THREE.Group();
    wing.position.set(side * .1, .04, .02);
    g.add(wing);
    const membrane = addMesh(wing, rboxGeo(.58, .022, .3, .02), wingMat, side * .28, 0, -.03);
    membrane.rotation.z = side * -.12;
    addMesh(wing, rboxGeo(.56, .018, .035, .008), M.metal, side * .28, .012, .11);
    for (let i = 0; i < 3; i++) {
      const rib = addMesh(wing, rboxGeo(.5 - i * .11, .014, .022, .006), M.metal, side * (.2 + i * .035), .014, -.02 - i * .07);
      rib.rotation.y = side * (.18 + i * .12);
    }
    flap.push(wing);
  }
  if (opts.rider) {
    addMesh(g, rboxGeo(.13, .17, .1, .02), M.armor, 0, .18, .02);
    addMesh(g, sphGeo(.06, 8), M.skin, 0, .3, .04);
    addMesh(g, cylGeo(.035, .045, .12, 7), M.metal, 0, .36, .02);
    addMesh(g, cylGeo(.012, .016, .28, 6), M.dark, .07, .24, .06).rotation.z = -.55;
  }
  return { group: g, walk: [], flap };
}
function buildFighter(parent, P, opts = {}) {
  const M = paletteMats(P);
  const paint = umat(opts.paint || 0x5b6672, .42, .35), dark = umat(0x232a31, .6, .3), glass = umat(0x9fd8e8, .1, .3);
  const g = new THREE.Group();
  g.scale.setScalar(opts.scale || 1);
  parent.add(g);
  const sh = new THREE.Shape();
  sh.moveTo(0, 1.0); sh.lineTo(1.08, -.3); sh.lineTo(1.0, -.5); sh.lineTo(.28, -.32);
  sh.lineTo(.2, -.64); sh.lineTo(-.2, -.64); sh.lineTo(-.28, -.32); sh.lineTo(-1.0, -.5);
  sh.lineTo(-1.08, -.3); sh.closePath();
  const wing = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .075, bevelEnabled: true, bevelSize: .02, bevelThickness: .015, bevelSegments: 1 }), paint);
  wing.rotation.x = Math.PI / 2; wing.position.y = .56; wing.castShadow = true; g.add(wing);
  addMesh(g, cylGeo(.09, .13, .95, 14), paint, 0, .57, .05).rotation.x = Math.PI / 2;
  addMesh(g, coneGeo(.09, .36, 14), paint, 0, .57, .62).rotation.x = Math.PI / 2;
  addMesh(g, cylGeo(.09, .09, .12, 14), dark, 0, .57, .78).rotation.x = Math.PI / 2;
  addMesh(g, sphGeo(.085, 12), glass, 0, .64, .22).scale.set(.78, .62, 1.5);
  addMesh(g, rboxGeo(.2, .12, .3, .02), paint, 0, .64, .0);
  for (const side of [-1, 1]) {
    const tail = addMesh(g, rboxGeo(.04, .26, .2, .01), paint, side * .13, .7, -.5);
    tail.rotation.z = side * .24;
    addMesh(g, cylGeo(.055, .065, .26, 10), dark, side * .15, .56, -.42).rotation.x = Math.PI / 2;
    addMesh(g, cylGeo(.05, .05, .02, 10), basicMat(0xffb15c), side * .15, .56, -.56).rotation.x = Math.PI / 2;
    addMesh(g, rboxGeo(.02, .03, .34, .004), umat(0xd8dde0, .4, .5), side * .56, .575, .05);
    addMissilePylon(g, side * .55, .52, -.06, paint, dark);
    addMesh(g, rboxGeo(.05, .012, .6, .004), basicMat(0xd42b25), side * .3, .602, .02);
  }
  addMesh(g, coneGeo(.028, .18, 8), dark, 0, .57, .86).rotation.x = Math.PI / 2;
  addStar(g, 0, .605, .02, .075);
  return { group: g, walk: [] };
}
function buildBomber(parent, P, opts = {}) {
  const M = paletteMats(P);
  const paint = umat(opts.paint || 0x353c45, .5, .3), dark = umat(0x1c2229, .65, .25), glass = umat(0x8ec4d8, .1, .3);
  const g = new THREE.Group();
  g.scale.setScalar(opts.scale || 1);
  parent.add(g);
  const sh = new THREE.Shape();
  sh.moveTo(0, 1.0); sh.lineTo(1.55, -.05); sh.lineTo(1.5, -.4); sh.lineTo(.42, -.28);
  sh.lineTo(0, -.38); sh.lineTo(-.42, -.28); sh.lineTo(-1.5, -.4); sh.lineTo(-1.55, -.05);
  sh.closePath();
  const wing = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .1, bevelEnabled: true, bevelSize: .025, bevelThickness: .02, bevelSegments: 1 }), paint);
  wing.rotation.x = Math.PI / 2; wing.position.y = .5; wing.castShadow = true; g.add(wing);
  addMesh(g, rboxGeo(.46, .16, .82, .08), paint, 0, .57, .05);
  addMesh(g, new THREE.SphereGeometry(.14, 14, 8), glass, 0, .66, .34).scale.set(1.1, .7, 1.2);
  addMesh(g, rboxGeo(.34, .05, .3, .02), dark, 0, .66, .52);
  for (const side of [-1, 1]) {
    addMesh(g, rboxGeo(.26, .12, .5, .05), dark, side * .38, .56, .1);
    addMesh(g, cylGeo(.07, .08, .06, 10), basicMat(0x66d9ff), side * .38, .56, .36).rotation.x = Math.PI / 2;
    for (let i = 0; i < 3; i++) addMesh(g, rboxGeo(.4, .012, .035, .004), umat(0x59636e, .5, .3), side * (0.55 + i * .22), .557, -.05 - i * .06);
    addMesh(g, sphGeo(.032, 6), basicMat(0xff4a3c), side * 1.42, .53, -.2);
    addMesh(g, rboxGeo(.26, .015, .34, .004), basicMat(0xd42b25), side * .72, .558, -.02);
  }
  addMesh(g, sphGeo(.028, 6), basicMat(0x7dff9a), 0, .6, .78);
  addStar(g, 0, .6, .1, .09);
  return { group: g, walk: [] };
}

/* --- OVNIs ------------------------------------------------------------ */
function buildSaucer(parent, P, opts = {}) {
  const M = paletteMats(P);
  const R = opts.r || .38;
  const g = new THREE.Group();
  g.scale.setScalar(opts.scale || 1);
  parent.add(g);
  const ring = new THREE.Group(); ring.position.y = .4; g.add(ring);
  addMesh(g, sphGeo(R, 20), M.armor, 0, .36, 0).scale.set(1, .34, 1);
  addMesh(g, cylGeo(R * .99, R * .9, .1, 22), M.cloth2, 0, .35, 0);
  addMesh(g, cylGeo(R * .7, R * .82, .06, 18), M.metal, 0, .42, 0);
  addMesh(g, new THREE.SphereGeometry(R * .46, 16, 10, 0, Math.PI * 2, 0, Math.PI * .58), umat(0x9fe0f0, .08, .2), 0, .43, 0);
  const halo = addMesh(ring, new THREE.TorusGeometry(R * .93, .02, 6, 28), M.glow, 0, 0, 0, false, false);
  halo.rotation.x = Math.PI / 2;
  const lights = 10;
  for (let i = 0; i < lights; i++) {
    const a = i / lights * Math.PI * 2;
    addMesh(ring, sphGeo(R * .055, 6), basicMat(P.accent), Math.cos(a) * R * .94, .02, Math.sin(a) * R * .94, false, false);
  }
  addMesh(g, cylGeo(R * .2, R * .3, .06, 10), M.dark, 0, .27, 0);
  addMesh(g, new THREE.TorusGeometry(R * .52, .014, 6, 20), basicMat(P.accent, .8), 0, .24, 0, false, false).rotation.x = Math.PI / 2;
  if (opts.interceptor) {
    for (const side of [-1, 1]) {
      const prong = addMesh(g, rboxGeo(.06, .05, .62, .015), M.metal, side * R * .5, .36, R * .75);
      prong.rotation.y = side * .18;
      addMesh(g, coneGeo(.03, .14, 5), M.accent, side * R * .54, .36, R * 1.06).rotation.x = Math.PI / 2;
    }
  }
  if (opts.mother) {
    addMesh(g, cylGeo(R * .58, R * .8, .1, 18), M.armor, 0, .56, 0);
    addMesh(g, sphGeo(R * .3, 12), umat(0x9fe0f0, .08, .2), 0, .62, 0).scale.y = .6;
    addMesh(g, new THREE.TorusGeometry(R * .72, .018, 6, 22), basicMat(P.accent, .7), 0, .5, 0, false, false).rotation.x = Math.PI / 2;
  }
  if (opts.boss) {
    const outer = new THREE.Group(); outer.rotation.x = .35; g.add(outer);
    addMesh(outer, new THREE.TorusGeometry(R * 1.18, .03, 6, 30), M.glow, 0, .36, 0, false, false).rotation.x = Math.PI / 2;
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2;
      addMesh(outer, sphGeo(R * .07, 6), basicMat(P.accent), Math.cos(a) * R * 1.18, .36, Math.sin(a) * R * 1.18, false, false);
    }
    const beam = addMesh(g, new THREE.ConeGeometry(R * .55, R * 1.6, 18, 1, true), basicMat(P.accent, .18), 0, -.4, 0, false, false);
    beam.rotation.x = Math.PI;
    addMesh(g, new THREE.SphereGeometry(R * .4, 14, 10), M.glow, 0, .38, 0);
    g.userData.outer = outer;
  }
  g.userData.ring = ring;
  return { group: g, walk: [] };
}

/* --- alas celestiales -------------------------------------------------- */
function addCelestialWing(parent, side, size, matColor, glowMat, layer = 0) {
  const wing = new THREE.Group();
  wing.position.set(side * .12, .78 + layer * .1, -.1);
  wing.rotation.y = side * .22;
  wing.rotation.z = side * .18;
  parent.add(wing);
  // Hueso maestro del ala.
  const arm = addMesh(wing, rboxGeo(size * .62, .055, .1, .02), matColor, side * size * .3, .01, -.03);
  addMesh(wing, sphGeo(.07, 8), matColor, 0, 0, 0);
  const feathers = layer === 0 ? 7 : 5;
  for (let i = 0; i < feathers; i++) {
    const L = size * (1 - i * .09) * (layer === 0 ? 1 : .68);
    const y = layer * .05 - i * .018;
    const z = -.04 - i * .07;
    const feather = addMesh(wing, rboxGeo(L, .032, .14, .028), matColor,
      side * (L * .5 + size * .06), y, z);
    feather.rotation.y = -side * (i * .16 + .1);
    feather.rotation.z = side * (.04 + i * .028);
    if (glowMat) {
      const tip = addMesh(wing, rboxGeo(L * .34, .036, .075, .012), glowMat,
        side * (L * .82 + size * .06), y + .004, z - L * .1);
      tip.rotation.y = -side * (i * .16 + .1);
      tip.rotation.z = side * (.04 + i * .028);
      addMesh(wing, rboxGeo(L * .5, .014, .02, .006), glowMat,
        side * (L * .52 + size * .06), y + .02, z + .055).rotation.y = -side * (i * .16 + .1);
    }
  }
  return wing;
}
function buildCelestial(parent, P, opts = {}) {
  const M = paletteMats(P);
  const g = new THREE.Group();
  parent.add(g);
  const big = opts.boss === true;
  const figScale = big ? 1.42 : 1.06;
  const fig = buildFigure(g, {
    palette: P, scale: figScale, outfit: big ? 'celestialBoss' : opts.arch ? 'celestialArch' : 'celestial',
    head: big ? 'goldhelm' : 'circlet', weapon: opts.weapon || 'staff', cape: true, capeColor: P.cloth,
    capeW: big ? .5 : .4, capeH: big ? .7 : .55, weaponScale: big ? 1.2 : 1
  });
  fig.position.y = .2;
  addMesh(g, sphGeo(.05, 8), M.glow, 0, .82, .17);
  const wings = [];
  const wingCol = umat(P.cloth, .5);
  for (const side of [-1, 1]) {
    wings.push(addCelestialWing(g, side, big ? 1.0 : .68, wingCol, M.basic, 0));
    wings.push(addCelestialWing(g, side, big ? .78 : .52, wingCol, M.basic, 1));
  }
  const aura = new THREE.Mesh(new THREE.SphereGeometry(big ? 1.05 : .68, 16, 12), basicMat(P.accent, .13));
  aura.position.y = .85; g.add(aura);
  const haloR = big ? .3 : .16;
  const haloY = big ? 1.7 : 1.31;
  const halo = addMesh(g, new THREE.TorusGeometry(haloR, big ? .03 : .02, 6, 26), M.glow, 0, haloY, -.02, false, false);
  halo.rotation.x = Math.PI / 2;
  const haloGlow = addMesh(g, new THREE.TorusGeometry(haloR * 1.12, big ? .012 : .008, 5, 24), basicMat(P.accent, .55), 0, haloY, -.02, false, false);
  haloGlow.rotation.x = Math.PI / 2;
  if (big) {
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2;
      addMesh(g, coneGeo(.03, .22, 4), M.glow, Math.cos(a) * .62, 1.72, Math.sin(a) * .62, false, false).rotation.z = Math.PI / 2 - a;
    }
  }
  g.userData.celestialGlow = aura;
  g.userData.flap = wings;
  return g;
}
/* --- configuración visual de cada tropa ------------------------------- */
const UNIT_SPECS = {
  clubber:     { head: 'horns', outfit: 'fur', weapon: 'club', weaponScale: 1.25, squad: 2, scale: 1.28, labelY: 1.3 },
  brute:       { head: 'hornsBig', outfit: 'furHeavy', weapon: 'clubHeavy', weaponScale: 1.15, squad: 1, scale: 1.5, labelY: 1.55 },
  shaman:      { head: 'skull', outfit: 'robe', weapon: 'staff', squad: 1, scale: 1.34, labelY: 1.4 },
  cavemenBoss: { head: 'hornsBig', outfit: 'furHeavy', weapon: 'clubHeavy', squad: 1, scale: 1.9, labelY: 2.0, boss: true, cape: true, capeColor: 0x4a3320, weaponScale: 1.35, spikes: 6 },

  hoplite:     { head: 'corinthian', outfit: 'spartan', weapon: 'spear', shield: 'round', squad: 2, scale: 1.34, labelY: 1.36 },
  spartan:     { head: 'corinthian', outfit: 'spartanElite', weapon: 'sword', shield: 'round', squad: 1, scale: 1.5, labelY: 1.55, cape: true, capeColor: 0x8f1f1a, bracer: true },
  spearman:    { head: 'corinthian', outfit: 'spartanLight', weapon: 'spear', squad: 2, scale: 1.28, labelY: 1.32 },
  spartanBoss: { head: 'corinthianCrest', outfit: 'spartanBoss', weapon: 'spearBig', shield: 'roundBig', squad: 1, scale: 1.92, labelY: 2.05, boss: true, cape: true, capeColor: 0x8f1f1a, weaponScale: 1.2, spikes: 6 },

  crusader:    { head: 'greatHelm', outfit: 'crusader', weapon: 'sword', shield: 'kite', banner: true, squad: 2, scale: 1.3, labelY: 1.4 },
  knight:      { head: 'greatHelm', outfit: 'plate', weapon: 'sword', shield: 'kite', squad: 1, scale: 1.46, labelY: 1.5, cape: true, capeColor: 0xefe8d6 },
  archer:      { head: 'hood', outfit: 'crusaderLight', weapon: 'bow', squad: 2, scale: 1.26, labelY: 1.32 },
  crusaderBoss:{ head: 'crown', outfit: 'crusaderBoss', weapon: 'greatsword', shield: 'kiteBig', banner: true, squad: 1, scale: 1.92, labelY: 2.1, boss: true, cape: true, capeColor: 0xb42c25, weaponScale: 1.15, spikes: 6 },

  cutlass:     { head: 'tricorn', outfit: 'pirate', weapon: 'cutlass', squad: 2, scale: 1.28, labelY: 1.34 },
  cannoneer:   { head: 'bandana', outfit: 'pirateHeavy', weapon: 'cannon', squad: 1, scale: 1.36, labelY: 1.4 },
  buccaneer:   { head: 'bandana', outfit: 'pirateLight', weapon: 'cutlass2', squad: 2, scale: 1.26, labelY: 1.32 },
  pirateBoss:  { head: 'tricornBoss', outfit: 'pirateBoss', weapon: 'cannonBig', squad: 1, scale: 1.92, labelY: 2.05, boss: true, cape: true, capeColor: 0x16202a, weaponScale: 1.2, spikes: 6 },

  doughboy:    { head: 'brodie', outfit: 'wwi', weapon: 'rifle', squad: 2, scale: 1.3, labelY: 1.34 },
  doughboyMG:  { head: 'brodie', outfit: 'wwiHeavy', weapon: 'mg', squad: 1, scale: 1.38, labelY: 1.42 },
  wwiBoss:     { head: 'cap', outfit: 'wwiBoss', weapon: 'mgBig', squad: 1, scale: 1.92, labelY: 2.0, boss: true, cape: true, capeColor: 0x53523c, weaponScale: 1.2, spikes: 6 },

  cyberSoldier:{ head: 'tech', outfit: 'tech', weapon: 'energy', squad: 2, scale: 1.34, labelY: 1.36, bracer: true },
  droneSoldier:{ head: 'tech', outfit: 'techLight', weapon: 'energy', squad: 2, scale: 1.28, labelY: 1.32, drone: true },

  walker:      { head: 'zombie', outfit: 'zombie', weapon: 'claw', squad: 2, scale: 1.3, labelY: 1.34 },
  runner:      { head: 'zombie', outfit: 'zombieRunner', weapon: 'claw', squad: 2, scale: 1.24, labelY: 1.3, lean: true },
  tankZombie:  { head: 'zombieHelm', outfit: 'zombieArmor', weapon: 'clawBig', squad: 1, scale: 1.5, labelY: 1.56 },
  zombieBoss:  { head: 'zombieBoss', outfit: 'zombieBoss', weapon: 'clawBig', squad: 1, scale: 1.98, labelY: 2.1, boss: true, spikes: 6 },

  imp:         { head: 'horns', outfit: 'fur', weapon: 'claw', squad: 2, scale: 1.26, labelY: 1.3 },
  hellKnight:  { head: 'greatHelm', outfit: 'plate', weapon: 'greatsword', shield: 'kite', squad: 1, scale: 1.5, labelY: 1.6, cape: true, capeColor: 0x2a0505, bracer: true },
  demonBoss:   { head: 'hornsBig', outfit: 'plate', weapon: 'greatsword', shield: 'kiteBig', squad: 1, scale: 2.0, labelY: 2.1, boss: true, cape: true, capeColor: 0x7a1010, weaponScale: 1.25, spikes: 8 },

  abductor:    { head: 'tech', outfit: 'techLight', weapon: 'energy', squad: 1, scale: 1.35, labelY: 1.4 },
  guardian:    { head: 'goldhelm', outfit: 'celestialArch', weapon: 'spear', shield: 'round', squad: 1, scale: 1.5, labelY: 1.8, bracer: true }
};

function buildSquad(g, spec, P) {
  const count = Math.max(1, spec.squad || 1);
  const offsets = count === 1 ? [[0, 0]]
    : count === 2 ? [[-.12, .05], [.18, .2]]
    : [[-.2, .04], [.18, .12], [.02, .3]];
  const figs = [];
  for (let i = 0; i < count; i++) {
    const [x, z] = offsets[i];
    const fig = buildFigure(g, {
      palette: P, scale: (spec.figureScale || 1) * (i === 0 ? 1 : .9),
      head: spec.head, outfit: spec.outfit, weapon: spec.weapon, weaponScale: spec.weaponScale,
      weaponSide: i === 0 ? -1 : 1, shield: i === 0 ? spec.shield : null,
      cape: i === 0 ? spec.cape : false, capeColor: spec.capeColor,
      banner: i === 0 ? spec.banner : false, bracer: spec.bracer
    });
    fig.position.set(x, 0, z);
    fig.rotation.y = i === 0 ? 0 : (i * .5 - .25);
    if (spec.lean && i === 0) fig.rotation.x = -.06;
    figs.push(fig);
  }
  return figs;
}

function enemyModel(type) {
  const d = ENEMIES[type];
  const P = FACTION_PALETTE[d.faction] || FACTION_PALETTE.cavemen;
  const spec = UNIT_SPECS[type] || { head: 'dome', outfit: 'fur', weapon: 'rifle', squad: 1, scale: 1.3, labelY: 1.34 };
  const g = new THREE.Group();
  let walk = [], flap = null, ring = null, labelY = spec.labelY || 1.35, scale = spec.scale || 1.35;

  if (type === 'fighter' || type === 'biplane') {
    const r = buildFighter(g, P, { paint: type === 'biplane' ? P.cloth : 0x7c8b99 });
    walk = r.walk; scale = type === 'biplane' ? 1.18 : 1.28; labelY = 1.35;
  } else if (type === 'bomber' || type === 'airship' || type === 'hellBomber') {
    const r = buildBomber(g, P, { paint: type === 'airship' ? P.cloth : type === 'hellBomber' ? 0x4a0a0a : 0x4b5561 });
    walk = r.walk; scale = type === 'airship' ? 1.55 : 1.34; labelY = type === 'airship' ? 1.6 : 1.45;
  } else if (type === 'pterodactyl' || type === 'pegasus' || type === 'gryphon' || type === 'mutantBat' || type === 'demonWing') {
    const style = {
      pterodactyl: { wingColor: P.cloth2, bodyColor: P.cloth, horns: false, rider: true, scale: .86, labelY: 1.15 },
      pegasus: { wingColor: 0xe8e2d2, bodyColor: P.cloth, horns: false, rider: true, scale: .9, labelY: 1.25 },
      gryphon: { wingColor: P.accent, bodyColor: P.cloth2, horns: true, rider: true, scale: .95, labelY: 1.3 },
      mutantBat: { wingColor: P.cloth2, bodyColor: P.fur, horns: false, rider: false, scale: .74, labelY: 1.0 },
      demonWing: { wingColor: P.cloth2, bodyColor: P.cloth, horns: true, rider: false, scale: .88, labelY: 1.2 }
    }[type];
    const r = buildFlyer(g, P, style);
    walk = r.walk; flap = r.flap; scale = style.scale; labelY = style.labelY;
  } else if (type === 'scout') {
    const r = buildSaucer(g, P, { r: .46 });
    walk = r.walk; ring = r.group.userData.ring; scale = 1.12; labelY = 1.1;
  } else if (type === 'interceptor') {
    const r = buildSaucer(g, P, { r: .5, interceptor: true });
    walk = r.walk; ring = r.group.userData.ring; scale = 1.24; labelY = 1.2;
  } else if (type === 'mothershipScout') {
    const r = buildSaucer(g, P, { r: .66, mother: true });
    walk = r.walk; ring = r.group.userData.ring; scale = 1.3; labelY = 1.4;
  } else if (type === 'ufoBoss') {
    const r = buildSaucer(g, P, { r: .92, boss: true, mother: true });
    walk = r.walk; ring = r.group.userData.ring; scale = 1.85; labelY = 1.65;
  } else if (type === 'chinaTechBoss') {
    const r = buildMech(g, P, { boss: true, scale: 1 });
    walk = r.walk; scale = 1.2; labelY = 2.1;
  } else if (type === 'mech' || type === 'tripod') {
    const r = buildMech(g, P, { scale: 1 });
    walk = r.walk; scale = type === 'tripod' ? 1.0 : .9; labelY = type === 'tripod' ? 1.95 : 1.8;
  } else if (type === 'doughboyTank') {
    const r = buildTank(g, P);
    walk = r.walk; scale = 1.2; labelY = 1.1;
  } else if (d.faction === 'celestials' && d.kind === 'air') {
    const boss = type === 'celestialBoss';
    const cel = buildCelestial(g, P, { boss, arch: type !== 'angel', weapon: boss ? 'staff' : 'spear' });
    flap = cel.userData.flap;
    scale = boss ? 1.5 : type === 'seraph' ? 1.3 : type === 'archon' ? 1.16 : 1.02;
    labelY = boss ? 2.8 : 1.85;
    if (boss) labelY = 2.9;
  } else {
    const figs = buildSquad(g, spec, P);
    for (const f of figs) walk = walk.concat(f.userData.walk || []);
    if (spec.drone) {
      const M = paletteMats(P);
      const drone = new THREE.Group();
      drone.position.set(.46, .52, -.04); g.add(drone);
      addMesh(drone, rboxGeo(.14, .08, .2, .03), M.armor, 0, 0, 0);
      addMesh(drone, sphGeo(.05, 8), M.glow, 0, -.01, .1);
      const rr = new THREE.Group(); drone.add(rr);
      addMesh(rr, new THREE.TorusGeometry(.12, .012, 5, 16), M.glow, 0, 0, 0, false, false).rotation.x = Math.PI / 2;
      ring = rr;
    }
    if (spec.boss) {
      addUnitBase(g, .52, P, spec.spikes || 0);
      const aura = new THREE.Mesh(new THREE.SphereGeometry(.72 * scale * .9, 14, 10), basicMat(P.accent, .08));
      aura.position.y = .55; g.add(aura); g.userData.bossAura = aura;
    } else if (type !== 'doughboyTank') {
      addUnitBase(g, spec.squad === 2 ? .33 : .27, P, 0);
    }
  }

  // Escala general de las miniaturas: proporción creíble frente a estructuras de una celda.
  // La tropa común se reduce y los jefes conservan una presencia claramente mayor.
  scale *= d.boss ? .9 : .74;
  const alt = ALTITUDE[type] || 0;
  const isAir = d.kind === 'air';
  const blob = new THREE.Mesh(new THREE.CircleGeometry(1, 20), new THREE.MeshBasicMaterial({ color: 0x10160f, transparent: true, opacity: .32, depthWrite: false }));
  blob.rotation.x = -Math.PI / 2; blob.position.y = (-alt + .02) / scale;
  blob.scale.setScalar(d.boss ? 1.0 : isAir ? .55 : spec.squad === 2 ? .42 : .34);
  g.add(blob);

  // Barras y etiqueta con tamaño constante en pantalla, independiente de la escala.
  const ui = 1 / scale;
  // Grupo de UI contrarrotado: la barra permanece horizontal aunque el modelo
  // gire para seguir la ruta. Sin esto el relleno se desplazaría en profundidad
  // al caminar en vertical y quedaría tapado por el fondo.
  const bar = new THREE.Group();
  bar.position.y = labelY;
  g.add(bar);
  const hpbg = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0x141812, transparent: true, opacity: .92, depthTest: false, depthWrite: false }));
  hpbg.scale.set((d.boss ? 1.3 : .7) * ui, .08 * ui, 1); hpbg.position.y = 0;
  hpbg.renderOrder = 3;
  bar.add(hpbg);
  const hpfg = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0x9b443a, transparent: true, depthTest: false, depthWrite: false }));
  hpfg.scale.set((d.boss ? 1.2 : .64) * ui, .048 * ui, 1); hpfg.position.set(0, 0, .008);
  hpfg.renderOrder = 4;
  bar.add(hpfg);
  const label = labelSprite(loc(d, 'name'), enemyLabelAccent(type));
  label.scale.set((d.boss ? 1.75 : 1.18) * ui, (d.boss ? .33 : .225) * ui, 1);
  label.position.y = labelY + .2 * ui;
  label.visible = settings.labels !== false;
  g.add(label);
  g.scale.setScalar(scale);
  g.userData = {
    mover: null, bar, hpbg, hpfg, label, type, legs: walk, walk, flap, ring,
    rotor: null, tailRotor: null, propeller: null, labelY, ui,
    hpW: (d.boss ? 1.2 : .64) * ui,
    hpBgW: (d.boss ? 1.3 : .7) * ui, hpBgH: .08 * ui, hpFgH: .048 * ui,
    labelW: (d.boss ? 1.75 : 1.18) * ui, labelH: (d.boss ? .33 : .225) * ui
  };
  return g;
}

function addInfiltratorHalo(model) {
  const y = (model.userData.labelY || 1.3) * .55;
  const halo = new THREE.Group();
  const outer = new THREE.Mesh(
    cacheGeo('infHaloOuter', () => new THREE.TorusGeometry(.46, .03, 6, 32)),
    new THREE.MeshBasicMaterial({ color: 0x6ee7ff, transparent: true, opacity: .8, depthWrite: false, blending: THREE.AdditiveBlending })
  );
  outer.rotation.x = Math.PI / 2; outer.position.y = y; outer.renderOrder = 2;
  halo.add(outer);
  const inner = new THREE.Mesh(
    cacheGeo('infHaloInner', () => new THREE.TorusGeometry(.33, .018, 6, 26)),
    new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: .6, depthWrite: false, blending: THREE.AdditiveBlending })
  );
  inner.rotation.x = Math.PI / 2; inner.position.y = y; inner.renderOrder = 2;
  halo.add(inner);
  model.add(halo);
  model.userData.infilHalo = halo;
  model.userData.infilRings = [outer, inner];
  return halo;
}

function buildFighterProp(color = 0x828a8a) {
  const jet = new THREE.Group();
  const paint = umat(color, .4, .35), dark = umat(0x2d3430), glass = umat(0x9fc0c4, .13, .05);
  addMesh(jet, cylGeo(.06, .1, .8, 12), paint, 0, 0, 0).rotation.x = Math.PI / 2;
  addMesh(jet, coneGeo(.06, .34, 12), paint, 0, 0, .55).rotation.x = Math.PI / 2;
  addMesh(jet, sphGeo(.07, 10), glass, 0, .06, .16).scale.set(.8, .7, 1.35);
  for (const side of [-1, 1]) {
    const wing = addMesh(jet, rboxGeo(.66, .026, .28, .02), paint, side * .34, 0, -.04);
    wing.rotation.y = side * .32;
    addMesh(jet, rboxGeo(.24, .02, .12, .01), paint, side * .6, 0, .1).rotation.y = side * .2;
    const fin = addMesh(jet, rboxGeo(.03, .19, .15, .01), paint, side * .13, .13, -.26);
    fin.rotation.z = side * .2;
    addMesh(jet, cylGeo(.04, .05, .2, 10), dark, side * .15, -.05, -.24).rotation.x = Math.PI / 2;
    addMesh(jet, cylGeo(.038, .038, .03, 8), basicMat(0xffb15c), side * .15, -.05, -.35).rotation.x = Math.PI / 2;
    addMesh(jet, rboxGeo(.04, .012, .28, .004), basicMat(0xd42b25), side * .26, .022, -.02);
  }
  addMesh(jet, coneGeo(.025, .16, 8), dark, 0, 0, .76).rotation.x = Math.PI / 2;
  return jet;
}

/* ------------------------------------------------------------ construcción */
function ensureGhost() {
  if (ghost && ghost.userData.type === state.buildType) return;
  if (ghost) world.remove(ghost);
  ghost = buildTowerModel(state.buildType, state.army, 1, true);
  world.add(ghost);
}
function footprintOf(def) {
  // Los cascos navales ocupan 2×2 celdas; el resto, una sola celda.
  return def.domain === 'sea' ? { w: 2, d: 2 } : { w: 1, d: 1 };
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
    if (Math.abs(center.x) > 21) return false;
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
const TOWER_UPGRADE = { damage: 1.34, range: 1.07, rate: .94, maxLevel: 5 };
// Modificadores de clima aplicados a TODAS las estructuras. Los valores son
// fracciones: +.08 = +8 %. En cadencia, un valor negativo la ralentiza.
const CLIMATE_TOWER_MODS = {
  templado:   { damage: 0, range: 0, rate: 0 },
  caluroso:   { damage: .08, range: 0, rate: -.12 },
  tropical:   { damage: 0, range: -.08, rate: .08 },
  frío:       { damage: .05, range: .04, rate: -.10 },
  radiactivo: { damage: .12, range: -.10, rate: 0 },
  desconocido:{ damage: -.08, range: .12, rate: 0 },
  infernal:   { damage: .10, range: -.06, rate: .06 },
  divino:     { damage: .08, range: .08, rate: .08 }
};
const CLIMATE_ICONS = { templado: '⚖', caluroso: '☀', tropical: '☔', frío: '❄', radiactivo: '☢', desconocido: '👁', infernal: '🔥', divino: '✦' };
function climateMods() { return CLIMATE_TOWER_MODS[state.climate] || CLIMATE_TOWER_MODS.templado; }
function climateBadgeInfo() {
  const mods = climateMods();
  const parts = [];
  if (mods.damage) parts.push(`${mods.damage > 0 ? '+' : '−'}${Math.abs(Math.round(mods.damage * 100))}% ${tr('mod.damage')}`);
  if (mods.range) parts.push(`${mods.range > 0 ? '+' : '−'}${Math.abs(Math.round(mods.range * 100))}% ${tr('mod.range')}`);
  if (mods.rate) parts.push(`${mods.rate > 0 ? '+' : '−'}${Math.abs(Math.round(mods.rate * 100))}% ${tr('mod.rate')}`);
  const total = (mods.damage || 0) + (mods.range || 0) + (mods.rate || 0);
  const mixed = (mods.damage > 0 || mods.range > 0 || mods.rate > 0) && (mods.damage < 0 || mods.range < 0 || mods.rate < 0);
  const color = mixed ? '#e8c468' : total > 0 ? '#9bd06a' : total < 0 ? '#e07a5f' : '#aab19f';
  const ring = mixed ? 0xe8c468 : total > 0 ? 0x8fd06a : total < 0 ? 0xe07a5f : 0x8a948a;
  return {
    icon: CLIMATE_ICONS[state.climate] || '⚖',
    text: parts.length ? `${CLIMATE_ICONS[state.climate] || '⚖'} ${parts.join(' · ')}` : `${CLIMATE_ICONS[state.climate] || '⚖'} ${tr('mod.none')}`,
    color, ring, tone: mixed ? 'mixed' : total > 0 ? 'buff' : total < 0 ? 'debuff' : 'neutral'
  };
}
function attachClimateBadge(t) {
  if (!t || !t.group) return;
  if (t.climateBadge) { t.group.remove(t.climateBadge); t.climateBadge = null; }
  if (t.climateRing) { t.group.remove(t.climateRing); t.climateRing = null; }
  const info = climateBadgeInfo();
  const tag = labelSprite(info.text, info.color);
  const w = Math.min(1.35, .34 + info.text.length * .022);
  tag.scale.set(w, .17, 1);
  tag.position.set(0, t.data && t.data.domain === 'sea' ? 1.35 : 1.52, 0);
  t.group.add(tag); t.climateBadge = tag;
  const ring = new THREE.Mesh(new THREE.RingGeometry(.4, .46, 28), new THREE.MeshBasicMaterial({ color: info.ring, transparent: true, opacity: .42, side: THREE.DoubleSide, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = .075;
  t.group.add(ring); t.climateRing = ring;
}
function refreshClimateTowers() {
  if (!state || !Array.isArray(state.towers)) return;
  for (const t of state.towers) { applyTowerStats(t); attachClimateBadge(t); }
}
function applyTowerStats(t) {
  const data = t.data;
  const mods = armyMods(state.army, t.type);
  const cm = climateMods();
  const level = Math.max(1, t.level || 1) - 1;
  t.stats.damage = data.damage * mods.damage * (1 + (cm.damage || 0)) * Math.pow(TOWER_UPGRADE.damage, level);
  t.stats.range = data.range * mods.range * (1 + (cm.range || 0)) * Math.pow(TOWER_UPGRADE.range, level);
  t.stats.rate = data.rate * mods.rate / (1 + (cm.rate || 0)) * Math.pow(TOWER_UPGRADE.rate, level);
  t.stats.splash = data.splash || 0;
  t.stats.pierce = data.pierce || 0;
  t.stats.slow = data.slow || 0;
  t.stats.salvo = data.salvo || 1;
}
function refreshTowerModel(t) {
  const pos = t.group.position.clone(), old = t.group;
  world.remove(old);
  t.group = buildTowerModel(t.type, state.army, t.level);
  t.group.position.copy(pos); world.add(t.group);
  t.pivot = t.group.userData.pivot;
  t.barrels = t.group.userData.barrels || [];
  t.stats.muzzleY = t.group.userData.muzzleY || t.stats.muzzleY;
  attachClimateBadge(t);
}
function makeTower(type, cx, cz) {
  const data = TOWERS.find(t => t.id === type);
  const center = cellCenter(cx, cz);
  const group = buildTowerModel(type, state.army);
  group.position.set(center.x, data.domain === 'sea' ? -.22 : 0, center.z);
  world.add(group);
  const cells = footprintCells(cx, cz, data);
  for (const cell of cells) clearDecorAt(cell.x, cell.z);
  const tower = {
    type, data, group, pivot: group.userData.pivot, level: 1, invested: 0,
    cooldown: Math.random() * .2, target: null, cell: { x: cx, z: cz },
    barrels: group.userData.barrels || [], mode: 'first',
    specialCd: 0, special: TOWER_SPECIALS[type] || null,
    stats: { muzzleY: group.userData.muzzleY || 1 }
  };
  applyTowerStats(tower);
  attachClimateBadge(tower);
  state.towers.push(tower);
  for (const cell of cells) towerCells.set(cellKey(cell.x, cell.z), tower);
  return tower;
}
// Coste incremental: cada estructura encarece las siguientes. Repetir el mismo
// sistema pesa más que diversificar y la inflación de guerra crece con la oleada.
// Así el jugador puede seguir construyendo, pero llenar el mapa de una sola torre
// deja de ser la estrategia óptima.
function towerCostInflation(type, weight = 1) {
  const total = state.towers.length;
  const same = state.towers.reduce((n, t) => n + (t.type === type ? 1 : 0), 0);
  const global = Math.max(0, total - 2) * .015;
  const repeated = Math.max(0, same - 1) * .05;
  const wave = Math.min(.6, Math.max(0, state.wave - 1) * .012);
  const combined = (1 + global + repeated) * (1 + wave);
  return 1 + (combined - 1) * weight;
}
function getCost(type) {
  const base = TOWERS.find(t => t.id === type).cost;
  return Math.ceil(base * (state.army.discount || 1) * towerCostInflation(type));
}
function upgradeCost(t) {
  // Mejorar también sufre la inflación, aunque a la mitad: el nivel 5 es una
  // inversión real y no una compra automática en cuanto sobra dinero.
  return Math.ceil(t.data.cost * (.9 + t.level * .7) * towerCostInflation(t.type, .55));
}
function sellValue(t) {
  return Math.floor((t.invested || t.data.cost) * .5);
}
// Reparar la base cobra por la integridad realmente perdida y acumula fatiga:
// curar desde muy abajo o insistir varias veces encarece cada uso.
function repairCost() {
  const missing = Math.max(0, 100 - state.hp);
  const base = 55 + missing * 4.5;
  const fatigue = 1 + Math.min(2.5, (state.repairUses || 0) * .18);
  return Math.ceil(base * fatigue);
}
function abilityCost(name) {
  return name === 'repair' ? repairCost() : state.abilities[name].cost;
}
function placeTower() {
  if (state.active) { Sound.error(); toast(tr('toast.buildLocked')); return; }
  if (!state.buildType || !hoverCell) return;
  const { cellX, cellZ } = hoverCell;
  if (!validPlacement(cellX, cellZ)) { Sound.error(); toast(tr('toast.noPosition')); return; }
  const cost = getCost(state.buildType);
  if (state.cash < cost) { Sound.error(); toast(tr('toast.noCredits')); return; }
  state.cash -= cost;
  const tower = makeTower(state.buildType, cellX, cellZ);
  tower.invested = cost;
  state.buildType = null; removeGhost(); updateHud(); renderTowerList();
  selectTower(tower);
  Sound.build(); toast(tr('toast.deployed'));
}
function removeGhost() {
  if (ghost) { world.remove(ghost); ghost = null; }
  placementRing.visible = false; cursorCell.visible = false; gridLines.visible = false;
}
function setBuild(type) {
  if (state.gameOver) return;
  if (state.active) { Sound.error(); toast(tr('toast.buildLocked')); return; }
  // Pulsar de nuevo la misma unidad cancela la selección.
  if (state.buildType === type) {
    state.buildType = null; removeGhost(); updateInspect(); renderTowerList(); renderAbilities();
    return;
  }
  const cost = getCost(type);
  if (state.cash < cost) {
    Sound.error();
    // Sin créditos no se puede mantener una unidad seleccionada.
    state.buildType = null; removeGhost(); updateInspect(); renderTowerList(); renderAbilities();
    toast(tr('toast.noCredits'));
    return;
  }
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
    el.className = 'tower-card' + (state.buildType === t.id ? ' selected' : '') + (t.domain === 'sea' ? ' naval' : '') + (state.active ? ' locked' : '');
    el.innerHTML = `<div class="tower-icon">${t.icon}</div><div><div class="tower-name">${loc(t, 'name')}<span class="domain-tag ${t.domain}">${tr(t.domain === 'sea' ? 'tower.domainSea' : 'tower.domainLand')}</span></div><div class="tower-meta">${loc(t, 'desc')}</div></div><div class="tower-cost">${state.active ? '🔒' : getCost(t.id) + ' ◈'}</div>`;
    el.title = state.active ? tr('build.hintLocked') : tr('tower.title', { name: loc(t, 'name'), range: t.range, key: i + 1 });
    el.addEventListener('click', () => setBuild(t.id));
    host.appendChild(el);
  }
  document.getElementById('buildHint').textContent = state.active ? tr('build.lockedShort') : state.buildType ? 'ESC' : '1-9';
  const hint = document.querySelector('.tower-hint');
  if (hint) hint.textContent = state.active ? tr('build.hintLocked') : tr('build.hint');
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
  const nextCost = upgradeCost(t);
  const spec = TOWER_SPECIALS[t.type];
  const climate = climateBadgeInfo();
  level.textContent = tr('tower.level', { level: t.level });
  body.className = 'action-panel';
  body.innerHTML = `
    <div class="selected-name">${armyWeapon(t.type)}</div>
    <div class="selected-detail">${loc(t.data, 'name')} · ${targetText(t.data.targets)}${t.data.domain === 'sea' ? ' · ' + tr('tower.naval') : ''}</div>
    <div class="climate-chip ${climate.tone}" title="${tr('tower.climate')}">${climate.icon} <span>${climate.text.replace(climate.icon + ' ', '')}</span></div>
    <div class="meter-line"><span>${tr('tower.damage')}</span><b>${Math.round(t.stats.damage)}</b></div>
    <div class="meter"><i style="width:${Math.min(100, t.stats.damage / 1.6)}%"></i></div>
    <div class="meter-line"><span>${tr('tower.range')}</span><b>${t.stats.range.toFixed(1)}</b></div>
    <div class="meter"><i style="width:${Math.min(100, t.stats.range * 7)}%"></i></div>
    <div class="meter-line"><span>${tr('tower.rate')}</span><b>${(1 / t.stats.rate).toFixed(1)}/s</b></div>
    <div class="meter"><i style="width:${Math.min(100, 24 / t.stats.rate)}%"></i></div>
    <div class="target-row"><span>${tr('tower.priority')}</span><button class="target-btn" id="targetMode">${modeText(t.mode)} ↻</button></div>
    ${spec ? `<div class="special-box">
      <div class="special-head"><span>${tr('tower.special')}</span><b>${tr('tower.specialCost', { cost: spec.cost })}</b></div>
      <button class="action-btn special" id="towerSpecial">${spec.icon} ${loc(spec, 'name')} <em>${tr('tower.specialReady')}</em></button>
      <div class="special-desc">${loc(spec, 'desc')}</div>
    </div>` : ''}
    <div class="upgrade-row"><button class="action-btn" id="upgradeTower" ${t.level >= TOWER_UPGRADE.maxLevel || state.active ? 'disabled' : ''}>${tr('tower.upgrade', { cost: t.level >= TOWER_UPGRADE.maxLevel ? tr('tower.max') : nextCost })}</button><button class="action-btn sell" id="sellTower">${tr('tower.sell', { cost: sellValue(t) })}</button></div>`;
  document.getElementById('upgradeTower').addEventListener('click', upgradeSelected);
  document.getElementById('sellTower').addEventListener('click', sellSelected);
  const specialBtn = document.getElementById('towerSpecial');
  if (specialBtn) specialBtn.addEventListener('click', () => activateTowerSpecial(t));
  document.getElementById('targetMode').addEventListener('click', () => {
    const order = ['first', 'last', 'strong', 'close'];
    t.mode = order[(order.indexOf(t.mode) + 1) % order.length];
    updateInspect(); toast(tr('toast.priority', { mode: modeText(t.mode) })); Sound.ui();
  });
  updateSelectedSpecialButton();
}
function upgradeSelected() {
  const t = state.selectedTower;
  if (!t || t.level >= TOWER_UPGRADE.maxLevel) return;
  if (state.active) { Sound.error(); toast(tr('toast.buildLocked')); return; }
  const cost = upgradeCost(t);
  if (state.cash < cost) { Sound.error(); toast(tr('toast.noCredits')); return; }
  state.cash -= cost; t.level++;
  t.invested = (t.invested || 0) + cost;
  applyTowerStats(t);
  refreshTowerModel(t);
  showTowerRange(t); updateInspect(); updateHud(); Sound.upgrade();
  toast(tr('toast.upgrade', { level: t.level }));
}
function sellSelected() {
  const t = state.selectedTower;
  if (!t) return;
  state.cash += sellValue(t);
  world.remove(t.group);
  for (const cell of footprintCells(t.cell.x, t.cell.z, t.data)) towerCells.delete(cellKey(cell.x, cell.z));
  state.towers = state.towers.filter(x => x !== t);
  state.selectedTower = null; placementRing.visible = false;
  updateInspect(); updateHud(); renderTowerList(); Sound.sell(); toast(tr('toast.sold'));
}
function specialTargets(t) {
  const px = t.group.position.x, pz = t.group.position.z;
  const py = t.group.position.y + (t.stats.muzzleY || 1);
  return state.enemies.filter(e => {
    if (!t.data.targets.includes(e.data.kind)) return false;
    if (t.type === 'ew' && jamFactor(e) <= 0) return false;
    const ey = e.air ? (ALTITUDE[e.type] || 2) : .4;
    return Math.hypot(e.x - px, ey - py, e.z - pz) <= t.stats.range;
  });
}
// Las habilidades de estructura se pagan por uso y respetan una recarga
// independiente. Reutilizan los efectos de proyectil de cada arma para que
// cada torre tenga una lectura visual propia.
function activateTowerSpecial(t) {
  if (!t || state.gameOver) return;
  const spec = TOWER_SPECIALS[t.type];
  if (!spec) return;
  const specName = loc(spec, 'name');
  if (t.specialCd > 0) { Sound.error(); toast(tr('toast.reloading', { name: specName, s: Math.ceil(t.specialCd) })); return; }
  if (state.cash < spec.cost) { Sound.error(); toast(tr('toast.noCredits')); return; }
  const targets = specialTargets(t);
  if (!targets.length) { Sound.error(); toast(tr('toast.specialNoTargets', { name: specName })); return; }
  state.cash -= spec.cost;
  t.specialCd = spec.cooldown;
  const baseDamage = t.stats.damage;
  const cx = t.group.position.x, cz = t.group.position.z;
  const ownKind = t.type;
  const pulseColor = ownKind === 'laser' ? 0x6ef0ff : ownKind === 'ew' ? 0xa98bff : ownKind === 'aa' ? 0xffd27a : 0xffb060;
  makePulse(cx, cz, t.stats.range, pulseColor);
  Sound.special(ownKind);
  if (ownKind === 'ew') {
    for (const e of targets) {
      const jam = jamFactor(e);
      e.slowTimer = Math.max(e.slowTimer, 3 + 2.5 * jam);
      if (jam >= .5) e.repelTimer = Math.max(e.repelTimer, 3.4 * jam);
      spawnParticle(e.x, (e.air ? ALTITUDE[e.type] : .5), e.z, 0xb79bff, .8, .5);
    }
  } else if (ownKind === 'laser') {
    const from = new THREE.Vector3(cx, t.group.position.y + (t.stats.muzzleY || 1), cz);
    if (t.group.userData.laserGlow) t.group.userData.laserGlow.emissiveIntensity = 2.8;
    for (const e of targets) {
      const to = new THREE.Vector3(e.x, (ALTITUDE[e.type] || 0) + .45, e.z);
      beam(from, to, .32, 0x77f4ff);
      applyDamage(e, baseDamage * 5.5, t.stats.pierce, t.type, t);
      makeSparks(e.x, to.y, e.z, 0x9ff8ff, 5);
    }
    makePulse(cx, cz, t.stats.range * .72, 0x77f4ff);
  } else if (ownKind === 'art') {
    // Elige el punto con más enemigos agrupados y martillea la zona.
    let best = targets[0], bestScore = -1;
    for (const e of targets) {
      const nearby = targets.filter(o => Math.hypot(o.x - e.x, o.z - e.z) <= (t.data.splash || 1.5)).length;
      if (nearby > bestScore) { bestScore = nearby; best = e; }
    }
    for (let i = 0; i < 4; i++) {
      const ox = (Math.random() - .5) * (t.data.splash || 1.7), oz = (Math.random() - .5) * (t.data.splash || 1.7);
      impactArtillery(best.x + ox, best.z + oz, baseDamage * 1.15, (t.data.splash || 1.7) * 1.15, t.stats.pierce, t.type, t);
      makeSparks(best.x + ox, .5, best.z + oz, 0xffc472, 4);
    }
    t.cooldown = Math.max(t.cooldown, .22);
  } else if (ownKind === 'carrier') {
    const picked = targets.slice(0, 3);
    picked.forEach((e, i) => setTimeout(() => {
      if (state.gameOver || !state.towers.includes(t)) return;
      t.stats.damage = baseDamage * 1.25;
      carrierStrike(t, e);
      t.stats.damage = baseDamage;
    }, i * 160));
  } else {
    const limit = ownKind === 'gun' ? 8 : ownKind === 'rocket' ? 4 : ownKind === 'destroyer' ? 3 : ownKind === 'aa' ? 5 : ownKind === 'mortar' ? 5 : 4;
    const picked = targets.slice(0, limit);
    t.stats.damage = baseDamage * (ownKind === 'gun' ? 1.25 : 1.45);
    for (const e of picked) fire(t, e);
    t.stats.damage = baseDamage;
    if (ownKind === 'gun') {
      const from = new THREE.Vector3(cx, t.group.position.y + (t.stats.muzzleY || 1), cz);
      for (const e of picked) {
        const to = new THREE.Vector3(e.x, (ALTITUDE[e.type] || 0) + .4, e.z);
        const tracer = makeLine(from, to, 0xfff0b0, .2);
        setTimeout(() => { if (tracer.parent) world.remove(tracer); }, 70);
      }
    }
  }
  updateHud(); updateSelectedSpecialButton();
  toast(tr('toast.specialUsed', { name: specName, tower: loc(t.data, 'name') }));
}
function updateSelectedSpecialButton() {
  const t = state.selectedTower, btn = document.getElementById('towerSpecial');
  if (!t || !btn) return;
  const cd = Math.ceil(t.specialCd || 0);
  btn.disabled = cd > 0 || state.gameOver;
  btn.classList.toggle('cooling', cd > 0);
  const stateEl = btn.querySelector('em');
  if (stateEl) stateEl.textContent = cd > 0 ? tr('tower.specialCd', { s: cd }) : tr('tower.specialReady');
}

/* ------------------------------------------------------------ oleadas e IA */
function planType(entry) { return typeof entry === 'string' ? entry : entry.type; }
function planInf(entry) { return typeof entry === 'string' ? false : !!entry.inf; }
// Destacamentos de otra facción que se cuelan en la oleada. Se generan de forma
// determinista para que la vista de inteligencia coincida con lo que llega.
function buildInfiltrators(wave, fac, boss, stage, rnd) {
  const index = factionIndexForWave(wave);
  const others = ENEMY_FACTIONS.filter(f => f.id !== fac.id);
  const src = others[(index + stage) % others.length];
  const pool = src.units.filter(u => !u.boss);
  const air = pool.filter(u => u.kind === 'air');
  const ground = pool.filter(u => u.kind === 'ground');
  const count = boss
    ? Math.min(5, 2 + Math.floor(wave / 12))
    : Math.min(6, 1 + Math.floor(wave / 7) + (stage >= 4 ? 1 : 0));
  const picks = [];
  for (let i = 0; i < count; i++) {
    // Mayoría terrestre y una parte aérea: el halo se ve en ambos corredores sin
    // saturar el cielo, que ya exige defensa antiaérea dedicada.
    const prefer = i % 3 === 2 ? air : ground;
    const list = prefer.length ? prefer : pool;
    picks.push({ type: list[Math.floor(rnd() * list.length)].id, inf: true });
  }
  return picks;
}
function buildWavePlan(wave) {
  const fac = factionByWave(wave);
  const boss = isBossWave(wave);
  const total = boss ? Math.min(32, 6 + Math.floor(wave / 4)) : Math.min(64, Math.round(8 + wave * 1.65));
  const airTypes = fac.units.filter(u => u.kind === 'air');
  const groundTypes = fac.units.filter(u => u.kind === 'ground');
  const stage = Math.max(1, Math.min(WAVES_PER_FACTION, waveInFaction(wave)));
  // Proporción de aire por oleada: la primera es casi terrestre y la presión
  // aérea crece con cada etapa de la facción. El jefe llega con escolta mixta.
  const airRatio = boss ? .28 : [.08, .13, .18, .22][Math.min(3, stage - 1)];
  let targetAir = Math.round(total * airRatio);
  if (airTypes.length) targetAir = Math.max(1, targetAir);
  else targetAir = 0;
  if (groundTypes.length) targetAir = Math.min(total - 1, targetAir);
  else targetAir = total;
  if (airTypes.length && targetAir < Math.min(airTypes.length, total - 1)) targetAir = Math.min(airTypes.length, total - 1);
  const targetGround = total - targetAir;
  let seed = (wave * 9301 + 49297) % 233280;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const pick = list => {
    const weights = list.map(u => 1.1 + (u.tier || 1) * .85);
    const sum = weights.reduce((s, w) => s + w, 0);
    let roll = rnd() * sum;
    for (let i = 0; i < list.length; i++) { roll -= weights[i]; if (roll <= 0) return list[i].id; }
    return list[list.length - 1].id;
  };
  const fill = (list, count) => {
    if (!list.length || count <= 0) return [];
    const picks = [];
    // Cada tipo aparece al menos una vez si el cupo lo permite.
    for (const unit of list) { if (picks.length < count) picks.push(unit.id); else break; }
    while (picks.length < count) picks.push(pick(list));
    return picks;
  };
  let plan = fill(airTypes, targetAir).concat(fill(groundTypes, targetGround));
  // Mezcla determinista para que no lleguen primero todos los aéreos o terrestres.
  for (let i = plan.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [plan[i], plan[j]] = [plan[j], plan[i]];
  }
  plan = plan.map(type => ({ type, inf: false }));
  // Infiltrados: a partir de la sexta oleada, otras facciones cuelan pequeños
  // destacamentos en las dos últimas etapas y en la escolta del jefe.
  if (wave >= 6 && (boss || stage === 3 || stage === 4)) {
    const squads = buildInfiltrators(wave, fac, boss, stage, rnd);
    if (boss) plan.push({ type: fac.boss.id, inf: false });
    const at = boss ? plan.length - 1 : Math.floor(rnd() * (plan.length + 1));
    plan.splice(at, 0, ...squads);
    return plan;
  }
  if (boss) plan.push({ type: fac.boss.id, inf: false });
  return plan;
}
function waveScalars(wave) {
  // La curva base crece de forma lineal y, a partir de la oleada 10, añade un
  // término exponencial suave. Las primeras oleadas enseñan y el resto exige
  // defensas completas sin saltos imposibles.
  return {
    hp: 1 + Math.max(0, wave - 1) * 0.2 + Math.pow(Math.max(0, wave - 10), 1.35) * 0.04 + Math.pow(Math.max(0, wave - 20), 1.45) * 0.05,
    damage: 1 + Math.max(0, wave - 1) * 0.06 + Math.max(0, wave - 12) * 0.022 + Math.max(0, wave - 20) * 0.012,
    speed: 1 + Math.min(0.65, Math.max(0, wave - 1) * 0.015)
  };
}
// Valor de la defensa desplegada. No cuenta el dinero sin gastar: castiga la
// acumulación de estructuras y mejoras, que es lo que realmente rompe la curva.
function defenseValue() {
  let value = 0;
  for (const t of state.towers) value += t.data.cost * (1 + ((t.level || 1) - 1) * .25);
  return value;
}
// Presión adaptativa: el enemigo aprende de una defensa grande. Empieza a
// notarse tras las primeras torres y tiene tope para que no sea un rubber-band
// infinito. Las mejoras pesan poco: el juego premia concentrar la inversión en
// una defensa veterana en lugar de llenar el mapa de estructuras de nivel 1.
function defensePressure() {
  return 1 + Math.min(.6, Math.max(0, defenseValue() - 1500) / 10000);
}
function planCounts(plan) {
  const counts = new Map();
  for (const entry of plan) {
    const type = planType(entry), inf = planInf(entry);
    const key = inf ? type + '~inf' : type;
    const row = counts.get(key);
    if (row) row.n++;
    else counts.set(key, { type, inf, n: 1 });
  }
  return counts;
}
function planSummary(plan) {
  return [...planCounts(plan).values()]
    .map(({ type, inf, n }) => `${loc(ENEMIES[type], 'name')}${inf ? ' ✦' : ''} ×${n}`)
    .join(' · ');
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
  const fac = factionByWave(nextWave);
  const plan = state.active ? (state.currentPlan || []) : buildWavePlan(nextWave);
  const counts = planCounts(plan);
  const scalars = waveScalars(nextWave);
  const stage = waveInFaction(nextWave);
  const bossNow = isBossWave(nextWave);
  const rows = [...counts.values()].map(({ type, inf, n }) => {
    const d = ENEMIES[type];
    const kind = d.kind === 'air' ? tr('intel.air') : d.boss ? tr('intel.boss') : tr('intel.ground');
    const counter = d.counter ? TOWERS.find(t => t.id === d.counter) : null;
    const counterHtml = counter ? `<span class="intel-counter">▸ ${tr('intel.counter', { name: loc(counter, 'name') })}</span>` : '';
    const infTag = inf ? `<span class="intel-inf">✦ ${tr('intel.infiltrator')}</span>` : '';
    const jam = d.jam || 0;
    const ew = jam <= 0 ? tr('intel.ewImmune') : jam >= .6 ? tr('intel.ewFull') : tr('intel.ewPartial', { n: Math.round(jam * 100) });
    return `<div class="intel-row${inf ? ' infiltrator' : ''}"><span class="intel-icon t${d.tier}${counter ? ' countered' : ''}">${d.icon}</span><span class="intel-name">${loc(d, 'name')}${infTag}<em>${kind} · ${tr('intel.armor', { n: Math.round(d.armor * 100) })} · ${ew}${counterHtml}</em></span><b>×${n}</b></div>`;
  }).join('');
  const airCount = plan.reduce((n, entry) => n + (ENEMIES[planType(entry)] && ENEMIES[planType(entry)].kind === 'air' ? 1 : 0), 0);
  const groundCount = plan.length - airCount;
  const infiltratorCount = plan.filter(planInf).length;
  const totalUnits = Math.max(1, plan.length);
  const airPct = Math.round(airCount / totalUnits * 100);
  const groundPct = 100 - airPct;
  const dialogue = factionDialogue(fac, nextWave, bossNow);
  const extra = state.active ? tr('intel.inProgress') : tr('intel.planned');
  const bossBadge = bossNow ? tr('faction.bossNow') : tr('faction.bossIn', { n: wavesUntilBoss(nextWave) });
  const bossSkill = bossNow ? BOSS_SKILLS[fac.boss.bossSkill] : null;
  const siegeCap = bossNow ? siegeLimits(nextWave, state.towers.length) : null;
  body.innerHTML = `
    <div class="intel-faction">
      <span class="if-flag">${fac.flag}</span>
      <div class="if-copy"><div class="if-name">${loc(fac, 'name')}</div><div class="if-sub">${tr('climate.' + fac.climate)} · ${fac.tempC}°C · ${bossNow ? tr('intel.bossWave') : tr('faction.stage', { stage, total: WAVES_PER_FACTION })}</div></div>
      <span class="if-boss">${bossBadge}</span>
    </div>
    <div class="intel-dialog"><span>${fac.flag}</span><p>“${dialogue}”</p></div>
    ${bossSkill ? `<div class="intel-sub boss-skill">${bossSkill.icon} ${tr('intel.bossSkill', { name: loc(bossSkill, 'name'), desc: loc(bossSkill, 'desc') })}</div>` : ''}
    ${siegeCap ? `<div class="intel-sub">${tr('intel.siegeCap', { dmg: siegeCap.maxDamaged, destroy: siegeCap.maxDestroyed })}</div>` : ''}
    <div class="intel-head"><span>${tr('intel.head', { wave: nextWave, state: extra })}</span><b class="threat threat-${threatClass(nextWave)}">${threatLevel(nextWave)}</b></div>
    <div class="intel-sub">${tr('intel.scaling', { hp: scalars.hp.toFixed(1), dmg: scalars.damage.toFixed(1) })} · ${tr('intel.pressure', { x: (state.active ? (state.wavePressure || 1) : defensePressure()).toFixed(2) })}</div>
    ${infiltratorCount ? `<div class="intel-inf-note">✦ ${tr('intel.infiltrators', { n: infiltratorCount })}</div>` : ''}
    <div class="intel-balance">
      <div class="ib-labels"><span class="ib-air">✈ ${tr('intel.air')} ${airCount}</span><span class="ib-ground">▮ ${tr('intel.ground')} ${groundCount}</span></div>
      <div class="ib-bar"><i class="air" style="width:${airPct}%"></i><i class="ground" style="width:${groundPct}%"></i></div>
    </div>
    <div class="intel-list">${rows || `<div class="intel-row"><span class="intel-name">${tr('intel.noThreats')}</span></div>`}</div>
    <div class="intel-routes"><b>${tr('intel.routes')}</b><span>${tr('intel.routesDetail')}</span><b>${tr('intel.airRoute')}</b></div>
    <div class="intel-abilities"><b>${tr('intel.support')}</b><span>${tr('intel.supportHtml')}</span></div>`;
}
function makeWave() {
  if (state.active || state.gameOver) return;
  // El arsenal se cierra al comenzar el combate: solo se compra entre oleadas.
  state.buildType = null; state.abilityMode = null; removeGhost();
  state.wave++;
  state.active = true;
  const fac = factionByWave(state.wave);
  applyClimate(fac.climate, fac.tempC);
  Music.syncFaction(); Music.start();
  state.currentPlan = buildWavePlan(state.wave);
  // Se congela al empezar: destruir torres durante la oleada no reduce la
  // presión de las unidades que aún quedan por aparecer.
  state.wavePressure = defensePressure();
  state.spawnQueue = state.currentPlan.map(entry => {
    const type = planType(entry);
    return {
      type,
      inf: planInf(entry),
      delay: ENEMIES[type].boss ? 2.1 : Math.max(.18, .95 - state.wave * .018)
    };
  });
  state.spawnTimer = .25;
  state.spawned = 0;
  document.getElementById('waveBtn').disabled = true;
  updateHud(); renderIntel(); renderTowerList(); updateInspect();
  showWaveBanner(fac, isBossWave(state.wave));
  Sound.wave();
  toast(tr('toast.waveStart', { wave: state.wave, summary: planSummary(state.currentPlan) }));
}
function spawnEnemy(type, options = {}) {
  const d = ENEMIES[type];
  const inf = !!options.infiltrator;
  const diff = difficultyDef();
  const scalars = waveScalars(state.wave);
  const pressure = state.wavePressure || defensePressure();
  const pressureDamage = 1 + (pressure - 1) * .55;
  const rankRoll = Math.random();
  // Las unidades con rango aparecen de forma progresiva: al principio la tropa
  // es básica y, a partir de la oleada 5, crece la probabilidad de veteranos y
  // de élite. Los jefes no reciben rango adicional.
  const eliteChance = d.boss ? 0 : Math.min(.3, Math.max(0, (state.wave - 8) * .009));
  const veteranChance = d.boss ? 0 : Math.min(.45, Math.max(0, (state.wave - 4) * .014));
  const rank = rankRoll < eliteChance ? 'elite' : rankRoll < eliteChance + veteranChance ? 'veteran' : '';
  const rankMul = rank === 'elite' ? 1.7 : rank === 'veteran' ? 1.3 : 1;
  const model = enemyModel(type);
  const isAir = d.kind === 'air';
  const route = isAir ? AIR_ROUTE : ROUTES[0];
  const lane = state.spawned % 2 === 0 ? -1 : 1;
  state.spawned++;
  // Los jefes son más resistentes y golpean más fuerte, pero avanzan un 30 %
  // más despacio para dar tiempo a concentrar el fuego.
  const hpScale = (d.boss ? (.32 + Math.min(1.1, state.wave * .028)) * .9 : scalars.hp) * pressure * diff.enemyHp;
  // Las aeronaves tienen menos margen de vida: su amenaza real es esquivar la
  // defensa terrestre, no aguantar el fuego antiaéreo.
  const hp = d.hp * hpScale * rankMul * (inf ? 1.2 : 1) * (isAir ? .65 : 1);
  const armorBonus = Math.min(.1, Math.max(0, state.wave - 1) * .005);
  // Las recompensas se mantienen estables (e incluso suben un poco) para que
  // una defensa veterana pueda seguir creciendo en las oleadas tardías. Antes
  // caían más rápido que la amenaza y el jugador quedaba sin margen de compra.
  const economyScale = .95 * (1 + Math.max(0, state.wave - 1) * .01) / (1 + (pressure - 1) * .12);
  const e = {
    type, data: d, model, hp, maxHp: hp,
    speed: d.speed * scalars.speed * (d.boss ? .7 : 1) * (inf ? 1.08 : 1) * (isAir ? .85 : 1),
    damage: d.damage * scalars.damage * pressureDamage * diff.enemyDamage * (rank ? 1.12 : 1) * (d.boss ? 1.3 : 1) * (inf ? 1.08 : 1),
    armor: Math.min(d.boss ? .86 : .82, d.armor + armorBonus + (d.boss ? .1 : 0) + (inf ? .03 : 0)),
    progress: 0, traveled: 0, routeIndex: 0, route, routeLength: routeLength(route), lane,
    reward: Math.max(1, Math.round(d.reward * (rank === 'elite' ? 1.8 : rank === 'veteran' ? 1.25 : 1) * economyScale * diff.bounty * (inf ? 1.35 : 1))),
    slowTimer: 0, repelTimer: 0, jam: d.jam || 0, air: isAir, rank, infiltrator: inf, x: route.points[0][0], z: route.points[0][1],
    structureDamage: d.boss ? (d.structureDamage || 0) * 1.2 : (inf ? 6 + Math.min(10, Math.floor(state.wave * .5)) : 0),
    bossAttackTimer: d.boss ? 2.8 : 0,
    siegeTimer: inf ? 1.6 : 0,
    // Jefes e infiltrados comparten el mismo sistema de cupo de asedio.
    siege: (d.boss || inf) ? createSiegeState(type, d.boss) : null,
    attackers: d.boss ? new Map() : null
  };
  model.position.set(e.x, isAir ? ALTITUDE[type] : 0, e.z);
  world.add(model);
  if (inf) addInfiltratorHalo(model);
  if (rank) {
    const tag = labelSprite(tr(rank === 'elite' ? 'rank.elite' : 'rank.veteran'), rank === 'elite' ? '#e8a06a' : '#b9c47e');
    const ui = 1 / model.scale.x;
    tag.position.y = (model.userData.labelY || 1) + .46 * ui;
    tag.scale.set(.78 * ui, .18 * ui, 1); tag.visible = settings.labels !== false;
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
      spawnEnemy(item.type, { infiltrator: item.inf });
      state.spawnTimer = item.delay;
    }
  }
  if (!state.spawnQueue.length && state.enemies.length === 0) {
    state.active = false;
    document.getElementById('waveBtn').disabled = false;
    state.cash += Math.round((22 + state.wave * 2.4) * difficultyDef().waveClear);
    if (state.wave > records.bestWave) { records.bestWave = state.wave; persistRecords(); updateRecordUI(); }
    Sound.cleared();
    toast(tr('toast.waveClear', { wave: state.wave }));
    Music.syncFaction();
    updateHud(); renderIntel(); renderTowerList(); updateInspect();
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
  const isBoss = e.data.boss === true;
  if (isBoss && dt > 0) {
    e.bossAttackTimer -= dt;
    if (e.bossAttackTimer <= 0) {
      const skill = BOSS_SKILLS[e.data.bossSkill];
      if (skill) {
        const used = useBossSkill(e, alt, skill);
        e.bossAttackTimer = used ? skill.cooldown : 2.4;
      } else {
        e.bossAttackTimer = BOSS_ATTACK_COOLDOWN;
        bossStrikeStructures(e, alt, e.structureDamage >= 35 ? 2 : 1);
      }
    }
  } else if (e.infiltrator && e.siege && dt > 0) {
    // Los infiltrados sabotean una sola estructura cercana durante su avance.
    e.siegeTimer -= dt;
    if (e.siegeTimer <= 0) {
      if (e.siege.damaged.size < e.siege.maxDamaged) infiltratorStrike(e, alt);
      e.siegeTimer = 2.4;
    }
  }
  if (ud.mover && !e.air && e.type !== 'infantry') ud.mover.rotation.y += dt * (isBoss || e.data.tier >= 3 ? .35 : .15);
  if (ud.rotor) ud.rotor.rotation.y += dt * (jammed ? 46 : 20);
  if (ud.tailRotor) ud.tailRotor.rotation.z += dt * 34;
  if (ud.propeller) ud.propeller.rotation.z += dt * (jammed ? 60 : 30);
  if (ud.celestialGlow) {
    ud.celestialGlow.material.opacity = .3 + Math.sin(state.clock * 4) * .2;
    ud.celestialGlow.scale.setScalar(1 + Math.sin(state.clock * 3) * .1);
  }
  if (Array.isArray(ud.walk) && ud.walk.length) {
    const pace = e.air ? 0 : 9.5;
    for (const part of ud.walk) {
      const ph = state.clock * pace + (part.userData.phase || 0);
      if (part.userData.kind === 'leg') part.rotation.x = Math.sin(ph) * .5;
      else part.rotation.x = Math.sin(ph + Math.PI) * .34;
    }
  }
  if (Array.isArray(ud.flap) && ud.flap.length) {
    const fl = Math.sin(state.clock * 3.2) * .38;
    for (let i = 0; i < ud.flap.length; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      ud.flap[i].rotation.z = side * (.35 + fl);
    }
  }
  if (ud.ring) ud.ring.rotation.y += dt * 1.8;
  if (ud.bossAura) ud.bossAura.material.opacity = .06 + Math.sin(state.clock * 3) * .035;
  if (ud.infilHalo) {
    // Halo de infiltrado: doble anillo aditivo que gira y respira.
    ud.infilHalo.rotation.y += dt * 2.1;
    const pulse = .5 + Math.sin(state.clock * 4.6 + e.traveled) * .26;
    const [outer, inner] = ud.infilRings;
    outer.material.opacity = .55 + pulse * .35;
    inner.material.opacity = .35 + pulse * .3;
    inner.rotation.z += dt * .9;
    ud.infilHalo.position.y = Math.sin(state.clock * 2.8 + e.traveled * .7) * .035;
  }
  const ratio = Math.max(0, e.hp / e.maxHp);
  // Etiquetas y barras con tamaño casi constante en pantalla: se encogen al acercar la cámara.
  const camD = camera.position.distanceTo(e.model.position);
  const uiF = THREE.MathUtils.clamp(Math.pow(camD / DEFAULT_DISTANCE, .85), .25, 2.1);
  if (ud.bar) ud.bar.rotation.y = -e.model.rotation.y;
  const fgW = (ud.hpW || .7) * ratio * uiF;
  ud.hpfg.scale.set(fgW, (ud.hpFgH || .048) * uiF, 1);
  // Ancla el borde izquierdo: el relleno se recorta desde la derecha.
  ud.hpfg.position.x = -((ud.hpW || .7) * uiF - fgW) * .5;
  if (ud.hpbg) ud.hpbg.scale.set((ud.hpBgW || .7) * uiF, (ud.hpBgH || .08) * uiF, 1);
  const showLabel = settings.labels !== false && camD < 23;
  if (ud.label) {
    ud.label.visible = showLabel;
    if (showLabel) {
      const s = e.model.scale.x || 1;
      const worldW = camD * (2 * Math.tan(camera.fov * Math.PI / 360) * 96) / window.innerHeight;
      ud.label.scale.set(worldW / s, worldW * .19 / s, 1);
    }
  }
  if (e.rankTag) {
    e.rankTag.visible = showLabel;
    if (showLabel) {
      const s = e.model.scale.x || 1;
      const worldW = camD * (2 * Math.tan(camera.fov * Math.PI / 360) * 62) / window.innerHeight;
      e.rankTag.scale.set(worldW / s, worldW * .231 / s, 1);
    }
  }
  ud.hpfg.material.color.set(ratio < .3 ? 0xe17950 : 0x9b443a);
  ud.hpbg.visible = ratio > 0;
  if (e.routeIndex >= e.route.points.length - 1) {
    Sound.leak();
    if (e.data.boss && e.structureDamage > 0) {
      // El jefe golpea las estructuras más cercanas que le quedan dentro de su
      // cupo y después impacta la base al llegar al final.
      bossStrikeStructures(e, alt, 3);
      state.hp -= Math.min(36, e.damage * .28);
      toast(tr('toast.bossArrives', { name: loc(e.data, 'name') }));
    } else {
      // El daño de fuga se mantiene moderado: una defensa que deja pasar alguna
      // unidad debe sufrir desgaste progresivo, no perder la partida de golpe.
      // En oleadas altas el daño enemigo crece, así que el impacto por fuga se
      // limita para que unos pocos huecos no borren media base.
      state.hp -= Math.min(22, Math.max(2, e.damage * .35));
    }
    cameraShake = Math.min(.5, cameraShake + .12);
    explode(e.x, alt, e.z, e.data.boss ? 0xf0b14f : 0xb96a4e, e.data.boss ? 32 : 12);
    removeEnemy(e, false);
    if (state.hp <= 0) endGame();
  }
}
function applyDamage(e, amount, pierce = 0, towerType = null, sourceTower = null) {
  if (!e || e.hp <= 0 || !state.enemies.includes(e)) return 0;
  // Counter units: la torre bonifica daño si su tipo es el counter del enemigo.
  let counterMul = 1;
  if (towerType && e.data.counter === towerType) counterMul = 1.45;
  const armor = Math.max(0, Math.min(e.data.boss ? .86 : .82, (e.armor || 0) - pierce + (e.rank === 'elite' ? .06 : 0)));
  const dealt = amount * (1 - armor) * counterMul;
  e.hp -= dealt;
  // Los jefes recuerdan qué estructuras les disparan para contraatacar.
  if (sourceTower && e.data.boss && sourceTower.group) {
    if (!e.attackers) e.attackers = new Map();
    e.attackers.set(sourceTower, state.combatTime);
  }
  if (e.hp <= 0) removeEnemy(e, true);
  return dealt;
}
const BOSS_ATTACK_COOLDOWN = 4.2;
/* Asedio a estructuras. Un jefe o un infiltrado solo puede degradar/destruir un
   número acotado de estructuras distintas durante toda su vida. El cupo crece
   con la facción, nunca con el tamaño de la defensa, y la selección de blancos
   se limita a su radio y prioriza las estructuras más cercanas. */
const SIEGE_BOSS_RANGE = 8;
const SIEGE_INFILTRATOR_RANGE = 2.6;
function siegeLimits(wave = state.wave, towerCount = state.towers.length) {
  // Poder acumulado de la campaña: sube con cada jefe, también después de
  // completar la rotación de facciones.
  const bossTier = Math.max(0, Math.floor((wave - 1) / 5));
  // Cupo por tamaño de defensa y cupo por poder del jefe. Se toma el menor:
  // una base grande ofrece más objetivos, pero el jefe nunca supera su tope.
  const maxDamaged = Math.min(
    Math.max(2, Math.ceil(towerCount * 0.35)),
    2 + Math.floor(bossTier / 2) + Math.floor(towerCount / 6)
  );
  const maxDestroyed = Math.min(
    Math.max(1, Math.floor(towerCount * 0.2)),
    1 + Math.floor(bossTier / 3) + Math.floor(towerCount / 14)
  );
  return { maxDamaged, maxDestroyed };
}
function createSiegeState(type, boss) {
  if (boss) {
    const limits = siegeLimits(state.wave, state.towers.length);
    return { boss: true, range: SIEGE_BOSS_RANGE, ...limits, damaged: new Set(), destroyed: new Set() };
  }
  // Un infiltrado sabotea una única estructura y nunca la destruye.
  return { boss: false, range: SIEGE_INFILTRATOR_RANGE, maxDamaged: 1, maxDestroyed: 0, damaged: new Set(), destroyed: new Set() };
}
function siegeCanDamage(e, t) {
  const s = e && e.siege;
  if (!s) return false;
  // Volver a golpear una estructura ya marcada no consume cupo nuevo.
  return s.damaged.has(t) || s.damaged.size < s.maxDamaged;
}
function siegeCanDestroy(e, t) {
  const s = e && e.siege;
  return !!s && s.boss && s.destroyed.size < s.maxDestroyed && siegeCanDamage(e, t);
}
function stunTower(t, seconds) {
  if (!seconds) return;
  t.disabledUntil = Math.max(t.disabledUntil || 0, state.combatTime + seconds);
  t.cooldown = Math.max(t.cooldown || 0, 1.2);
}
// Aplica un golpe de asedio respetando los cupos. Devuelve el resultado real.
function siegeHit(e, t, opts = {}) {
  if (!t || t.destroyed || !e || !e.siege) return { hit: false, damaged: false, destroyed: false };
  const s = e.siege;
  const levels = opts.levels || 0;
  const wantsDamage = !!(opts.destroy || opts.destroyWeak || levels > 0);
  if (wantsDamage && !siegeCanDamage(e, t)) {
    // Sin cupo destructivo la habilidad sigue inutilizando, pero ya no borra
    // estructuras nuevas: el jefe no puede aniquilar toda la defensa.
    stunTower(t, opts.stun);
    return { hit: true, damaged: false, destroyed: false };
  }
  let destroyed = false;
  if (opts.destroy && siegeCanDestroy(e, t)) {
    destroyed = destroyTower(t);
  } else if (opts.destroyWeak && t.level <= 1 && siegeCanDestroy(e, t)) {
    destroyed = destroyTower(t);
  } else if (levels > 0) {
    const before = t.level;
    t.level = Math.max(1, t.level - levels);
    if (t.level < before) {
      s.damaged.add(t);
      applyTowerStats(t);
      refreshTowerModel(t);
      if (state.selectedTower === t) { showTowerRange(t); updateInspect(); }
    }
  }
  if (destroyed) {
    s.destroyed.add(t);
    s.damaged.add(t);
  } else {
    stunTower(t, opts.stun);
  }
  return { hit: true, damaged: s.damaged.has(t), destroyed };
}
function towerThreat(t) {
  const salvo = t.stats.salvo || 1;
  const dps = t.type === 'laser' ? t.stats.damage : (t.stats.damage / Math.max(.05, t.stats.rate)) * salvo;
  return dps + (t.stats.splash || 0) * 5;
}
function bossStrikeTargets(e, maxTargets, radius = SIEGE_BOSS_RANGE) {
  const now = state.combatTime;
  const candidates = [];
  for (const t of state.towers) {
    if (t.destroyed) continue;
    const d = Math.hypot(t.group.position.x - e.x, t.group.position.z - e.z);
    if (d > radius) continue;
    // La amenaza solo desempata entre estructuras a distancia similar.
    const at = e.attackers ? e.attackers.get(t) : null;
    const threat = at != null && now - at <= 7 ? towerThreat(t) : 0;
    candidates.push({ t, d, threat });
  }
  // Prioridad estricta por cercanía: el jefe castiga lo que tiene al lado.
  candidates.sort((a, b) => (a.d - b.d) || (b.threat - a.threat));
  return candidates.slice(0, maxTargets).map(x => x.t);
}
function bossStrikeStructures(e, alt, maxTargets = 1) {
  const targets = bossStrikeTargets(e, maxTargets);
  if (!targets.length) return false;
  const from = new THREE.Vector3(e.x, (alt || 0) + .75, e.z);
  let affected = 0;
  for (const target of targets) {
    const to = target.group.position.clone(); to.y += .75;
    const line = makeLine(from, to, 0xff8a4a, .92);
    setTimeout(() => { if (line.parent) world.remove(line); }, 150);
    makeSparks(to.x, to.y, to.z, 0xffa45c, 7);
    explode(to.x, .35, to.z, 0xe07a3f, 7);
    const hit = siegeHit(e, target, { levels: e.structureDamage >= 40 ? 2 : 1, stun: 2 });
    if (hit.damaged || hit.destroyed) affected++;
  }
  if (!affected) return false;
  toast(tr('toast.bossStructures'));
  cameraShake = Math.min(.42, cameraShake + .09);
  Sound.explosion();
  return true;
}
function infiltratorStrike(e, alt) {
  if (!e.siege || e.siege.damaged.size >= e.siege.maxDamaged) return false;
  const target = bossStrikeTargets(e, 1, e.siege.range)[0];
  if (!target) return false;
  const from = new THREE.Vector3(e.x, (alt || 0) + .4, e.z);
  const to = target.group.position.clone(); to.y += .7;
  const line = makeLine(from, to, 0xc58cff, .9);
  setTimeout(() => { if (line.parent) world.remove(line); }, 150);
  makeSparks(to.x, to.y, to.z, 0xd9a8ff, 5);
  explode(to.x, .35, to.z, 0x8d5bd7, 4);
  const hit = siegeHit(e, target, { levels: 1, stun: 1.6 });
  // El intento consume el cupo aunque la estructura ya estuviera a nivel 1.
  if (hit.hit) e.siege.damaged.add(target);
  if (hit.damaged) {
    toast(tr('toast.infiltratorStrike'));
    cameraShake = Math.min(.28, cameraShake + .04);
    Sound.explosion();
  }
  return true;
}
function destroyTower(t) {
  if (!t || t.destroyed) return false;
  t.destroyed = true;
  const x = t.group.position.x, z = t.group.position.z;
  world.remove(t.group);
  for (const cell of footprintCells(t.cell.x, t.cell.z, t.data)) towerCells.delete(cellKey(cell.x, cell.z));
  state.towers = state.towers.filter(x => x !== t);
  if (state.selectedTower === t) {
    state.selectedTower = null; placementRing.visible = false; updateInspect();
  }
  explode(x, .7, z, 0xe07a3f, 18);
  makePulse(x, z, 1.6, 0xff8a4a, .45);
  updateHud();
  if (!state.active) renderTowerList();
  return true;
}
// Cada jefe tiene una habilidad propia. Las de destrucción son raras y las de
// inutilización son más frecuentes: el jugador puede reconstruir entre oleadas,
// pero no puede ignorar al jefe ni confiar en una muralla estática.
function useBossSkill(e, alt, skill) {
  if (state.gameOver) return false;
  const candidates = bossStrikeTargets(e, 99, Math.max(SIEGE_BOSS_RANGE, skill.radius || 0));
  if (!candidates.length) return false;
  const primary = candidates[0];
  const center = skill.areaFromBoss ? { x: e.x, z: e.z } : { x: primary.group.position.x, z: primary.group.position.z };
  let targets = state.towers.filter(t => !t.destroyed && Math.hypot(t.group.position.x - center.x, t.group.position.z - center.z) <= skill.radius);
  if (!targets.length) return false;
  // El área no cambia la prioridad: primero las estructuras más cercanas al jefe.
  const distToBoss = t => Math.hypot(t.group.position.x - e.x, t.group.position.z - e.z);
  targets.sort((a, b) => distToBoss(a) - distToBoss(b));
  targets = targets.slice(0, skill.maxTargets);
  const from = new THREE.Vector3(e.x, (alt || 0) + .75, e.z);
  let destroyed = 0;
  for (const target of targets) {
    const to = target.group.position.clone(); to.y += .7;
    const line = makeLine(from, to, skill.destroy ? 0xff5a3a : 0xff8a4a, .9);
    setTimeout(() => { if (line.parent) world.remove(line); }, 150);
    makeSparks(to.x, to.y, to.z, 0xffa45c, 6);
    const hit = siegeHit(e, target, {
      levels: skill.levels || 0,
      stun: skill.stun || 2,
      destroy: !!skill.destroy,
      destroyWeak: !!skill.destroyWeak
    });
    if (hit.destroyed) destroyed++;
    else explode(to.x, .35, to.z, 0xe07a3f, 6);
  }
  makePulse(center.x, center.z, skill.radius, skill.destroy ? 0xff6a4a : 0xffb060, .5);
  toast(tr('toast.bossSkill', { name: loc(e.data, 'name'), skill: loc(skill, 'name') }));
  if (destroyed) toast(tr('toast.bossDestroy', { name: loc(e.data, 'name') }));
  cameraShake = Math.min(.42, cameraShake + .1);
  Sound.explosion();
  updateHud();
  return true;
}
function jamFactor(e) {
  const value = e.jam != null ? e.jam : (e.data && e.data.jam);
  return Math.max(0, Math.min(1, value || 0));
}
function acquireTarget(t) {
  let best = null, bestScore = -Infinity;
  const px = t.group.position.x, pz = t.group.position.z;
  const py = t.group.position.y + (t.stats.muzzleY || 1);
  for (const e of state.enemies) {
    if (!t.data.targets.includes(e.data.kind)) continue;
    // EW solo adquiere objetivos con electrónica de guiado. Las criaturas y
    // unidades puramente mecánicas no son objetivos válidos.
    if (t.type === 'ew' && jamFactor(e) <= 0) continue;
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
function projectileGeometry(kind) {
  switch (kind) {
    case 'mortarShell': return new THREE.CylinderGeometry(.045, .065, .17, 7);
    case 'artShell': return new THREE.CylinderGeometry(.065, .095, .28, 8);
    case 'rocket': return new THREE.CylinderGeometry(.014, .038, .36, 7);
    case 'missile': return new THREE.CylinderGeometry(.016, .032, .46, 7);
    case 'cruise': return new THREE.CylinderGeometry(.024, .052, .6, 8);
    case 'plasma': return new THREE.SphereGeometry(.11, 10, 8);
    case 'flak': return new THREE.OctahedronGeometry(.09, 0);
    default: return new THREE.SphereGeometry(.085, 8, 6);
  }
}
function getProjectile(color = 0xffd074, kind = 'ball') {
  const pool = projectilePools.get(kind) || [];
  let o = pool.pop();
  if (!o) {
    o = new THREE.Mesh(projectileGeometry(kind), new THREE.MeshBasicMaterial({ color }));
    world.add(o);
    o.userData.kind = kind;
    // Un halo tenue hace legible el proyectil sobre cualquier clima.
    const halo = new THREE.Mesh(new THREE.SphereGeometry(kind === 'cruise' || kind === 'missile' ? .11 : .075, 7, 5), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .28, depthWrite: false }));
    o.add(halo); o.userData.halo = halo;
  }
  o.material.color.set(color);
  if (o.userData.halo) o.userData.halo.material.color.set(color);
  o.visible = true;
  o.rotation.set(Math.PI / 2, 0, 0);
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
      if (Math.hypot(enemy.x - t.group.position.x, enemy.z - t.group.position.z) > t.stats.range) continue;
      const jam = jamFactor(enemy);
      if (jam <= 0) continue;
      // Solo la electrónica de guiado sufre el ataque. Un pterodáctilo, un
      // pegaso o un bombardero mágico no pueden ser "confundidos".
      enemy.slowTimer = Math.max(enemy.slowTimer, 1.2 + .8 * jam);
      if (jam >= .5) {
        enemy.repelTimer = Math.max(enemy.repelTimer, 2 * jam);
        enemy.slowTimer = Math.max(enemy.slowTimer, 1.8 + .6 * jam);
      }
    }
    makePulse(t.group.position.x, t.group.position.z, t.stats.range); Sound.ew();
    return;
  }
  if (type === 'gun') {
    applyDamage(e, t.stats.damage, t.stats.pierce, t.type, t);
    Sound.gun(); muzzleFlash(t);
    const tracer = makeLine(start, new THREE.Vector3(e.x, (ALTITUDE[e.type] || 0) + .4, e.z), 0xffd887, .14);
    setTimeout(() => { if (tracer.parent) world.remove(tracer); }, 55);
    if (t.barrels.length) t.barrels.forEach(b => { b.position.z += .07; setTimeout(() => { b.position.z -= .07; }, 60); });
    if (Math.random() < .35) makeSparks(e.x, (ALTITUDE[e.type] || 0) + .5, e.z, 0xffd887, 2);
    return;
  }
  if (type === 'mortar') {
    const shell = getProjectile(0xffb45a, 'mortarShell');
    Sound.mortar(); muzzleFlash(t, 1.1, 0xffb45a);
    shell.position.copy(start); shell.scale.setScalar(.8);
    state.effects.push({ kind: 'shell', active: true, life: .95, data: { mesh: shell, target: e, start, elapsed: 0, duration: .95, damage: t.stats.damage, splash: t.data.splash, pierce: t.stats.pierce, arc: 1.7, towerType: t.type, sourceTower: t, trailColor: 0x8d8577, impactColor: 0xffb45a } });
    return;
  }
  if (type === 'art') {
    const shell = getProjectile(0xffb060, 'artShell');
    Sound.artillery(); muzzleFlash(t, 1.4, 0xffb060);
    shell.position.copy(start); shell.scale.setScalar(1);
    state.effects.push({ kind: 'shell', active: true, life: .82, data: { mesh: shell, target: e, start, elapsed: 0, duration: .82, damage: t.stats.damage, splash: t.data.splash, pierce: t.stats.pierce, arc: 2.7, towerType: t.type, sourceTower: t, trailColor: 0x7d7568, impactColor: 0xff9a4a } });
    return;
  }
  if (type === 'rocket') {
    Sound.rocket();
    for (let i = 0; i < (t.stats.salvo || 4); i++) {
      const rocket = getProjectile(0xffb24a, 'rocket');
      const spread = 1.15;
      const tx = e.x + (Math.random() - .5) * spread, tz = e.z + (Math.random() - .5) * spread;
      rocket.position.copy(start);
      state.effects.push({
        kind: 'rocket', active: true, life: 1.2, data: {
          mesh: rocket, start: start.clone(), targetPos: new THREE.Vector3(tx, .4, tz),
          elapsed: -i * .11, duration: .72, damage: t.stats.damage, splash: t.data.splash, pierce: t.stats.pierce, arc: 1.6, towerType: t.type, sourceTower: t,
          trailColor: 0xffc45a, smokeColor: 0x6f6a60, spin: (Math.random() - .5) * 7
        }
      });
    }
    return;
  }
  if (type === 'aa') {
    const missile = getProjectile(0xffe27a, 'missile');
    Sound.missile(); muzzleFlash(t, 1.2, 0xffe27a);
    missile.position.copy(start);
    state.effects.push({ kind: 'missile', active: true, life: 2.2, data: { mesh: missile, target: e, life: 2.2, damage: t.stats.damage, pierce: t.stats.pierce, splash: 0, towerType: t.type, sourceTower: t, trailColor: 0xffc050, smokeColor: 0x9a9184 } });
    return;
  }
  if (type === 'destroyer') {
    Sound.navalGun();
    for (let i = 0; i < 2; i++) {
      const missile = getProjectile(0xff8a5a, 'cruise');
      missile.position.copy(start);
      state.effects.push({
        kind: 'cruise', active: true, life: 2.4, data: {
          mesh: missile, target: e, life: 2.4, damage: t.stats.damage, pierce: t.stats.pierce,
          splash: t.data.splash, delay: i * .18, towerType: t.type, sourceTower: t,
          trailColor: 0xff7040, smokeColor: 0x8f8d84
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
  const jet = buildFighterProp();
  jet.scale.setScalar(.5);
  jet.position.copy(from);
  world.add(jet);
  const distance = from.distanceTo(target);
  state.effects.push({
    kind: 'airstrike', active: true, life: 6, data: {
      mesh: jet, jet, from: from.clone(), target: target.clone(), elapsed: 0, returning: false,
      outDuration: Math.max(.55, distance / 12), backDuration: Math.max(.55, distance / 10),
      damage: t.stats.damage, splash: t.data.splash, pierce: t.stats.pierce, impacted: false, towerType: t.type, sourceTower: t
    }
  });
}
function impactArtillery(x, z, damage, splash, pierce = 0, towerType = null, sourceTower = null, color = 0xf5a753) {
  for (const enemy of [...state.enemies]) {
    const dist = Math.hypot(enemy.x - x, enemy.z - z);
    if (dist <= splash) applyDamage(enemy, damage * (1 - .3 * dist / splash), pierce, towerType, sourceTower);
  }
  explosionEffect(x, .25, z, color, 20);
}
function updateTowers(dt) {
  for (const t of state.towers) {
    if (t.destroyed) continue;
    t.cooldown -= dt;
    if (t.specialCd > 0) t.specialCd = Math.max(0, t.specialCd - dt);
    // El brillo del emisor láser decae en cuanto deja de haber objetivo.
    const laserGlow = t.type === 'laser' ? t.group.userData.laserGlow : null;
    if (laserGlow) laserGlow.emissiveIntensity = Math.max(0, laserGlow.emissiveIntensity - dt * 9);
    if (t.disabledUntil && state.combatTime < t.disabledUntil) { t.target = null; continue; }
    if ((t.type === 'ew' || t.type === 'carrier' || t.type === 'destroyer') && t.pivot) t.pivot.rotation.y += dt * .4;
    const target = acquireTarget(t);
    t.target = target;
    if (!target) {
      // El torreta láser vuelve al reposo cuando no hay objetivos: el modelo
      // tampoco debe quedarse apuntando al último punto muerto.
      if (t.type === 'laser' && t.pivot) {
        const rest = ((0 - t.pivot.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
        t.pivot.rotation.y += rest * Math.min(1, dt * 3.5);
      }
      continue;
    }
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
      if (laserGlow) laserGlow.emissiveIntensity = 2.2 + Math.sin(state.combatTime * 38) * .5;
      const from = new THREE.Vector3(t.group.position.x, t.group.position.y + (t.stats.muzzleY || 1), t.group.position.z);
      const to = new THREE.Vector3(target.x, (ALTITUDE[target.type] || 0) + .45, target.z);
      beam(from, to, .22, 0x7df3ff);
      if (Math.random() < .5) makeSparks(target.x, to.y, target.z, 0x9ff8ff, 2);
      Sound.laser();
      applyDamage(target, t.stats.damage * dt, t.stats.pierce, t.type, t);
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
function beam(a, b, width = .18, color = 0x62e7ff) {
  const key = 'beam';
  let fx = state.effects.find(x => x.kind === key && !x.active);
  if (!fx) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, 1, 7), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .9, depthWrite: false }));
    world.add(mesh);
    fx = { kind: key, mesh, life: 0, active: false };
    state.effects.push(fx);
  }
  fx.active = true; fx.life = .09; fx.maxLife = .09;
  fx.mesh.visible = true;
  fx.mesh.material.color.set(color);
  fx.mesh.material.opacity = .92;
  const d = b.clone().sub(a);
  fx.mesh.position.copy(a).add(b).multiplyScalar(.5);
  fx.mesh.scale.set(width, d.length(), width);
  fx.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
}
function makeSparks(x, y, z, color, n) {
  const count = Math.max(2, Math.round(n * quality().particles));
  for (let i = 0; i < count; i++) spawnParticle(x, y, z, color, 1.8 + Math.random() * 1.8, .24 + Math.random() * .35);
}
function muzzleFlash(t, size = 1, color = 0xffe0a0) {
  const p = t.group.position.clone(); p.y += (t.stats.muzzleY || 1.05);
  let fx = state.effects.find(e => e.kind === 'muzzle' && !e.active);
  if (!fx) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(.16, 8, 6), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .95, depthWrite: false }));
    world.add(mesh);
    fx = { kind: 'muzzle', mesh, active: false, life: 0 };
    state.effects.push(fx);
  }
  fx.active = true; fx.life = .08; fx.maxLife = .08;
  fx.mesh.material.color.set(color);
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
function explode(x, y, z, color = 0xe29b54, n = 15, ringColor = color) {
  const count = Math.max(3, Math.round(n * quality().particles));
  for (let i = 0; i < count; i++) spawnParticle(x, y, z, color, 1.3 + Math.random() * 3, .45 + Math.random() * .6);
  for (let i = 0; i < Math.max(2, Math.round(count * .35)); i++) spawnParticle(x, y + .1, z, 0x5b5a54, .7 + Math.random() * 1.2, .7 + Math.random() * .7);
  makePulse(x, z, 1.4, ringColor, .42);
}
function explosionEffect(x, y, z, color = 0xf5a753, n = 22) {
  explode(x, y, z, color, n, color);
  Sound.explosion();
  const flash = new THREE.Mesh(new THREE.SphereGeometry(.45, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff0c8, transparent: true, opacity: .85, depthWrite: false }));
  flash.position.set(x, y, z); world.add(flash);
  state.effects.push({ kind: 'flash', mesh: flash, life: .2, maxLife: .2, active: true });
  makeSparks(x, y + .1, z, color, 5);
  cameraShake = Math.min(.35, cameraShake + .1);
}
function makePulse(x, z, scale, color = 0x9ecf79, life = .38) {
  let fx = state.effects.find(e => e.kind === 'pulse' && !e.active);
  if (!fx) {
    const mesh = new THREE.Mesh(new THREE.RingGeometry(.86, 1, 34), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .7, side: THREE.DoubleSide, depthWrite: false }));
    mesh.rotation.x = -Math.PI / 2; world.add(mesh);
    fx = { kind: 'pulse', mesh, life: 0, active: false };
    state.effects.push(fx);
  }
  fx.active = true; fx.life = life; fx.maxLife = life;
  fx.mesh.material.color.set(color);
  fx.mesh.material.opacity = .72;
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
      p.mesh.rotateY(state.clock * 8);
      if (Math.random() < .9) spawnParticle(p.mesh.position.x, p.mesh.position.y, p.mesh.position.z, p.trailColor || 0xffc050, .35, .22);
      if (Math.random() < .45) spawnParticle(p.mesh.position.x, p.mesh.position.y - .05, p.mesh.position.z, p.smokeColor || 0x8f8d84, .22, .4);
      if (step >= dist - .08) {
        if (p.splash) impactArtillery(destination.x, destination.z, p.damage, p.splash, p.pierce, p.towerType, p.sourceTower, p.trailColor || 0xf5a753);
        else { applyDamage(e, p.damage, p.pierce, p.towerType, p.sourceTower); explosionEffect(e.x, destination.y, e.z, p.trailColor || 0xf5a753, 18); }
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
      p.mesh.rotation.z += dt * 9;
      if (Math.random() < .38) spawnParticle(p.mesh.position.x, p.mesh.position.y, p.mesh.position.z, p.trailColor || 0x827d6a, .35, .32);
      if (progress >= 1) { impactArtillery(destination.x, destination.z, p.damage, p.splash, p.pierce, p.towerType, p.sourceTower, p.impactColor || 0xf5a753); recycleProjectile(p.mesh); fx.active = false; }
      continue;
    }
    if (fx.kind === 'rocket') {
      const p = fx.data;
      p.elapsed += dt;
      if (p.elapsed < 0) continue;
      const progress = Math.min(1, p.elapsed / p.duration);
      p.mesh.position.lerpVectors(p.start, p.targetPos, progress);
      p.mesh.position.y += Math.sin(progress * Math.PI) * (p.arc || 1.4);
      p.mesh.rotation.z += (p.spin || 0) * dt;
      const prev = p.mesh.position.clone();
      if (Math.random() < .75) spawnParticle(prev.x, prev.y, prev.z, p.trailColor || 0xffc45a, .32, .2);
      if (Math.random() < .4) spawnParticle(prev.x, prev.y, prev.z, p.smokeColor || 0x6f6a60, .2, .45);
      if (progress >= 1) { impactArtillery(p.targetPos.x, p.targetPos.z, p.damage, p.splash, p.pierce, p.towerType, p.sourceTower, p.trailColor || 0xffa040); recycleProjectile(p.mesh); fx.active = false; }
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
            setTimeout(() => impactArtillery(p.target.x + ox, p.target.z + oz, p.damage, p.splash * .55, p.pierce, p.towerType, p.sourceTower), i * 90);
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
    } else if (fx.kind === 'beam') {
      // Sin objetivo el haz se apaga y desaparece por completo. Antes el mesh
      // quedaba visible apuntando al último punto hasta que otro enemigo entraba
      // en rango, dejando un láser fantasma en el mapa.
      fx.mesh.material.opacity = .92 * Math.max(0, fx.life / (fx.maxLife || .09));
      fx.active = fx.life > 0;
      fx.mesh.visible = fx.active;
    }
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
  if (name === 'repair' && state.hp >= 99.5) { Sound.error(); toast(tr('toast.repairFull')); return; }
  const cost = abilityCost(name);
  if (state.cash < cost) { Sound.error(); toast(tr('toast.noCredits')); return; }
  if (name === 'strike') {
    state.abilityMode = 'strike'; state.buildType = null; state.selectedTower = null;
    removeGhost(); updateInspect(); renderTowerList(); renderAbilities();
    toast(tr('toast.strikeSelect')); Sound.ui();
    return;
  }
  state.cash -= cost; ab.cd = ab.max;
  if (name === 'emp') {
    // El pulso aturde a todo el mundo, pero solo las unidades con electrónica
    // de guiado pierden el control y retroceden.
    for (const e of state.enemies) {
      const jam = e.jam || 0;
      e.slowTimer = Math.max(e.slowTimer, 2.2 + 2.3 * jam);
      if (jam >= .5) e.repelTimer = Math.max(e.repelTimer, 2.8 * jam);
    }
    makePulse(0, 0, 14); makePulse(0, 3, 14); Sound.emp();
    toast(tr('toast.emp'));
  } else if (name === 'repair') {
    const missing = Math.max(0, 100 - state.hp);
    const restored = Math.min(22, missing);
    state.hp = Math.min(100, state.hp + restored);
    state.repairUses++;
    Sound.upgrade();
    toast(tr('toast.repair', { n: Math.round(restored) }));
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
  const jet = buildFighterProp();
  jet.scale.setScalar(.72);
  jet.position.set(x - 8, 4, z - 5);
  jet.rotation.y = Math.PI / 4;
  world.add(jet);
  state.effects.push({
    kind: 'airstrike', active: true, life: 1.7, data: {
      mesh: jet, jet, from: jet.position.clone(), target: new THREE.Vector3(x, .5, z), elapsed: 0,
      damage: 95, splash: 2.6, pierce: .7, impacted: false, towerType: 'art'
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
  if (state.selectedTower) updateSelectedSpecialButton();
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
let waveBannerTimer;
function showWaveBanner(fac, boss) {
  const el = document.getElementById('waveBanner');
  if (!el) return;
  const stage = waveInFaction(state.wave);
  const escorts = (state.currentPlan || []).filter(entry => !ENEMIES[planType(entry)].boss).length;
  const infCount = (state.currentPlan || []).filter(planInf).length;
  const dialogue = factionDialogue(fac, state.wave, boss);
  const speaker = boss ? loc(fac.boss, 'name') : loc(fac, 'name');
  const bossSkill = boss ? BOSS_SKILLS[fac.boss.bossSkill] : null;
  el.className = 'wave-banner show' + (boss ? ' boss' : '');
  el.innerHTML = `
    <div class="wb-flag">${fac.flag}</div>
    <div class="wb-kicker">${boss ? tr('waveBanner.boss') : tr('waveBanner.incoming')}</div>
    <div class="wb-title">${loc(fac, 'name')}</div>
    <div class="wb-meta"><span>${tr('waveBanner.stage', { stage, total: FACTION_CYCLE })}</span><b>${tr('waveBanner.climate', { climate: tr('climate.' + fac.climate), temp: fac.tempC })}</b>${boss ? `<span>${tr('waveBanner.escorts', { n: escorts })}</span>` : ''}${bossSkill ? `<span>${bossSkill.icon} ${tr('waveBanner.bossSkill', { name: loc(bossSkill, 'name') })}</span>` : ''}${infCount ? `<span class="wb-inf">✦ ${tr('waveBanner.infiltrators', { n: infCount })}</span>` : ''}</div>
    <div class="wb-dialog"><span>${fac.flag} ${speaker}:</span> “${dialogue}”</div>
    <div class="wb-bar"><i></i></div>`;
  clearTimeout(waveBannerTimer);
  waveBannerTimer = setTimeout(() => el.classList.remove('show'), boss ? 5600 : 3900);
}
function updateHud() {
  const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  set('cash', Math.floor(state.cash));
  set('baseHp', Math.max(0, Math.ceil(state.hp)));
  set('waveLabel', String(state.wave).padStart(2, '0'));
  set('enemyCount', state.enemies.length);
  set('hudFlag', state.army.flag);
  set('hudArmy', loc(state.army, 'name'));
  set('hudDifficulty', loc(difficultyDef(), 'name'));
  set('threatLevel', state.wave <= 0 ? '—' : threatLevel(state.wave));

  // La facción mostrada es la de la oleada en curso o la próxima si aún no hay combate.
  const nextWave = state.active ? state.wave : state.wave + 1;
  const fac = factionByWave(nextWave);
  set('factionFlag', fac.flag);
  set('factionName', loc(fac, 'name'));
  const stage = waveInFaction(nextWave);
  set('factionStage', isBossWave(nextWave) ? tr('faction.bossNow') : tr('faction.stage', { stage, total: WAVES_PER_FACTION }));

  const wb = document.getElementById('waveBtn');
  if (wb) {
    if (state.active) wb.textContent = tr('wave.inProgress', { wave: state.wave });
    else if (isBossWave(nextWave)) wb.textContent = tr('wave.startBoss', { name: loc(fac, 'name') });
    else wb.textContent = tr('wave.startFac', { name: loc(fac, 'name') });
  }
  updateRepairButton(document.getElementById('abilityRepair'));
}
function updateRepairButton(btn) {
  if (!btn) return;
  const full = state.hp >= 99.5;
  const hint = btn.querySelector('.ab-text em');
  if (hint) hint.textContent = full ? tr('tower.max') : tr('ability.repairHint', { cost: repairCost() });
  btn.title = full ? tr('toast.repairFull') : tr('ability.repairTitle', { cost: repairCost() });
  btn.classList.toggle('full', full);
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
    if (key === 'repair') updateRepairButton(btn);
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
  Music.stop();
}
function chooseArmy(i) {
  state.selectedArmy = i;
  document.querySelectorAll('.army-card').forEach((el, n) => el.classList.toggle('chosen', n === i));
  updateDifficultySummary();
}
function chooseDifficulty(i) {
  state.selectedDifficulty = clampDifficulty(i);
  document.querySelectorAll('.difficulty-card').forEach((el, n) => el.classList.toggle('chosen', n === state.selectedDifficulty));
  updateDifficultySummary();
}
function updateDifficultySummary() {
  const el = document.getElementById('diffSummary');
  if (!el) return;
  const diff = difficultyDef(state.selectedDifficulty);
  const army = ARMIES[state.selectedArmy] || ARMIES[0];
  el.textContent = tr('menu.difficultySummary', {
    cash: Math.round(army.cash * diff.start),
    bounty: diff.bounty.toFixed(2)
  });
}
function renderDifficulties() {
  const grid = document.getElementById('difficultyGrid');
  if (!grid) return;
  grid.innerHTML = '';
  DIFFICULTY_LEVELS.forEach((d, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `difficulty-card ${d.tone}` + (i === state.selectedDifficulty ? ' chosen' : '');
    card.innerHTML = `<div class="diff-head"><span class="diff-icon">${d.icon}</span><div><div class="diff-name">${loc(d, 'name')}</div><div class="diff-tag">${loc(d, 'tagline')}</div></div></div><div class="diff-stats"><span>${tr('menu.diffStart')} ◈×${d.start.toFixed(2)}</span><span>${tr('menu.diffBounty')} ×${d.bounty.toFixed(2)}</span></div>`;
    card.title = tr('menu.difficultyHint');
    card.addEventListener('click', () => chooseDifficulty(i));
    grid.appendChild(card);
  });
  updateDifficultySummary();
}
function renderArmies() {
  const grid = document.getElementById('armyGrid'); grid.innerHTML = '';
  ARMIES.forEach((a, i) => {
    const card = document.createElement('button');
    card.className = 'army-card' + (i === state.selectedArmy ? ' chosen' : '');
    card.innerHTML = `<div class="army-card-head"><span class="army-flag">${a.flag}</span><div><div class="army-title">${loc(a, 'name')}</div><div class="army-bonus">${loc(a, 'bonus')}</div></div></div><div class="army-weapons"><b>${tr('menu.roster')}</b> ${loc(a, 'weapons')}</div>`;
    card.addEventListener('click', () => chooseArmy(i));
    grid.appendChild(card);
  });
  renderDifficulties();
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
  const nextDifficulty = clampDifficulty(state.selectedDifficulty);
  const freshMatch = !state.deployed || state.gameOver || state.army.id !== nextArmy.id || state.difficultyIndex !== nextDifficulty;
  state.army = nextArmy;
  state.difficultyIndex = nextDifficulty;
  settings.army = state.selectedArmy; settings.difficulty = nextDifficulty; persistSettings();
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
  Music.syncFaction(); Music.start();
  toast(tr(freshMatch ? 'toast.armyNew' : 'toast.army', { name: loc(state.army, 'name') }));
}
function restartGame() {
  resetGame();
  setPaused(false);
  updatePauseButton();
  Music.refresh();
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
  state.wave = 0; state.hp = 100; state.cash = Math.round(state.army.cash * difficultyDef().start);
  state.active = false; state.gameOver = false; state.paused = false; state.deployed = true;
  state.speed = 1; state.score = 0; state.spawnQueue = []; state.currentPlan = [];
  state.combatTime = 0; state.repairUses = 0; state.wavePressure = 1;
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
  function tone(freq, dur, type = 'square', vol = .15, slide = 0, delay = 0, pan = 0) {
    const c = ensure(); if (!c) return;
    const t0 = c.currentTime + delay, osc = c.createOscillator(), gain = c.createGain();
    osc.type = type; osc.frequency.setValueAtTime(Math.max(20, freq), t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t0 + dur);
    gain.gain.setValueAtTime(.0001, t0);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0002, vol), t0 + .006);
    gain.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
    let tail = gain;
    if (pan && c.createStereoPanner) {
      const p = c.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, pan));
      gain.connect(p); tail = p;
    }
    osc.connect(gain); tail.connect(master); osc.start(t0); osc.stop(t0 + dur + .02);
  }
  function noise(dur, vol = .2, cutoff = 1000, delay = 0, type = 'lowpass', q = 1) {
    const c = ensure(); if (!c) return;
    if (!noiseBuffer) {
      const len = Math.floor(c.sampleRate);
      noiseBuffer = c.createBuffer(1, len, c.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    }
    const t0 = c.currentTime + delay, src = c.createBufferSource();
    src.buffer = noiseBuffer;
    const filter = c.createBiquadFilter(); filter.type = type; filter.Q.value = q; filter.frequency.setValueAtTime(cutoff, t0);
    const gain = c.createGain(); gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
    src.connect(filter); filter.connect(gain); gain.connect(master);
    src.start(t0); src.stop(t0 + Math.min(dur, .99));
  }
  return {
    init() { ensure(); },
    setVolume(v) { settings.volume = Math.max(0, Math.min(1, v)); persistSettings(); if (master) master.gain.value = settings.volume; Music.setVolume(settings.volume); },
    gun() { if (gate('gun', 45)) { tone(215 + Math.random() * 45, .045, 'square', .075, -150); tone(96, .035, 'triangle', .06, -40); noise(.03, .055, 3300, 0, 'highpass'); } },
    mortar() { if (gate('mortar', 110)) { tone(82, .2, 'sine', .2, -42); noise(.13, .16, 760); noise(.05, .06, 2400, 0, 'highpass'); } },
    artillery() { if (gate('art', 150)) { tone(64, .28, 'sine', .23, -30); noise(.22, .2, 560); noise(.06, .08, 2100, .01, 'highpass'); } },
    rocket() { if (gate('rocket', 150)) { noise(.28, .15, 1500, 0, 'bandpass', 1.2); tone(76, .3, 'sawtooth', .1, 150); } },
    missile() { if (gate('missile', 90)) { tone(480, .32, 'sawtooth', .075, 760); noise(.17, .06, 2300, 0, 'highpass'); } },
    navalGun() { if (gate('naval', 190)) { tone(96, .26, 'sawtooth', .17, -42); noise(.24, .17, 600); } },
    laser() { if (gate('laser', 95)) { tone(1240, .085, 'sawtooth', .032, -560); tone(760, .075, 'sine', .03, 260, .01); } },
    ew() { if (gate('ew', 150)) { tone(260, .25, 'triangle', .065, 230); tone(340, .2, 'sine', .038, -140, .04); noise(.12, .03, 1200, 0, 'bandpass', 3); } },
    emp() { if (gate('emp', 260)) { tone(560, .36, 'sine', .095, -460); tone(170, .5, 'triangle', .075, 70, .05); noise(.25, .08, 800, .02); } },
    jet() { if (gate('jet', 260)) { noise(.6, .14, 2500, 0, 'bandpass', .8); tone(300, .54, 'sawtooth', .055, 430); } },
    explosion() { if (gate('boom', 75)) { noise(.42, .27, 780); noise(.16, .14, 2400, .02, 'highpass'); tone(56, .34, 'sine', .2, -22); } },
    leak() { if (gate('leak', 150)) { tone(250, .34, 'triangle', .15, -140); tone(190, .3, 'square', .07, -80, .12); noise(.16, .08, 1000); } },
    build() { tone(300, .08, 'triangle', .12, 150); tone(500, .1, 'square', .09, 140, .08); noise(.07, .06, 1800, .01, 'highpass'); },
    sell() { tone(400, .1, 'triangle', .11, -180); tone(250, .13, 'triangle', .09, -100, .1); },
    upgrade() { [440, 590, 740, 990].forEach((f, i) => tone(f, .12, 'triangle', .07, 60, i * .055)); },
    cleared() { [523, 659, 784, 1047].forEach((f, i) => tone(f, .18, 'triangle', .075, 26, i * .07)); },
    wave() { tone(132, .55, 'sawtooth', .1, 145); tone(198, .5, 'triangle', .065, 180, .08); tone(264, .4, 'sine', .04, 90, .16); },
    defeat() { [330, 294, 247, 196, 147].forEach((f, i) => tone(f, .42, 'triangle', .12, -22, i * .16)); noise(.9, .07, 500, .3); },
    error() { tone(155, .14, 'square', .09, -65); tone(120, .14, 'square', .06, -35, .1); },
    click() { if (gate('click', 40)) tone(680, .03, 'square', .045, 100); },
    ui() { if (gate('ui', 55)) tone(520, .055, 'sine', .055, 160); },
    special(type) {
      if (!gate('special', 110)) return;
      if (type === 'laser') { tone(1500, .24, 'sawtooth', .06, -900); tone(900, .3, 'sine', .05, -300, .05); }
      else if (type === 'ew') { tone(300, .4, 'triangle', .07, -190); tone(460, .35, 'sine', .05, 140, .06); }
      else if (type === 'carrier') { noise(.65, .17, 2400, 0, 'bandpass', .9); tone(330, .55, 'sawtooth', .06, 500); }
      else { tone(150, .3, 'sawtooth', .1, 70); tone(300, .26, 'square', .06, 120, .04); noise(.24, .12, 1500, 0, 'bandpass', 1.2); }
    },
    toggle(on) { settings.sound = on; persistSettings(); if (on) ensure(); updateSoundButton(); }
  };
})();

/* ------------------------------------------------- música procedural (sin assets) */
// Cada pista se sintetiza en vivo con Web Audio: no hay archivos descargados,
// muestras ni licencias externas. El motor programa notas con lookahead.
const MUSIC_LIBRARY = {
  march:      { bpm: 116, root: 55, scale: [0, 2, 3, 5, 7, 8, 10], bass: [0, 0, 5, 3, 0, 0, 7, 5], lead: [12, 15, 19, 15, 12, 10, 7, 10], leadType: 'square', pad: false, drums: 'march' },
  ambient:    { bpm: 76,  root: 49, scale: [0, 2, 3, 5, 7, 9, 11], bass: [0, 0, 3, 3, 5, 5, 3, 0], lead: [12, 14, 16, 19, 16, 14, 12, 7], leadType: 'sine', pad: true, drums: 'sparse', padType: 'sine' },
  electronic: { bpm: 128, root: 44, scale: [0, 2, 3, 5, 7, 8, 10], bass: [0, 7, 0, 7, 3, 7, 5, 7], lead: [12, 15, 19, 22, 19, 15, 12, 19], leadType: 'sawtooth', pad: false, drums: 'electro' },
  infernal:   { bpm: 92,  root: 41, scale: [0, 1, 3, 5, 6, 8, 10], bass: [0, 0, 1, 0, 5, 4, 3, 1], lead: [12, 13, 15, 18, 15, 13, 12, 6], leadType: 'sawtooth', pad: true, drums: 'war', padType: 'sawtooth' },
  celestial:  { bpm: 70,  root: 58, scale: [0, 2, 4, 7, 9, 11], bass: [0, 0, 4, 4, 7, 7, 4, 0], lead: [12, 16, 19, 24, 19, 16, 12, 7], leadType: 'sine', pad: true, drums: 'none', padType: 'sine' }
};
// Arreglo propio de cada facción enemiga. Parte de una de las cinco bases y
// cambia raíz, escala, tempo, bajo, melodía, timbre y percusión. Cada perfil
// genera además una variante de jefe más rápida, grave y agresiva.
const FACTION_MUSIC = {
  cavemen:    { base: 'march',      bpm: 104, root: 41, scale: [0, 2, 3, 5, 7, 10, 12], bass: [0, 0, 3, 0, 5, 3, 0, 0], lead: [12, 15, 12, 10, 7, 10, 12, 15], leadType: 'square', drums: 'war', pad: true, padType: 'triangle' },
  spartans:   { base: 'march',      bpm: 118, root: 52, scale: [0, 1, 4, 5, 7, 8, 11], bass: [0, 0, 5, 5, 3, 3, 7, 7], lead: [12, 13, 17, 20, 17, 13, 12, 8], leadType: 'sawtooth', drums: 'march', pad: false },
  crusaders:  { base: 'celestial',  bpm: 88,  root: 50, scale: [0, 2, 4, 5, 7, 9, 11], bass: [0, 4, 4, 0, 5, 5, 7, 0], lead: [12, 16, 19, 24, 19, 16, 12, 7], leadType: 'triangle', drums: 'sparse', pad: true, padType: 'sine' },
  pirates:    { base: 'march',      bpm: 126, root: 45, scale: [0, 2, 3, 7, 9, 10, 12], bass: [0, 3, 5, 3, 0, 5, 7, 5], lead: [12, 15, 19, 15, 12, 10, 7, 10], leadType: 'square', drums: 'march', pad: false },
  wwi:        { base: 'march',      bpm: 98,  root: 43, scale: [0, 2, 3, 5, 7, 8, 10], bass: [0, 0, 5, 3, 0, 0, 7, 5], lead: [12, 15, 19, 15, 12, 8, 7, 10], leadType: 'sawtooth', drums: 'war', pad: true, padType: 'triangle' },
  chinaTech:  { base: 'electronic', bpm: 132, root: 46, scale: [0, 2, 3, 5, 7, 8, 10], bass: [0, 7, 0, 7, 3, 7, 5, 7], lead: [12, 15, 19, 22, 19, 15, 12, 19], leadType: 'sawtooth', drums: 'electro', pad: false },
  zombies:    { base: 'ambient',    bpm: 84,  root: 38, scale: [0, 1, 3, 5, 6, 8, 10], bass: [0, 0, 1, 0, 5, 4, 3, 1], lead: [12, 13, 15, 18, 15, 13, 12, 6], leadType: 'sawtooth', drums: 'sparse', pad: true, padType: 'sawtooth' },
  ufos:       { base: 'electronic', bpm: 120, root: 54, scale: [0, 2, 3, 6, 7, 8, 11], bass: [0, 6, 0, 6, 3, 7, 5, 6], lead: [12, 14, 18, 22, 18, 14, 12, 20], leadType: 'sine', drums: 'electro', pad: true, padType: 'sine' },
  demons:     { base: 'infernal',   bpm: 96,  root: 37, scale: [0, 1, 3, 5, 6, 8, 10], bass: [0, 0, 1, 0, 5, 4, 3, 1], lead: [12, 13, 15, 18, 15, 13, 12, 6], leadType: 'sawtooth', drums: 'war', pad: true, padType: 'sawtooth' },
  celestials: { base: 'celestial',  bpm: 72,  root: 58, scale: [0, 2, 4, 7, 9, 11, 12], bass: [0, 0, 4, 4, 7, 7, 4, 0], lead: [12, 16, 19, 24, 19, 16, 12, 7], leadType: 'sine', drums: 'none', pad: true, padType: 'sine' }
};
for (const [id, profile] of Object.entries(FACTION_MUSIC)) {
  const base = MUSIC_LIBRARY[profile.base] || MUSIC_LIBRARY.march;
  const normal = { ...base, ...profile };
  delete normal.base;
  MUSIC_LIBRARY[id] = normal;
  MUSIC_LIBRARY[id + 'Boss'] = {
    ...normal,
    bpm: Math.round(normal.bpm * 1.12) + 4,
    root: Math.max(24, normal.root - 5),
    drums: 'war',
    pad: true,
    boss: true,
    lead: normal.lead.map((v, i) => v + (i % 4 === 3 ? 1 : 0))
  };
}
const CLIMATE_MUSIC = { templado: 'march', caluroso: 'ambient', tropical: 'ambient', frío: 'ambient', radiactivo: 'electronic', desconocido: 'electronic', infernal: 'infernal', divino: 'celestial' };
function musicTrackForClimate(climate) { return CLIMATE_MUSIC[climate] || 'march'; }
function factionMusicKey(fac, boss) {
  if (!fac || !FACTION_MUSIC[fac.id]) return musicTrackForClimate(state.climate);
  return fac.id + (boss ? 'Boss' : '');
}
function nextWaveNumber() { return state.active ? state.wave : state.wave + 1; }
function autoMusicKey() {
  const wave = nextWaveNumber();
  return factionMusicKey(factionByWave(wave), isBossWave(wave));
}
const Music = (() => {
  let ctx = null, master = null, noiseBuffer = null, timer = null;
  let track = 'march', step = 0, nextTime = 0, active = false;
  function gainValue() { return Math.max(0, Math.min(1, settings.volume)) * .3; }
  function ensure() {
    if (!settings.music) return null;
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = .0001;
      const comp = ctx.createDynamicsCompressor();
      master.connect(comp); comp.connect(ctx.destination);
      noiseBuffer = null;
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => { });
    return ctx;
  }
  function resolveTrack() {
    return settings.musicTrack === 'auto' ? autoMusicKey() : settings.musicTrack;
  }
  function degFreq(lib, degree) {
    const d = ((degree % 7) + 7) % 7, oct = Math.floor(degree / 7);
    return lib.root * Math.pow(2, (lib.scale[d] + oct * 12) / 12);
  }
  function note(freq, dur, type, vol, at, opts = {}) {
    if (!ctx) return;
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, freq), at);
    if (opts.slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + opts.slide), at + dur);
    gain.gain.setValueAtTime(.0001, at);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0002, vol), at + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, at + dur);
    let tail = gain;
    if (opts.filter) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass'; f.frequency.value = opts.filter; f.Q.value = .7;
      gain.connect(f); tail = f;
    }
    osc.connect(gain); tail.connect(master);
    osc.start(at); osc.stop(at + dur + .03);
  }
  function drumNoise(dur, vol, at, cutoff, type = 'highpass') {
    if (!ctx) return;
    if (!noiseBuffer) {
      const len = Math.floor(ctx.sampleRate * .5);
      noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    }
    const src = ctx.createBufferSource(); src.buffer = noiseBuffer;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = cutoff; f.Q.value = .9;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, at); g.gain.exponentialRampToValueAtTime(.0001, at + dur);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(at); src.stop(at + dur);
  }
  function kick(at, vol = .5) { note(120, .18, 'sine', vol, at, { slide: -78 }); }
  function snare(at, vol = .35) { drumNoise(.12, vol * .7, at, 1900); note(180, .09, 'triangle', vol * .35, at, { slide: -70 }); }
  function hat(at, vol = .1) { drumNoise(.035, vol, at, 7200); }
  function schedule(lib, s, at) {
    const stepDur = 60 / lib.bpm / 4;
    const pos = s % 16;
    if (lib.drums === 'march') {
      if (pos % 4 === 0) kick(at, .5);
      if (pos === 4 || pos === 12) snare(at, .34);
      if (pos % 2 === 0) hat(at, .065);
    } else if (lib.drums === 'sparse') {
      if (pos === 0 || pos === 8) kick(at, .32);
      if (pos === 14) hat(at, .08);
    } else if (lib.drums === 'electro') {
      if (pos % 4 === 0) kick(at, .52);
      if (pos === 4 || pos === 12) snare(at, .36);
      if (pos % 2 === 0) hat(at, .07);
    } else if (lib.drums === 'war') {
      if ([0, 3, 8, 11].includes(pos)) kick(at, .56);
      if (pos === 6 || pos === 14) snare(at, .3);
      if (pos % 4 === 2) hat(at, .06);
    }
    if (pos % 2 === 0) {
      const deg = lib.bass[(pos / 2) | 0];
      note(degFreq(lib, deg), stepDur * 1.45, 'triangle', .085, at, { filter: 420 });
    }
    if (pos % 4 === 0) {
      const deg = lib.lead[(pos / 4) | 0];
      note(degFreq(lib, deg), stepDur * 2.4, lib.leadType, .048, at, { filter: 2200 });
    }
    if (lib.pad && pos === 0) {
      const chord = [0, 2, 4];
      for (const degree of chord) note(degFreq(lib, degree + 7), stepDur * 15, lib.padType || 'sine', .022, at, { filter: 900 });
    }
    // La variante de jefe añade un pedal grave, un acento de tritono y más
    // percusión para que el cambio se note sin cortar la melodía de facción.
    if (lib.boss) {
      if (pos === 0) note(degFreq(lib, 0) * .5, stepDur * 14, 'sawtooth', .03, at, { filter: 240 });
      if (pos === 7 || pos === 15) note(degFreq(lib, 6) * 2, stepDur * 1.4, 'square', .026, at, { filter: 1200 });
      if (pos % 2 === 1) hat(at, .04);
    }
  }
  function scheduler() {
    if (!active) return;
    const c = ctx;
    if (!c) return;
    if (state.paused || state.gameOver || !state.deployed || document.hidden || !settings.music) {
      nextTime = c.currentTime + .08;
      return;
    }
    const lib = MUSIC_LIBRARY[track] || MUSIC_LIBRARY.march;
    const stepDur = 60 / lib.bpm / 4;
    while (nextTime < c.currentTime + .26) {
      schedule(lib, step, nextTime);
      nextTime += stepDur; step++;
    }
  }
  function start(name) {
    if (!settings.music) return;
    const c = ensure(); if (!c) return;
    const wanted = name || resolveTrack();
    if (MUSIC_LIBRARY[wanted]) track = wanted;
    active = true;
    if (!timer) { step = 0; nextTime = c.currentTime + .08; timer = setInterval(scheduler, 120); }
    master.gain.setTargetAtTime(gainValue(), c.currentTime, .35);
  }
  function stop() {
    active = false;
    if (timer) { clearInterval(timer); timer = null; }
    if (ctx && master) master.gain.setTargetAtTime(.0001, ctx.currentTime, .2);
  }
  function setTrack(name) {
    if (!MUSIC_LIBRARY[name] || name === track) return;
    track = name; step = 0;
    if (ctx) nextTime = ctx.currentTime + .08;
  }
  return {
    start, stop, setTrack,
    syncFaction() { if (settings.musicTrack === 'auto') setTrack(autoMusicKey()); },
    syncClimate() { if (settings.musicTrack === 'auto') setTrack(autoMusicKey()); },
    setVolume(v) { if (ctx && master) master.gain.setTargetAtTime(gainValue(), ctx.currentTime, .15); },
    toggle(on) {
      settings.music = !!on; persistSettings();
      if (on) start(resolveTrack()); else stop();
      updateMusicUI();
    },
    refresh() {
      if (!settings.music) return stop();
      if (settings.musicTrack === 'auto') setTrack(autoMusicKey());
      else setTrack(settings.musicTrack);
      start(resolveTrack());
    }
  };
})();

/* ------------------------------------------------------ ajustes y pantallas */
let settingsAutoPaused = false;
function updateSoundButton() {
  const b = document.getElementById('soundBtn');
  if (b) { b.textContent = settings.sound ? '♪' : '🔇'; b.classList.toggle('off', !settings.sound); b.title = settings.sound ? tr('action.soundOn') : tr('action.soundOff'); }
  const t = document.getElementById('soundToggle'); if (t) t.textContent = settings.sound ? tr('sound.on') : tr('sound.off');
}
function updateMusicUI() {
  const t = document.getElementById('musicToggle');
  if (t) t.textContent = settings.music ? tr('sound.on') : tr('sound.off');
  const sel = document.getElementById('musicSelect');
  if (sel) sel.value = settings.musicTrack;
  const hint = document.getElementById('musicTrackHint');
  if (hint) hint.textContent = settings.musicTrack === 'auto'
    ? tr('music.auto')
    : tr('music.' + settings.musicTrack);
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
  Music.stop();
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
  updateSoundButton(); updateQualityHint(); updateInstallUI(); updateFullscreenUI(); updateLabelsUI(); updateMusicUI();
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
      const ui = 1 / e.model.scale.x;
      const label = labelSprite(loc(e.data, 'name'), enemyLabelAccent(e.type));
      label.scale.set((e.data.boss ? 1.75 : 1.18) * ui, (e.data.boss ? .33 : .225) * ui, 1);
      label.position.y = (ud.labelY || 1) + .2 * ui;
      label.visible = settings.labels !== false;
      e.model.add(label); ud.label = label;
    }
    if (e.rankTag) {
      e.model.remove(e.rankTag);
      const ui = 1 / e.model.scale.x;
      const tag = labelSprite(tr(e.rank === 'elite' ? 'rank.elite' : 'rank.veteran'), e.rank === 'elite' ? '#e8a06a' : '#b9c47e');
      tag.position.y = (ud.labelY || 1) + .46 * ui; tag.scale.set(.78 * ui, .18 * ui, 1); tag.visible = settings.labels !== false;
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
  if (state.climate) applyClimate(state.climate, state.tempC);
  updateSoundButton(); updateLabelsUI(); updatePauseButton(); updateQualityHint(); updateMusicUI();
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
document.getElementById('musicToggle').addEventListener('click', () => Music.toggle(!settings.music));
document.getElementById('musicSelect').addEventListener('change', event => {
  settings.musicTrack = MUSIC_LIBRARY[event.target.value] ? event.target.value : 'auto';
  persistSettings();
  Music.refresh(); updateMusicUI();
  toast(tr(settings.musicTrack === 'auto' ? 'music.auto' : 'music.' + settings.musicTrack));
});
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
    else if (k === 'r' && !e.repeat && state.selectedTower) activateTowerSpecial(state.selectedTower);
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
function clampTarget() {
  const mx = MAP.w / 2 - 1.6, mz = MAP.h / 2 - 1.6;
  target.x = THREE.MathUtils.clamp(target.x, -mx, mx);
  target.z = THREE.MathUtils.clamp(target.z, -mz, mz);
}
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
  state.combatTime += gameDt;
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

