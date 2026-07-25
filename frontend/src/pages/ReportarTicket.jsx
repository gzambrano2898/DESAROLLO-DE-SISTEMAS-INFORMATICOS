import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearTicket } from "../services/ticketService";
import { sanitizarTicket } from "../utils/sanitizar";

const formularioInicial = {
  titulo: "",
  descripcion: "",
  categoria: "",
  prioridad: "",
  estado: "Abierto",
};

function ReportarTicket() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState(formularioInicial);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setFormulario((formularioActual) => ({
      ...formularioActual,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    if (
      !formulario.titulo.trim() ||
      !formulario.descripcion.trim() ||
      !formulario.categoria ||
      !formulario.prioridad
    ) {
      return "Todos los campos son obligatorios.";
    }

    if (formulario.titulo.trim().length < 5) {
      return "El título debe contener al menos 5 caracteres.";
    }

    if (formulario.descripcion.trim().length < 10) {
      return "La descripción debe contener al menos 10 caracteres.";
    }

    return "";
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    setMensaje("");
    setError("");

    const errorValidacion = validarFormulario();

    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    const ticketLimpio = sanitizarTicket(formulario);

    try {
      setEnviando(true);

      await crearTicket(ticketLimpio);

      setFormulario(formularioInicial);
      setMensaje("El ticket fue registrado correctamente.");

      setTimeout(() => {
        navigate("/tickets");
      }, 1000);
    } catch (errorPeticion) {
      setError(errorPeticion.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="contenedor">
      <section className="encabezado-pagina">
        <p className="etiqueta">Nuevo incidente</p>
        <h1>Reportar incidente</h1>
        <p>
          Complete la información solicitada para registrar un nuevo ticket.
        </p>
      </section>

      <form className="formulario" onSubmit={manejarEnvio}>
        {mensaje && (
          <div className="alerta alerta--exito campo--completo">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="alerta alerta--error campo--completo">
            {error}
          </div>
        )}

        <div className="campo campo--completo">
          <label htmlFor="titulo">Título del incidente</label>

          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formulario.titulo}
            onChange={manejarCambio}
            maxLength="150"
            placeholder="Ejemplo: Equipo sin conexión a internet"
            required
          />
        </div>

        <div className="campo campo--completo">
          <label htmlFor="descripcion">Descripción</label>

          <textarea
            id="descripcion"
            name="descripcion"
            value={formulario.descripcion}
            onChange={manejarCambio}
            maxLength="1000"
            placeholder="Describa detalladamente el problema"
            rows="5"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoría</label>

          <select
            id="categoria"
            name="categoria"
            value={formulario.categoria}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="Red">Red</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
          </select>
        </div>

        <div className="campo">
          <label htmlFor="prioridad">Prioridad</label>

          <select
            id="prioridad"
            name="prioridad"
            value={formulario.prioridad}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione una prioridad</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <div className="acciones-formulario campo--completo">
          <button
            type="submit"
            className="boton boton--principal"
            disabled={enviando}
          >
            {enviando ? "Registrando..." : "Registrar ticket"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default ReportarTicket;