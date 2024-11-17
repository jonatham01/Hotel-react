import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.jsx'
//import {BedCategory} from './componentes/bedCategory/BedCategory'
import { BedComponent } from './componentes/Bed/BedComponent'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BedComponent />
  </StrictMode>,
)
