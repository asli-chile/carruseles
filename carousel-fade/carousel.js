/**
 * ============================================
 * ASLI Carousel - Fade Reutilizable
 * ============================================
 */

const ASLIcarousel = (function() {
  
  function init() {
    const carousels = document.querySelectorAll('.asli-carousel');
    carousels.forEach(carousel => initCarousel(carousel));
  }

  function initCarousel(carousel) {
    const track = carousel.querySelector('.asli-carousel-track');
    const slides = carousel.querySelectorAll('.asli-carousel-slide');
    const prevBtn = carousel.querySelector('.asli-carousel-btn.prev');
    const nextBtn = carousel.querySelector('.asli-carousel-btn.next');
    const dotsContainer = carousel.querySelector('.asli-carousel-dots');
    
    if (slides.length === 0) return;

    const autoplay = carousel.dataset.autoplay ? parseInt(carousel.dataset.autoplay) : 4000;
    const effect = carousel.dataset.effect || 'slide';
    let currentIndex = 0;
    let autoplayInterval = null;

    // Crear dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'asli-carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer?.appendChild(dot);
    });

    function updateCarousel() {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });

      const dots = dotsContainer?.querySelectorAll('.asli-carousel-dot');
      dots?.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;
      updateCarousel();
      resetAutoplay();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      if (autoplay > 0) {
        autoplayInterval = setInterval(nextSlide, autoplay);
      }
    }

    // Event Listeners
    prevBtn?.addEventListener('click', () => { prevSlide(); });
    nextBtn?.addEventListener('click', () => { nextSlide(); });

    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
      resetAutoplay();
    });

    // Touch
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      clearInterval(autoplayInterval);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      if (Math.abs(touchStartX - touchEndX) > 50) {
        touchStartX > touchEndX ? nextSlide() : prevSlide();
      }
      resetAutoplay();
    }, { passive: true });

    // Keyboard
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { prevSlide(); }
      if (e.key === 'ArrowRight') { nextSlide(); }
    });

    // Iniciar
    resetAutoplay();
  }

  return { init };
})();