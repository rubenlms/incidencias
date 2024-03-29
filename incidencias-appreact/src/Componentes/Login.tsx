import React, { FormEvent } from "react";
import axios from 'axios';
import { Link, Navigate, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";


export const Login = () => {
    let navigate = useNavigate();
    function handleform(event: FormEvent) {
        event.preventDefault();
        let formulario = event.currentTarget as HTMLFormElement;
        let inputNombre = formulario.nombre as HTMLInputElement;
        let inputPassword = formulario.password as HTMLInputElement;
        let username: string = inputNombre.value as string;
        let password: string = inputPassword.value as string;
      
        let login = {
            name: username,
            password: password
        }
        
        const axiospost = async (ruta: string) => {
            let oklogin = true;
            console.log(login.name);
            try {
                const { data } = await axios.post(ruta,login)
                
                localStorage.setItem("token", data);
                console.log("token: " + data);
                
            } catch (error) {
                console.log(error);
                oklogin = false;
            }

            if(oklogin){
                let jwt:string = localStorage.getItem("token") as string;
                let tokens = jwt.substring(7);
                let jwtdecoded:any = jwtDecode(tokens);
                let rol:string = jwtdecoded.authorities[0] as string;
                console.log("rol" + rol);
                if(rol == "ROLE_ADMIN"){
                    navigate("/menuAdmin");
                } else if (rol == "ROLE_USER"){
                    //alert("aun no puedes entrar!");
                    navigate("/menuUser");
                }
            
            }
        }
        localStorage.clear();
        if(username!="" && password!=""){
            axiospost("http://localhost:8080/api/v1/login");
        }else{
            alert("Faltan campos obligatorios!")
        }
        
    }
    return (
        <>
        <div className="principal">
            <h2>Login</h2>
        <form onSubmit={handleform}>

            <input type="text" name="nombre" id="inputNombre" placeholder="nombre" /><br /><br/>
            <input type="password" name="password" id="inputPassword" placeholder="password" /><br /><br/>
            <button type="submit">Enviar</button><br /><br/>
        </form>
        <Link to={"/register"}>Regístrate como usuario</Link>
        </div>
        </>
    )
}
