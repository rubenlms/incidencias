import { useEffect, useState } from "react";
import axios from "axios";
import { ClienteDTO } from "../DTO/ClienteDTO";
import { Link, useNavigate } from "react-router-dom";
import { SidebarAdmin } from "./SideBarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserXmark,
  faUserPen,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export const Cliente = () => {
  const [clientes, setState] = useState<Array<ClienteDTO>>([]);
  let navigate = useNavigate();
  let token: string = localStorage.getItem("token") as string;
  let ip: string = "localhost";
  let puerto: number = 8080;
  let rutaBase: string = "http://" + ip + ":" + puerto + "/api/v3";
  let rutaClientes: string = rutaBase + "/clientes";

  useEffect(() => {
    async function getAll() {
      const headers = {
        headers: { Authorization: token },
      };
      let respuesta = await axios.get(rutaClientes, headers);
      setState(respuesta.data);
    }
    getAll();
  }, []);

  const eliminarCliente = async (dni: string) => {
    console.log("entra a eliminar" + dni);
    let rutaDelete: string = rutaClientes + "/" + dni;
    const headers = {
      headers: { Authorization: token },
    };
    try {
      await axios.delete(rutaDelete, headers);
      alert("Se ha eliminado");
    } catch (err) {
      console.log(err);
      alert(
        "no se ha podido eliminar, recuerda que no debe tener tickets registrados"
      );
    }
  };

  const editCliente = (dni: string) => {
    navigate("/editCliente/" + dni);
  };

  return (
    <>
      <SidebarAdmin />
      <div className="principal">
        <h3>Usuarios registrados:</h3>
        <br />
        <Link to={"/clientes/add"} className="btn btn-outline-dark">
          <FontAwesomeIcon icon={faUserPlus} /> Añadir cliente
        </Link>
        <br />
        <table className="tabla table">
          <tr className="title">
            <td>DNI</td>
            <td>Nombre</td>
            <td>Dirección</td>
            <td>Teléfono</td>
            <td></td>
          </tr>
          {clientes?.map((cliente: ClienteDTO, indice) => {
            return (
              <>
                <tr key={indice}>
                  <td>{cliente.idCliente}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.telefono}</td>
                  <td>
                    <button
                      className="btn btn-outline-dark option-btt"
                      onClick={() => eliminarCliente(cliente.idCliente)}
                    >
                      <FontAwesomeIcon icon={faUserXmark} /> Eliminar
                    </button>
                    <button
                      className="btn btn-outline-dark option-btt"
                      onClick={() => editCliente(cliente.idCliente)}
                    >
                      <FontAwesomeIcon icon={faUserPen} /> Editar
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
        <br />
        <br />
        <Link to="/admin">Volver</Link>
      </div>
    </>
  );
};
