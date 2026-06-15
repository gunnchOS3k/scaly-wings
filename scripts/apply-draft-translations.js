#!/usr/bin/env node
/**
 * Applies draft human-review translations to locale files.
 * English placeholders remain where uncertain — i18next still falls back to en.
 */
const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/i18n/locales');

const patches = {
  ar: {
    home: {
      title: 'سكالي وينغز',
      subtitle: 'أركيد فراشات ومختبر رياضيات ومحفظة لياسمين دوير',
      credit: 'مغامرة قادة حرشفية الأجنحة · ياسمين دوير و gunnchOS3k MLV',
      playArcade: 'العب الأركيد',
      probabilityWing: 'جناح الاحتمالات',
      cocoonConsole: 'وضع شرنقة الكونسول',
      aboutYasmine: 'عن ياسمين',
      portfolio: 'المحفظة',
      pythonGuide: 'دليل إعادة البناء ببايثون',
      publishing: 'قائمة النشر',
      settings: 'الإعدادات',
      language: 'اللغة',
    },
    arcade: {
      title: 'الأركيد',
      heading: 'أركيد الفراشات',
      subtitle: 'لمس · لوحة مفاتيح · جاهز للتحكم',
      sections: {
        core: 'الأركيد الأساسي',
        probability: 'جناح الاحتمالات',
        console: 'ألعاب الكونسول',
        tools: 'أدوات النظام',
      },
      badges: {
        touch: 'لمس',
        keyboard: 'لوحة مفاتيح',
        controller: 'تحكم',
        multiplayer: 'لعب محلي متعدد',
        bigScreen: 'جاهز للشاشة الكبيرة',
      },
    },
    settings: {
      title: 'الإعدادات',
      languageSection: 'اللغة',
      currentLanguage: 'اللغة الحالية',
      deviceLanguage: 'لغة الجهاز المكتشفة',
      resetToDevice: 'إعادة ضبط إلى لغة الجهاز',
      arabicRtlNote: 'العربية تستخدم تخطيطًا من اليمين إلى اليسار.',
      draftReviewNote: 'يجب مراجعة الترجمات المسودة من ياسمين/إدموند.',
    },
    language: {
      title: 'اللغة',
      choose: 'اختر اللغة',
      reviewNeeded: 'مراجعة مطلوبة',
      draft: 'ترجمة مسودة',
      rtlRestartMessage: 'أعد تشغيل سكالي وينغز لتطبيق اتجاه التخطيط العربي بالكامل.',
      sampleHello: 'مرحبًا من سكالي وينغز!',
    },
    games: {
      start: 'ابدأ',
      pause: 'إيقاف مؤقت',
      resume: 'استئناف',
      restart: 'إعادة',
      gameOver: 'انتهت اللعبة',
      score: 'النقاط',
      highScore: 'أعلى نتيجة',
      best: 'الأفضل',
      back: 'رجوع',
      backToArcade: 'العودة إلى الأركيد',
      playAgain: 'العب مرة أخرى',
      flap: 'رفرف!',
    },
    nav: {
      arcade: 'الأركيد',
      settings: 'الإعدادات',
      portfolio: 'المحفظة',
      probabilityWing: 'جناح الاحتمالات',
    },
  },
  fr: {
    home: {
      title: 'Scaly Wings',
      subtitle: 'Une arcade papillons, un labo de maths et un portfolio pour Yasmine Dweir',
      credit: 'Une aventure Lépidoptère · Yasmine Dweir & gunnchOS3k MLV',
      playArcade: 'Jouer à l\'arcade',
      probabilityWing: 'Aile Probabilité',
      cocoonConsole: 'Mode Console Cocoon',
      aboutYasmine: 'À propos de Yasmine',
      portfolio: 'Portfolio',
      pythonGuide: 'Guide de recréation Python',
      publishing: 'Liste de publication',
      settings: 'Paramètres',
      language: 'Langue',
    },
    arcade: {
      title: 'Arcade',
      heading: 'Arcade Papillons',
      subtitle: 'Tactile · clavier · compatible manette',
      sections: {
        core: 'Arcade principale',
        probability: 'Aile Probabilité',
        console: 'Jeux console',
        tools: 'Outils système',
      },
      badges: {
        touch: 'Tactile',
        keyboard: 'Clavier',
        controller: 'Manette',
        multiplayer: 'Multijoueur local',
        bigScreen: 'Grand écran',
      },
    },
    settings: {
      title: 'Paramètres',
      languageSection: 'Langue',
      currentLanguage: 'Langue actuelle',
      deviceLanguage: 'Langue du appareil détectée',
      resetToDevice: 'Réinitialiser à la langue du appareil',
      arabicRtlNote: 'L\'arabe utilise une mise en page de droite à gauche.',
      draftReviewNote: 'Les traductions brouillon doivent être relues par Yasmine/Edmund.',
    },
    language: {
      title: 'Langue',
      choose: 'Choisir la langue',
      reviewNeeded: 'Relecture requise',
      draft: 'Traduction brouillon',
      rtlRestartMessage: 'Redémarrez Scaly Wings pour appliquer pleinement la direction RTL arabe.',
      sampleHello: 'Bonjour depuis Scaly Wings !',
    },
    games: {
      start: 'Démarrer',
      pause: 'Pause',
      resume: 'Reprendre',
      restart: 'Recommencer',
      gameOver: 'Fin de partie',
      score: 'Score',
      highScore: 'Meilleur score',
      best: 'Record',
      back: 'Retour',
      backToArcade: 'Retour à l\'arcade',
      playAgain: 'Rejouer',
      flap: 'Battre des ailes !',
    },
  },
  es: {
    home: {
      title: 'Scaly Wings',
      subtitle: 'Una arcade de mariposas, laboratorio de matemáticas y portafolio para Yasmine Dweir',
      credit: 'Una aventura de líderes lepidópteros · Yasmine Dweir y gunnchOS3k MLV',
      playArcade: 'Jugar Arcade',
      probabilityWing: 'Ala de Probabilidad',
      cocoonConsole: 'Modo Consola Capullo',
      aboutYasmine: 'Sobre Yasmine',
      portfolio: 'Portafolio',
      pythonGuide: 'Guía de recreación en Python',
      publishing: 'Lista de publicación',
      settings: 'Ajustes',
      language: 'Idioma',
    },
    arcade: {
      title: 'Arcade',
      heading: 'Arcade de Mariposas',
      subtitle: 'Táctil · teclado · listo para mando',
      sections: {
        core: 'Arcade principal',
        probability: 'Ala de Probabilidad',
        console: 'Juegos de consola',
        tools: 'Herramientas del sistema',
      },
      badges: {
        touch: 'Táctil',
        keyboard: 'Teclado',
        controller: 'Mando',
        multiplayer: 'Multijugador local',
        bigScreen: 'Pantalla grande',
      },
    },
    settings: {
      title: 'Ajustes',
      languageSection: 'Idioma',
      currentLanguage: 'Idioma actual',
      deviceLanguage: 'Idioma del dispositivo detectado',
      resetToDevice: 'Restablecer al idioma del dispositivo',
      arabicRtlNote: 'El árabe usa diseño de derecha a izquierda.',
      draftReviewNote: 'Las traducciones borrador deben ser revisadas por Yasmine/Edmund.',
    },
    language: {
      title: 'Idioma',
      choose: 'Elegir idioma',
      reviewNeeded: 'Revisión necesaria',
      draft: 'Traducción borrador',
      rtlRestartMessage: 'Reinicia Scaly Wings para aplicar por completo la dirección RTL del árabe.',
      sampleHello: '¡Hola desde Scaly Wings!',
    },
    games: {
      start: 'Iniciar',
      pause: 'Pausa',
      resume: 'Continuar',
      restart: 'Reiniciar',
      gameOver: 'Fin del juego',
      score: 'Puntuación',
      highScore: 'Mejor puntuación',
      best: 'Mejor',
      back: 'Atrás',
      backToArcade: 'Volver al arcade',
      playAgain: 'Jugar de nuevo',
      flap: '¡Aletea!',
    },
  },
  fi: {
    home: {
      title: 'Scaly Wings',
      subtitle: 'Perhosarcade, matematiikkalabra ja portfolio Yasmine Dweirille',
      credit: 'Lepidoptera-seikkailu · Yasmine Dweir & gunnchOS3k MLV',
      playArcade: 'Pelaa arcadea',
      probabilityWing: 'Todennäköisyys siipi',
      cocoonConsole: 'Kotelo-konsolitila',
      aboutYasmine: 'Tietoa Yasmimesta',
      portfolio: 'Portfolio',
      pythonGuide: 'Python-uudelleenluontiopas',
      publishing: 'Julkaisulista',
      settings: 'Asetukset',
      language: 'Kieli',
    },
    arcade: {
      title: 'Arcade',
      heading: 'Perhosarcade',
      subtitle: 'Kosketus · näppäimistö · ohjainvalmis',
      sections: {
        core: 'Ydinarcade',
        probability: 'Todennäköisyys siipi',
        console: 'Konsolipelit',
        tools: 'Järjestelmätyökalut',
      },
      badges: {
        touch: 'Kosketus',
        keyboard: 'Näppäimistö',
        controller: 'Ohjain',
        multiplayer: 'Paikallinen moninpeli',
        bigScreen: 'Iso näyttö',
      },
    },
    settings: {
      title: 'Asetukset',
      languageSection: 'Kieli',
      currentLanguage: 'Nykyinen kieli',
      deviceLanguage: 'Havaitut laitteen kieli',
      resetToDevice: 'Palauta laitteen kieleen',
      arabicRtlNote: 'Arabia käyttää oikealta vasemmalle -asettelua.',
      draftReviewNote: 'Luonnoskäännökset tulee tarkistaa Yasmine/Edmund.',
    },
    language: {
      title: 'Kieli',
      choose: 'Valitse kieli',
      reviewNeeded: 'Tarkistus tarvitaan',
      draft: 'Luonnoskäännös',
      rtlRestartMessage: 'Käynnistä Scaly Wings uudelleen, jotta arabian RTL-asettelu tulee täysin voimaan.',
      sampleHello: 'Hei Scaly Wingsistä!',
    },
    games: {
      start: 'Aloita',
      pause: 'Tauko',
      resume: 'Jatka',
      restart: 'Aloita alusta',
      gameOver: 'Peli ohi',
      score: 'Pisteet',
      highScore: 'Ennätys',
      best: 'Paras',
      back: 'Takaisin',
      backToArcade: 'Takaisin arcadeen',
      playAgain: 'Pelaa uudelleen',
      flap: 'Räpytä!',
    },
  },
};

function deepMerge(target, source) {
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      target[k] = target[k] && typeof target[k] === 'object' ? target[k] : {};
      deepMerge(target[k], v);
    } else {
      target[k] = v;
    }
  }
}

for (const [code, patch] of Object.entries(patches)) {
  const file = path.join(localesDir, `${code}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  deepMerge(data, patch);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('patched', code);
}
