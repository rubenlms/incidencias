import { useEffect, useState } from 'react';
import axios from "axios";
import { SeguimientoDTO } from '../DTO/SeguimientoDTO';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { SidebarAdmin } from './SideBarAdmin';

export const Seguimiento = () => {

    let navigate = useNavigate();

    const [seguimientos,setState] = useState<Array<SeguimientoDTO>>([]);
    const {id} = useParams();
    let token:string = localStorage.getItem("token") as string;
    let ip: string = "localhost";
    let puerto: number = 8080;
    let rutaBase: string ="http://" + ip + ":" + puerto + "/api/v3";

    useEffect(()=>{
        async function getAllSeguimientos() {
            let rutaSeguimientos:string = rutaBase + "/tickets/" + id +"/seguimientos";
            const headers = {
                headers: { Authorization: token }
                };

            let respuesta = await axios.get(rutaSeguimientos, headers);
            setState(respuesta.data);
        }
        getAllSeguimientos();
    },[])

    async function borrarSeguimiento(idSeguimiento:number){
        let rutaSeguimientos:string = rutaBase + "/seguimientos/"+idSeguimiento;
        const headers = {
            headers: { Authorization: token }
        };
        try{
            await axios.delete(rutaSeguimientos,headers);
            alert("se ha eliminado");
            navigate("/tickets")
        }catch(err){console.log(err)}

        console.log("borrar seg " + id)
    }

    const editSeguimiento = (id:number) => {
        alert("no implementado");
    }

    return(
        <>
            <SidebarAdmin/>
            <div className='principal'>
                <h3>Seguimientos del ticket {id}</h3>
                <table className='tabla'>
                    <tr className='title'>
                        <td>ID</td>
                        <td>Comentario</td>
                        <td>Fecha</td>
                        <td>Gestor</td>
                        <td></td>
                    </tr>
                    {
                        seguimientos?.map((seg:SeguimientoDTO,indice)=>{
                            let date = new Date(seg.fecha);
                            return(
                            <>
                                <tr key={indice}>
                                    <td>{seg.idSeguimiento}</td>
                                    <td>{seg.comentario}</td>
                                    <td>{date.toDateString()}</td>
                                    <td>{seg.gestor}</td>
                                    <td><button onClick={()=>borrarSeguimiento(seg.idSeguimiento)}>Eliminar</button> <button onClick={()=>editSeguimiento(seg.idSeguimiento)} hidden>Editar</button></td>
                                </tr>
                            </>
                            )
                        })
                    }
                </table>
                <br/>
                <br/>
                <br/>
                <Link to="/tickets">Volver</Link>
            </div>
        </>
    )
}
