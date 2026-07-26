function TicketFila({ ticket, onEditar, onEliminar }) {
  const prioridad = ticket.prioridad?.toLowerCase() || "baja";

  return (
    <tr>
      <td>#{ticket.id}</td>
      <td>{ticket.titulo}</td>
      <td>{ticket.categoria}</td>

      <td>
        <span className={`insignia insignia--${prioridad}`}>
          {ticket.prioridad}
        </span>
      </td>

      <td>{ticket.estado}</td>

      <td>
        <button
          type="button"
          className="boton-tabla"
          onClick={() => onEditar(ticket)}
        >
          Cambiar estado
        </button>

        <button
          type="button"
          className="boton-tabla boton-tabla--eliminar"
          onClick={() => onEliminar(ticket.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default TicketFila;