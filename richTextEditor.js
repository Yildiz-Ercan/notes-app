const noteEditorEl = document.getElementById("note-text");
const formatButtons = document.querySelectorAll(".format-toolbar button");

formatButtons.forEach((button) => {
  button.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });

  button.addEventListener("click", () => {
    const command = button.dataset.command;
    noteEditorEl.focus();
    document.execCommand(command, false, null);
  });
});
