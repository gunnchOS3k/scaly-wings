#!/usr/bin/env node
/**
 * Verifies Scaly Wings foundation files exist.
 * Run: npm run check
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const required = [
  'README.md',
  'app.json',
  'app/_layout.tsx',
  'app/index.tsx',
  'app/arcade.tsx',
  'app/about-yasmine.tsx',
  'app/portfolio.tsx',
  'app/publish.tsx',
  'app/python-recreation.tsx',
  'app/probability-wing.tsx',
  'src/data/probabilityTopics.ts',
  'src/games/probability-wing/chance-garden/ChanceGardenScreen.tsx',
  'src/games/probability-wing/chance-garden/chanceGardenEngine.ts',
  'src/games/probability-wing/noise-nectar/NoiseNectarScreen.tsx',
  'src/games/probability-wing/noise-nectar/noiseNectarEngine.ts',
  'src/games/probability-wing/poisson-pond/PoissonPondScreen.tsx',
  'src/games/probability-wing/poisson-pond/poissonPondEngine.ts',
  'docs/PROBABILITY_WING_DESIGN.md',
  'docs/PROBABILITY_TO_GAME_MECHANICS.md',
  'docs/STOCHASTIC_PROCESS_SIMULATIONS.md',
  'docs/PYTHON_PROBABILITY_RECREATION_GUIDE.md',
  'docs/YASMINE_PROBABILITY_INTERVIEW_PREP.md',
  'src/data/yasmineProfile.ts',
  'src/data/portfolioProjects.ts',
  'src/games/flutter-flight/FlutterFlightScreen.tsx',
  'src/games/flutter-flight/flutterFlightEngine.ts',
  'src/games/larva-leaf-race/LarvaLeafRaceScreen.tsx',
  'src/games/larva-leaf-race/larvaLeafRaceEngine.ts',
  'src/games/pupa-math-boost/PupaMathBoostScreen.tsx',
  'src/games/pupa-math-boost/pupaMathBoostEngine.ts',
  'src/games/pupa-math-boost/mathProblems.ts',
  'docs/README_FOR_RECRUITERS.md',
  'docs/ARCHITECTURE.md',
  'docs/UML_CLASS_DIAGRAM.md',
  'docs/UML_SEQUENCE_DIAGRAMS.md',
  'docs/GAME_DESIGN_DOCUMENT.md',
  'docs/APP_STORE_READINESS.md',
  'docs/ANDROID_PLAY_STORE_READINESS.md',
  'docs/PYTHON_RECREATION_GUIDE.md',
  'docs/YASMINE_LEARNING_PATH.md',
  'docs/ATS_RESUME_KEYWORDS.md',
  'PROJECT_INDEPENDENCE.md',
];

let missing = 0;
for (const rel of required) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error('MISSING:', rel);
    missing++;
  }
}

if (missing > 0) {
  console.error(`\n${missing} required path(s) missing.`);
  process.exit(1);
}

console.log('✓ Scaly Wings project health check passed (' + required.length + ' paths).');
process.exit(0);
