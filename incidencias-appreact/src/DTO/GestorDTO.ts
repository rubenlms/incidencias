export class GestorDTO {

    dni:string;
    nombre:string;
    apellidos:string;
    idUsuario:number;

    constructor(
        dni:string,
        nombre:string,
        apellidos:string,
        idUsuario:number
    ){
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.idUsuario = idUsuario;
    }
}