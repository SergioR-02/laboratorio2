import { LinkedList } from "./linkedList";

class Tareas{
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
  get getId(){
    return this.id;
  }
  get getDescripcion(){
    return this.descripcion;
  }
  get getEstado(){
    return this.estado;
  }
  get getPrioridad(){
    return this.prioridad;
  }
}

export class CrearTarea{
  static crearTarea(id:number,descripcion:string,estado:string,prioridad:string,linkedList:LinkedList<Tareas>):void{
    const tarea = new Tareas(id,descripcion,estado,prioridad);
    linkedList.addStart(tarea)
  }
}

