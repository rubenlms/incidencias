import axios from "axios";
import { FormEvent } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { ClienteSave } from "../Entities/ClienteSave";

export const ClienteAddbyGestor = () => {

    let navigate = useNavigate();

    function registro(event: FormEvent){
        let token:string = localStorage.getItem("token") as string;
        event.preventDefault();
        let formulario = event.currentTarget as HTMLFormElement;

        let inputDNI = formulario.dni as HTMLInputElement;
        let inputNombre = formulario.nombre as HTMLInputElement;
        let inputPassword = formulario.password as HTMLInputElement;
        let inputDireccion = formulario.direccion as HTMLInputElement;
        let inputTelefono = formulario.telefono as HTMLInputElement;
        
        let dni:string = inputDNI.value as string;
        let nombre:string = inputNombre.value as string;
        let cont:string = inputPassword.value as string;
        let direccion:string = inputDireccion.value as string;
        let telefono:string = inputTelefono.value as string;

        let headers = {
            headers: { Authorization: token }
        };

        let body:ClienteSave = {
            idCliente: dni,
            password: cont,
            nombre: nombre,
            direccion: direccion,
            telefono: Number(telefono)
        }

        const axiospost = async(ruta:string)=>{
            try{
                const {data} = await axios.post(ruta, body, headers)
                console.log(data);
                alert("se ha guardado!")
                navigate("/clientes")
            }catch(er){
                console.log("fallo" + er);
            }
        }

        if(dni!="" && cont!="" && nombre!="" && direccion!=""){
            axiospost("http://localhost:8080/api/v3/clientes");
        }else{
            alert("Faltan campos obligatorios")
        }
        
    }

    return (
        <>
            <div className="principal">
                <h3>Registrar nuevo cliente</h3>
                <form onSubmit={registro}>
                    <input type="text" name="dni" placeholder="DNI"/><br />
                    <input type="text" name="nombre" placeholder="Nombre"/><br />
                    <input type="password" name="password" placeholder="Contraseña"/><br />
                    <input type="text" name="direccion" placeholder="Dirección"/><br />
                    <input type="number" name="telefono" placeholder="Teléfono"/><br /><br />
                    <input type="submit" value={"Registrar"}/><br />
                </form>
                <br />
                <Link to={"/clientes"}>Volver</Link>
            </div>
        </>
    )
}