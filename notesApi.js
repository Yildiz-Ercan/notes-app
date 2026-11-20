const noteHeadingEl = document.getElementById("note-heading");
const noteTextEl = document.getElementById("note-text");
let hasUnsavedChanges = false;

let notes = [];
const sounds = {
  save: new Audio("assets/sounds/save.mp3"),
  delete: new Audio("assets/sounds/delete.mp3"),
  notification: new Audio("assets/sounds/notification.mp3"),
  startup: new Audio("assets/sounds/startup.mp3"),
};

function saveNote() {
  const title = noteHeadingEl.value;
  const noteText = noteTextEl.innerHTML;
  const plainText = noteTextEl.innerText.trim();
  const selectedCategory =
    document.querySelector(".select-category").value === CATEGORY_PLACEHOLDER
      ? null
      : document.querySelector(".select-category").value;

  if (!title.trim() && !plainText) {
    playSound("notification");
    showPopup("emptyNote");
    emptyFields();
    return;
  }

  if (!title || !plainText) {
    playSound("notification");
    showPopup("missingFields");
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
  playSound("save");
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

function playSound(type) {
  const sound = sounds[type];

  if (!sound) {
    return;
  }

  sound.currentTime = 0;
  sound.play();
}

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "s") {
    event.preventDefault();
    saveNote();
  }
});

noteHeadingEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    noteTextEl.focus();
  }
});

noteHeadingEl.addEventListener("input", checkUnsavedChanges);
noteTextEl.addEventListener("input", checkUnsavedChanges);
