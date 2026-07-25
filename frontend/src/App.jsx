import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ReportarTicket from "./pages/ReportarTicket";
import ListaTickets from "./pages/ListaTickets";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reportar" element={<ReportarTicket />} />
        <Route path="/tickets" element={<ListaTickets />} />
        <Route
          path="*"
          element={
            <main className="contenedor">
              <h1>Página no encontrada</h1>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;