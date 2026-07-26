import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <span className="navbar__icono">HD</span>
        <h2>Help Desk</h2>
      </div>

      <nav className="navbar__enlaces">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar__enlace activo" : "navbar__enlace"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/reportar"
          className={({ isActive }) =>
            isActive ? "navbar__enlace activo" : "navbar__enlace"
          }
        >
          Reportar incidente
        </NavLink>

        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            isActive ? "navbar__enlace activo" : "navbar__enlace"
          }
        >
          Tickets
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;