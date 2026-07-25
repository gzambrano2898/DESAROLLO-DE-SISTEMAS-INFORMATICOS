function TarjetaResumen({ titulo, cantidad, clase }) {
  return (
    <article className={`tarjeta ${clase}`}>
      <p className="tarjeta__titulo">{titulo}</p>
      <strong className="tarjeta__cantidad">{cantidad}</strong>
    </article>
  );
}

export default TarjetaResumen;