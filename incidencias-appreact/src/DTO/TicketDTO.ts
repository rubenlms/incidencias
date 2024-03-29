export class TicketDTO{

    idTicket:number;
    descripcion:string;
    estado:string;
    fechaInicio:number;
    fechaFin?:any;
    cliente:string;

    
    constructor(id:number, descripcion:string,estado:string,fechaInicio:number,fechaFin:number,cliente:string){
        this.idTicket = id;
        this.descripcion = descripcion;
        this.estado = estado;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.cliente = cliente;
    }
}