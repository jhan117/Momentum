const API_KEY = "1329228661497ea2e257686e2ff7cef5";

const weather = document.querySelector(".weather img");
const temp = document.querySelector(".weather span");
const city = document.querySelector(".weather p");

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      temp.innerHTML = `${Math.floor(data.main.temp)}&deg;`;
    });
}

navigator.geolocation.getCurrentPosition(success);
