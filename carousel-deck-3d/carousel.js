/**
 * Baraja 3D: avance automático; pausa acorde a la animación fluida.
 */
(function () {
  const stage = document.getElementById("deckStage");
  if (!stage) return;

  const cards = Array.from(stage.querySelectorAll(".deck-card"));
  const n = cards.length;
  if (n === 0) return;

  let current = 0;
  let busy = false;

  /** Animación descarte ~1s + reacomodo 3D (~0.95s) */
  const AUTO_MS = 2400;

  function relForCardIndex(i) {
    return ((i - current) % n + n) % n;
  }

  function applyPositions() {
    cards.forEach((el, i) => {
      const rel = relForCardIndex(i);
      el.removeAttribute("data-pos");
      if (rel === 0) el.setAttribute("data-pos", "front");
      else if (rel === 1) el.setAttribute("data-pos", "back-l");
      else if (rel === 2) el.setAttribute("data-pos", "back-r");
      else el.setAttribute("data-pos", "hidden");
    });
  }

  function goNext() {
    if (busy || n < 2) return;
    const front = cards[current];
    busy = true;
    front.classList.add("is-deal-next");

    const onEnd = () => {
      front.removeEventListener("animationend", onEnd);
      front.classList.remove("is-deal-next");
      current = (current + 1) % n;
      applyPositions();
      busy = false;
    };

    front.addEventListener("animationend", onEnd, { once: true });
    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTimeout(onEnd, 0);
    }
  }

  setInterval(goNext, AUTO_MS);

  applyPositions();
})();
