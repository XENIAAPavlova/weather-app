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

let currentDay = days[now.getDay()];
console.log(currentDay);

let currentHours = now.getHours();
console.log(currentHours);

let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
console.log(currentMinutes);

let todays = `${currentDay}, ${currentHours} : ${currentMinutes}`;
console.log(todays);

let element = document.querySelector("#current-time");
console.log(element);

element.innerHTML = todays;

// function search(event) {
//   event.preventDefault();
//   let searchInput = document.querySelector("#search-city-input");
//   let cityElement = document.querySelector("#city-name");
//   cityElement.innerHTML = searchInput.value;
// }

// let form = document.querySelector("#submit-button");
// form.addEventListener("submit", search);

// function convertToF(event) {
//   event.preventDefault();
//   let changeMetric = document.querySelector("#see-temperature");
//   changeMetric.innerHTML = "59°";
// }

// let clickOnF = document.querySelector("#number-fahrenheit");
// clickOnF.addEventListener("click", convertToF);

// function convertToC(event) {
//   event.preventDefault();
//   let changeMetrics = document.querySelector("#see-temperature");
//   changeMetrics.innerHTML = "15°";
// }

// let clickOnC = document.querySelector("#number-celsius");
// clickOnC.addEventListener("click", convertToC);
