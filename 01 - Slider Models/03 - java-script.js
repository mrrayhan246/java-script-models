// ==========================
// Modal Popup - JavaScript
// ==========================

// Modal class to handle multiple modals
class Modal {
  constructor(modalId, openBtnId, options = {}) {
    this.modal = document.getElementById(modalId);
    this.openBtn = document.getElementById(openBtnId);
    this.closeBtn = this.modal.querySelector('.close');

    // Optional settings
    this.fadeDuration = options.fadeDuration || 300; // in ms
    this.autoFocus = options.autoFocus || false; // focus on modal when opened

    // Initialize events
    this.init();
  }

  // Initialize event listeners
  init() {
    // Open modal on button click
    this.openBtn.addEventListener('click', () => this.open());

    // Close modal when 'X' button clicked
    this.closeBtn.addEventListener('click', () => this.close());

    // Close modal when clicking outside the content
    window.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Close modal when pressing 'Escape' key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display === 'block') {
        this.close();
      }
    });
  }

  // Open modal function
  open() {
    this.modal.style.display = 'block';
    this.modal.style.opacity = 0;

    // Fade in effect
    let opacity = 0;
    const fadeIn = setInterval(() => {
      opacity += 50 / this.fadeDuration;
      if (opacity >= 1) {
        opacity = 1;
        clearInterval(fadeIn);
      }
      this.modal.style.opacity = opacity;
    }, 50);

    // Auto-focus inside modal
    if (this.autoFocus) {
      const focusElement = this.modal.querySelector('input, button, textarea');
      if (focusElement) focusElement.focus();
    }
  }

  // Close modal function
  close() {
    // Fade out effect
    let opacity = 1;
    const fadeOut = setInterval(() => {
      opacity -= 50 / this.fadeDuration;
      if (opacity <= 0) {
        opacity = 0;
        clearInterval(fadeOut);
        this.modal.style.display = 'none';
      }
      this.modal.style.opacity = opacity;
    }, 50);
  }
}

// ==========================
// Usage Example
// ==========================

// Create a new modal instance
const myModal = new Modal('myModal', 'openModalBtn', {
  fadeDuration: 300,
  autoFocus: true
});

// You can create multiple modals like this
// const anotherModal = new Modal('anotherModal', 'openAnotherBtn');
