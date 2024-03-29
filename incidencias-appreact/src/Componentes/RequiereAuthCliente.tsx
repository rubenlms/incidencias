import jwtDecode from 'jwt-decode';
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
interface IProps {
    children: JSX.Element;
}
export const RequireAuthCliente = ({ children }: IProps) => {
    let jwt: string = localStorage.getItem("token") as string;
    let tokens = jwt.substring(7);
    let jwtdecoded: any = jwtDecode(tokens);
    let rol: string = jwtdecoded.authorities[0] as string;
    //console.log("rol" + rol);
    if (rol == "ROLE_USER") {
        return children;
    }
    return <Navigate to="/login" />
}