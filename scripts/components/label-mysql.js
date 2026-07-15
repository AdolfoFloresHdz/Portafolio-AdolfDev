/*
  Componente JS: animación “paneo” del label de MySQL.

  Objetivo:
  - Alternar entre texto “MYSQL” e imagen (MySQL-Dark.svg).
  - Aplicar la misma lógica robusta que se usó en PHP/PYTHON/FASTAPI/JWT.

  Requisito:
  - El elemento existe en el HTML con id="label-mysql".
*/

(() => {
  const label = document.getElementById('label-mysql');
  if (!label) return;

  const imgSrc = 'images/lenguajes/MySQL-Dark.svg';
  const textValue = 'MYSQL';

  const staticTextMs = 10000;
  const staticLogoMs = 10000;

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
    img.alt = 'MYSQL';
    img.loading = 'eager';

    link.appendChild(img);
    label.appendChild(link);
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Reproduce la animación, ejecuta el swap al terminar, y LIMPIA la clase
  const playTransition = (swapFn) =>
    new Promise((resolve) => {
      const onEnd = () => {
        label.removeEventListener('animationend', onEnd);
        swapFn();
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
    await wait(staticTextMs);

    await playTransition(setContentImage);

    await wait(staticLogoMs);

    await playTransition(setContentText);

    loop();
  };

  setContentText();
  loop();
})();

