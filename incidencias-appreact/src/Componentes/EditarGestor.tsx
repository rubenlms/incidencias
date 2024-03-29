import { useState, useEffect, FormEvent } from 'react';
import axios from "axios";
import { GestorDTO } from '../DTO/GestorDTO';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Gestor } from '../Entities/Gestor';

export const EditarGestor = () => {

    const[gestor,setGestor] = useState<GestorDTO>();
    const {dni} = useParams();

    useEffect(()=>{
        async function getGestor(){
            let rutaGetGestor = "http://localhost:8080/api/v3/gestores/"+dni;
            let token:string = localStorage.getItem("token") as string;
            const headers = {
                headers: { Authorization: token }
            };
            let respuesta = await axios.get(rutaGetGestor, headers);
            setGestor(respuesta.data);
        }
        getGestor();
    })

    const editarGestor = (event:FormEvent) => {
        let token:string = localStorage.getItem("token") as string;
        event.preventDefault();
        let formulario = event.currentTarget as HTMLFormElement;

        let inputNombre = formulario.nombre as HTMLInputElement;
        let inputApellido = formulario.apellidos as HTMLInputElement;
        let inputDni = formulario.dni as HTMLInputElement;
        
        let nombre: string = inputNombre.value as string;
        let apellidos: string = inputApellido.value as string;
        let dni: string = inputDni.value as string;
        let idUser: number = gestor?.idUsuario as number;

        let headers = {
            headers: { Authorization: token }
        };
        
        let body:Gestor = {
            dni: dni,
            apellidos: apellidos,
            nombre: nombre,
            idUsuario: idUser
        }

        const axiosput = async(ruta:string)=>{
            try{
                const{data} = await axios.put(ruta, body, headers);
                console.log(data);
                alert("se ha editado!")
            }catch(er){
                console.log("fallo" + er);
            }
        }
        
        if(nombre!="" && apellidos!="" && dni!=""){
            axiosput('http://localhost:8080/api/v3/gestores/'+dni);
        }else{
            alert("Faltan campos obligatorios!")
        }
        
    }

    return(
        <>
        <div className='principal'>
        <h3>Vas a editar los datos de {gestor?.nombre} {gestor?.apellidos}</h3><br/>
        <form onSubmit={editarGestor}>
                <input type="text" id="dni" name="dni" placeholder="dni" defaultValue={gestor?.dni} disabled/><br/>
                <input type="text" id="nombre" name="nombre" placeholder="nombre" defaultValue={gestor?.nombre}/><br/>
                <input type="text" id="apellidos" name="apellidos" placeholder="apellidos" defaultValue={gestor?.apellidos}/><br/>
                <input type="password" name="password" placeholder="contraseña" hidden></input><br/>
                <input type="submit" value={"Guardar"} />
            </form>
            <Link to={"/gestores"}>Volver</Link>
        </div>
        </>
    )
}