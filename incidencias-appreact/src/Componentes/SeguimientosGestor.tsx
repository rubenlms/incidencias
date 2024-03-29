import { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { SeguimientoDTO } from '../DTO/SeguimientoDTO';

export const SeguimientosGestores = () =>{

    const [seguimientos,setState] = useState<Array<SeguimientoDTO>>([]);
    const {dni} = useParams();
    let token:string = localStorage.getItem("token") as string;
    let ip: string = "localhost";
    let puerto: number = 8080;
    let rutaBase: string ="http://" + ip + ":" + puerto + "/api/v3";

    useEffect(()=>{
        async function getAllSeguimientos() {
            let rutaSeguimientos:string = rutaBase + "/gestores/" + dni +"/seguimientos";
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
                <h3>Seguimientos del Gestor {dni}</h3>
                <table className='tabla'>
                    <tr className='title'>
                        <td>ID</td>
                        <td>Comentario</td>
                        <td>Fecha</td>
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
                                </tr>
                            </>
                            )
                        })
                    }
                </table>
                <br/>
                <br/>
                <br/>
                <a href="/gestores">Volver</a>
            </div>
        </>
    )
}