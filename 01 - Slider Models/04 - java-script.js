// ==========================
// Modal Popup with Drag & Scroll Lock
// ==========================

class Modal {
  constructor(modalId, openBtnId, options = {}) {
    this.modal = document.getElementById(modalId);
    this.openBtn = document.getElementById(openBtnId);
    this.closeBtn = this.modal.querySelector('.close');
    this.header = this.modal.querySelector('.modal-header') || this.modal.querySelector('.modal-content'); // drag area

    this.fadeDuration = options.fadeDuration || 300;
    this.autoFocus = options.autoFocus || false;

    this.isDragging = false;
    this.offset = { x: 0, y: 0 };

    this.init();
  }

  init() {
    // Open modal
    this.openBtn.addEventListener('click', () => this.open());

    // Close modal
    this.closeBtn.addEventListener('click', () => this.close());

    // Click outside to close
    window.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Escape key to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display === 'block') this.close();
    });

    // Drag functionality
    this.header.addEventListener('mousedown', (e) => this.startDrag(e));
    window.addEventListener('mousemove', (e) => this.drag(e));
    window.addEventListener('mouseup', () => this.stopDrag());

    // Responsive: reset position on resize
    window.addEventListener('resize', () => this.centerModal());
  }

  open() {
    this.lockScroll(); // prevent background scroll
    this.modal.style.display = 'block';
    this.modal.style.opacity = 0;

    let opacity = 0;
    const fadeIn = setInterval(() => {
      opacity += 50 / this.fadeDuration;
      if (opacity >= 1) {
        opacity = 1;
        clearInterval(fadeIn);
      }
      this.modal.style.opacity = opacity;
    }, 50);

    if (this.autoFocus) {
      const focusElement = this.modal.querySelector('input, button, textarea');
      if (focusElement) focusElement.focus();
    }

    this.centerModal(); // center modal when opened
  }

  close() {
    this.unlockScroll(); // allow background scroll
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

  // Lock background scroll
  lockScroll() {
    document.body.style.overflow = 'hidden';
  }

  // Unlock background scroll
  unlockScroll() {
    document.body.style.overflow = '';
  }

  // Center modal
  centerModal() {
    this.modal.style.top = '50%';
    this.modal.style.left = '50%';
    this.modal.style.transform = 'translate(-50%, -50%)';
  }

  // Start dragging
  startDrag(e) {
    this.isDragging = true;
    const rect = this.modal.getBoundingClientRect();
    this.offset.x = e.clientX - rect.left;
    this.offset.y = e.clientY - rect.top;
    this.modal.style.transition = 'none'; // disable fade animation while dragging
  }

  // Drag modal
  drag(e) {
    if (!this.isDragging) return;
    this.modal.style.transform = 'none';
    this.modal.style.left = e.clientX - this.offset.x + 'px';
    this.modal.style.top = e.clientY - this.offset.y + 'px';
  }

  // Stop dragging
  stopDrag() {
    this.isDragging = false;
    this.modal.style.transition = `opacity ${this.fadeDuration}ms ease-in-out`; // restore fade
  }
}

// ==========================
// Usage Example
// ==========================
const myModal = new Modal('myModal', 'openModalBtn', {
  fadeDuration: 300,
  autoFocus: true
});
