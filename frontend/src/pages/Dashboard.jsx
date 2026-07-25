import { useEffect, useState } from "react";
import TarjetaResumen from "../components/TarjetaResumen";
import { obtenerTickets } from "../services/ticketService";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarTickets = async () => {
      try {
        const respuesta = await obtenerTickets();

        const lista = Array.isArray(respuesta)
          ? respuesta
          : respuesta.tickets || respuesta.data || [];

        setTickets(lista);
      } catch (errorPeticion) {
        setError(errorPeticion.message);
      } finally {
        setCargando(false);
      }
    };

    cargarTickets();
  }, []);

  const abiertos = tickets.filter(
    (ticket) => ticket.estado === "Abierto"
  ).length;

  const enProgreso = tickets.filter(
    (ticket) => ticket.estado === "En Progreso"
  ).length;

  const cerrados = tickets.filter(
    (ticket) => ticket.estado === "Cerrado"
  ).length;

  return (
    <main className="contenedor">
      <section className="encabezado-pagina">
        <p className="etiqueta">Sistema de soporte técnico</p>
        <h1>Panel de control</h1>
        <p>
          Consulte el resumen general de los incidentes registrados en el
          sistema Help Desk.
        </p>
      </section>

      {error && <div className="alerta alerta--error">{error}</div>}

      {cargando ? (
        <section className="panel">
          <p>Cargando información...</p>
        </section>
      ) : (
        <>
          <section className="tarjetas">
            <TarjetaResumen
              titulo="Tickets abiertos"
              cantidad={abiertos}
              clase="tarjeta--abierto"
            />

            <TarjetaResumen
              titulo="En progreso"
              cantidad={enProgreso}
              clase="tarjeta--progreso"
            />

            <TarjetaResumen
              titulo="Tickets cerrados"
              cantidad={cerrados}
              clase="tarjeta--cerrado"
            />
          </section>

          <section className="panel">
            <h2>Resumen general</h2>
            <p>Total de tickets registrados: {tickets.length}</p>
          </section>
        </>
      )}
    </main>
  );
}

export default Dashboard;