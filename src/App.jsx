import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {BedComponent} from "./componentes/Bed/BedComponent";
import {RoomCategory} from "./componentes/RoomCategory/RoomCategory";
import {BedCategory} from "./componentes/bedCategory/BedCategory";
import { PanelComponent } from "./componentes/Panel/PanelComponent";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="" element={<PanelComponent />} />
        <Route path="/camas" element={<BedComponent />} />
        <Route path="/tipocamas" element={<BedCategory />} />
        <Route path="/tipohabitaciones" element={<RoomCategory />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />

      </Routes>
    </Router>
  );
}

export default App
