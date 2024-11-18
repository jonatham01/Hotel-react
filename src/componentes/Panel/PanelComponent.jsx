import React from 'react'
import { Link } from "react-router-dom";


export const PanelComponent = () => {
  return (
    <>
    <header className='top-menu'>
            <p className='web-name'>Hotel-manager</p>
            <div className="options-right">
                <p>Admin</p>
                <p>Sitio web</p>
                <div className='user'>
                    <p>Jonathan</p>
                    <p>Admin</p>
                </div>
            </div>
    </header>
    <div className="content">
        <header className="left-menu">
            <p className='on-left-menu'><Link className='no-underline' to="/">Panel</Link></p>
            <p ><Link className='no-underline' to="/tipocamas">Tipos de camas</Link></p>
            <p><Link className='no-underline' to="/camas">Camas</Link></p>
            <p>Habitaciones</p>
            <p ><Link className='no-underline' to="/tipohabitaciones">Tipos de habitaciones</Link></p>
        </header>
        <main>
            <div className="main-panel">
                <div className="box"><h1 >Modulo <br /> <Link className='no-underline' to="/tipohabitaciones">Tipos de habitaciones</Link></h1></div>
                <div className="box"><h1>Modulo <br /> <Link className='no-underline' to="/tipocamas">Tipos de camas</Link></h1></div>
                <div className="box"><h1>Modulo <br /><Link className='no-underline' to="/camas">Camas</Link></h1></div>
            </div>
        </main>
    </div>
    </>
  )
}
