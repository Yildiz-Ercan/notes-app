const noteOverviewEl = document.querySelector(".note-overview");

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
  noteOverviewEl.append(noteEl);
}

function displayNotes() {
  notes = loadNotes();

  if (!notes.length) {
    document.querySelector("#popup").classList.add("active");
    setTimeout(() => {
      popup.classList.remove("active");
    }, 8000);

    return;
  }

  notes.sort((a, b) => b.lastUpdated - a.lastUpdated);

  noteOverviewEl.innerHTML = "";

  notes.forEach((note) => {
    renderNote(note);
  });
}

displayNotes();
