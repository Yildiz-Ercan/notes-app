const welcomeScreenEl = document.querySelector(".welcome-screen");
const noteOverviewEl = document.querySelector(".note-overview");
const addNoteButtonEl = document.querySelector(".button--add-note");
const popupEl = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const today = new Date().toLocaleDateString("en-CA");
const noteSidebarEl = document.getElementById("note-sidebar");
const noteDrawerToggleEl = document.querySelector(".note-drawer-toggle");
const noteDrawerBackdropEl = document.querySelector(".note-drawer-backdrop");
let popupTimer;
let selectedNote = null;

function setNoteDrawerOpen(isOpen) {
  noteSidebarEl.classList.toggle("note-sidebar--open", isOpen);
  noteDrawerToggleEl.setAttribute("aria-expanded", String(isOpen));

  const labelKey = isOpen ? "closeNotes" : "openNotes";
  noteDrawerToggleEl.setAttribute(
    "aria-label",
    translations[language][labelKey],
  );

  if (isOpen) {
    addNoteButtonEl.focus();
  } else {
    noteDrawerToggleEl.focus();
  }
}

noteDrawerToggleEl.addEventListener("click", () => {
  const isOpen = noteSidebarEl.classList.contains("note-sidebar--open");
  setNoteDrawerOpen(!isOpen);
});

noteDrawerBackdropEl.addEventListener("click", () => {
  setNoteDrawerOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    noteSidebarEl.classList.contains("note-sidebar--open")
  ) {
    setNoteDrawerOpen(false);
    noteDrawerToggleEl.focus();
  }
});

if (localStorage.getItem("lastWelcomeDate") === today) {
  welcomeScreenEl.remove();
} else {
  document.addEventListener("keydown", handleWelcome);
}

function handleWelcome(event) {
  if (event.key !== "Enter") return;

  localStorage.setItem("lastWelcomeDate", today);
  welcomeScreenEl.classList.add("welcome-screen--hidden");
  playSound("startup");

  document.removeEventListener("keydown", handleWelcome);
}

function renderNote(note) {
  const noteEl = document.createElement("div");
  noteEl.classList.add("note-card");
  noteEl.id = note.id;
  const titleEl = document.createElement("h1");
  titleEl.classList.add("note-card__heading");
  const contentEl = document.createElement("p");
  contentEl.classList.add("note-card__preview");
  const lastUpdatedEl = document.createElement("p");
  lastUpdatedEl.classList.add("note-card__timestamp");
  const categoryColor = Category[note.category]?.color ?? Category.NONE.color;

  if (categoryColor) {
    noteEl.style.setProperty("--category-color", categoryColor);
  }

  titleEl.textContent = note.title;
  contentEl.textContent = new DOMParser().parseFromString(
    note.content,
    "text/html",
  ).body.textContent;
  lastUpdatedEl.textContent = new Date(note.lastUpdated).toLocaleString(
    "de-DE",
  );

  noteEl.append(titleEl, contentEl, lastUpdatedEl);
  noteOverviewEl.append(noteEl);
}

function emptyFields() {
  noteHeadingEl.value = "";
  noteHeadingEl.focus();
  noteTextEl.innerHTML = "";
  selectedNote = null;
  document.querySelector(".select-category").value = "";
  document.querySelectorAll(".note-card").forEach((card) => {
    card.classList.remove("note-card--active");
  });
}

function displayNotes() {
  notes = loadNotes();

  noteOverviewEl.innerHTML = "";

  if (!notes.length) {
    showPopup("noNotesFound");
    clearTimeout(popupTimer);
    popupTimer = setTimeout(() => {
      popupEl.classList.remove("popup--active");
    }, 5000);

    return;
  }

  const latestNote = notes.reduce((latest, note) => {
    return note.lastUpdated > latest.lastUpdated ? note : latest;
  });
  const latestCategory = latestNote.category;

  notes.sort((a, b) => sortCategory(a, b));

  function sortCategory(a, b) {
    if (a.category === b.category) {
      return b.lastUpdated - a.lastUpdated;
    }

    if (a.category === latestCategory) return -1;
    if (b.category === latestCategory) return 1;

    const categorySort = (a.category ?? "").localeCompare(b.category ?? "");
    if (categorySort !== 0) return categorySort;

    return b.lastUpdated - a.lastUpdated;
  }

  notes.forEach((note) => {
    renderNote(note);
  });
}

function addNewNote() {
  if (reportUnsavedChanges("unsavedChanges")) {
    return;
  }
  emptyFields();
}

function deleteNote() {
  if (!selectedNote) {
    return;
  }

  notes = notes.filter((note) => {
    return note.id !== selectedNote.id;
  });

  localStorage.setItem("notes", JSON.stringify(notes));
  playSound("delete");
  emptyFields();
  displayNotes();
}

function showPopup(key) {
  clearTimeout(popupTimer);

  popupMessage.textContent = translations[language][key];
  popupEl.classList.add("popup--active");

  playSound("notification");

  popupTimer = setTimeout(() => {
    popupEl.classList.remove("popup--active");
  }, 5000);
}

function reportUnsavedChanges(key) {
  if (hasUnsavedChanges) {
    showPopup(key);
    clearTimeout(popupTimer);
    popupTimer = setTimeout(() => {
      popupEl.classList.remove("popup--active");
    }, 5000);
    return true;
  }
  return false;
}

noteOverviewEl.addEventListener("click", function (event) {
  if (reportUnsavedChanges("unsavedChanges")) {
    return;
  }

  const noteCard = event.target.closest(".note-card");

  if (!noteCard) {
    return;
  }

  selectedNote = notes.find((note) => note.id === noteCard.id);

  if (!selectedNote) {
    return;
  }

  document.querySelectorAll(".note-card").forEach((card) => {
    card.classList.toggle("note-card--active", card === noteCard);
  });

  document.querySelector(".select-category").value =
    selectedNote.category || "NONE";

  noteHeadingEl.value = selectedNote.title;
  noteTextEl.innerHTML = selectedNote.content;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Delete") {
    if (
      event.target.tagName === "INPUT" ||
      event.target.tagName === "TEXTAREA" ||
      event.target.isContentEditable
    ) {
      return;
    }
    deleteNote();
  }
});

document.addEventListener("DOMContentLoaded", () => noteHeadingEl.focus());

displayNotes();
