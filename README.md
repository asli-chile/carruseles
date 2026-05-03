# 🎠 ASLI Carousels - Librería de Carruseles

Colección de carruseles reutilizables para tus proyectos.

## Demo en vivo

Los README de GitHub **no pueden ejecutar JavaScript**: las capturas abajo son estáticas. Para probar los componentes con interacción, usa la demo publicada o en local.

| | |
| --- | --- |
| **Producción (GitHub Pages)** | [Abrir demo](https://asli-chile.github.io/carruseles/) — misma app que con `npm run dev` |
| **En tu PC** | `npm install` y `npm run dev` |

**Activar Pages (una vez):** en el repo → *Settings* → *Pages* → *Build and deployment* → *Source* → **GitHub Actions**. El workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) genera el sitio al hacer push a `main`.

**Tarjeta al compartir el enlace del repo:** *Settings* → *General* → *Social preview* y sube una imagen ancha (~1280×640 px). Complementa, no reemplaza, el README.

---

## Vista previa (capturas)

Índice de demos y variantes. Cada título enlaza al código en el repo; en la demo en línea, abre el mismo path bajo `carruseles/`.

### Menú de demos

[![Menú ASLI Carousels](docs/preview-index.png)](https://asli-chile.github.io/carruseles/)

### Fullscreen

[📁 `carousel-fullscreen/`](carousel-fullscreen/) · [Demo](https://asli-chile.github.io/carruseles/carousel-fullscreen/index.html)

![Fullscreen](docs/preview-fullscreen.png)

### Cards

[📁 `carousel-cards/`](carousel-cards/) · [Demo](https://asli-chile.github.io/carruseles/carousel-cards/index.html)

![Cards](docs/preview-cards.png)

### Skew / Accordion

[📁 `carousel-skew/`](carousel-skew/) · [Demo](https://asli-chile.github.io/carruseles/carousel-skew/index.html)

![Skew](docs/preview-skew.png)

### Stacked / Deck

[📁 `carousel-stacked/`](carousel-stacked/) · [Demo](https://asli-chile.github.io/carruseles/carousel-stacked/index.html)

![Stacked](docs/preview-stacked.png)

### Cinta (ticker, solo CSS)

[📁 `carousel-ticker/`](carousel-ticker/) · [Demo](https://asli-chile.github.io/carruseles/carousel-ticker/index.html)

![Ticker](docs/preview-ticker.png)

### Fade

[📁 `carousel-fade/`](carousel-fade/) · [Demo](https://asli-chile.github.io/carruseles/carousel-fade/index.html)

*(Sin captura en assets; ábrelo en la demo en vivo o en local.)*

---

## 📁 Estructura

```
/
├── index.html                 ← índice de todos los demos
├── carousel-fullscreen/
├── carousel-cards/
├── carousel-fade/
├── carousel-skew/
├── carousel-stacked/
├── carousel-ticker/           ← infinito con CSS, sin JS
└── docs/                      ← capturas para el README
```

---

## 🚀 Uso Rápido

### 1. Copia la carpeta del carrusel que necesitas

### 2. Incluye los archivos en tu proyecto
```html
<link rel="stylesheet" href="styles.css">
<script src="carousel.js"></script>
```

### 3. Agrega el HTML y inicializa
```html
<div class="asli-carousel" data-autoplay="5000">
  <div class="asli-carousel-track">
    <div class="asli-carousel-slide">
      <img src="imagen.jpg" alt="...">
      <div class="asli-carousel-overlay">
        <div class="asli-carousel-content">
          <h3>Título</h3>
          <p>Descripción</p>
        </div>
      </div>
    </div>
  </div>
  <button class="asli-carousel-btn prev">←</button>
  <button class="asli-carousel-btn next">→</button>
  <div class="asli-carousel-dots"></div>
</div>

<script>
  ASLIcarousel.init();
</script>
```

---

## ⚙️ Configuración

| Atributo | Valores | Descripción |
|----------|---------|-------------|
| `data-autoplay` | `0`, `3000`, `5000` | Ms entre slides (0 = off) |
| `data-per-view` | `2`, `3`, `4` | Cards visibles (solo cards) |
| `data-gap` | `10`, `20` | Espacio entre cards |

---

## 🎨 Imágenes Gratis

Usa imágenes de [Unsplash](https://unsplash.com) - son gratis y de alta calidad.
