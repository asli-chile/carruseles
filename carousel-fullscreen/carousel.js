/**
 * ============================================
 * ASLI Carousel - Fullscreen Reutilizable
 * Uso: <div class="asli-carousel" data-autoplay="5000">
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
    const progressBar = carousel.querySelector('.asli-carousel-progress');
    
    if (slides.length === 0) return;

    const autoplay = carousel.dataset.autoplay ? parseInt(carousel.dataset.autoplay) : 5000;
    let currentIndex = 0;
    let autoplayInterval = null;
    let progressInterval = null;
    let progressWidth = 0;

    // Primer slide activo
    slides[0].classList.add('active');

    // Crear dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'asli-carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer?.appendChild(dot);
    });

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
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
      resetProgress();
      restartAutoplay();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Progress bar
    function resetProgress() {
      progressWidth = 0;
      if (progressBar) progressBar.style.width = '0%';
      clearInterval(progressInterval);
      
      const intervalTime = 50;
      const progressStep = 100 / (autoplay / intervalTime);
      
      progressInterval = setInterval(() => {
        progressWidth += progressStep;
        if (progressBar && progressWidth <= 100) {
          progressBar.style.width = progressWidth + '%';
        }
      }, intervalTime);
    }

    function restartAutoplay() {
      clearInterval(autoplayInterval);
      if (autoplay > 0) {
        autoplayInterval = setInterval(nextSlide, autoplay);
      }
    }

    // Event Listeners
    prevBtn?.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });

    nextBtn?.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
      clearInterval(progressInterval);
    });

    carousel.addEventListener('mouseleave', () => {
      restartAutoplay();
      resetProgress();
    });

    // Touch/Swipe
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      clearInterval(autoplayInterval);
      clearInterval(progressInterval);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
      }
      restartAutoplay();
    }, { passive: true });

    // Keyboard
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { prevSlide(); restartAutoplay(); }
      if (e.key === 'ArrowRight') { nextSlide(); restartAutoplay(); }
    });

    // Iniciar
    resetProgress();
    if (autoplay > 0) {
      autoplayInterval = setInterval(nextSlide, autoplay);
    }
  }

  return { init };
})();