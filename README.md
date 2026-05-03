# 🎠 ASLI Carousels - Librería de Carruseles

Colección de carruseles reutilizables para tus proyectos.

## Vista previa

Para que la página principal del repositorio en GitHub se vea con una imagen grande arriba del README:

1. Abre `npm run dev`, entra al índice de demos y haz una **captura de pantalla** o un **GIF** (ShareX, ScreenToGif, etc.).
2. Guarda el archivo como `docs/preview.png` (o `.gif`) en este repo.
3. Descomenta o añade en este README, justo debajo de este bloque, una línea como:

```markdown
![Vista previa de los carruseles](docs/preview.png)
```

**Tarjeta al compartir el enlace** (Twitter, Slack, LinkedIn): en GitHub ve a **Settings → General → Social preview** del repo [asli-chile/carruseles](https://github.com/asli-chile/carruseles) y sube una imagen horizontal (~1280×640 px recomendado). Esa imagen no sustituye el README, pero hace que el enlace del repo luzca bien fuera de GitHub.

---

## 📁 Estructura

```
/
├── carousel-fullscreen/   ← Fullscreen con overlay oscuro
├── carousel-cards/        ← Cards con swipe (múltiples visibles)
└── carousel-fade/        ← Transición suave con fade
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