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
  const imgSrc = 'images/lenguajes/PHP-Dark.svg';

  // Estado interno: false => muestra texto; true => muestra imagen
  let showImage = false;

  const textValue = 'PHP';

  // Duraciones (según la transición pedida)
  // 1) Mostrar texto 10s (estático)
  // 2) Ejecutar blur-out-contract y, al terminar, mostrar imagen
  // 3) Mostrar imagen 10s (estática)
  // 4) Ejecutar blur-out-contract y, al terminar, volver a texto
  const staticTextMs = 10000;
  const staticLogoMs = 10000;

  // Duración exacta de la animación CSS blur-out-contract (0.4s)
  const blurDurationMs = 100;


  // Utilidad: limpia y controla el contenido
  const setContentText = () => {
    label.textContent = textValue;
  };

  const setContentImage = () => {
    label.textContent = '';

    // Crear un enlace invisible (solo navegación al tocar/click en la imagen)
    const link = document.createElement('a');
    link.href = 'https://skillicons.dev/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'PHP';
    img.loading = 'eager';

    link.appendChild(img);
    label.appendChild(link);
  };

  // Cambio “texto -> imagen” con animación blur-out-contract (AnimatiSS)
  const textToLogo = () => {
    // Ejecuta animación sobre el label antes del swap
    label.classList.remove('blur-out-contract');
    // Fuerza reflow para reiniciar la animación
    void label.offsetWidth;
    label.classList.add('blur-out-contract');

    // Al terminar la animación, se realiza el cambio de contenido
    setTimeout(() => {
      setContentImage();
      showImage = true;
    }, 400);
  };

  // Cambio inverso “imagen -> texto” con animación blur-out-contract (AnimatiSS)
  const logoToText = () => {
    label.classList.remove('blur-out-contract');
    void label.offsetWidth;
    label.classList.add('blur-out-contract');

    setTimeout(() => {
      setContentText();
      showImage = false;
    }, 400);
  };

  // Inicial: mostrar texto PHP (sin estilos inline, solo contenido)
  setContentText();

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Reproduce la animación, ejecuta el swap al terminar, y LIMPIA la clase
  const playTransition = (swapFn) => new Promise((resolve) => {
    const onEnd = () => {
      label.removeEventListener('animationend', onEnd);
      swapFn();

      // Clave: limpiar la clase para que no se “quede” el elemento en el estado final
      label.classList.remove('blur-out-contract');
      resolve();
    };

    label.addEventListener('animationend', onEnd);

    label.classList.remove('blur-out-contract');
    void label.offsetWidth; // fuerza reflow para reiniciar animación
    label.classList.add('blur-out-contract');
  });

  const loop = async () => {
    setContentText();
    await wait(staticTextMs); // texto estático 10s

    await playTransition(setContentImage); // anima y cambia a imagen

    await wait(staticLogoMs); // imagen estática 10s

    await playTransition(setContentText); // anima y regresa a texto

    loop(); // repite el ciclo
  };

  setContentText();
  loop();
})();
