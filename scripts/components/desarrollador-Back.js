// Animación del texto “// Desarrollador Backend //”.
// Objetivo:
// - Ejecutar la animación solo para ese texto.
// - Al recargar la página: disparar de inmediato.
// - Repetir la animación cada 20s.
//
// Nota:
// - La animación CSS `tracking-in-contract` se define en animatiss.css.

const intervaloMs = 20_000;


function dispararAnimacionTracking(el) {
  if (!el) return;

  // Re-activar la animación:
  // 1) Quitamos la clase de animación.
  // 2) Forzamos reflow.
  // 3) Volvemos a agregar la clase.
  el.classList.remove('tracking-in-contract');
  // Forzar reflow para que el navegador acepte el reinicio
  void el.offsetHeight;
  el.classList.add('tracking-in-contract');

  // Restaurar estado visual después de la animación.
  setTimeout(() => {
    el.classList.remove('tracking-in-contract');
  }, 500);
}


function iniciar() {
  const el = document.getElementById('desarrollador-back');
  if (!el) return;

  // Ejecutar de inmediato al recargar (primer disparo sin espera)
  dispararAnimacionTracking(el);

  // Repetir cada 20s a partir de ese instante
  setInterval(() => {
    dispararAnimacionTracking(el);
  }, intervaloMs);

}

iniciar();

