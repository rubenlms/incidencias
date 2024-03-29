export class ClienteDTO{
    idCliente:string;
        direccion:string;
        nombre:string;
        telefono?:number;
        idUsuario:number;

    constructor(
        idCliente:string,
        direccion:string,
        nombre:string,
        telefono:number,
        idUsuario:number
    ){
        this.idCliente = idCliente;
        this.direccion = direccion;
        this.nombre = nombre;
        this.telefono = telefono;
        this.idUsuario = idUsuario;
    }
}