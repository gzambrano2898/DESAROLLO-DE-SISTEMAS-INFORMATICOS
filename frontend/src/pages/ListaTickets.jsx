import { useEffect, useState } from "react";
import TicketFila from "../components/TicketFila";
import {
  obtenerTickets,
  actualizarTicket,
  eliminarTicket,
} from "../services/ticketService";

function ListaTickets() {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarTickets = async () => {
    try {
      setCargando(true);
      setError("");

      const respuesta = await obtenerTickets();

      console.log("Respuesta de la API:", respuesta);

      const lista = Array.isArray(respuesta)
        ? respuesta
        : respuesta.tickets || respuesta.data || [];

      setTickets(lista);
    } catch (errorPeticion) {
      console.error(errorPeticion);
      setError(errorPeticion.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  const cambiarEstado = async (ticket) => {
    const estados = ["Abierto", "En Progreso", "Cerrado"];

    const nuevoEstado = window.prompt(
      "Ingrese el nuevo estado: Abierto, En Progreso o Cerrado",
      ticket.estado
    );

    if (!nuevoEstado) {
      return;
    }

    const estadoValido = estados.find(
      (estado) =>
        estado.toLowerCase() === nuevoEstado.trim().toLowerCase()
    );

    if (!estadoValido) {
      setError("El estado ingresado no es válido.");
      return;
    }

    try {
      setError("");
      setMensaje("");

      await actualizarTicket(ticket.id, {
        titulo: ticket.titulo,
        descripcion: ticket.descripcion,
        categoria: ticket.categoria,
        prioridad: ticket.prioridad,
        estado: estadoValido,
      });

      setTickets((ticketsActuales) =>
        ticketsActuales.map((item) =>
          item.id === ticket.id
            ? { ...item, estado: estadoValido }
            : item
        )
      );

      setMensaje("Estado actualizado correctamente.");
    } catch (errorPeticion) {
      setError(errorPeticion.message);
    }
  };

  const confirmarEliminacion = async (id) => {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este ticket?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setError("");
      setMensaje("");

      await eliminarTicket(id);

      setTickets((ticketsActuales) =>
        ticketsActuales.filter((ticket) => ticket.id !== id)
      );

      setMensaje("Ticket eliminado correctamente.");
    } catch (errorPeticion) {
      setError(errorPeticion.message);
    }
  };

  return (
    <main className="contenedor">
      <section className="encabezado-pagina">
        <p className="etiqueta">Gestión de incidentes</p>
        <h1>Listado de tickets</h1>
        <p>
          Revise los incidentes registrados y consulte su prioridad y estado.
        </p>
      </section>

      {mensaje && (
        <div className="alerta alerta--exito">{mensaje}</div>
      )}

      {error && (
        <div className="alerta alerta--error">{error}</div>
      )}

      {cargando ? (
        <section className="panel">
          <p>Cargando tickets...</p>
        </section>
      ) : (
        <section className="tabla-contenedor">
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <TicketFila
                    key={ticket.id}
                    ticket={ticket}
                    onEditar={cambiarEstado}
                    onEliminar={confirmarEliminacion}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="tabla__vacia">
                    No existen tickets registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}

export default ListaTickets;