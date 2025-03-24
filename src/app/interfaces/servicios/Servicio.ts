export interface Servicio{
  id_servicio: number,
  nombre_servicio: string
}

export interface ApiResponse {
  PROTECCION_CIVIL: Servicio[];
  USO_SUELO: Servicio[];
  BEBIDAS: Servicio[];
}
