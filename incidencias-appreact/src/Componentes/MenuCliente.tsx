import axios from "axios";
import { useEffect, useState } from "react";
import { TicketDTO } from "../DTO/TicketDTO";
import { Link, useNavigate } from "react-router-dom";
import { SidebarUser } from "./SideBarUser";

export const MenuCliente = () => {
  const [tickets, setState] = useState<Array<TicketDTO>>([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function TicketAll() {
      let token: string = localStorage.getItem("token") as string;
      let ip: string = "localhost";
      let puerto: number = 8080;
      let rutaBase: string = "http://" + ip + ":" + puerto + "/api/v2";
      let rutaTickets: string = rutaBase + "/tickets";
      const headers = {
        headers: { Authorization: token },
      };

      //let respuesta  = await axios.get( rutaTickets,headers);
      const getTickets = async () => {
        await axios
          .get(rutaTickets, headers)
          .then((response) => {
            setState(response.data);
          })
          .catch((error) => console.log(error));
      };
      getTickets();
    }
    TicketAll();
  }, []);

  const verSeguimientos = (id: number) => {
    navigate("/seguimientos/cliente/" + id);
  };

  return (
    <>
      <SidebarUser />
      <div className="container-fluid">
        <div className="title">
          <h3>Estas son tus incidencias:</h3>
        </div>
      </div>
      <div className="container">
        <div className="row options-table">
          <div className="col-2"></div>
          <div className="col-4">
            <select name="filter" id="filter" className="form-select">
              <option value="all">Ver todas las incidencias</option>
              <option value="open">Abiertas</option>
              <option value="closed">Cerradas</option>
            </select>
          </div>
          <div className="col-4">
            <a href="#" className="btn btn-outline-primary">
              Crear nueva incidencia
            </a>
          </div>
        </div>
        <div className="row">
          <table>
            <tr>
              <th>ID</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th></th>
            </tr>
            {
                tickets?.map((ticket:TicketDTO,indice)=>{
                    return(
                        <>
                        <tr key={indice}>
                            <td>{ticket.idTicket}</td>
                            <td>{ticket.estado}</td>
                            <td>{ticket.descripcion}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}><button onClick={()=>verSeguimientos(ticket.idTicket)}>Ver seguimientos de ticket {ticket.idTicket}</button></td>
                            
                        </tr>
                        </>
                    )
                })
                }
          </table>
        </div>
      </div>
    </>
  );
};

/**
<div class="container-fluid">
        <div class="title">
            <h3>Estas son tus incidencias:</h3>
        </div>
    </div>
    <div class="container">
        <div class="row options-table">
            <div class="col-2"></div>
            <div class="col-4">
                <select name="filter" id="filter" class="form-select">
                    <option value="all">Ver todas las incidencias</option>
                    <option value="open">Abiertas</option>
                    <option value="closed">Cerradas</option>
                </select>
            </div>
            <div class="col-4">
                <a href="#" class="btn btn-outline-primary">Crear nueva incidencia</a>
            </div>
        </div>
        <div class="row">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Estado</th>
                    <th>Descripción</th>
                    <th></th>
                </tr>
                <tr>
                    <td>21</td>
                    <td>Cerrada</td>
                    <td>Un problema con el escáner</td>
                    <td><a href="#">Ver seguimientos</a></td>
                </tr>
                <tr>
                    <td>20</td>
                    <td>Abierta</td>
                    <td>Un problema con el escáner</td>
                    <td><a href="#">Ver seguimientos</a></td>
                </tr>
                <tr>
                    <td>18</td>
                    <td>Cerrada</td>
                    <td>No funciona la pantalla</td>
                    <td><a href="#">Ver seguimientos</a></td>
                </tr>
            </table>
        </div>
    </div>

    --ANTERIOR--
    <div className="principal">
                <h3>Estos son tus tickets:</h3>
                <h5><Link to={"/cliente/nuevoticket"}>Guarda un nuevo ticket</Link></h5>
                <table className="tabla">
                    <tr className="title">
                        <td><b>ID</b></td>
                        <td><b>Estado</b></td>
                        <td><b>Descripción</b></td>
                    </tr>
                {
                tickets?.map((ticket:TicketDTO,indice)=>{
                    return(
                        <>
                        <tr key={indice}>
                            <td>{ticket.idTicket}</td>
                            <td>{ticket.estado}</td>
                            <td>{ticket.descripcion}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}><button onClick={()=>verSeguimientos(ticket.idTicket)}>Ver seguimientos de ticket {ticket.idTicket}</button></td>
                            
                        </tr>
                        </>
                    )
                })
                }
                </table>
                <br />
                <br />
            </div>
 */
