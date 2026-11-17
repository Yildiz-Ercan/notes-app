const noteHeadingEl = document.getElementById("note-heading");
const noteTextEl = document.getElementById("note-text");
let hasUnsavedChanges = false;

let notes = [];

function saveNote() {
  const title = noteHeadingEl.value;
  const noteText = noteTextEl.innerHTML;
  const plainText = noteTextEl.innerText.trim();
  const selectedCategory =
    document.querySelector(".select-category").value === CATEGORY_PLACEHOLDER
      ? null
      : document.querySelector(".select-category").value;

  if (!title.trim() && !plainText) {
    alert(t("emptyNote"));
    emptyFields();
    return;
  }

  if (!title || !plainText) {
    alert(t("missingFields"));
    return;
  }

  hasUnsavedChanges = false;

  if (!selectedNote) {
    const note = {
      title: title,
      content: noteText,
      id: crypto.randomUUID(),
      lastUpdated: Date.now(),
      category: selectedCategory,
    };

    notes.push(note);
  } else {
    const existingNote = notes.find((note) => note.id === selectedNote.id);
    existingNote.title = title;
    existingNote.content = noteText;
    existingNote.lastUpdated = Date.now();
    existingNote.category = selectedCategory;
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

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "s") {
    event.preventDefault();
    saveNote();
  }
});

noteHeadingEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === "Tab") {
    event.preventDefault();
    noteTextEl.focus();
  }
});

noteHeadingEl.addEventListener("input", checkUnsavedChanges);
noteTextEl.addEventListener("input", checkUnsavedChanges);
