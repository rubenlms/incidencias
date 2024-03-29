import axios from "axios";
import { useEffect, useState } from "react";
import { TicketDTO } from "../DTO/TicketDTO";
import { Link, useNavigate } from 'react-router-dom';

export const MenuCliente = () => {

    const[tickets,setState] = useState<Array<TicketDTO>>([]);
    let navigate = useNavigate();

    useEffect(() => {
        async function TicketAll(){
            let token:string = localStorage.getItem("token") as string;
            let ip: string = "localhost";
            let puerto: number = 8080;
            let rutaBase: string ="http://" + ip + ":" + puerto + "/api/v2";
            let rutaTickets:string = rutaBase + "/tickets";
            const headers = {
                headers: { Authorization: token }
                };

            //let respuesta  = await axios.get( rutaTickets,headers);
            const getTickets = async () => {
                await axios.get(rutaTickets,headers)
                .then(response => {
                    setState(response.data);
                }).catch(error => console.log(error));
            }
            getTickets();
        }
        TicketAll();
    },[])

    const verSeguimientos = (id:number) => {
        navigate("/seguimientos/cliente/"+id);
    }

    return(
        <>
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
            </>
    )
}