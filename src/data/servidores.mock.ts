import type { Servidor } from "../types/servidor";

export const servidoresMock: Servidor[] = [
  {
    id: "srv-01",
    ip: "192.168.1.10",
    puerto: 8080,
    estado: "ACTIVO",
    ultimaRevision: new Date("2026-03-20"),
    tokenInterno: "secret-1",
  },
  {
    id: "srv-02",
    ip: "192.168.1.20",
    puerto: 3000,
    estado: "MANTENIMIENTO",
    ultimaRevision: new Date("2026-03-18"),
    tokenInterno: "secret-2",
  },
];