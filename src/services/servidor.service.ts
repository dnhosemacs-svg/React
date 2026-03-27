import type { Servidor } from "../types/servidor";

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

export type ServidorResuelto = Awaited<ReturnType<typeof fetchServidorMock>>;
