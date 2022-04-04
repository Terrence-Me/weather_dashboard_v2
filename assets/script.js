const currentWeatherData = document.querySelector('.current-weather');
const fiveDayForcast = document.querySelector('.five-day');
const userinput = document.getElementById('input');
const searchBtn = document.getElementById('button-addon2');

function getCurrentWeather(searchInput) {
  let api =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    searchInput +
    '&appid=3726c2e5b5b4c36a97f6c6f8f891b10a&units=imperial';
  fetch(api)
    .then(function (respose) {
      return respose.json();
    })
    .then(function (data) {
      console.log(data);
      let date = new Date(data.dt * 1000);
      currentWeatherData.innerHTML = `<p class="city mb-0 fs-5 fw-bold text-wrap" id="city-date">${
        data.name
      },<span> ${date.toDateString()}</span> <img src="https://openweathermap.org/img/wn/${
        data.weather[0].icon
      }.png" alt="${data.weather[0].description}" /></p>
        <ul class="list-group list-unstyled fw-bold fs-6">
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

      let lat = data.coord.lat;
      let lon = data.coord.lon;
      console.log(lat);
      console.log(lon);
      getFiveDay(lat, lon);
    });
}

function getFiveDay(lat, lon) {
  let fiveDay =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    lat +
    '&lon=' +
    lon +
    '&appid=3726c2e5b5b4c36a97f6c6f8f891b10a&units=imperial';

  fetch(fiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      fiveDayForcast.innerHTML = data.daily.map((day, index) => {
        if (index <= 4) {
          let dt = new Date(day.dt * 1000); //timestamp * 1000
          return `<div class="card bg-info">
          <p class="city mb-0 fs-6 fw-bold text-wrap text-center" id="city-date">
          <span> ${dt.toDateString()}</span> <img src="https://openweathermap.org/img/wn/${
            day.weather[0].icon
          }.png" alt=${day.weather[0].description} /></p>
              <div class="card-body h6 p-1">
              <p class="card-text">Max-Temp: ${day.temp.max}&deg;F</p>
              <p class="card-text">Low-Temp: ${day.temp.min}&deg;F</p>
              <p class="card-text">Wind: ${day.wind_speed} MPH</p>
              <p class="card-text">Humidity: ${day.humidity} %</p>
              </div>
              </div>`;
        }
      });
    });
}

function searchInputHandler(e) {
  e.preventDefault();
  let searchInput = userinput.value.trim();

  if (!searchInput) {
    console.log('input search location');
    return;
  }

  console.log(searchInput);
  getCurrentWeather(searchInput);
  userinput.innerHTML = '';
}

searchBtn.addEventListener('click', searchInputHandler);
