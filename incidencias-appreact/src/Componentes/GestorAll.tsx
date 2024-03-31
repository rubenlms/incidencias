import axios from "axios";
import { useEffect, useState, FormEvent } from "react";
import { GestorDTO } from '../DTO/GestorDTO';
import { Gestor } from '../Entities/Gestor';
import { Link, useNavigate } from 'react-router-dom';
import { UsuarioDTO } from "../DTO/UsuarioDTOSave";
import { GestorSave } from "../DTO/GestorSave";
import { SidebarAdmin } from "./SideBarAdmin";

export const Gestores = () => {

    const[gestores,setState] = useState<Array<GestorDTO>>([]);
    const[usuarioDTO,setUsuario] = useState<UsuarioDTO>();
    let navigate = useNavigate();
    let token:string = localStorage.getItem("token") as string;
    let ip: string = "localhost";
    let puerto: number = 8080;
    let rutaBase: string ="http://" + ip + ":" + puerto + "/api/v3";

    useEffect(()=>{
        async function gestorAll(){
            let rutaGestores:string = rutaBase + "/gestores";
            const headers = {
                headers: { Authorization: token }
                };
            let respuesta = await axios.get(rutaGestores, headers);
            setState(respuesta.data);
        }
        gestorAll();
    },[])
    
    function gestorSave(event:FormEvent){
        event.preventDefault();
        let token:string = localStorage.getItem("token") as string;
        let formulario = event.currentTarget as HTMLFormElement;

        let inputNombre = formulario.nombre as HTMLInputElement;
        let inputApellido = formulario.apellidos as HTMLInputElement;
        let inputDni = formulario.dni as HTMLInputElement;
        let inputPassword = formulario.password as HTMLInputElement;
        
        let nombre: string = inputNombre.value as string;
        let apellidos: string = inputApellido.value as string;
        let dni: string = inputDni.value as string;
        let password: string = inputPassword.value as string;

        let headers = {
            headers: { Authorization: token }
            };

        let body:GestorSave = {
            dni: dni,
            apellidos: apellidos,
            nombre: nombre,
            password: password
        }
        
        const axiospost = async(ruta:string)=>{
            try{
                const {data} = await axios.post(ruta, body, headers)
                console.log(data);
                alert("se ha guardado!")
            }catch(er){
                console.log("fallo" + er);
            }
        }

        if(nombre!="" && apellidos!="" && dni!="" && password!=""){
            axiospost("http://localhost:8080/api/v3/gestores");
        }else{
            alert("Faltan campos obligatorios!")
        }
        
    }

    const verSeguimientos = (dni:string) =>{
        navigate("/seguimientos/gestores/"+dni);
    }

    const eliminarGestor = async (id:string) =>{
        let ruta = rutaBase + "/gestores/"+id;
        const headers = {
            headers: { Authorization: token }
        };
        try{
            await axios.delete(ruta, headers);
            alert("se ha eliminado")
        }catch(err){
            console.log(err)
            alert("algo ha fallado, recuerda que no puede tener tickets asociados")
        }
        window.location.reload();
    }
        
    const editarGestor = (idgestor:string) => {
        navigate('/gestores/edit/'+idgestor);
    }

    return (
        <>
        <SidebarAdmin/>
        <div className="principal table-responsive">
            <table className="tabla">
                <tr className="title">
                    <td><b>DNI</b></td>
                    <td><b>Nombre</b></td>
                
                </tr>
                {
                gestores?.map((gestor:GestorDTO,indice)=>{
                    return(
                        <>
                            <tr key={indice}>
                                <td>{gestor.dni}</td>
                                <td>{gestor.nombre} {gestor.apellidos}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}><button onClick={()=>verSeguimientos(gestor.dni)}>Ver sus seguimientos</button>  <button onClick={()=>eliminarGestor(gestor.dni)}>Eliminar</button>  <button onClick={()=> editarGestor(gestor.dni)}>Editar</button></td>
                            </tr>
                        </>
                    )
                })
                }
            
            </table>
            <h3>Guarda un nuevo gestor:</h3>
            <form onSubmit={gestorSave}>
                <input type="text" id="dni" name="dni" placeholder="dni"/><br/>
                <input type="text" id="nombre" name="nombre" placeholder="nombre"/><br/>
                <input type="text" id="apellidos" name="apellidos" placeholder="apellidos"/><br/>
                <input type="password" name="password" placeholder="contraseña"></input><br/>
                <input type="submit" value={"Guardar"} />
            </form>
            <br/>
            <br/>
            <Link to="/menuAdmin">Volver</Link>
            </div>
        
        </>
    )
}