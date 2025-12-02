const slides = document.querySelector('.slides'); // container of slides
const images = document.querySelectorAll('.slides img'); // all images
const prevBtn = document.querySelector('.prev'); // prev button
const nextBtn = document.querySelector('.next'); // next button
const dots = document.querySelectorAll('.dot'); // dot elements

let counter = 0; // current slide index
let size = images[0].clientWidth; // width of one slide

// Function to update slide position
function updateSlide() {
  slides.style.transform = `translateX(${-size * counter}px)`;
  slides.style.transition = 'transform 0.5s ease-in-out';
  updateDots(); // update active dot
}

// Function to update dot navigation
function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[counter].classList.add('active');
}

// NEXT button
nextBtn.addEventListener('click', () => {
  counter++;
  if (counter >= images.length) counter = 0;
  updateSlide();
});

// PREV button
prevBtn.addEventListener('click', () => {
  counter--;
  if (counter < 0) counter = images.length - 1;
  updateSlide();
});

// Dot click event
dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    counter = parseInt(dot.dataset.index); // get clicked dot index
    updateSlide();
  });
});

// Automatic slide every 3 seconds
let autoSlide = setInterval(() => {
  counter++;
  if (counter >= images.length) counter = 0;
  updateSlide();
}, 3000);

// Pause on hover
slides.addEventListener('mouseenter', () => clearInterval(autoSlide));
slides.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    counter++;
    if (counter >= images.length) counter = 0;
    updateSlide();
  }, 3000);
});

// Responsive: adjust slide width on window resize
window.addEventListener('resize', () => {
  size = images[0].clientWidth;
  updateSlide();
});

// Initialize first dot as active
updateDots();
