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

addEventListener("DOMContentLoaded", loadLanguage);
