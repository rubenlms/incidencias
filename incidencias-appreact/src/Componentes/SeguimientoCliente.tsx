import { useEffect, useState } from 'react';
import axios from "axios";
import { SeguimientoDTO } from '../DTO/SeguimientoDTO';
import { useParams, Link } from 'react-router-dom';

export const SeguimientoCliente = () => {

    const [seguimientos,setState] = useState<Array<SeguimientoDTO>>([]);
    const {dni} = useParams();
    let token:string = localStorage.getItem("token") as string;
    let ip: string = "localhost";
    let puerto: number = 8080;
    let rutaBase: string ="http://" + ip + ":" + puerto + "/api/v2";

    useEffect(()=>{
        async function getAllSeguimientos() {
            let rutaSeguimientos:string = rutaBase + "/tickets/" + dni +"/seguimientos";
            const headers = {
                headers: { Authorization: token }
                };

            let respuesta = await axios.get(rutaSeguimientos, headers);
            setState(respuesta.data);
        }
        getAllSeguimientos();
    },[])

    return(
        <>
            <div className='principal'>
                <h3>Seguimientos del ticket {dni}</h3>
                <table className='tabla'>
                    <tr className='title'>
                        <td>ID</td>
                        <td>Comentario</td>
                        <td>Fecha</td>
                        <td>Gestor</td>
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
                                </tr>
                            </>
                            )
                        })
                    }
                </table>
                <br/>
                <br/>
                <br/>
                <Link to="/menuUser">Volver</Link>
            </div>
        </>
    )
}
