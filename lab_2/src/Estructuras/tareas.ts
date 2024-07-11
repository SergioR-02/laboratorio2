export class Tareas{
  private id:number;
  private descripcion:string;
  private estado:string;
  private prioridad:string;
  constructor(id:number,descripcion:string,estado:string,prioridad:string){
    this.id=id;
    this.descripcion=descripcion;
    this.estado=estado;
    this.prioridad=prioridad;
  }

  

}