import React, { FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const SidebarUser = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="sidebar">
                <div className="menu-item"><Link to="/menu">Inicio</Link></div>
                <div className="menu-item"><Link to="#">Estadísticas</Link></div>
                <div className="menu-item"><Link to="#">Gestores</Link></div>
                <div className="menu-item"><Link to="#">Mi perfil</Link></div>
                <div className="menu-item"><Link to="#">Cerrar sesión</Link></div>
            </div>
        </>
    );
};