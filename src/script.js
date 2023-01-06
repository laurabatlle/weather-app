let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = currentTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let h3 = document.querySelector("#time");
h3.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;
//

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-element").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function searchCity(city) {
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", showCity);

//

let currentLocationButton = document.querySelector("#current-position");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("BARCELONA");

function getPosition(position) {
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

//
function changeFarenheit(event) {
  event.preventDefault();
  let changeDegrees = document.querySelector("#temperature-element");
  changeDegrees.innerHTML = `23`;
}

function changeCelsius(event) {
  event.preventDefault();
  let changeDegrees = document.querySelector("#temperature-element");
  changeDegrees.innerHTML = `19`;
}

let convertFarenheit = document.querySelector("#farenheit-degrees");
convertFarenheit.addEventListener("click", changeFarenheit);

let convertCelsius = document.querySelector("#celsius-degrees");
convertCelsius.addEventListener("click", changeCelsius);
