let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature-element").innerHTML = Math.round(
    response.data.temperature.current
  );
}

function foreCasttoday (response) {
document.querySelector("#temp-max").innerHTML = Math.round(
  response.data.daily.temperature.maximum
);
document.querySelector("#temp-min").innerHTML = Math.round(
  response.data.daily.temperature.minimum
);


function searchCity(city) {
  let apiKey = "6b72d3t9e0a187fb46324o57dba90ad0";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?query={city}&key={apiKey}&units=metric";
  axios.get(apiUrl).then(showWeather);
}

function searchCityForecast(city) {
  let apiKey = "6b72d3t9e0a187fb46324o57dba90ad0";
  let apiUrl = "https://api.shecodes.io/weather/v1/forecast?query={query}&key={key}&units=metric";
  axios.get(apiUrl).then(foreCasttoday);
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
  let apiKey = "6b72d3t9e0a187fb46324o57dba90ad0";
  let lat = position.coordinates.latitude;
  let lon = position.coordinates.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon={lon}&lat={lat}&key={apiKey}&units=metric`;
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