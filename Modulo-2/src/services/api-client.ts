export interface RespuestaAPI<T> {
    codigoEstado: number;
    exito: boolean;
    datos: T;
    errores?: string[];
  }
  
  function simularRespuesta<T>(endpoint: string): RespuestaAPI<T> {
    // Simulación mínima (tú puedes ampliar endpoints)
    const datosSimulados: Record<string, unknown> = {
      "/ping": { ok: true },
    };
  
    const datos = datosSimulados[endpoint];
  
    if (datos === undefined) {
      return {
        codigoEstado: 404,
        exito: false,
        datos: null as T,
        errores: [`Endpoint no encontrado: ${endpoint}`],
      };
    }
  
    return {
      codigoEstado: 200,
      exito: true,
      datos: datos as T,
    };
  }
  
  export function obtenerRecurso<T>(endpoint: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      setTimeout(() => {
        const respuesta = simularRespuesta<T>(endpoint);
  
        if (!respuesta.exito) {
          reject(new Error(respuesta.errores?.join(" | ") ?? "Error desconocido"));
          return;
        }
  
        resolve(respuesta.datos);
      }, 300);
    });
  }