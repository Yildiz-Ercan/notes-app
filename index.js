const noteOverview = document.querySelector(".note-overview");
const notes = [
  {
    title: "Einkaufsliste",
    content:
      "Bananen, Fisch, Geflügelbratwurst, Reis, Nudeln, Sojasauce, Sucuk, Käse, Toast",
    id: crypto.randomUUID(),
    lastUpdated: Date.now(),
  },
  {
    title: "Einkaufsliste2",
    content:
      "Bananen, Fisch, Geflügelbratwurst, Reis, Nudeln, Sojasauce, Sucuk, Käse, Toast",
    id: crypto.randomUUID(),
    lastUpdated: Date.now() + 5000,
  },
  {
    title: "Einkaufsliste3",
    content:
      "Bananen, Fisch, Geflügelbratwurst, Reis, Nudeln, Sojasauce, Sucuk, Käse, Toast",
    id: crypto.randomUUID(),
    lastUpdated: Date.now() + 9000,
  },
];

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
