const noteOverview = document.querySelector(".note-overview");

function renderNote(note) {
  const noteEl = document.createElement("div");
  noteEl.classList.add("note-card");
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
  noteOverview.append(noteEl);
}

function displayNotes() {
  notes.sort((a, b) => b.lastUpdated - a.lastUpdated);

  notes.forEach((note) => {
    renderNote(note);
  });
}

displayNotes();
