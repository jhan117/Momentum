const main = document.querySelector(".mainW.center");

const time = main.querySelector("h1");
const greeting = main.querySelector("h2");

const focusClass = main.querySelector(".focus");
const whatFocus = focusClass.querySelector("h3");
const compliment = focusClass.querySelector("p");
const focusForm = focusClass.querySelector("form");
const inputFocus = focusForm.querySelector("#to-do");
const list = focusForm.querySelector("ul");

userName = localStorage.getItem("name");

function switchWindow() {
  if (userName === null) {
    body.classList.remove("main-window");
    body.classList.add("login-window");
  } else {
    body.classList.remove("login-window");
    body.classList.add("main-window");
  }
}

switchWindow();
window.addEventListener("load", function () {
  if (userName === null) {
    body.classList.remove("main-window");
    body.classList.add("login-window");
  }
});

function currentTime() {
  let current = new Date();
  hour = current.getHours();
  minute = current.getMinutes();

  time.innerText = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}`;

  if (current.getHours() < 12) {
    greeting.innerText = `Good morning, ${userName}.`;
  } else {
    greeting.innerText = `Good afternoon, ${userName}.`;
  }
}

currentTime();
setInterval(currentTime, 1000);

let comTask;

function saveTaskDisplay() {
  const taskItem = localStorage.getItem("task");
  const compItem = localStorage.getItem("comTask");
  if (taskItem !== null) {
    let task = taskItem;
    // list
    const listItem = document.createElement("li");

    // input (checkbox)
    const checkBox = document.createElement("i");
    checkBox.classList.add("fa-regular", "fa-square");
    // label
    const label = document.createElement("label");
    // button.edit
    const editButton = document.createElement("i");
    editButton.className = "fa-regular fa-pen-to-square fa-2xs fa-fw";
    // button.delete
    const deleteButton = document.createElement("i");
    deleteButton.className = "fa-regular fa-trash-can fa-2xs fa-fw";

    label.innerText = task;

    //and appending.
    list.appendChild(listItem);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    whatFocus.innerText = "TODAY";
    inputFocus.style.display = "none";

    listItem.addEventListener("mouseenter", function () {
      const iAll = listItem.querySelectorAll("i");
      for (let index = 0; index < iAll.length; index++) {
        const element = iAll[index];
        element.style.opacity = 1;
      }
    });
    listItem.addEventListener("mouseleave", function () {
      const iAll = listItem.querySelectorAll("i");

      for (let index = 0; index < iAll.length; index++) {
        const element = iAll[index];
        element.style.opacity = 0;
        if (checkBox.className === "fa-regular fa-square-check") {
          checkBox.style.opacity = 1;
        }
      }
    });

    if (compItem === "completed") {
      label.style.textDecoration = "line-through";
      compliment.style.transition = "opacity 0.25s";
      compliment.style.opacity = 1;

      checkBox.classList.add("fa-square-check");
      checkBox.classList.remove("fa-square");
    }

    // complete
    checkBox.addEventListener("click", function () {
      checkBox.classList.toggle("fa-square-check");
      checkBox.classList.toggle("fa-square");

      if (checkBox.className === "fa-regular fa-square-check") {
        label.style.textDecoration = "line-through";
        compliment.style.transition = "opacity 0.25s";
        compliment.style.opacity = 1;

        localStorage.setItem("comTask", "completed");
      } else {
        label.style.textDecoration = "none";
        compliment.style.opacity = 0;

        localStorage.removeItem("comTask");
      }
    });

    // delete
    deleteButton.addEventListener("click", function () {
      listItem.remove();
      whatFocus.innerText = "What is your main focus for today?";
      inputFocus.value = "";
      inputFocus.style.display = "block";
      compliment.style.opacity = 0;

      localStorage.removeItem("task");
      localStorage.removeItem("comTask");
    });

    // edit
    editButton.addEventListener("click", function () {
      if (checkBox.className !== "fa-regular fa-square-check") {
        listItem.remove();
        whatFocus.innerText = "What is your main focus for today?";
        inputFocus.style.display = "block";
      } else {
        compliment.innerText = "Really? It is a completed task :)";
      }
    });
  }
}

window.addEventListener("load", saveTaskDisplay);

// New task list item
function createList(event) {
  event.preventDefault();
  let task = inputFocus.value;
  if (task !== "") {
    // list
    const listItem = document.createElement("li");

    // input (checkbox)
    const checkBox = document.createElement("i");
    checkBox.classList.add("fa-regular", "fa-square");
    // label
    const label = document.createElement("label");
    // button.edit
    const editButton = document.createElement("i");
    editButton.className = "fa-regular fa-pen-to-square fa-2xs fa-fw";
    // button.delete
    const deleteButton = document.createElement("i");
    deleteButton.className = "fa-regular fa-trash-can fa-2xs fa-fw";

    label.innerText = task;

    //and appending.
    list.appendChild(listItem);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    whatFocus.innerText = "TODAY";
    inputFocus.style.display = "none";

    listItem.addEventListener("mouseenter", function () {
      const iAll = listItem.querySelectorAll("i");
      for (let index = 0; index < iAll.length; index++) {
        const element = iAll[index];
        element.style.opacity = 1;
      }
    });
    listItem.addEventListener("mouseleave", function () {
      const iAll = listItem.querySelectorAll("i");

      for (let index = 0; index < iAll.length; index++) {
        const element = iAll[index];
        element.style.opacity = 0;
        if (checkBox.className === "fa-regular fa-square-check") {
          checkBox.style.opacity = 1;
        }
      }
    });

    localStorage.setItem("task", task);

    // complete
    checkBox.addEventListener("click", function () {
      checkBox.classList.toggle("fa-square-check");
      checkBox.classList.toggle("fa-square");

      if (checkBox.className === "fa-regular fa-square-check") {
        label.style.textDecoration = "line-through";
        compliment.style.transition = "opacity 0.25s";
        compliment.style.opacity = 1;

        localStorage.setItem("comTask", "completed");
      } else {
        label.style.textDecoration = "none";
        compliment.style.opacity = 0;

        localStorage.removeItem("comTask");
      }
    });

    // delete
    deleteButton.addEventListener("click", function () {
      listItem.remove();
      whatFocus.innerText = "What is your main focus for today?";
      inputFocus.value = "";
      inputFocus.style.display = "block";
      compliment.style.opacity = 0;

      localStorage.removeItem("task");
      localStorage.removeItem("comTask");
    });

    // edit
    editButton.addEventListener("click", function () {
      if (checkBox.className !== "fa-regular fa-square-check") {
        listItem.remove();
        whatFocus.innerText = "What is your main focus for today?";
        inputFocus.style.display = "block";
      } else {
        compliment.innerText = "Really? It is a completed task :)";
      }
    });
  }
}

focusForm.addEventListener("submit", createList);
