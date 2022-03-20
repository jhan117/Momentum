const requestUrl =
  "https://api.unsplash.com/photos/random/?client_id=WwNK59psuF41rqqBGZTOS6sFaORshyaClXpraNx0_Ms";

const mainBody = document.querySelector(".main-window");

function setBackground() {
  return fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      mainBody.style.background = `url(${data.urls.regular}) no-repeat`;
      mainBody.style.backgroundSize = "cover";
      mainBody.style.backgroundPosition = "center";
    });
}

if (document.body.className === "main-window") {
  window.addEventListener("load", setBackground);
}
