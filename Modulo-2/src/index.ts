import { generarReporte } from "./domain/types/matricula";
import type { Asignatura } from "./domain/types/asignatura";
import { obtenerRecurso } from "./services/api-client";

const asignaturas: Asignatura[] = [
  {
    id: "ASG-1",
    codigo: "MAT-101",
    nombre: "Matemáticas I",
    creditos: 6,
    curso: 1,
    activa: true,
  },
  {
    id: "ASG-2",
    codigo: "PROG-101",
    nombre: "Programación I",
    creditos: 6,
    curso: 1,
    activa: true,
  },
];

console.log(
  generarReporte({
    tipo: "ACTIVA",
    asignaturas,
  })
);

console.log(
  generarReporte({
    tipo: "SUSPENDIDA",
    motivo: "Impago de tasas",
  })
);

console.log(
  generarReporte({
    tipo: "FINALIZADA",
    notaMedia: 8.25,
  })
);

async function main() {
  const ping = await obtenerRecurso<{ ok: boolean }>("/ping");
  console.log("Respuesta /ping:", ping);

  try {
    await obtenerRecurso<{ ok: boolean }>("/no-existe");
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : String(error);
    console.log("Error esperado:", mensaje);
  }
}

main();