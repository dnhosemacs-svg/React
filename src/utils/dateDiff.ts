import { differenceInDays } from "date-fns";

export function calcularDiferenciaDias(
  fechaInicio: Date | string,
  fechaFin: Date | string
): number {
  const inicio = fechaInicio instanceof Date ? fechaInicio : new Date(fechaInicio);
  const fin = fechaFin instanceof Date ? fechaFin : new Date(fechaFin);

  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fin.getTime())) {
    throw new Error("Fecha invalida");
  }

  return differenceInDays(fin, inicio);
}