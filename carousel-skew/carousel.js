let cards = document.querySelectorAll(".card");

for (let card of cards) {
  card.addEventListener("click", () => {
    setCardSize(card);
    let active = document.querySelector(".active");
    if (active && active !== card) active.classList.toggle("active");
    card.classList.toggle("active");
  });
  
  card.querySelector("img").addEventListener("load", () => {
    setCardSize(card);
  });
}

function setCardSize(card) {
  let img = card.querySelector("img");
  let orientation = getComputedStyle(card).getPropertyValue("--orientation");

  let aspectRatio = img.naturalWidth / img.naturalHeight;

  if (orientation == "horizontal") {
    let baseWidth = img.offsetHeight * aspectRatio;
    let offset = Math.tan((8 * Math.PI) / 180) * img.offsetHeight;
    let percentage = baseWidth / (baseWidth + offset) - 0.04;
    let width = baseWidth * percentage;
    
    card.style.setProperty("--active-width", `${width}px`);
  } else {
    let baseHeight = img.offsetWidth / aspectRatio;
    let offset = Math.tan((5 * Math.PI) / 180) * img.offsetWidth;
    let percentage = baseHeight / (baseHeight + offset) - 0.04;
    let height = baseHeight * percentage;
    
    img.style.height = `${baseHeight}px`;
    card.style.setProperty("--active-height", `${height}px`);
  }
}