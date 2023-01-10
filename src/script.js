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
  celiusTemperature = response.data.temperature.current;
  document.querySelector("#temperature-element").innerHTML =
    Math.round(celiusTemperature);
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
  document.querySelector("h4").innerHTML = response.data.condition.description;
  let currentWeather = "h4";
  let actualIcon = weatherIcon();
  let iconElement = document.querySelector("#icono");
  iconElement.setAttribute("src", actualIcon);
  iconElement.setAttribute("alt", response.data.condition.icon);
}

function weatherIcon(response) {
  if (currentWeather === "clear sky") {
    return `images/clear-sky-day.png`;
  }

  if (currentWeather === "few clouds") {
    return `images/few-clouds-day.png`;
  }

  if (currentWeather === "scattered clouds") {
    return `images/skattered-clouds-day.png`;
  }

  if (currentWeather === "broken clouds") {
    return `images/broken-clouds-day.png`;
  }

  if (currentWeather === "shower rain") {
    return `images/rain-day.png`;
  }

  if (currentWeather === "rain") {
    return `images/rain-day.png`;
  }
  if (currentWeather === "thunderstorm") {
    return `images/thunderstorm-day.png`;
  }
  if (currentWeather === "snow") {
    return `images/snow-day.png`;
  }
  if (currentWeather === "mist") {
    return `images/mist-day.png`;
  }
}

function foreCasttoday(response) {
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.daily.temperature.maximum
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.daily.temperature.minimum
  );
}

function searchCity(city) {
  let apiKey = "6b72d3t9e0a187fb46324o57dba90ad0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", showCity);

let currentLocationButton = document.querySelector("#current-position");
currentLocationButton.addEventListener("click", getCurrentLocation);

function getPosition(position) {
  let apiKey = "6b72d3t9e0a187fb46324o57dba90ad0";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

//
function changeFarenheit(event) {
  event.preventDefault();
  let farenheitTemperature = (celiusTemperature * 9) / 5 + 32;
  convertCelsius.classList.remove("active");
  convertFarenheit.classList.add("active");
  let changeDegrees = document.querySelector("#temperature-element");
  changeDegrees.innerHTML = Math.round(farenheitTemperature);
}

function changeCelsius(event) {
  event.preventDefault();
  convertCelsius.classList.add("active");
  convertFarenheit.classList.remove("active");
  let changeDegrees = document.querySelector("#temperature-element");
  changeDegrees.innerHTML = Math.round(celiusTemperature);
}

let convertFarenheit = document.querySelector("#farenheit-degrees");
convertFarenheit.addEventListener("click", changeFarenheit);

let convertCelsius = document.querySelector("#celsius-degrees");
convertCelsius.addEventListener("click", changeCelsius);

let celiusTemperature = null;

searchCity("BARCELONA");
