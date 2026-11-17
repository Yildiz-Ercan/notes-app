const noteOverviewEl = document.querySelector(".note-overview");
const addNoteButtonEl = document.querySelector(".add-note-btn");
const popupEl = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
let popupTimer;
let selectedNote = null;

function renderNote(note) {
  const noteEl = document.createElement("div");
  noteEl.classList.add("note-card");
  noteEl.id = note.id;
  const titleEl = document.createElement("h1");
  titleEl.classList.add("card-heading");
  const contentEl = document.createElement("p");
  contentEl.classList.add("card-preview");
  const lastUpdatedEl = document.createElement("p");
  lastUpdatedEl.classList.add("card-timestamp");
  const categoryColor = CategoryColor[note.category];

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
  noteTextEl.innerHTML = "";
  selectedNote = null;
  document.querySelector(".select-category").value = CATEGORY_PLACEHOLDER;
}

function displayNotes() {
  notes = loadNotes();

  noteOverviewEl.innerHTML = "";

  if (!notes.length) {
    showPopup("noNotesFound");
    clearTimeout(popupTimer);
    popupTimer = setTimeout(() => {
      popup.classList.remove("active");
    }, 5000);

    return;
  }

  // latestCategory ermitteln durch latestNote
  const latestNote = notes.reduce((latest, note) => {
    return note.lastUpdated > latest.lastUpdated ? note : latest;
  });
  const latestCategory = latestNote.category;

  notes.sort((a, b) => sortCategory(a, b));

  function sortCategory(a, b) {
    // Kategorie der neuesten Note zuerst
    if (a.category === latestCategory) return -1;
    if (b.category === latestCategory) return 1;

    // Nach Kategorie sortieren
    const categorySort = (a.category ?? "").localeCompare(b.category ?? "");

    if (categorySort !== 0) return categorySort;

    // Neueste Note innerhalb der Kategorie zuerst
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
  popupMessage.textContent = translations[language][key];
  popupEl.classList.add("active");

  playSound("notification");
}

function reportUnsavedChanges(key) {
  if (hasUnsavedChanges) {
    showPopup(key);
    clearTimeout(popupTimer);
    popupTimer = setTimeout(() => {
      popupEl.classList.remove("active");
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

  document.querySelector(".select-category").value =
    selectedNote.category || CATEGORY_PLACEHOLDER;

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

displayNotes();
