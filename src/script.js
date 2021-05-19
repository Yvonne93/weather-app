let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();

if (hour < 10) {
  hour = `0${hour}`;
}

let minute = now.getMinutes();

if (minute < 10) {
  minute = `0 ${minute}`;
}

let today = document.querySelector("#currentDate");

today.innerHTML = `${day} ${hour}:${minute}`;

function searchEventHandler(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=d19105ed5fcb37924fea1ccffeef7488&&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let celsiusTemp = document.querySelector("#temp");
  celsiusTemp.innerHTML = `<strong>${temperature}°C</strong>`;

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEventHandler);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d19105ed5fcb37924fea1ccffeef7488&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPositionEventHandler() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentPositionEventHandler);
