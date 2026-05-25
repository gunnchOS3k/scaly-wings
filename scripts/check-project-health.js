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
  'eas.json',
  'docs/DEVICE_TESTING_AND_BUILDS.md',
  'docs/PIXEL_6A_STANDALONE_APK_GUIDE.md',
  'docs/ANDROID_DEBUG_VS_STANDALONE.md',
  'docs/APK_INSTALL_CHECKLIST.md',
  'docs/IOS_TESTFLIGHT_PLAN.md',
  'docs/ANDROID_APK_PLAN.md',
  'docs/BUILD_OUTPUT_CHECKLIST.md',
  'scripts/build-standalone-android-apk.sh',
  'scripts/uninstall-debug-android.sh',
  'scripts/install-downloaded-apk-usb.sh',
  'scripts/check-android-build-mode.sh',
  'scripts/scaly-wings-pixel6a-release-flow.sh',
  'scripts/00-check-environment.sh',
  'scripts/01-expo-go-qr.sh',
  'scripts/scaly-wings-mobile-build-menu.sh',
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
  'docs/PINBALL_GAME_DESIGN.md',
  'docs/WING_RUN_SIDE_SCROLLER_DESIGN.md',
  'docs/COCOON_CONSOLE_MODE.md',
  'docs/CONTROLLER_SUPPORT.md',
  'docs/BIG_SCREEN_PLAYBOOK.md',
  'docs/LOCAL_MULTIPLAYER_DESIGN.md',
  'docs/INPUT_ARCHITECTURE.md',
  'app/cocoon-console.tsx',
  'app/controller-test.tsx',
  'app/settings.tsx',
  'app/games/pinball.tsx',
  'app/games/wing-run.tsx',
  'src/input/InputManager.ts',
  'src/games/pinball/PinballScreen.tsx',
  'src/games/pinball/pinballEngine.ts',
  'src/games/wing-run/WingRunScreen.tsx',
  'src/games/wing-run/wingRunEngine.ts',
  'src/modes/cocoonConsole/CocoonConsoleScreen.tsx',
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
