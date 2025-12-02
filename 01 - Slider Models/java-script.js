



const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let counter = 0;
const size = images[0].clientWidth;

function updateSlide() {
  slides.style.transform = `translateX(${-size * counter}px)`;
}

nextBtn.addEventListener('click', () => {
  counter++;
  if (counter >= images.length) counter = 0;
  updateSlide();
});

prevBtn.addEventListener('click', () => {
  counter--;
  if (counter < 0) counter = images.length - 1;
  updateSlide();
});