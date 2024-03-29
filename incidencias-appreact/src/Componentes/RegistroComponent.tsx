import { FormEvent } from "react"
import axios from 'axios';
import { ClienteSave } from "../Entities/ClienteSave";
import { useNavigate } from 'react-router-dom';

export const Register = () => {

    let navigate = useNavigate();

    function registro(event: FormEvent){
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
        
        let cliente:ClienteSave = {
            nombre : nombre,
            password: cont,
            direccion: direccion,
            idCliente: dni,
            telefono: Number(telefono)
        }

        const postRegistro = async (ruta:string) => {
            try{
                const{data} = await axios.post(ruta, cliente);
                alert("Te has registrado! ")
                navigate("/")
            }catch(err){console.log(err)}
        }

        if(nombre!="" && cont!="" && direccion!="" && dni!=""){
            postRegistro("http://localhost:8080/api/v1/register");
        }else{
            alert("Faltan campos obligatorios!")
        }
        
    }

    return (
        <>
            <div className="principal">
                <form onSubmit={registro}>
                    <input type="text" name="dni" placeholder="DNI"/><br />
                    <input type="text" name="nombre" placeholder="Nombre"/><br />
                    <input type="password" name="password" placeholder="Contraseña"/><br />
                    <input type="text" name="direccion" placeholder="Dirección"/><br />
                    <input type="number" name="telefono" placeholder="Teléfono"/><br />
                    <input type="submit" value={"Registrar"}/><br />
                </form>
            </div>
        </>
    )
}
