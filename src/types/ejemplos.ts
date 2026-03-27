import type { Servidor } from "./servidor";

// 1) Readonly<T>: objeto que no debe mutarse
export const servidorConfigFija: Readonly<Servidor> = {
  id: "cfg-01",
  ip: "10.0.0.1",
  puerto: 443,
  estado: "ACTIVO",
  ultimaRevision: new Date("2026-03-01"),
  tokenInterno: "cfg-secret",
};

// 2) Pick<T, K>: vista corta para UI
export type ServidorResumen = Pick<Servidor, "id" | "estado">;

export function obtenerResumen(servidor: Servidor): ServidorResumen {
  return {
    id: servidor.id,
    estado: servidor.estado,
  };
}

// 3) Omit<T, K>: quitar dato sensible
export type ServidorPublico = Omit<Servidor, "tokenInterno">;

export function aPublico(servidor: Servidor): ServidorPublico {
  const { tokenInterno, ...resto } = servidor;
  return resto;
}

// 4) Record<K, T>: diccionario por ID
export type ServidorMap = Record<string, Servidor>;

export function indexarPorId(lista: Servidor[]): ServidorMap {
  return lista.reduce<ServidorMap>((acc, servidor) => {
    acc[servidor.id] = servidor;
    return acc;
  }, {});
}