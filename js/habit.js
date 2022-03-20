const habitText = document.querySelector(".habit");
const habitSystem = document.querySelector(".habit-system");

const habitList = habitSystem.querySelector("ul");
const eachList = habitList.querySelectorAll("li");
const habitInput = habitList.querySelectorAll("input");
const habitLabel = habitList.querySelectorAll("label");

habitText.addEventListener("click", function () {
  habitSystem.classList.toggle("on");
});

function check() {
  for (i = 0; i < habitInput.length; i++) {
    if (habitInput[i].checked) {
      habitLabel[i].style.textDecoration = "line-through";
      habitLabel[i].parentElement.classList.add("checked");
      localStorage.setItem(`habit${i}`, "true");
    } else {
      habitLabel[i].style.textDecoration = "none";
      habitLabel[i].parentElement.classList.remove("checked");
      localStorage.setItem(`habit${i}`, "false");
    }
  }
}

function loadCheck() {
  for (i = 0; i < habitInput.length; i++) {
    const temp = localStorage.getItem(`habit${i}`);
    if (temp === "true") {
      habitInput[i].checked = true;
      habitLabel[i].style.textDecoration = "line-through";
      habitLabel[i].parentElement.classList.add("checked");
    } else {
      habitInput[i].checked = false;
    }
  }
}

habitList.addEventListener("change", check);
window.addEventListener("load", loadCheck);
