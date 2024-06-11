import axios from "axios";
import { FormEvent, useEffect, useState } from "react"
import { Ticket } from "../Entities/Ticket";
import { TicketDTO } from '../DTO/TicketDTO';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarAdmin } from "./SideBarAdmin";

export const TicketGestor = () => {

    const[tickets,setState] = useState<Array<TicketDTO>>([]);
    const[ticket,setTicket] = useState<TicketDTO>();
    let navigate = useNavigate();

    useEffect(() => {
        async function TicketAll(){
            let token:string = localStorage.getItem("token") as string;
            let ip: string = "localhost";
            let puerto: number = 8080;
            let rutaBase: string ="http://" + ip + ":" + puerto + "/api/v3";
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
        navigate("/seguimientos/"+id);
    }

    const addSeguimiento = (id:number) => {
        navigate("/addSeguimiento/"+id);
    }

    const editTicket = (id:number) => {
        navigate("/tickets/editar/"+id);
    }

    function getSingleTicket(event: FormEvent){
        event.preventDefault();
        let token: string = localStorage.getItem("token") as string;
        const headers = {
            headers: { Authorization: token }
        };
        let formulario = event.currentTarget as HTMLFormElement;

        let inputFind = formulario.idfind as HTMLInputElement;
        let idToFind = inputFind.value as string;
        let idT = Number(idToFind);
        alert(idT)
        const axiosfind = async (ruta:string) => {
            try{
                const {data} = await axios.get(ruta, headers);
                console.log(data)
                if(data!=null){
                    //setTicket(data);
                    //setState(data);
                }
            }catch(err){console.log(err)}
        }

        if(idT>0){
            alert("entro")
            axiosfind("http://localhost:8080/api/v3/tickets/"+idT)
        }
    }

    const deleteTicket = async (id:number) => {
        let ruta = "http://localhost:8080/api/v3/tickets/"+id;
        let token:string = localStorage.getItem("token") as string;
        const headers = {
            headers: { Authorization: token }
        };
        try{
            await axios.delete(ruta, headers);
            //navigate("/tickets")
            setState([...tickets]);
            alert("se ha borrado " + id)
        }catch(err){console.log(err)}
        
    }

    return (
        <>
            <SidebarAdmin/>
            <div className="principal">
                <Link to={'/gestores/newticket'}>Crear ticket</Link>
                
                <form onSubmit={getSingleTicket} hidden>
                    <input type="number" id="idfind" />
                    <input type="submit" value={"Consultar"} />
                </form>
                <table className="tabla">
                    <tr className="title">
                        <td><b>ID</b></td>
                        <td><b>Estado</b></td>
                        <td><b>Descripción</b></td>
                        <td><b>Cliente</b></td>
                    </tr>
                {
                tickets?.map((ticket:TicketDTO,indice)=>{
                    //console.log(JSON.stringify(tickets));
                    return(
                        <>
                        <tr key={indice}>
                            <td>{ticket.idTicket}</td>
                            <td>{ticket.estado}</td>
                            <td>{ticket.descripcion}</td>
                            <td>{ticket.cliente}</td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <button className="btn btn-outline-dark option-btt" onClick={()=>verSeguimientos(ticket.idTicket)}>Ver seguimientos de ticket {ticket.idTicket}</button>   
                                <button className="btn btn-outline-dark option-btt" onClick={()=>addSeguimiento(ticket.idTicket)}>Añadir seguimiento</button>  
                                <button className="btn btn-outline-dark option-btt" onClick={()=>deleteTicket(ticket.idTicket)}>Eliminar</button>  
                                <button className="btn btn-outline-dark option-btt" onClick={()=>editTicket(ticket.idTicket)}>Editar</button></td>
                        </tr>
                        </>
                    )
                })
                }
                </table>
                <br />
                <br />
                <Link to="/menuAdmin">Volver</Link>
            </div>
        </>
        
    )

}

