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

  notes.sort((a, b) => b.lastUpdated - a.lastUpdated);

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
  emptyFields();
  displayNotes();
}

function showPopup(key) {
  popupMessage.textContent = translations[language][key];
  popup.classList.add("active");
}

function reportUnsavedChanges(key) {
  if (hasUnsavedChanges) {
    showPopup(key);
    clearTimeout(popupTimer);
    popupTimer = setTimeout(() => {
      popup.classList.remove("active");
    }, 5000);
    return true;
  }
  return false;
}

displayNotes();

noteOverviewEl.addEventListener("click", function (event) {
  if (reportUnsavedChanges("unsavedChanges")) {
    return;
  }
  const noteCard = event.target.closest("div");

  if (!noteCard) {
    return;
  }
  selectedNote = notes.find((note) => note.id === noteCard.id);

  if (!selectedNote) {
    return;
  }

  noteHeadingEl.value = selectedNote.title;
  noteTextEl.innerHTML = selectedNote.content;
});
