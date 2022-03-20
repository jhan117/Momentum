const todoText = document.querySelector(".todo");
const todoSystem = document.querySelector(".todo-system");

const todoForm = todoSystem.querySelector("form");
const todoList = todoForm.querySelector("ul");
const todoInput = todoForm.querySelector("#newTodo");

todoText.addEventListener("click", function () {
  todoSystem.classList.toggle("on");
});

let todo = [];

function deleteTodoList(event) {
  const targetList = event.target.parentElement;
  targetList.remove();

  const changedTodo = todo.filter(function (item) {
    return item.id != targetList.getAttribute("data-key");
  });

  todo = changedTodo;
  localStorage.setItem("todo", JSON.stringify(todo));
}

function editTodoList(event) {
  const targetList = event.target.parentElement;

  let targetLabel = event.target.previousElementSibling.innerText;

  if (!!!targetList.querySelector(".editText")) {
    const editText = document.createElement("input");
    editText.setAttribute("class", "editText");
    editText.setAttribute("type", "text");
    editText.value = targetLabel;
    targetList.prepend(editText);
  }

  const text = targetList.querySelector(".editText");

  if (text.value !== "") {
    targetList.classList.toggle("editing");

    todo.forEach(function (item) {
      if (item.id == targetList.getAttribute("data-key")) {
        item.name = text.value;
      }
    });

    localStorage.setItem("todo", JSON.stringify(todo));

    if (!targetList.classList.contains("editing")) {
      const temp = localStorage.getItem("todo", JSON.stringify(todo));
      todo = JSON.parse(temp);

      todo.forEach(function (item) {
        if (item.id == targetList.getAttribute("data-key")) {
          const label = event.target.previousElementSibling;
          label.innerText = item.name;
        }
      });
    }
  }
}

function createTodoList(event) {
  event.preventDefault();
  const name = todoInput.value;
  if (name !== "") {
    const obj = {
      id: Date.now(),
      name: name,
      completed: false,
    };

    const list = document.createElement("li");
    list.setAttribute("class", "item");
    list.setAttribute("data-key", obj.id);
    todoList.append(list);

    const checkbox = document.createElement("input");
    checkbox.setAttribute("class", "checkbox");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        label.style.textDecoration = "line-through";
        todo.forEach(function (item) {
          if (item.id == list.getAttribute("data-key")) {
            item.completed = true;
          }
        });
        localStorage.setItem("todo", JSON.stringify(todo));
      } else {
        label.style.textDecoration = "none";
        todo.forEach(function (item) {
          if (item.id == list.getAttribute("data-key")) {
            item.completed = false;
          }
        });
        localStorage.setItem("todo", JSON.stringify(todo));
      }
    });

    const label = document.createElement("label");
    label.innerText = name;

    const editIcon = document.createElement("i");
    editIcon.setAttribute("class", "fa-regular fa-pen-to-square fa-fw");
    editIcon.addEventListener("click", editTodoList);

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fa-regular fa-trash-can fa-fw");
    deleteIcon.addEventListener("click", deleteTodoList);
    list.append(checkbox, label, editIcon, deleteIcon);

    todoInput.value = "";

    todo.push(obj);
    localStorage.setItem("todo", JSON.stringify(todo));
  }
}

todoForm.addEventListener("submit", createTodoList);

function loadTodoList() {
  const temp = localStorage.getItem("todo", JSON.stringify(todo));
  if (temp != null) {
    todo = JSON.parse(temp);

    todo.forEach(function (item) {
      const list = document.createElement("li");
      list.setAttribute("class", "item");
      list.setAttribute("data-key", item.id);
      todoList.append(list);

      const checkbox = document.createElement("input");
      checkbox.setAttribute("class", "checkbox");
      checkbox.setAttribute("type", "checkbox");

      const label = document.createElement("label");
      label.innerText = item.name;

      const editIcon = document.createElement("i");
      editIcon.setAttribute("class", "fa-regular fa-pen-to-square fa-fw");
      editIcon.addEventListener("click", editTodoList);

      const deleteIcon = document.createElement("i");
      deleteIcon.setAttribute("class", "fa-regular fa-trash-can fa-fw");
      deleteIcon.addEventListener("click", deleteTodoList);
      list.append(checkbox, label, editIcon, deleteIcon);

      if (item.completed === true) {
        label.style.textDecoration = "line-through";
        checkbox.checked = true;
      } else {
        label.style.textDecoration = "none";
        checkbox.checked = false;
      }

      checkbox.addEventListener("change", function () {
        if (this.checked) {
          label.style.textDecoration = "line-through";
          todo.forEach(function (item) {
            if (item.id == list.getAttribute("data-key")) {
              item.completed = true;
            }
          });
          localStorage.setItem("todo", JSON.stringify(todo));
        } else {
          label.style.textDecoration = "none";
          todo.forEach(function (item) {
            if (item.id == list.getAttribute("data-key")) {
              item.completed = false;
            }
          });
          localStorage.setItem("todo", JSON.stringify(todo));
        }
      });
    });
  }
}

window.addEventListener("load", loadTodoList);
