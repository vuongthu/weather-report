'use strict';

const temperature = document.querySelector('#temperature');
const background = document.querySelector('html');
const city = document.querySelector('#location');
const searchInput = document.querySelector('#search-location');
const sky = document.querySelector('#sky');
const skyImage = document.querySelector('#sky-img');
const date = document.querySelector('#date');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getCurrentDate = () => {
  const currentDate = new Date();
  const monthId = currentDate.getMonth();
  date.textContent = `${
    months[monthId]
  } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
};

getCurrentDate();

const tempState = {
  degree: 75,
};

const tempColorClass = [
  'temp-blue',
  'temp-teal',
  'temp-green',
  'temp-orange',
  'temp-red',
];

const tempBackgroundClass = [
  'bg-desert',
  'bg-hot',
  'bg-warm',
  'bg-chilly',
  'bg-cold',
];

const changeTempColor = () => {
  if (tempState.degree >= 91) {
    if (!temperature.classList.contains('temp-red')) {
      temperature.classList.remove(...tempColorClass);
      temperature.classList.add('temp-red');
    }
    if (!background.classList.contains('bg-desert')) {
      background.classList.remove(...tempBackgroundClass);
      background.classList.add('bg-desert');
    }
  } else if (tempState.degree >= 81 && tempState.degree <= 90) {
    if (!temperature.classList.contains('temp-orange')) {
      temperature.classList.remove(...tempColorClass);
      temperature.classList.add('temp-orange');
    }
    if (!background.classList.contains('bg-hot')) {
      background.classList.remove(...tempBackgroundClass);
      background.classList.add('bg-hot');
    }
  } else if (tempState.degree >= 65 && tempState.degree <= 80) {
    if (!temperature.classList.contains('temp-green')) {
      temperature.classList.remove(...tempColorClass);
      temperature.classList.add('temp-green');
    }
    if (!background.classList.contains('bg-warm')) {
      background.classList.remove(...tempBackgroundClass);
      background.classList.add('bg-warm');
    }
  } else if (tempState.degree >= 50 && tempState.degree <= 64) {
    if (!temperature.classList.contains('temp-teal')) {
      temperature.classList.remove(...tempColorClass);
      temperature.classList.add('temp-teal');
    }
    if (!background.classList.contains('bg-chilly')) {
      background.classList.remove(...tempBackgroundClass);
      background.classList.add('bg-chilly');
    }
  } else if (tempState.degree <= 49) {
    if (!temperature.classList.contains('temp-blue')) {
      temperature.classList.remove(...tempColorClass);
      temperature.classList.add('temp-blue');
    }
    if (!background.classList.contains('bg-cold')) {
      background.classList.remove(...tempBackgroundClass);
      background.classList.add('bg-cold');
    }
  }
};

changeTempColor();

const changeTempDegree = (value) => {
  tempState.degree += value;
  updateTemp();
};

const updateTemp = () => {
  changeTempColor();
  temperature.textContent = `${tempState.degree}°`;
};

const updateCity = (event) => {
  city.textContent = event.target.value;
};

const findLatLon = (place) => {
  return axios
    .get('http://127.0.0.1:8000/location', {
      params: {
        q: place,
      },
    })
    .then((response) => {
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      return { lat, lon };
    })
    .catch((err) => console.log({ err }));
};

const getTemp = (lat, lon) => {
  return axios
    .get('http://127.0.0.1:8000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      const temp = response.data.current.temp;
      return Math.floor(((temp - 273.15) * 9) / 5 + 32);
    })
    .catch((err) => console.log({ err }));
};

const getRealTimeData = async () => {
  const place = city.textContent;
  const { lat, lon } = await findLatLon(place);
  tempState.degree = await getTemp(lat, lon);
  updateTemp();
};

const updateSky = () => {
  const selectedSky = sky.options[sky.selectedIndex].value;
  skyImage.setAttribute('src', `assets/${selectedSky}.png`);
};

const resetCity = () => {
  city.textContent = 'San Diego, CA';
  searchInput.value = '';
};

const registerEventHandlers = () => {
  const upButton = document.querySelector('#up-button');
  upButton.addEventListener('click', () => changeTempDegree(1));
  const downButton = document.querySelector('#down-button');
  downButton.addEventListener('click', () => changeTempDegree(-1));
  searchInput.addEventListener('input', updateCity);
  const getDataButton = document.querySelector('#get-data');
  getDataButton.addEventListener('click', getRealTimeData);
  sky.addEventListener('change', updateSky);
  const resetButton = document.querySelector('#reset-button');
  resetButton.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
