const editorToolbarEL = document.querySelector(".editor__toolbar");
const storeBtnEL = document.getElementById("store-btn");
const CATEGORY_PLACEHOLDER = "Choose Category";
const Category = {
  NONE: {
    label: "None",
    color: "#9E9E9E",
  },
  WORK: {
    label: "Work",
    color: "#4285F4",
  },
  PERSONAL: {
    label: "Personal",
    color: "#AB47BC",
  },
  SHOPPING: {
    label: "Shopping",
    color: "#EC407A",
  },
  HOUSEWORK: {
    label: "Housework",
    color: "#8D6E63",
  },
  FITNESS: {
    label: "Fitness",
    color: "#43A047",
  },
  HEALTH: {
    label: "Health",
    color: "#E53935",
  },
  GAMES: {
    label: "Games",
    color: "#7E57C2",
  },
  HOBBIES: {
    label: "Hobbies",
    color: "#26A69A",
  },
  FINANCE: {
    label: "Finance",
    color: "#F9A825",
  },
  EDUCATION: {
    label: "Education",
    color: "#5C6BC0",
  },
  TRAVEL: {
    label: "Travel",
    color: "#29B6F6",
  },
  FOOD: {
    label: "Food",
    color: "#FF7043",
  },
  FAMILY: {
    label: "Family",
    color: "#D81B60",
  },
  SOCIAL: {
    label: "Social",
    color: "#66BB6A",
  },
  IDEAS: {
    label: "Ideas",
    color: "#FFA726",
  },
  PROJECTS: {
    label: "Projects",
    color: "#78909C",
  },
  REMINDERS: {
    label: "Reminders",
    color: "#D4AC0D",
  },
  OTHER: {
    label: "Other",
    color: "#757575",
  },
};

function renderCategoryDropdown() {
  const selectCategoryEL = document.createElement("select");
  selectCategoryEL.name = "category";
  selectCategoryEL.classList.add("select-category");
  selectCategoryEL.append(createPlaceholderOption());

  Object.entries(Category).forEach((element) => {
    const selectCategoryOptionEL = document.createElement("option");
    selectCategoryOptionEL.value = element[0];
    selectCategoryOptionEL.textContent = element[1].label;
    selectCategoryEL.append(selectCategoryOptionEL);
  });

  editorToolbarEL.insertBefore(selectCategoryEL, storeBtnEL);
}

function createPlaceholderOption() {
  const selectCategoryOptionEL = document.createElement("option");
  selectCategoryOptionEL.value = "";
  selectCategoryOptionEL.textContent = CATEGORY_PLACEHOLDER;
  selectCategoryOptionEL.disabled = true;
  selectCategoryOptionEL.selected = true;
  return selectCategoryOptionEL;
}

renderCategoryDropdown();
