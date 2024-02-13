function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let apiKey = "b5913f071fao57fb23b245a065fb8tac";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function displayWeather(response) {
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let condition = response.data.condition.description;
  let temperature = Math.round(response.data.temperature.current);

  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;

  let currentConditions = document.querySelector("#current-conditions");
  currentConditions.innerHTML = `${condition} <br />
              Humidity: <strong>${humidity}%</strong>, Wind: <strong>${wind}km/h</strong>`;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
