// Select the container that holds all the slides
const slides = document.querySelector('.slides');

// Select all individual images inside the slides container
const images = document.querySelectorAll('.slides img');

// Select the navigation buttons
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Current slide index
let counter = 0;

// Width of each slide (assumes all images are the same width)
const size = images[0].clientWidth;

// Function to update the slide position
function updateSlide() {
  // Move the slides container horizontally
  slides.style.transform = `translateX(${-size * counter}px)`;
  slides.style.transition = 'transform 0.5s ease-in-out'; // smooth transition
}

// NEXT button click event
nextBtn.addEventListener('click', () => {
  counter++; // move to next slide
  if (counter >= images.length) counter = 0; // loop back to first slide
  updateSlide(); // apply transform
});

// PREVIOUS button click event
prevBtn.addEventListener('click', () => {
  counter--; // move to previous slide
  if (counter < 0) counter = images.length - 1; // loop back to last slide
  updateSlide(); // apply transform
});

// OPTIONAL: Automatic slide every 3 seconds
let autoSlide = setInterval(() => {
  counter++;
  if (counter >= images.length) counter = 0;
  updateSlide();
}, 3000);

// OPTIONAL: Pause slider on mouse hover
slides.addEventListener('mouseenter', () => clearInterval(autoSlide));
slides.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    counter++;
    if (counter >= images.length) counter = 0;
    updateSlide();
  }, 3000);
});

// OPTIONAL: Responsive - adjust slide width on window resize
window.addEventListener('resize', () => {
  const newSize = images[0].clientWidth;
  slides.style.transform = `translateX(${-newSize * counter}px)`;
});