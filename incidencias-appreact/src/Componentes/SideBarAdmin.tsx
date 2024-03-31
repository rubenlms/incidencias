import React, { FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const SidebarAdmin = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="sidebar">
                <div className="menu-item"><Link to="/admin">Inicio</Link></div>
                <div className="menu-item"><Link to="/clientes">Usuarios</Link></div>
                <div className="menu-item"><Link to="/gestores">Gestores</Link></div>
                <div className="menu-item"><Link to="/tickets">Incidencias</Link></div>
            </div>
        </>
    );
};