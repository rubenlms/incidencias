import axios from 'axios';
import { FormEvent, useState } from 'react';
import { ClienteDTO } from '../DTO/ClienteDTO';
import { Link, useNavigate } from 'react-router-dom';

export const ClienteNewTicket = () => {

    let navigate = useNavigate();

    const toTimestamp = (strDate:string) => {
        const dt = new Date(strDate.toString()).getTime();
        return dt;
      }

    function guardarTicket(event: FormEvent){
        event.preventDefault();
        let token: string = localStorage.getItem("token") as string;
        let formulario = event.currentTarget as HTMLFormElement;

        let inputDescripcion = formulario.descripcion as HTMLInputElement;
        let inputFechaInicio = formulario.fechainicio as HTMLInputElement;
        let inputFechaFin = formulario.fechafin as HTMLInputElement;

        let descripcion = inputDescripcion.value as string;
        let fechain = inputFechaInicio.value as string;
        let fechafi = inputFechaFin?.value as string;

        let body = {
            "descripcion": descripcion,
            "estado": "Abierto",
            "fechaFin": toTimestamp(fechafi),
            "fechaInicio": toTimestamp(fechain)
        }

        const headers = {
            headers: { Authorization: token }
        };

        const axiospost = async (ruta:string) => {
            try{
                const {data} = await axios.post(ruta, body, headers);
                console.log("hola")
                console.log(data);
                alert("se ha guardado tu ticket")
                navigate("/menuUser");
            }catch(err){console.log(err)}
        }
        
        if(descripcion!="" && fechain!=""){
            axiospost("http://localhost:8080/api/v2/tickets");
        }else{
            alert("Faltan campos obligatorios!")
        }
        
    }

    return(
        <>
            <div className='principal'>
                <h3>Guarda tu ticket</h3>
                <form onSubmit={guardarTicket}>
                    <textarea name="descripcion" placeholder='Descripción'/><br />
                    <input type="date" name='fechainicio' placeholder='Fecha inicio'/><br />
                    <input type="date" name='fechafin' placeholder='Fecha fin' /><br />
                    <input type="submit" value={"Guardar"} />
                </form>
                <br />
                <Link to={"/menuUser"}>Volver</Link>
            </div>
        </>
    )

}