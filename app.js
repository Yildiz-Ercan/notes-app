const noteOverviewEl = document.querySelector(".note-overview");
const addNoteButtonEl = document.querySelector(".add-note-btn");
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
  contentEl.textContent = note.content;
  lastUpdatedEl.textContent = new Date(note.lastUpdated).toLocaleString(
    "de-DE",
  );

  noteEl.append(titleEl, contentEl, lastUpdatedEl);
  noteOverviewEl.append(noteEl);
}

function emptyFields() {
  noteHeadingEl.value = "";
  noteTextEl.value = "";
  selectedNote = null;
}

function displayNotes() {
  notes = loadNotes();

  noteOverviewEl.innerHTML = "";

  if (!notes.length) {
    document.querySelector("#popup").classList.add("active");
    setTimeout(() => {
      popup.classList.remove("active");
    }, 8000);

    return;
  }

  notes.sort((a, b) => b.lastUpdated - a.lastUpdated);

  notes.forEach((note) => {
    renderNote(note);
  });
}

function addNewNote() {
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

displayNotes();

noteOverviewEl.addEventListener("click", function (event) {
  const noteCard = event.target.closest("div");
  console.log("Die Id unserer note card: ", noteCard.id);
  selectedNote = notes.find((note) => note.id === noteCard.id);
  noteHeadingEl.value = selectedNote.title;
  noteTextEl.value = selectedNote.content;
});
