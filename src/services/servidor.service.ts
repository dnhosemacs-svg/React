import type { Servidor } from "../types/servidor";

/**
 * Simula una llamada HTTP que devuelve un Servidor.
 * El objetivo es demostrar cómo `Awaited<T>` "desenvuelve" el tipo real resuelto.
 */
export async function fetchServidorMock(): Promise<Servidor> {
  return Promise.resolve({
    id: "srv-async-01",
    ip: "10.10.10.10",
    puerto: 1234,
    estado: "ACTIVO",
    ultimaRevision: new Date("2026-03-22"),
    tokenInterno: "secret-async",
  });
}

/** Tipo resuelto final de la promesa devuelta por `fetchServidorMock`. */
export type ServidorResuelto = Awaited<ReturnType<typeof fetchServidorMock>>;
