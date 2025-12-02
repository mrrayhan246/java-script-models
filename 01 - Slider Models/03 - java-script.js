// Get modal element
const modal = document.getElementById('myModal');

// Get open modal button
const openBtn = document.getElementById('openModalBtn');

// Get close button (span)
const closeBtn = document.querySelector('.close');

// Open modal when button is clicked
openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Close modal when 'X' is clicked
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
