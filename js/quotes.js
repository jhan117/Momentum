const quotes = [
  "You will face many defeats in life, but never let yourself be defeated.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "In the end, it's not the years in your life that count. It's the life in your years.",
  "Never let the fear of striking out keep you from playing the game.",
  "Life is either a daring adventure or nothing at all.",
  "Many of life's failures are people who did not realize how close they were to success when they gave up.",
  "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",
  "If life were predictable it would cease to be life and be without flavor.",
  "In the end, it's not the years in your life that count. It's the life in your years.",
  "Life is a succession of lessons which must be lived to be understood.",
];

const author = [
  "Maya Angelou",
  "Nelson Mandela",
  "Abraham Lincoln",
  "Babe Ruth",
  "Helen Keller",
  "Thomas A. Edison",
  "Dr. Seuss",
  "Eleanor Roosevelt",
  "Abraham Lincoln",
  "Ralph Waldo Emerson",
];

const quoteContainer = document.querySelectorAll(".quotes p");

const randomNumber = Math.floor(Math.random() * quotes.length);

quoteContainer[0].innerText = `"${quotes[randomNumber]}"`;
quoteContainer[1].innerText = author[randomNumber];
