import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
//import {BedCategory} from './componentes/bedCategory/BedCategory'
import { BedComponent } from './componentes/Bed/BedComponent'
import {RoomCategory} from './componentes/RoomCategory/RoomCategory'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
