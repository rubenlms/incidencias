export class SeguimientoDTO {

    idSeguimiento:number;
	comentario:string;
	fecha:number;
	gestor:string;
	idTicket:number;

    constructor(idSeguimiento:number, comentario:string, fecha:number, gestor:string, idTicket:number){
        this.idSeguimiento = idSeguimiento;
        this.comentario = comentario;
        this.fecha = fecha;
        this.gestor = gestor;
        this.idTicket = idTicket;
    }
}