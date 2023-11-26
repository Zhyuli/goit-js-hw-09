function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
// console.log(startBtn);
const stopBtn = document.querySelector('button[data-stop]');
// console.log(stopBtn);
const body = document.querySelector('body');
// console.log(body);

let background = null;
stopBtn.disabled = true;
startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);


function onStartBtn() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    background = setInterval(() => { body.style.backgroundColor = getRandomHexColor() }, 1000)
}


function onStopBtn () {
     startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(background);
}
