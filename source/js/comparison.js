const comparison = document.querySelector('.comparison');
const picInner = comparison.querySelector('.comparison__picture-inner');
const picItems = comparison.querySelectorAll('.comparison__picture');
const btnBefore = comparison.querySelector('.comparison__button--before');
const btnAfter = comparison.querySelector('.comparison__button--after');
const compToggle = comparison.querySelector('.comparison__toggle');

let isPressed = false;
let initialTouch = 0;
let initialPosition = 0;
let currentIndex = 0;
let offset = 0;

picItems.forEach((pic, index) => {
  const picImage = pic.querySelector('.comparison__image');
  picImage.addEventListener('dragstart', (evt) => evt.preventDefault());

  pic.addEventListener('pointerdown', (evt) => {
    isPressed = true;
    initialTouch = evt.clientX;
    currentIndex = index;
    picInner.classList.add('comparison__picture-inner--touched');
  });

  pic.addEventListener('pointermove', (evt) => {
    if (!isPressed) return;
    const currentTouch = evt.clientX;
    offset = initialPosition + currentTouch - initialTouch;
    offset = parseInt(offset);
    picInner.style.transform = `translateX(${offset}px)`;
  });

  pic.addEventListener('pointerup', pointerUp);
  pic.addEventListener('pointerleave', pointerUp);

});

function pointerUp() {
  isPressed = false;

  const delta = offset - initialPosition;
  if (delta < -50 && currentIndex < picItems.length - 1) currentIndex++;
  if (delta > 50 && currentIndex > 0) currentIndex--;

  offset = currentIndex * window.innerWidth * -1;
  initialPosition = offset;
  picInner.style.transform = `translateX(${offset}px)`;
  compToggle.style.transform = `translateX(${currentIndex * 100}%)`;

  picInner.classList.remove('comparison__picture-inner--touched');
}

btnBefore.addEventListener('click', () => {
  currentIndex = 0;
  offset = currentIndex * window.innerWidth * -1;
  initialPosition = offset;
  picInner.style.transform = `translateX(${offset}px)`;
  compToggle.style.transform = `translateX(${currentIndex * 100}%)`;
})

btnAfter.addEventListener('click', () => {
  currentIndex = picItems.length - 1;
  offset = currentIndex * window.innerWidth * -1;
  initialPosition = offset;
  picInner.style.transform = `translateX(${offset}px)`;
  compToggle.style.transform = `translateX(${currentIndex * 100}%)`;
})
