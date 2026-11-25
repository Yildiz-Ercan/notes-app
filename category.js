const editorToolbarEL = document.querySelector(".editor__toolbar");
const storeBtnEL = document.getElementById("store-btn");
const CATEGORY_PLACEHOLDER = "Choose Category";
const Category = {
  NONE: "None",
  WORK: "Work",
  PERSONAL: "Personal",
  SHOPPING: "Shopping",
  HOUSEWORK: "Housework",
  FITNESS: "Fitness",
  HEALTH: "Health",
  GAMES: "Games",
  HOBBIES: "Hobbies",
  FINANCE: "Finance",
  EDUCATION: "Education",
  TRAVEL: "Travel",
  FOOD: "Food",
  FAMILY: "Family",
  SOCIAL: "Social",
  IDEAS: "Ideas",
  PROJECTS: "Projects",
  REMINDERS: "Reminders",
  OTHER: "Other",
};

const CategoryColor = {
  NONE: "#9E9E9E",
  WORK: "#4285F4",
  PERSONAL: "#AB47BC",
  SHOPPING: "#EC407A",
  HOUSEWORK: "#8D6E63",
  FITNESS: "#43A047",
  HEALTH: "#E53935",
  GAMES: "#7E57C2",
  HOBBIES: "#26A69A",
  FINANCE: "#F9A825",
  EDUCATION: "#5C6BC0",
  TRAVEL: "#29B6F6",
  FOOD: "#FF7043",
  FAMILY: "#D81B60",
  SOCIAL: "#66BB6A",
  IDEAS: "#FFA726",
  PROJECTS: "#78909C",
  REMINDERS: "#D4AC0D",
  OTHER: "#757575",
};

function renderCategoryDropdown() {
  const selectCategoryEL = document.createElement("select");
  selectCategoryEL.name = "category";
  selectCategoryEL.classList.add("select-category");
  selectCategoryEL.append(createPlaceholderOption());

  Object.entries(Category).forEach((element) => {
    const selectCategoryOptionEL = document.createElement("option");
    selectCategoryOptionEL.value = element[0];
    selectCategoryOptionEL.textContent = element[1];
    selectCategoryEL.append(selectCategoryOptionEL);
  });

  editorToolbarEL.insertBefore(selectCategoryEL, storeBtnEL);
}

function createPlaceholderOption() {
  const selectCategoryOptionEL = document.createElement("option");
  selectCategoryOptionEL.value = CATEGORY_PLACEHOLDER;
  selectCategoryOptionEL.textContent = CATEGORY_PLACEHOLDER;
  selectCategoryOptionEL.disabled = true;
  selectCategoryOptionEL.selected = true;
  return selectCategoryOptionEL;
}

renderCategoryDropdown();
