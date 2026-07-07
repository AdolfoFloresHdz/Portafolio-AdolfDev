/*
  Componente JS: animación “paneo” del label de PHP.

  Objetivo:
  - Cada 10 segundos, alternar entre texto y una imagen (php.jpg)
  - Mantener el label existente en el index.

  Restricciones:
  - No crear componentes de UI adicionales.
  - El elemento se identifica por id="label-php".
*/

(() => {
  const label = document.getElementById('label-php');
  if (!label) return;

  // Imagen requerida por el enunciado
  const imgSrc = 'images/lenguajes/php.png';

  // Estado interno: false => muestra texto; true => muestra imagen
  let showImage = false;

  const textValue = 'PHP';

  // Temporización requerida
  const textVisibleMs = 4000;
  const logoVisibleMs = 4000;
  const transitionMs = 600;

  // Desplazamiento lateral para la sensación “tecnológica”
  const shiftPx = 14;

  // Utilidad: limpia y controla el contenido
  const setContentText = () => {
    label.textContent = textValue;
  };

  const setContentImage = () => {
    label.textContent = '';

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'PHP';

    // Evita que el logo afecte el layout
    img.loading = 'eager';

    label.appendChild(img);
  };

  // Animación: “Texto sale + Logo entra”
  const textToLogo = () => {
    // Salida del texto: desvanecimiento + desplazamiento + fragmentación sutil
    label.style.opacity = '0';
    label.style.transform = `translateX(${ -shiftPx }px)`;

    // Fragmentación visual: pequeñas variaciones de “glitch” controladas (sin exagerar)
    label.style.filter = 'saturate(1.05)';
    label.style.letterSpacing = '.16em';

    setTimeout(() => {
      // Entrada del logo: ocupar el mismo espacio
      setContentImage();

      // Entrada simultánea: logo aparece centrado y visible
      label.style.opacity = '1';
      label.style.transform = 'translateX(0)';
      label.style.filter = 'none';
      label.style.letterSpacing = '.08em';

      showImage = true;
    }, transitionMs);
  };

  // Animación inversa: “Logo sale + Texto entra”
  const logoToText = () => {
    // Salida del logo
    label.style.opacity = '0';
    label.style.transform = `translateX(${ shiftPx }px)`;

    // Fragmentación sutil
    label.style.filter = 'saturate(1.05)';

    setTimeout(() => {
      // Entrada del texto
      setContentText();

      // Entrada simultánea del texto
      label.style.opacity = '1';
      label.style.transform = 'translateX(0)';
      label.style.filter = 'none';

      showImage = false;
    }, transitionMs);
  };

  // Inicial: mostrar texto PHP
  setContentText();
  label.style.opacity = '1';
  label.style.transform = 'translateX(0)';

  // Bucle con temporización dinámica (sin 10s)
  const cycle = async () => {
    while (true) {
      // Texto visible
      await new Promise((r) => setTimeout(r, textVisibleMs));
      if (!showImage) textToLogo();

      // Logo visible
      await new Promise((r) => setTimeout(r, logoVisibleMs));
      if (showImage) logoToText();
    }
  };

  // Iniciar ciclo
  cycle();
})();


