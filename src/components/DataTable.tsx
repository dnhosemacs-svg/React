import React from "react";

/**
 * Definición de columna para una entidad genérica T.
 * - `key` limita a claves reales de T (seguridad de tipos).
 * - `render` permite personalizar el contenido de la celda (sin perder el tipado).
 */
export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

/**
 * DataTable<T>
 * Componente genérico reutilizable: renderiza una tabla a partir de `data` + `columns`.
 * Beneficio: si cambias el tipo T, TypeScript obliga a actualizar claves/columnas incorrectas.
 */
export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} style={{ border: "1px solid #ccc", padding: "8px" }}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => {
              const value = row[col.key];
              return (
                <td key={String(col.key)} style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {col.render ? col.render(value, row) : String(value)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}