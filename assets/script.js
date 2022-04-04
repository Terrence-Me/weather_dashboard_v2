const currentWeatherData = document.querySelector('.current-weather');
const fiveDayForcast = document.querySelector('.five-day');
let api =
  'https://api.openweathermap.org/data/2.5/weather?q=raleigh&appid=3726c2e5b5b4c36a97f6c6f8f891b10a&units=imperial';

fetch(api)
  .then(function (respose) {
    return respose.json();
  })
  .then(function (data) {
    console.log(data);
    let date = new Date(data.dt * 1000);
    currentWeatherData.innerHTML = `<p class="city mb-0 fs-3 fw-bold text-wrap" id="city-date">${
      data.name
    },<span> ${date.toDateString()}</span> <img src="https://openweathermap.org/img/wn/${
      data.weather[0].icon
    }.png" alt="${data.weather[0].description}" /></p>
    <ul class="list-group list-unstyled fw-bold">
          <li class="current-weather-li">Temp: <span class="fw-normal"> ${
            data.main.temp
          } &deg;F</span></li>
          <li class="current-weather-li">Feels Like: <span class="fw-normal"> ${
            data.main.feels_like
          } &deg;F</span></li>
          <li class="current-weather-li">Wind: <span class="fw-normal"> ${
            data.wind.speed
          } MPH</span></li>
          <li class="current-weather-li">Humidity: <span class="fw-normal"> ${
            data.main.humidity
          } %</span></li>
          <li class="current-weather-li">UV Index:<span id="uv" class="curSpan fw-normal"></span></li>
      </ul>`;

    fiveDayForcast.innerHTML = `<div class="card bg-info"><p class="city mb-0 fs-6 fw-bold text-wrap text-center" id="city-date">${
      data.name
    },<span> ${date.toDateString()}</span> <img src="https://openweathermap.org/img/wn/${
      data.weather[0].icon
    }.png" alt="${data.weather[0].description}" /></p>
    <div class="card-body h6 p-1">
    <p class="card-text">Max-Temp: ${data.main.temp}&deg;F</p>
    <p class="card-text">Low-Temp: ${data.main.feels_like}&deg;F</p>
    <p class="card-text">Wind: ${data.wind.speed} MPH</p>
    <p class="card-text">Humidity: ${data.main.humidity} %</p>
    </div>
    </div>
   
    `;
  });
