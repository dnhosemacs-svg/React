export interface Servidor {
    id: string;
    ip: string;
    puerto: number;
    estado: "ACTIVO" | "MANTENIMIENTO" | "INACTIVO";
    ultimaRevision: Date;
    tokenInterno: string; // campo sensible de ejemplo
  }
  
  // Utility types aplicados
  export type DatosActualizacionServidor = Partial<Omit<Servidor, "ip">>;
  export type ServidorSoloLectura = Readonly<Servidor>;
  export type ServidorResumen = Pick<Servidor, "id" | "estado">;
  export type ServidorPublico = Omit<Servidor, "tokenInterno">;
  export type DiccionarioServidores = Record<string, Servidor>;