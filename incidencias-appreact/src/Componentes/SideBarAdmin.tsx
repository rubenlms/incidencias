import React, { FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const SidebarAdmin = () => {
    const navigate = useNavigate();

    return (
        <>
            <div id="sidebar">
                <div className="menu-item"><Link to="/admin">Inicio</Link></div>
                <div className="menu-item"><Link to="/users">Usuarios</Link></div>
                <div className="menu-item"><Link to="/gestores">Gestores</Link></div>
                <div className="menu-item"><Link to="/videojuegos">Incidencias</Link></div>
            </div>
        </>
    );
};