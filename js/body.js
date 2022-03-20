const body = document.body;

const loginForm = document.forms[0];
const loginInput = loginForm.querySelector("#name");
const loginButton = loginForm.querySelector("#continue");

// unsplash API
const UNSPLASH_API =
  "https://api.unsplash.com/photos/random/?client_id=WwNK59psuF41rqqBGZTOS6sFaORshyaClXpraNx0_Ms";

function login(event) {
  event.preventDefault();
  if (loginInput.value !== "") {
    const userName = loginInput.value;

    localStorage.setItem("name", userName);

    body.classList.remove("login-window");
    body.classList.add("main-window");
    setBackground();
  }
}

function setBackground() {
  fetch(UNSPLASH_API)
    .then((response) => response.json())
    .then((data) => {
      body.style.background = `url(${data.urls.regular}) no-repeat`;
      body.style.backgroundSize = "cover";
      body.style.backgroundPosition = "center";
    });
}

function checkBodyClass() {
  const userName = localStorage.getItem("name");

  if (userName == null) {
    body.classList.add("login-window");
  } else {
    body.classList.add("main-window");
  }

  if (body.classList.contains("login-window")) {
    loginForm.addEventListener("submit", login);
  } else if (body.classList.contains("main-window")) {
    setBackground();
  }
}

checkBodyClass();
window.addEventListener("load", checkBodyClass);
