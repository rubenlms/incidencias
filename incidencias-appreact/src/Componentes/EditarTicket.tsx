import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { ClienteDTO } from '../DTO/ClienteDTO';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TicketDTO } from '../DTO/TicketDTO';

export const EditTicketGestor = () => {

    let navigate = useNavigate();
    const[ticket,setTicket] = useState<TicketDTO>();
    const{id} = useParams();

    useEffect(()=>{
        let token: string = localStorage.getItem("token") as string;
        const headers = {
            headers: { Authorization: token }
        };
        async function getTicket(){
            await axios.get("http://localhost:8080/api/v3/tickets/"+id, headers)
            .then(response => {
                setTicket(response.data);
            }).catch(error => console.log(error));
        }
        getTicket();
    },[])

    const toTimestamp = (strDate:string) => {
        const dt = new Date(strDate.toString()).getTime();
        return dt / 1000;
    }

    const toDateString = (date:number) => {
        const fecha = new Date(date);
        return fecha.toDateString();
    }

    function editarTicket(event: FormEvent){
        event.preventDefault();
        let token: string = localStorage.getItem("token") as string;
        let formulario = event.currentTarget as HTMLFormElement;

        let inputDescripcion = formulario.descripcion as HTMLTextAreaElement;
        let inputFechaInicio = formulario.fechainicio as HTMLInputElement;
        let inputFechaFin = formulario.fechafin as HTMLInputElement;
        let inputCliente = formulario.client as HTMLInputElement;
        let optEstado = formulario.estado as HTMLOptionElement;

        let descripcion = inputDescripcion.value as string;
        let fechain = inputFechaInicio.value as string;
        let fechafi = inputFechaFin?.value as string;
        let cliente = inputCliente.value as string;
        let estado = optEstado.value as string;

        let body = {
            "descripcion": descripcion,
            "estado": estado,
            "fechaFin": toTimestamp(fechafi),
            "fechaInicio": toTimestamp(fechain),
            "cliente": cliente
        }

        const headers = {
            headers: { Authorization: token }
        };

        const axiosput = async (ruta:string) => {
            try{
                const {data} = await axios.put(ruta+"/"+id, body, headers);
                console.log("se ha guardado " + data);
                alert("se ha actualizado el ticket!")
                navigate("/tickets")
            }catch(err){console.log(err)}
        }

        if(descripcion!="" && estado!="" && fechain!="" && cliente!=""){
            axiosput("http://localhost:8080/api/v3/tickets");
        }else{
            alert("Faltan campos obligatorios!")
        }
    }

    return(
        <>
            <div className='principal'>
                
                <form onSubmit={editarTicket}>
                    <h3>Edita el ticket {ticket?.idTicket}</h3>
                    Descripción:<br/><textarea name="descripcion" placeholder='Descripción' defaultValue={ticket?.descripcion}/><br />
                    Fecha inicio:<input type="date" name='fechainicio' placeholder='Fecha inicio' defaultValue={ticket?.fechaInicio}/><br />
                    Fecha fin:<input type="date" name='fechafin' placeholder='Fecha fin' defaultValue={ticket?.fechaFin} /><br />
                    Cliente: <input type="text" name="client" defaultValue={ticket?.cliente} disabled/><br />
                    <label>El estado actual es {ticket?.estado}</label><br />
                    <select name="estado" id="estado">
                        <option id='1' value="Abierto">Abierto</option>
                        <option id='2' value="Pendiente">Pendiente</option>
                        <option id='3' value="Cerrado">Cerrado</option>
                    </select>
                    <br />
                    <br />
                    <input type="submit" value={"Guardar"} />
                </form>
                <br />
                <br />
                <Link to={"/tickets"}>Volver</Link>
                
            </div>
        </>
    )

}