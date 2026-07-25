import DOMPurify from "dompurify";

export const sanitizarTexto = (valor) => {
  if (typeof valor !== "string") {
    return "";
  }

  return DOMPurify.sanitize(valor.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

export const sanitizarTicket = (ticket) => {
  return {
    titulo: sanitizarTexto(ticket.titulo),
    descripcion: sanitizarTexto(ticket.descripcion),
    categoria: sanitizarTexto(ticket.categoria),
    prioridad: sanitizarTexto(ticket.prioridad),
    estado: sanitizarTexto(ticket.estado),
  };
};