let apiKey = "dcfba56f795371b9b39f70882499c480";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}&units=metric`;

// 4. инфо передаеттся в open weather
// 5. open weather ищет инфо о погоде
function receiveForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "dcfba56f795371b9b39f70882499c480";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function returnLocation(response) {
  // 6. программа получает инфо от OW
  let showWeather = document.querySelector("#see-temperature");
  let temperature = Math.round(response.data.main.temp);
  showWeather.innerHTML = `${temperature} °C | °F`;

  let showCity = document.querySelector("#city-name");
  showCity.innerHTML = response.data.name;

  let displayCurrentCity = document.querySelector("#search-city-input");
  displayCurrentCity.value = response.data.name;

  let showHumidity = document.querySelector("#humidity-percentages");
  showHumidity.innerHTML = `${response.data.main.humidity}%`;

  let showWind = document.querySelector("#wind-indicator");
  showWind.innerHTML = `${response.data.wind.speed} km/h`;

  let showWeatherDescription = document.querySelector("#weather-description");
  showWeatherDescription.innerHTML = response.data.weather[0].description;
  console.log(response);

  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.setAttribute(
    "src",
    changeTheIcon(response.data.weather[0].main)
  );

  receiveForecast(response.data.coord);
}


// дать аргумент с open weather и передать иконку в зависимости от описания в open weather

function changeTheIcon(weatherSummary) {
  if (weatherSummary === "clear") {
    return "visuals/sun_v2.svg";
  }
  if (weatherSummary === "few clouds") {
    return "visuals/simple_cloud.svg";
  }
  if (weatherSummary === "scattered clouds") {
    return "visuals/simple_cloud.svg";
  }
  if (weatherSummary === "broken clouds") {
    return "visuals/simple_cloud.svg";
  }
  if (weatherSummary === "drizzle") {
    return "visuals/day_rain.svg";
  }
  if (weatherSummary === "rain") {
    return "visuals/drops.svg";
  }
  if (weatherSummary === "thunderstorm") {
    return "visuals/cloud_storm.svg";
  }
  if (weatherSummary === "snow") {
    return "visuals/cloud-snow.svg";
  }
  return "visuals/sun_cloud.svg";
}

// 1. Пользователь вводит город в input
// 2. пронрамма достает значение, которые ввел пользователь

function enterTheCity(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#search-city-input");

  // 3. программа ищет путь для передачи запроса в OW
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(returnLocation);
}

let submitButton = document.querySelector("#search-city");
submitButton.addEventListener("click", enterTheCity);

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(returnLocation);
}

function clickCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-city");
currentButton.addEventListener("click", clickCurrent);


function formatDay(timestamp) {
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row justify-content-md-center">`;

  // let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5){
    forecastHTML =
      forecastHTML +
      `
<div class="col-2 day 1 text-center border rounded mx-2">
    <div class="row">
        <div class="col-12 fw-bold">${formatDay(forecastDay.dt)}</div>
    </div>
    <div class="row">
        <div class="col-12 emoji">
            <img src=${changeTheIcon(
              forecastDay.weather[0].description
            )} alt width="50" />
        </div>
    </div>
    <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span> |
        <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
    </div>
    <div class="row">
        <div class="col-12">${forecastDay.weather[0].main}</div>
    </div>
</div>
  `;}
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// displayForecast();
