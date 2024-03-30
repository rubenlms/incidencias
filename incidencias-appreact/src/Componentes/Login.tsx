import React, { FormEvent } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const Login = () => {
  let navigate = useNavigate();
  function handleform(event: FormEvent) {
    event.preventDefault();
    let formulario = event.currentTarget as HTMLFormElement;
    let inputNombre = formulario.nombre as HTMLInputElement;
    let inputPassword = formulario.password as HTMLInputElement;
    let username: string = inputNombre.value as string;
    let password: string = inputPassword.value as string;

    let login = {
      name: username,
      password: password,
    };

    const axiospost = async (ruta: string) => {
      let oklogin = true;
      try {
        const { data } = await axios.post(ruta, login);

        localStorage.setItem("token", data);
        console.log("token: " + data);
      } catch (error) {
        console.log(error);
        oklogin = false;
      }

      if (oklogin) {
        let jwt: string = localStorage.getItem("token") as string;
        let tokens = jwt.substring(7);
        let jwtdecoded: any = jwtDecode(tokens);
        let rol: string = jwtdecoded.authorities[0] as string;
        console.log("rol" + rol);
        if (rol == "ROLE_ADMIN") {
          navigate("/admin");
        } else if (rol == "ROLE_USER") {
          //alert("aun no puedes entrar!");
          navigate("/menu");
        }
      }
    };
    localStorage.clear();
    if (username != "" && password != "") {
      axiospost("http://localhost:8080/api/v1/login");
    } else {
      alert("Faltan campos obligatorios!");
    }
  }
  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      ¡Bienvenido!
                    </h2>
                    <p className="text-white-50 mb-5">
                      Introduce tu usuario y contraseña
                    </p>

                    <form onSubmit={handleform}>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="nombre"
                          className="form-control form-control-lg"
                          placeholder="Email"
                        />
                        <label className="form-label" hidden>
                          Email
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          placeholder="Contraseña"
                        />
                        <label className="form-label" hidden>
                          Password
                        </label>
                      </div>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Entrar
                      </button>
                    </form>
                  </div>

                  <div>
                    <p className="mb-0">
                      Si no tienes una cuenta puedes{" "}
                      <Link to={"/register"}>registrarte aquí.</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/**
<div className="principal">
            <h2>Login</h2>
        <form onSubmit={handleform}>

            <input type="text" name="nombre" id="inputNombre" placeholder="nombre" /><br /><br/>
            <input type="password" name="password" id="inputPassword" placeholder="password" /><br /><br/>
            <button type="submit">Enviar</button><br /><br/>
        </form>
        <Link to={"/register"}>Regístrate como usuario</Link>
        </div>
 */
