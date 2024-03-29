import { useState, useEffect, FormEvent } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Gestor } from '../Entities/Gestor';
import { ClienteDTO } from '../DTO/ClienteDTO';
import { Cliente } from '../Entities/Cliente';

export const EditarCliente = () => {

    const[cliente,setCliente] = useState<ClienteDTO>();
    const {dni} = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        async function getCliente(){
            let rutaGetGestor = "http://localhost:8080/api/v3/clientes/"+dni;
            let token:string = localStorage.getItem("token") as string;
            const headers = {
                headers: { Authorization: token }
            };
            let respuesta = await axios.get(rutaGetGestor, headers);
            setCliente(respuesta.data);
        }
        getCliente();
    })

    const editarCliente = (event:FormEvent) => {
        let token:string = localStorage.getItem("token") as string;
        event.preventDefault();
        let formulario = event.currentTarget as HTMLFormElement;

        let inputNombre = formulario.nombre as HTMLInputElement;
        let inputDireccion = formulario.direccion as HTMLInputElement;
        let inputDni = formulario.dni as HTMLInputElement;
        let inputTelefono = formulario.telefono as HTMLInputElement;
        
        let nombre: string = inputNombre.value as string;
        let dni: string = inputDni.value as string;
        let direccion:string = inputDireccion.value as string;
        let telefono:string = inputTelefono.value as string;
        let idUser: number = cliente?.idUsuario as number;

        let headers = {
            headers: { Authorization: token }
        };
        
        let body:Cliente = {
            idCliente: dni,
            direccion: direccion,
            nombre: nombre,
            telefono: telefono,
            idUsuario: idUser
        }

        const axiosput = async(ruta:string)=>{
            try{
                const{data} = await axios.put(ruta, body, headers);
                console.log(data);
                alert("se ha modificado correctamente");
                navigate("/clientes");
            }catch(er){
                console.log("fallo" + er);
            }
        }

        if(dni!="" && direccion!="" && nombre!=""){
            axiosput('http://localhost:8080/api/v3/clientes/'+dni);
        }else{
            alert("Faltan campos obligatorios!")
        }
        
    }

    return(
        <>
        <div className='principal'>
        <h3>Vas a editar los datos de {cliente?.nombre}</h3><br/>
        <form onSubmit={editarCliente}>
                <input type="text" id="dni" name="dni" placeholder="dni" defaultValue={cliente?.idCliente} disabled/><br/>
                <input type="text" id="nombre" name="nombre" placeholder="nombre" defaultValue={cliente?.nombre}/><br/>
                <input type="text" id="direccion" name="direccion" placeholder="direccion" defaultValue={cliente?.direccion} /><br/>
                <input type="number" name="telefono" placeholder="telefono" defaultValue={cliente?.telefono}></input><br/>
                <input type="submit" value={"Guardar"} />
            </form>
            <Link to={"/clientes"}>Volver</Link>
        </div>
        </>
    )
}