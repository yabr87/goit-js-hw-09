const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let timerId = null;

refs.start.addEventListener('click', event => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  disabledBtn(event);
});

refs.stop.addEventListener('click', event => {
  clearInterval(timerId);
  disabledBtn(event);
});

function disabledBtn(event) {
  if (event.target === refs.start) {
    activateBtn(true, false);
    // refs.start.setAttribute('disabled', '');
    // refs.stop.removeAttribute('disabled');
  } else {
    activateBtn(false, true);
    // refs.stop.setAttribute('disabled', '');
    // refs.start.removeAttribute('disabled');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function activateBtn(start, stop) {
  refs.start.disabled = start;
  refs.stop.disabled = stop;
}
