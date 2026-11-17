const editorToolbarEL = document.querySelector(".editor-toolbar");
const storeBtnEL = document.querySelector(".store-btn");
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
