const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const procesarRespuesta = async (respuesta) => {
  let datos = null;

  try {
    datos = await respuesta.json();
  } catch {
    datos = null;
  }

  if (!respuesta.ok) {
    throw new Error(
      datos?.message ||
        datos?.mensaje ||
        "Error al comunicarse con el servidor"
    );
  }

  return datos;
};

export const obtenerTickets = async () => {
  const respuesta = await fetch(`${API_URL}/tickets`);
  return procesarRespuesta(respuesta);
};

export const obtenerTicketPorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/tickets/${id}`);
  return procesarRespuesta(respuesta);
};

export const crearTicket = async (ticket) => {
  const respuesta = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });

  return procesarRespuesta(respuesta);
};

export const actualizarTicket = async (id, ticket) => {
  const respuesta = await fetch(`${API_URL}/tickets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });

  return procesarRespuesta(respuesta);
};

export const eliminarTicket = async (id) => {
  const respuesta = await fetch(`${API_URL}/tickets/${id}`, {
    method: "DELETE",
  });

  return procesarRespuesta(respuesta);
};