import axios from "axios";
import { useEffect, useState, FormEvent } from "react";
import { GestorDTO } from "../DTO/GestorDTO";
import { Gestor } from "../Entities/Gestor";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioDTO } from "../DTO/UsuarioDTOSave";
import { GestorSave } from "../DTO/GestorSave";
import { SidebarAdmin } from "./SideBarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faUserXmark, faMagnifyingGlass, faFloppyDisk, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { AddGestor } from "./AddGestor";

export const Gestores = () => {
  const [gestores, setState] = useState<Array<GestorDTO>>([]);
  const [visible, setVisible] = useState(false);
  const [usuarioDTO, setUsuario] = useState<UsuarioDTO>();
  let navigate = useNavigate();
  let token: string = localStorage.getItem("token") as string;
  let ip: string = "localhost";
  let puerto: number = 8080;
  let rutaBase: string = "http://" + ip + ":" + puerto + "/api/v3";

  useEffect(() => {
    async function gestorAll() {
      let rutaGestores: string = rutaBase + "/gestores";
      const headers = {
        headers: { Authorization: token },
      };
      let respuesta = await axios.get(rutaGestores, headers);
      setState(respuesta.data);
    }
    gestorAll();
  }, []);

  const verSeguimientos = (dni: string) => {
    navigate("/seguimientos/gestores/" + dni);
  };

  const eliminarGestor = async (id: string) => {
    let ruta = rutaBase + "/gestores/" + id;
    const headers = {
      headers: { Authorization: token },
    };
    try {
      await axios.delete(ruta, headers);
      alert("se ha eliminado");
    } catch (err) {
      console.log(err);
      alert("algo ha fallado, recuerda que no puede tener tickets asociados");
    }
    window.location.reload();
  };

  const editarGestor = (idgestor: string) => {
    navigate("/gestores/edit/" + idgestor);
  };

  const mostrarForm = () => {
    setVisible(!visible);
  }

  return (
    <>
      <SidebarAdmin />
      {visible && <AddGestor mostrarForm={mostrarForm}/>}
      <div className="principal table-responsive">
      <div>
            {!visible && <button className="btn btn-outline-dark option-btt" onClick={mostrarForm}><FontAwesomeIcon icon={faUserPlus} /> Añadir nuevo gestor</button>}
        </div>
        <table className="tabla table">
          <tr className="title">
            <td>
              <b>DNI</b>
            </td>
            <td>
              <b>Nombre</b>
            </td>
            <td></td>
          </tr>
          {gestores?.map((gestor: GestorDTO, indice) => {
            return (
              <>
                <tr key={indice}>
                  <td>{gestor.dni}</td>
                  <td>
                    {gestor.nombre} {gestor.apellidos}
                  </td>
                  <td colSpan={3}>
                  <button className="btn btn-outline-dark option-btt" onClick={() => verSeguimientos(gestor.dni)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> Ver sus seguimientos
                    </button>{" "}
                    <button className="btn btn-outline-dark option-btt" onClick={() => eliminarGestor(gestor.dni)}>
                      <FontAwesomeIcon icon={faUserXmark} /> Eliminar
                    </button>{" "}
                    <button className="btn btn-outline-dark option-btt" onClick={() => editarGestor(gestor.dni)}>
                      <FontAwesomeIcon icon={faUserPen} /> Editar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td >
                    
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};
