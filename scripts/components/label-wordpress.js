/*
  Componente JS: animación “paneo” del label de WORDPRESS.

  Objetivo:
  - Cada 10 segundos alternar entre texto “WORDPRESS” e imagen.
  - Mantener el mismo elemento (no agrega contenedores fuera del label).
*/

(() => {
  const label = document.getElementById('label-wordpress');
  if (!label) return;

  // Imagen (logo) para la transformación
  const imgSrc = 'images/lenguajes/wordpress.png';
  const textValue = 'WORDPRESS';
  let showImage = false;

  // Temporización requerida
  const textVisibleMs = 4000;
  const transitionMs = 600;
  const logoVisibleMs = 4000;

  // Desplazamiento lateral (sensación tecnológica)
  const shiftPx = 14;

  // Construcción del contenido
  const setContentText = () => {
    label.textContent = textValue;
  };

  const setContentImage = () => {
    label.textContent = '';

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'WORDPRESS';
    img.loading = 'eager';

    label.appendChild(img);
  };

  // Texto sale + Logo entra
  const textToLogo = () => {
    label.style.opacity = '0';
    label.style.transform = `translateX(${ -shiftPx }px)`;

    // Fragmentación/sensación fluida (sutil)
    label.style.filter = 'saturate(1.05)';
    label.style.letterSpacing = '.16em';

    setTimeout(() => {
      setContentImage();

      label.style.opacity = '1';
      label.style.transform = 'translateX(0)';
      label.style.filter = 'none';
      label.style.letterSpacing = '.08em';

      showImage = true;
    }, transitionMs);
  };

  // Logo sale + Texto entra
  const logoToText = () => {
    label.style.opacity = '0';
    label.style.transform = `translateX(${ shiftPx }px)`;

    label.style.filter = 'saturate(1.05)';

    setTimeout(() => {
      setContentText();

      label.style.opacity = '1';
      label.style.transform = 'translateX(0)';
      label.style.filter = 'none';

      showImage = false;
    }, transitionMs);
  };

  // Inicial: texto
  setContentText();
  label.style.opacity = '1';
  label.style.transform = 'translateX(0)';

  // Ciclo infinito con temporización dinámica (sin 10s)
  const cycle = async () => {
    while (true) {
      await new Promise((r) => setTimeout(r, textVisibleMs));
      if (!showImage) textToLogo();

      await new Promise((r) => setTimeout(r, logoVisibleMs));
      if (showImage) logoToText();
    }
  };

  cycle();
})();


