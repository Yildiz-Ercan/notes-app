const colorScheme = document.querySelector("meta[name=color-scheme]");
const darkmodeButton = document.querySelector(".darkmode-btn");

function toggleDarkmode() {
  darkmodeButton.active = !darkmodeButton.active;
  darkmodeButton.setAttribute("active", darkmodeButton.active);
  colorScheme.content = darkmodeButton.active ? "dark" : "light";
  saveColorScheme(colorScheme.content);
}

function saveColorScheme(colorScheme) {
  localStorage.setItem("colorScheme", JSON.stringify(colorScheme));
}

function loadColorScheme() {
  colorScheme.content =
    JSON.parse(localStorage.getItem("colorScheme")) || "light";
  syncDarkmodeButton();
}

function syncDarkmodeButton() {
  darkmodeButton.active = colorScheme.content === "light" ? false : true;
  darkmodeButton.setAttribute("active", darkmodeButton.active);
}

addEventListener("DOMContentLoaded", loadColorScheme);
