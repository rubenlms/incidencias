import axios from "axios";
import { FormEvent, useState } from "react";
import { GestorDTO } from "../DTO/GestorDTO";
import { Link, useNavigate } from "react-router-dom";
import { GestorSave } from "../DTO/GestorSave";

export const AddGestor = () => {
  //let navigate = useNavigate();
  function gestorSave(event: FormEvent) {
    event.preventDefault();
    let token: string = localStorage.getItem("token") as string;
    let formulario = event.currentTarget as HTMLFormElement;

    let inputNombre = formulario.nombre as HTMLInputElement;
    let inputApellido = formulario.apellidos as HTMLInputElement;
    let inputDni = formulario.dni as HTMLInputElement;
    let inputPassword = formulario.password as HTMLInputElement;

    let nombre: string = inputNombre.value as string;
    let apellidos: string = inputApellido.value as string;
    let dni: string = inputDni.value as string;
    let password: string = inputPassword.value as string;

    let headers = {
      headers: { Authorization: token },
    };

    let body: GestorSave = {
      dni: dni,
      apellidos: apellidos,
      nombre: nombre,
      password: password,
    };

    const axiospost = async (ruta: string) => {
      try {
        const { data } = await axios.post(ruta, body, headers);
        console.log(data);
        alert("se ha guardado!");
      } catch (er) {
        console.log("fallo" + er);
      }
    };

    if (nombre != "" && apellidos != "" && dni != "" && password != "") {
      axiospost("http://localhost:8080/api/v3/gestores");
    } else {
      alert("Faltan campos obligatorios!");
    }
  }

  return (
    <>
      <div className="principal">
        <h3>Añade un nuevo gestor</h3>
        <form onSubmit={gestorSave}>
          <input type="text" id="dni" name="dni" placeholder="dni" />
          <br />
          <input type="text" id="nombre" name="nombre" placeholder="nombre" />
          <br />
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            placeholder="apellidos"
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="contraseña"
          ></input>
          <br />
          <input
            className="btn btn-outline-dark option-btt"
            type="submit"
            value={"Guardar"}
          />
        </form>
      </div>
    </>
  );
};
