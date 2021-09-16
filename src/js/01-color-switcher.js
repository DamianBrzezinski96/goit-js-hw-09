function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);

const startBtn = qs('button[data-start]');
const stopBtn = qs('button[data-stop');
const bodyBg = qs("body");
let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
        const backgroundColor = getRandomHexColor();
        bodyBg.style.backgroundColor = backgroundColor;
        console.log(backgroundColor, `Interval ! ${Math.random()}`);
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    console.log(`Interval with id ${timerId} has stopped !`);
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

startBtn.style.width = '70px';
startBtn.style.height = '40px';
startBtn.style.textTransform = 'uppercase';

startBtn.style.marginLeft = 'calc(50vw - 150px)';
startBtn.style.marginTop = 'calc(25vw - 10px)';

stopBtn.style.width = '70px';
stopBtn.style.height = '40px';
stopBtn.style.textTransform = 'uppercase';