const comparison = document.querySelector('.comparison');
const picInner = comparison.querySelector('.comparison__picture-inner');
const picItems = comparison.querySelectorAll('.comparison__picture');
const btnBefore = comparison.querySelector('.comparison__button--before');
const btnAfter = comparison.querySelector('.comparison__button--after');
const compToggle = comparison.querySelector('.comparison__toggle');
const compRange = comparison.querySelector('.comparison__range');

const tabletWidth = 768;
const tabletMediaQuery = window.matchMedia(`(min-width: ${tabletWidth}px)`);

tabletMediaQuery.addEventListener('change', () => {
  if (tabletMediaQuery.matches) {
    picInner.style.transform = `translateX(0%)`;
    compToggle.style.transform = `translateX(0%)`;
  }
})

picItems.forEach((pic, index) => {
  const picImage = pic.querySelector('.comparison__image');
  picImage.addEventListener('dragstart', (evt) => evt.preventDefault());

  pic.addEventListener('pointerdown', pointerDown(index));
  pic.addEventListener('pointermove', pointerMove);
  pic.addEventListener('pointerup', pointerUp);
  pic.addEventListener('pointerleave', pointerUp);
});

btnBefore.addEventListener('click', () => {
  if (!tabletMediaQuery.matches) {
    currentIndex = 0;
    offset = currentIndex * window.innerWidth * -1;
    initialPosition = offset;
    picInner.style.transform = `translateX(${currentIndex * 100 * -1}%)`;
    compToggle.style.transform = `translateX(${currentIndex * 100}%)`;
  } else {
    picItems[0].style.width = '100%';
    picItems[1].style.width = '0%';
    compRange.value = 0;
  }
})

btnAfter.addEventListener('click', () => {
  if (!tabletMediaQuery.matches) {
    currentIndex = picItems.length - 1;
    offset = currentIndex * window.innerWidth * -1;
    initialPosition = offset;
    picInner.style.transform = `translateX(${currentIndex * 100 * -1}%)`;
    compToggle.style.transform = `translateX(${currentIndex * 100}%)`;
  } else {
    picItems[0].style.width = '0%';
    picItems[1].style.width = '100%';
    compRange.value = 100;
  }
})

compRange.addEventListener('input', () => {
  picItems[0].style.width = `${(100 - compRange.value)}%`;
  picItems[1].style.width = `${compRange.value}%`;
})

let isPressed = false;
let initialTouch = 0;
let initialPosition = 0;
let currentIndex = 0;
let offset = 0;

function pointerDown(index) {
  return (evt) => {
    isPressed = true;
    initialTouch = evt.clientX;

    if (!tabletMediaQuery.matches) {
      currentIndex = index;
      picInner.classList.add('comparison__picture-inner--touched');
    }
  }
};

function pointerMove(evt) {
  if (!isPressed) return
  const currentTouch = evt.clientX;

  if (!tabletMediaQuery.matches) {
    offset = initialPosition + currentTouch - initialTouch;
    offset = parseInt(offset);
    picInner.style.transform = `translateX(${offset}px)`;
  }
};

function pointerUp() {
  isPressed = false;

  if (!tabletMediaQuery.matches) {
    const delta = offset - initialPosition;
    if (delta < -50 && currentIndex < picItems.length - 1) currentIndex++;
    if (delta > 50 && currentIndex > 0) currentIndex--;

    offset = currentIndex * window.innerWidth * -1;
    initialPosition = offset;

    picInner.style.transform = `translateX(${currentIndex * 100 * -1}%)`;
    compToggle.style.transform = `translateX(${currentIndex * 100}%)`;
  }

  picInner.classList.remove('comparison__picture-inner--touched');
}
