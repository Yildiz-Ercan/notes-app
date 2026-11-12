const noteHeadingEl = document.getElementById("note-heading");
const noteTextEl = document.getElementById("note-text");

let notes = [];

function saveNote() {
  const title = noteHeadingEl.value;
  const noteText = noteTextEl.value;

  if (!title || !noteText) {
    alert("Deine Notiz muss aus einem Titel und einer Beschreibung bestehen.");
    return;
  }

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
