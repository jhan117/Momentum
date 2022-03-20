const countContainer = document.querySelector(".countdown");
const countText = countContainer.querySelectorAll("p")[0];
const countName = countContainer.querySelectorAll("p")[1];

countContainer.addEventListener("click", function () {
  countdownSystem.classList.toggle("on");
});

const countdownSystem = document.querySelector(".countdown-system");
const countForm = countdownSystem.querySelector("form");
const icon = countdownSystem.querySelector("i");

const nameInput = countForm.querySelector("#count-name");

const selectWindow = countForm.querySelector(".select-window");
const yearInput = selectWindow.querySelector("#select-year");
const monthInput = selectWindow.querySelector("#select-month");
const dateInput = selectWindow.querySelector("#select-date");

let dateLength;

// 윤년
function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

function checkDate(selectedDate) {
  if (selectedDate.getMonth() < 7) {
    if (selectedDate.getMonth() === 1) {
      if (leapYear(selectedDate.getFullYear())) {
        dateLength = 29;
      } else {
        dateLength = 28;
      }
      // 1, 3, 5, 7 월
    } else if (selectedDate.getMonth() % 2 === 0) {
      dateLength = 31;
    } else {
      dateLength = 30;
    }
  } else {
    if (selectedDate.getMonth() % 2 === 1) {
      dateLength = 31;
    } else {
      dateLength = 30;
    }
  }

  return dateLength;
}

function createDate(selectedDate) {
  // make date option
  checkDate(selectedDate);

  for (let i = 1; i <= dateLength; i++) {
    const option = document.createElement("option");
    dateInput.append(option);
    option.value = i;
    option.innerText = i;
  }
}

const firstDate = new Date();
function createYear() {
  for (let i = 0; i < 10; i++) {
    const option = document.createElement("option");
    yearInput.append(option);
    option.value = firstDate.getFullYear() + i;
    option.innerText = firstDate.getFullYear() + i;
  }
}

createDate(firstDate);
getCountdown(firstDate);
createYear();

function getCountdown(current) {
  // set default selected
  for (let i = 0; i < yearInput.length; i++) {
    option = yearInput.options[i];

    if (option.value == current.getFullYear()) {
      option.setAttribute("selected", true);
    }
  }

  for (let i = 0; i < monthInput.length; i++) {
    option = monthInput.options[i];

    if (option.value == current.getMonth()) {
      option.setAttribute("selected", true);
    }
  }

  for (let i = 0; i < dateLength; i++) {
    option = dateInput.options[i];

    if (option.value == current.getDate()) {
      option.setAttribute("selected", true);
    }
  }
}

function getDate() {
  const yearValue = yearInput.options[yearInput.selectedIndex].value;
  const monthValue = monthInput.options[monthInput.selectedIndex].value;
  const dateValue = dateInput.options[dateInput.selectedIndex].value;

  const selectedDate = new Date(yearValue, monthValue, dateValue);

  while (dateInput.firstChild) {
    dateInput.removeChild(dateInput.lastChild);
  }

  createDate(selectedDate);
}

yearInput.addEventListener("change", getDate);
monthInput.addEventListener("change", getDate);

function saveCountdown() {
  if (nameInput.value !== "") {
    const yearValue = yearInput.options[yearInput.selectedIndex].value;
    const monthValue = monthInput.options[monthInput.selectedIndex].value;
    const dateValue = dateInput.options[dateInput.selectedIndex].value;

    const selectedDate = new Date(yearValue, monthValue, dateValue);

    localStorage.setItem("count_name", nameInput.value);
    localStorage.setItem("count-date", selectedDate);
  }
}
countForm.addEventListener("submit", function (e) {
  e.preventDefault();
});
icon.addEventListener("click", saveCountdown);

function displayCount() {
  const name = localStorage.getItem("count_name");
  countName.innerText = name;

  const present = new Date();
  const count = new Date(localStorage.getItem("count-date"));

  const years = count.getFullYear() - present.getFullYear();
  let months = years * 12 + (count.getMonth() - present.getMonth());
  let days = 1;

  const distance = count.getTime() - present.getTime();
  days += Math.round(distance / (1000 * 60 * 60 * 24));

  const length = checkDate(count);
  if (days < length) {
    countText.innerText = `${days}d`;

    if (days < 0) {
      countText.innerText = "Done!";
    }
  } else {
    countText.innerText = `${months}m`;
  }

  if(name == null){
    countText.innerText = "Count down";
  }
}

icon.addEventListener("click", displayCount);
displayCount();
setInterval(displayCount, 1000);

function loadCount() {
  const name = localStorage.getItem("count_name");
  const count = new Date(localStorage.getItem("count-date"));
  if (name !== null) {
    nameInput.value = name;
    getCountdown(count);
  }
}

window.addEventListener("load", loadCount);
