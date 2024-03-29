import axios from "axios";
import { SeguimientoDTO } from '../DTO/SeguimientoDTO';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, FormEvent } from "react";
import { GestorDTO } from '../DTO/GestorDTO';
import { get } from "https";
import { TicketDTO } from '../DTO/TicketDTO';
import { Seguimiento } from "../Entities/Seguimiento";

export const AddSeguimientoComponent = () => {
    let token: string = localStorage.getItem("token") as string;
    const [gestores, setState] = useState<Array<GestorDTO>>([]);
    const [ticket, setTicket] = useState<TicketDTO>();
    let navigate = useNavigate();
    const { idTicket } = useParams();
    const headers = {
        headers: { Authorization: token }
    };

    const toTimestamp = (strDate:string) => {
        const dt = new Date(strDate.toString()).getTime();
        return dt;
    }

    useEffect(() => {
        async function getGestores() {
            await axios.get("http://localhost:8080/api/v3/gestores", headers)
                .then(response => {
                    setState(response.data);
                }).catch(error => console.log(error));
        }

        async function getTicket() {
            await axios.get("http://localhost:8080/api/v3/tickets/" + idTicket, headers)
                .then(response => {
                    setTicket(response.data);
                }).catch(error => console.log(error));
        }

        getGestores();
        getTicket();
    }, [])

    function addSeguimientoTicket (event: FormEvent) {
        event.preventDefault();
        let formulario = event.currentTarget as HTMLFormElement;

        let comentarioInput = formulario.inputcomentario as HTMLFormElement;
        let fechaInput = formulario.inputfecha as HTMLFormElement;
        let optGestor = formulario.ges as HTMLOptionElement;

        let coment = comentarioInput.value as string;
        let date = fechaInput.value as string;
        let opt = optGestor.value as string;
     
        const body:Seguimiento = {
            comentario : coment,
            fecha : toTimestamp(date),
            gestor : opt,
            idTicket : Number(idTicket)
        }
        const headers = {
            headers: { Authorization: token }
        };
        
        const postSeguimiento = async(ruta:string)=>{
            
            try{
                const{data} = await axios.post(ruta, body, headers);
                alert("se ha guardado correctamente");
                navigate("/tickets");
                console.log("Se ha guardado " + data);
            }catch(error){ console.log("error "+error)}
            
        }
        
        if(coment!="" && date!="" && opt!=""){
            postSeguimiento("http://localhost:8080/api/v3/seguimientos")
        }else{
            alert("Faltan campos obligatorios!")
        }
        
    }

    return (
        <>
            <div className="principal">
                <h3>Añadir seguimiento a Ticket con ID {ticket?.idTicket}</h3>
                <form onSubmit={addSeguimientoTicket}>
                    <input type="text" hidden />
                    Comentario<input type="text" name="inputcomentario"  /><br />
                    Fecha:<input type="date" name="inputfecha" /><br />
                    Gestor:<select name="gestor" id="ges">
                        {
                            gestores?.map((gestor:GestorDTO,indice)=>{
                                return(
                                    <option key={indice} id={"optGestor"} value={gestor.dni}>{gestor.nombre}</option>
                                )
                            }) 
                        }
                    </select><br/><br/>
                    <input type="submit" value="Guardar" /><br />
                </form>
                <br />
                <Link to={"/tickets"}>Volver</Link>
            </div>
        </>
    )

}