/**
 * Campo de partículas fijo (no se desplaza con el scroll) detrás de toda
 * la página, para que la sensación de "espacio" del Hero continúe en el
 * resto de secciones en vez de quedarse encerrada ahí. Reutiliza el mismo
 * patrón/animación que usa el Hero (ver .hero-horizon-stars en
 * globals.css) para que ambos se sientan como el mismo fondo continuo.
 */
export default function GlobalStarfield() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <div
        className="hero-horizon-stars absolute opacity-60"
        style={{ inset: "-170px" }}
      />
    </div>
  );
}
