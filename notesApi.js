const noteHeadingEl = document.getElementById("note-heading");
const noteTextEl = document.getElementById("note-text");
let hasUnsavedChanges = false;

let notes = [];

function saveNote() {
  const title = noteHeadingEl.value;
  const noteText = noteTextEl.innerHTML;
  const plainText = noteTextEl.innerText.trim();

  if (!title.trim() && !plainText) {
    alert("Du kannst keine leere Notiz speichern");
    emptyFields();
    return;
  }

  if (!title || !plainText) {
    alert("Deine Notiz muss aus einem Titel und einer Beschreibung bestehen.");
    return;
  }

  hasUnsavedChanges = false;

  if (!selectedNote) {
    const note = {
      title: title,
      content: noteText,
      id: crypto.randomUUID(),
      lastUpdated: Date.now(),
    };

    notes.push(note);
  } else {
    const existingNote = notes.find((note) => note.id === selectedNote.id);
    existingNote.title = title;
    existingNote.content = noteText;
    existingNote.lastUpdated = Date.now();
  }

  saveNotesLocalStorage();
  emptyFields();
  displayNotes();
}

function saveNotesLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

function checkUnsavedChanges() {
  hasUnsavedChanges =
    noteHeadingEl.value.trim() !== "" || noteTextEl.innerText.trim() !== "";
}

noteHeadingEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === "Tab") {
    event.preventDefault();
    noteTextEl.focus();
  }
});

noteHeadingEl.addEventListener("input", checkUnsavedChanges);
noteTextEl.addEventListener("input", checkUnsavedChanges);
