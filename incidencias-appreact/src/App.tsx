import React from 'react';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import { Login } from './Componentes/Login';
import { TicketGestor } from './Componentes/TicketComponent';
import { Gestores } from './Componentes/GestorAll';
import { MenuAdmin } from './Componentes/MenuAdmin';
import { Cliente } from './Componentes/ClienteComponent';
import { Seguimiento } from './Componentes/SeguimientoComponente';
import { AddSeguimientoComponent } from './Componentes/AddSeguimientoComponent';
import { RequireAuth } from './Componentes/RequiereAuth';
import { SeguimientosGestores } from './Componentes/SeguimientosGestor';
import { MenuCliente } from './Componentes/MenuCliente';
import { SeguimientoCliente } from './Componentes/SeguimientoCliente';
import { EditarGestor } from './Componentes/EditarGestor';
import { Register } from './Componentes/RegistroComponent';
import { ClienteNewTicket } from './Componentes/AddTicket';
import { EditarCliente } from './Componentes/EditarCliente';
import { NewTicketGestor } from './Componentes/AddTicketGestor';
import { EditTicketGestor } from './Componentes/EditarTicket';
import { ClienteAddbyGestor } from './Componentes/AddClienteFromGestor';
import { RequireAuthCliente } from './Componentes/RequiereAuthCliente';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path="/menu" element={<RequireAuthCliente><MenuCliente/></RequireAuthCliente>}/>
        <Route path='/cliente/nuevoticket' element={<RequireAuthCliente><ClienteNewTicket/></RequireAuthCliente>}/>
        <Route path="/seguimientos/cliente/:dni" element={<RequireAuthCliente><SeguimientoCliente/></RequireAuthCliente>}/>
        <Route path="/tickets" element={<RequireAuth><TicketGestor /></RequireAuth>} />
        <Route path="/gestores" element={<RequireAuth><Gestores/></RequireAuth>}/>
        <Route path="/gestores/edit/:dni" element={<RequireAuth><EditarGestor/></RequireAuth>}/>
        <Route path="/clientes" element={<RequireAuth><Cliente/></RequireAuth>}/>
        <Route path="/admin" element={<RequireAuth><MenuAdmin/></RequireAuth>}/>
        <Route path="/seguimientos/:id" element={<RequireAuth><Seguimiento/></RequireAuth>}/>
        <Route path="/seguimientos/gestores/:dni" element={<RequireAuth><SeguimientosGestores/></RequireAuth>}/>
        <Route path="/addSeguimiento/:idTicket" element={<RequireAuth><AddSeguimientoComponent/></RequireAuth>}/>
        <Route path='/editCliente/:dni' element={<RequireAuth><EditarCliente/></RequireAuth>}/>
        <Route path='/gestores/newticket' element={<RequireAuth><NewTicketGestor/></RequireAuth>}/>
        <Route path='/tickets/editar/:id' element={<RequireAuth><EditTicketGestor/></RequireAuth>}/>
        <Route path='/clientes/add' element={<RequireAuth><ClienteAddbyGestor/></RequireAuth>}/>
      </Routes>
    </BrowserRouter>
  );
}

function Navbar() {
  // visible on every page
  return (
    <nav>
      <Link to="/"> Volver a login </Link> &nbsp;
    </nav>
  );
}

export default App;
