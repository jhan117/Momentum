const mainContent = document.querySelector(".content");

const timeText = mainContent.querySelector("h1");
const greetingText = mainContent.querySelector("h2");

function timeAndGreeting() {
  const current = new Date();
  const userName = localStorage.getItem("name");

  const hour = current.getHours();
  const minute = current.getMinutes();

  timeText.innerText = `${String(hour).padStart(2, "0")}:${String(
    minute
  ).padStart(2, "0")}`;

  if (current.getHours() < 12) {
    greetingText.innerText = `Good morning, ${userName}.`;
  } else {
    greetingText.innerText = `Good afternoon, ${userName}.`;
  }
}

timeAndGreeting();
setInterval(timeAndGreeting, 1000);

// focus
const focusContainer = document.querySelector(".focus");
const focusMainText = focusContainer.querySelector("h3");
const focusForm = focusContainer.querySelector("form");
const focusFooterText = focusContainer.querySelector("p");

const focusInput = focusForm.querySelector("#to-do");
const focusList = focusForm.querySelector("ul");

let focusArray = [];

function createFocus(event) {
  event.preventDefault();
  const focus = focusInput.value;
  if (focusList.classList.contains("edit-focus") && focus !== "") {
    focusList.classList.toggle("edit-focus");

    const getLocal = localStorage.getItem("focus", JSON.stringify(focusArray));
    focusArray = JSON.parse(getLocal);
    focusArray[0].focus = focus;

    localStorage.setItem("focus", JSON.stringify(focusArray));

    focusInput.style.display = "none";
    focusMainText.innerText = "TODAY";

    focusList.querySelector("label").innerText = focus;
  } else if (focus !== "") {
    const obj = {
      focus: focus,
      completed: false,
    };

    focusArray = [];
    focusArray.push(obj);
    console.log(focusArray);
    localStorage.setItem("focus", JSON.stringify(focusArray));

    const list = document.createElement("li");
    focusList.append(list);
    focusContainer.classList.add("have-focus");
    focusInput.style.display = "none";
    focusMainText.innerText = "TODAY";
    list.addEventListener("mouseenter", showIcons);
    list.addEventListener("mouseleave", hideIcons);

    const checkbox = document.createElement("i");
    checkbox.className = "fa-regular fa-square";
    checkbox.addEventListener("click", checkboxEvent);

    const label = document.createElement("label");
    label.innerText = focus;

    const editIcon = document.createElement("i");
    editIcon.className = "fa-regular fa-pen-to-square fa-2xs fa-fw";
    editIcon.addEventListener("click", editIconEvent);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-regular fa-trash-can fa-2xs fa-fw";
    deleteIcon.addEventListener("click", deleteIconEvent);

    list.append(checkbox, label, editIcon, deleteIcon);
  }
}

function checkboxEvent(event) {
  const checkbox = event.target;
  checkbox.classList.toggle("fa-square-check");
  checkbox.classList.toggle("fa-square");

  const getLocal = localStorage.getItem("focus", JSON.stringify(focusArray));
  focusArray = JSON.parse(getLocal);

  if (checkbox.classList.contains("fa-square-check")) {
    focusFooterText.style.transition = "opacity 0.25s";
    focusFooterText.style.opacity = 1;
    focusFooterText.innerText = "Good job!";
    focusArray[0].completed = true;
    localStorage.setItem("focus", JSON.stringify(focusArray));
  } else {
    focusFooterText.style.opacity = 0;
    focusArray[0].completed = false;
    localStorage.setItem("focus", JSON.stringify(focusArray));
  }
}

function editIconEvent(event) {
  const editIcon = event.target;
  const list = editIcon.parentElement;
  const checkbox = list.firstChild;

  const getFocus = localStorage.getItem("focus");
  focusArray = JSON.parse(getFocus);
  const pastFocus = focusArray[0].focus;

  if (checkbox.classList.contains("fa-square")) {
    focusInput.value = pastFocus;
    focusList.classList.add("edit-focus");
    focusMainText.innerText = "What is your main focus for today?";
    focusInput.style.display = "block";
  } else {
    focusList.classList.remove("edit-focus");
    focusFooterText.innerText = "Really? You already done it! :)";
    focusFooterText.style.opacity = 1;
  }
}

function deleteIconEvent(event) {
  const deleteIcon = event.target;
  const list = deleteIcon.parentElement;

  list.remove();
  focusContainer.classList.remove("have-focus");
  focusMainText.innerText = "What is your main focus for today?";
  focusFooterText.style.opacity = 0;
  focusInput.style.display = "block";
  focusInput.value = "";

  focusArray = [];
  localStorage.removeItem("focus");
}

function showIcons(event) {
  const iconAll = event.target.querySelectorAll("i");

  for (let i = 0; i < iconAll.length; i++) {
    const element = iconAll[i];
    element.style.opacity = 1;
  }
}

function hideIcons(event) {
  const checkbox = event.target.firstChild;
  const iconAll = event.target.querySelectorAll("i");

  for (let i = 0; i < iconAll.length; i++) {
    const element = iconAll[i];
    element.style.opacity = 0;

    if (checkbox.classList.contains("fa-square-check")) {
      checkbox.style.opacity = 1;
    }
  }
}

focusForm.addEventListener("submit", createFocus);

function loadFocus() {
  const getFocus = localStorage.getItem("focus");
  focusArray = JSON.parse(getFocus);

  if (getFocus != null) {
    focusInput.style.display = "none";
    focusMainText.innerText = "TODAY";

    const list = document.createElement("li");
    focusList.append(list);
    focusContainer.classList.add("have-focus");

    list.addEventListener("mouseenter", showIcons);
    list.addEventListener("mouseleave", hideIcons);

    const checkbox = document.createElement("i");
    checkbox.className = "fa-regular fa-square";
    checkbox.addEventListener("click", checkboxEvent);

    if (focusArray[0].completed == true) {
      checkbox.classList.add("fa-square-check");
      checkbox.classList.remove("fa-square");
      focusFooterText.style.transition = "opacity 0.25s";
      focusFooterText.style.opacity = 1;
      focusFooterText.innerText = "Good job!";
      checkbox.style.opacity = 1;
    }

    const label = document.createElement("label");
    label.innerText = focusArray[0].focus;

    const editIcon = document.createElement("i");
    editIcon.className = "fa-regular fa-pen-to-square fa-2xs fa-fw";
    editIcon.addEventListener("click", editIconEvent);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-regular fa-trash-can fa-2xs fa-fw";
    deleteIcon.addEventListener("click", deleteIconEvent);

    list.append(checkbox, label, editIcon, deleteIcon);
  }
}

window.addEventListener("load", loadFocus);
