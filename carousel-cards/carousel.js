/**
 * ASLI Carousel — cards (fluido, indicadores, teclado)
 */

const ASLIcarousel = (function () {
  function init() {
    document.querySelectorAll(".asli-carousel").forEach(initCarousel);
  }

  function initCarousel(carousel) {
    const viewport = carousel.querySelector(".asli-carousel-viewport");
    const track = carousel.querySelector(".asli-carousel-track");
    const cards = carousel.querySelectorAll(".asli-carousel-card");
    const prevBtn = carousel.querySelector(".asli-carousel-btn.prev");
    const nextBtn = carousel.querySelector(".asli-carousel-btn.next");
    const dotsRoot = carousel.querySelector(".asli-carousel-dots");

    const gap = carousel.dataset.gap ? parseInt(carousel.dataset.gap, 10) : 20;
    const autoplay = carousel.dataset.autoplay ? parseInt(carousel.dataset.autoplay, 10) : 0;

    carousel.style.setProperty("--carousel-gap", `${gap}px`);

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval = null;
    let dotButtons = [];

    function getCardWidth() {
      return cards[0].offsetWidth + gap;
    }

    function getMaxIndex() {
      const container = viewport || carousel;
      const cw = getCardWidth();
      const trackWidth = container.clientWidth;
      const visible = Math.max(1, Math.floor(trackWidth / cw));
      return Math.max(0, cards.length - visible);
    }

    function buildDots() {
      if (!dotsRoot) return;
      dotsRoot.replaceChildren();
      dotButtons = [];
      const n = getMaxIndex() + 1;
      for (let i = 0; i < n; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "asli-carousel-dot";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", `Ir al grupo ${i + 1} de ${n}`);
        b.addEventListener("click", () => goToSlide(i));
        dotsRoot.appendChild(b);
        dotButtons.push(b);
      }
      syncDots();
    }

    function syncDots() {
      dotButtons.forEach((b, i) => {
        const on = i === currentIndex;
        b.setAttribute("aria-current", on ? "true" : "false");
      });
    }

    function updateCarousel() {
      const cw = getCardWidth();
      track.style.transform = `translate3d(-${currentIndex * cw}px, 0, 0)`;
      syncDots();
      const maxIdx = getMaxIndex();
      const noScroll = maxIdx === 0;
      if (prevBtn) {
        prevBtn.disabled = noScroll;
        prevBtn.setAttribute("aria-disabled", noScroll ? "true" : "false");
      }
      if (nextBtn) {
        nextBtn.disabled = noScroll;
        nextBtn.setAttribute("aria-disabled", noScroll ? "true" : "false");
      }
    }

    function goToSlide(index) {
      const maxIndex = getMaxIndex();
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateCarousel();
    }

    /** Bucle: del último grupo al primero y viceversa */
    function nextSlide() {
      const maxIndex = getMaxIndex();
      if (maxIndex === 0) return;
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    }

    function prevSlide() {
      const maxIndex = getMaxIndex();
      if (maxIndex === 0) return;
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    }

    function startAutoplay() {
      if (autoplay > 0) {
        autoplayInterval = setInterval(nextSlide, autoplay);
      }
    }

    prevBtn?.addEventListener("click", () => prevSlide());
    nextBtn?.addEventListener("click", () => nextSlide());

    carousel.addEventListener("mouseenter", () => {
      if (autoplay > 0) clearInterval(autoplayInterval);
    });

    carousel.addEventListener("mouseleave", () => {
      startAutoplay();
    });

    // Teclado: foco en carrusel
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(getMaxIndex());
      }
    });

    let touchStartX = 0;

    track.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        if (autoplay > 0) clearInterval(autoplayInterval);
      },
      { passive: true }
    );

    track.addEventListener(
      "touchend",
      (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? nextSlide() : prevSlide();
        } else {
          updateCarousel();
        }
        startAutoplay();
      },
      { passive: true }
    );

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        buildDots();
        goToSlide(Math.min(currentIndex, getMaxIndex()));
      }, 120);
    });

    buildDots();
    goToSlide(0);
    startAutoplay();
  }

  return { init };
})();
