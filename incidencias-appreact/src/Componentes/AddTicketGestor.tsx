import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { ClienteDTO } from '../DTO/ClienteDTO';
import { Link, useNavigate } from 'react-router-dom';

export const NewTicketGestor = () => {

    const[clientes,setClientes] = useState<Array<ClienteDTO>>([])
    let navigate = useNavigate();

    useEffect(()=>{
        let token: string = localStorage.getItem("token") as string;
        const headers = {
            headers: { Authorization: token }
        };
        async function getClientes(){
            await axios.get("http://localhost:8080/api/v3/clientes", headers)
            .then(response => {
                setClientes(response.data);
            }).catch(error => console.log(error));
        }
        getClientes();
    },[])

    const toTimestamp = (strDate:string) => {
        const dt = new Date(strDate.toString()).getTime();
        return dt;
      }

    function guardarTicket(event: FormEvent){
        event.preventDefault();
        let token: string = localStorage.getItem("token") as string;
        let formulario = event.currentTarget as HTMLFormElement;
        console.log("entro")
        let inputDescripcion = formulario.descripcion as HTMLTextAreaElement;
        let inputFechaInicio = formulario.fechainicio as HTMLInputElement;
        let inputFechaFin = formulario.fechafin as HTMLInputElement;
        let inputCliente = formulario.client as HTMLSelectElement;

        let descripcion = inputDescripcion.value as string;
        let fechain = inputFechaInicio.value as string;
        let fechafi = inputFechaFin?.value as string;
        let cliente = inputCliente.value as string;

        let body = {
            "descripcion": descripcion,
            "estado": "Abierto",
            "fechaFin": toTimestamp(fechafi),
            "fechaInicio": toTimestamp(fechain),
            "cliente": cliente
        }
        console.log(body)
        const headers = {
            headers: { Authorization: token }
        };

        const axiospost = async (ruta:string) => {
            try{
                const {data} = await axios.post(ruta, body, headers);
                console.log("se ha guardado " + data);
                alert("se ha guardado el ticket!")
                navigate("/tickets")
            }catch(err){console.log(err)}
        }

        if(descripcion!="" && fechain!="" && cliente!=""){
            axiospost("http://localhost:8080/api/v3/tickets");
        }else{
            alert("Faltan campos obligatorios!")
        }

    }

    return(
        <>
            <div className='principal'>
                <form onSubmit={guardarTicket}>
                    <h3>Guarda un nuevo ticket</h3>
                    Descripción:<br/><textarea name="descripcion" placeholder='Descripción'/><br />
                    Fecha inicio:<input type="date" name='fechainicio' placeholder='Fecha inicio'/><br />
                    Fecha fin:<input type="date" name='fechafin' placeholder='Fecha fin' /><br />
                    Cliente:<select name="cliente" id="client">
                        {
                            clientes?.map((cliente:ClienteDTO,indice)=>{
                                return (
                                    <option key={indice} id={"optCliente"} value={cliente.idCliente}>{cliente.idCliente} {cliente.nombre}</option>
                                )
                            })
                        }
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