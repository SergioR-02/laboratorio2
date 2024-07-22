// Clase Task representa una tarea con atributos como id, descripción, estado y prioridad.
export class Task {
  private id: number; // Identificador único de la tarea
  private descripcion: string; // Descripción detallada de la tarea
  private estado: string; // Estado actual de la tarea (e.g., "pendiente", "en progreso", "completada")
  private prioridad: number; // Nivel de prioridad de la tarea (e.g., 1 para alta prioridad, 3 para baja prioridad)
  // Constructor de la clase, inicializa los atributos de la tarea
  constructor(id: number, descripcion: string, estado: string, prioridad: number) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = estado;
    this.prioridad = prioridad;
  }

  // Getter para obtener el id de la tarea
  getId(): number {
    return this.id;
  }

  // Getter para obtener la descripción de la tarea
  getDescripcion(): string {
    return this.descripcion;
  }

  // Getter para obtener el estado de la tarea
  getEstado(): string {
    return this.estado;
  }

  // Getter para obtener la prioridad de la tarea
  getPrioridad(): number {
    return this.prioridad;
  }

  // Setter para actualizar el estado de la tarea
  set estadoNuevo(estado: string) {
    this.estado = estado;
  }
}



