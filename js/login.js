const form = document.forms[0];
const input = document.getElementById("name");
const button = document.getElementById("continue");

const body = document.body;
let userName;

function saveName(event) {
  event.preventDefault();
  if (input.value) {
    let name = input.value;
    localStorage.setItem("name", name);
    userName = localStorage.getItem("name");

    body.classList.remove("login-window");
    body.classList.add("main-window");

    fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => {
        body.style.background = `url(${data.urls.regular}) no-repeat`;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
      });
    currentTime();
  }
}

form.addEventListener("submit", saveName);
