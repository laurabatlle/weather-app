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

function formatDay(date) {
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];
  let forecastHTML = ``;
  days.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="row g-0">
              <div class="col-md-4">
                <img
                  src= ${actualIcon}
                  class="img-fluid rounded-start"
                  alt= ${response.data.condition.icon}
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                  <ul class="temp-forecast">
                    <li>Max: <span class="weather-forecast-temperature-max"> ${Math.round(
                      forecastDay.temperature.maximum
                    )}° </span> / Min: <span class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temperature.minimum
        )}° </span></li>
                  </ul>
                </div>
              </div>
            </div>
  `;
    }
  });
  forecastHTML = forecastHTML;
  forecastElement.innerHTML = forecastHTML;

  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.daily.temperature.maximum
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.daily.temperature.minimum
  );
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6b72d3t9e0a187fb46324o57dba90ad0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.latitude}&lat=${coordinates.longitude}&key=${apiKey}&units=metrics`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  celiusTemperature = response.data.temperature.current;
  document.querySelector("#temperature-element").innerHTML =
    Math.round(celiusTemperature);
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
  document.querySelector("h4").innerHTML = response.data.condition.description;
  let currentWeather = "h4";
  let actualIcon = weatherIcon(response.data.condition.description);
  let iconElement = document.querySelector("#icono");
  iconElement.setAttribute("src", actualIcon);
  iconElement.setAttribute("alt", response.data.condition.icon);
  getForecast(response.data.coordinates);
}

function weatherIcon(currentWeather) {
  if (currentWeather === "clear sky") {
    return `images/clear-sky-day.png`;
  } else if (currentWeather === "few clouds") {
    return `images/few-clouds-day.png`;
  } else if (currentWeather === "scattered clouds") {
    return `images/skattered-clouds-day.png`;
  } else if (currentWeather === "broken clouds") {
    return `images/broken-clouds-day.png`;
  } else if (currentWeather === "shower rain") {
    return `images/rain-day.png`;
  } else if (currentWeather === "rain") {
    return `images/rain-day.png`;
  } else if (currentWeather === "thunderstorm") {
    return `images/thunderstorm-day.png`;
  } else if (currentWeather === "snow") {
    return `images/snow-day.png`;
  } else if (currentWeather === "mist") {
    return `images/mist-day.png`;
  } else if (currentWeather === "overcast clouds") {
    return `images/broken-clouds-day.png`;
  }
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
