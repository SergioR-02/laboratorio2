
//Clase tarea
export class Task{
  private id:number;
  private descripcion:string;
  private estado:string;
  private prioridad:number;

  constructor(id:number,descripcion:string,estado:string,prioridad:number){
    this.id=id;
    this.descripcion=descripcion;
    this.estado=estado;
    this.prioridad=prioridad;
  }

  //Getters para obtener atributos privadas de la clase
  getId(){
    return this.id;
  }
  getDescripcion(){
    return this.descripcion;
  }
  getEstado(){
    return this.estado;
  }
  getPrioridad(){
    return this.prioridad;
  }

  set estadoNuevo(estado:string){
    this.estado=estado;
  }
}

