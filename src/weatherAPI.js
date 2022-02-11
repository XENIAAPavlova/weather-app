let apiKey = "dcfba56f795371b9b39f70882499c480";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}&units=metric`;

console.log("Hello");

// 4. инфо передаеттся в open weather
// 5. open weather ищет инфо о погоде

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

/*
 *
 */

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(returnLocation);
  console.log(position);
}

function clickCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-city");
currentButton.addEventListener("click", clickCurrent);
