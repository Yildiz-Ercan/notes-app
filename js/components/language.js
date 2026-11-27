const translations = {
  de: {
    appTitle: "Notiz App",
    addNote: "Neue Notiz",
    save: "Speichern",
    delete: "Löschen",
    placeholderHeading: "Überschrift eingeben...",
    placeholderText: "Schreibe deine Notiz...",
    noNotesFound:
      "Es wurden keine Notizen im LocalStorage gefunden. Bitte erstelle eine Notiz.",
    unsavedChanges: "Deine Änderungen sind noch nicht gespeichert!",
    emptyNote: "Du kannst keine leere Notiz speichern",
    missingFields:
      "Deine Notiz muss aus einem Titel und einer Beschreibung bestehen.",
    openNotes: "Notizliste öffnen",
    closeNotes: "Notizliste schließen",
    welcomePressEnter: "Drücke Enter zum Fortfahren",
    welcomeTapToContinue: "Tippe zum Fortfahren",
  },

  en: {
    appTitle: "Notes App",
    addNote: "New Note",
    save: "save",
    delete: "delete",
    placeholderHeading: "Write your heading...",
    placeholderText: "Write your note...",
    noNotesFound: "No notes were found in LocalStorage. Please create a note.",
    unsavedChanges: "Your changes have not been saved yet!",
    emptyNote: "You can't save empty notes!",
    missingFields: "Your note must consist of a title and a description.",
    openNotes: "Open notes list",
    closeNotes: "Close notes list",
    welcomePressEnter: "Press Enter to continue",
    welcomeTapToContinue: "Tap to continue",
  },
};

let language = detectLanguage();

function detectLanguage() {
  const browserLanguage = navigator.language;

  return browserLanguage.startsWith("de") ? "de" : "en";
}

function translatePage(language) {
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[language][key];
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    element.setAttribute("aria-label", translations[language][key]);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;

    if (element.hasAttribute("contenteditable")) {
      element.dataset.placeholder = translations[language][key];
    } else {
      element.placeholder = translations[language][key];
    }
  });
}

function loadLanguage() {
  translatePage(language);
}

function t(key) {
  return translations[language][key] ?? translations.en[key] ?? key;
}

addEventListener("DOMContentLoaded", loadLanguage);
