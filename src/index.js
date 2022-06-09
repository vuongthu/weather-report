'use strict';


const temperature = document.querySelector('#temperature');
const background = document.querySelector("html");

const tempState = {
  degree: 75,
};

const tempColorClass = ['temp-blue', 'temp-teal', 'temp-green', 'temp-orange', 'temp-red'];
const tempBackgroundClass = ['bg-desert', 'bg-hot', 'bg-warm', 'bg-chilly', 'bg-cold']

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

const increaseTemp = () => {
  tempState.degree += 1;
  changeTempColor();
  temperature.textContent = `${tempState.degree}°`;
};

const decreaseTemp = () => {
  tempState.degree -= 1;
  changeTempColor();
  temperature.textContent = `${tempState.degree}°`;
};

const registerEventHandlers = () => {
  const upButton = document.querySelector('#up-button');
  upButton.addEventListener('click', increaseTemp);
  const downButton = document.querySelector('#down-button');
  downButton.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
