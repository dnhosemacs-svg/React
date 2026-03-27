import { useEffect, useMemo, useState } from "react";
import { DataTable, type Column } from "./components/DataTable";
import { aPublico, indexarPorId, obtenerResumen, servidorConfigFija } from "./types/ejemplos";
import { servidoresMock } from "./data/servidores.mock";
import { fetchServidorMock, type ServidorResuelto } from "./services/servidor.service";
import { calcularDiferenciaDias } from "./utils/dateDiff";
import type {
  DatosActualizacionServidor,
  Servidor,
} from "./types/servidor";
import "./App.css";

function App() {
  /**
   * Fuente principal de datos para la tabla.
   * En un caso real vendría de una API; aquí inicia desde mocks tipados.
   */
  const [servidores, setServidores] = useState<Servidor[]>(servidoresMock);

  /**
   * Ejemplo de Awaited<T>: el tipo real resuelto por una función async.
   * (Sirve como evidencia y como "mini-carga" simulada).
   */
  const [servidorAsync, setServidorAsync] = useState<ServidorResuelto | null>(null);

  /**
   * Partial<T> para edición: el usuario puede modificar solo algunos campos,
   * y el resto se mantiene como opcional mientras edita.
   */
  const [editingRow, setEditingRow] = useState<DatosActualizacionServidor>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /** Record<string, Servidor>: índice rápido por ID (diccionario). */
  const servidoresPorId = useMemo(() => indexarPorId(servidores), [servidores]);

  /** Pick<T, K>: vista reducida (útil para UI / listados). */
  const resumenes = servidores.map(obtenerResumen);

  /** Omit<T, K>: versión "pública" sin datos sensibles. */
  const servidoresPublicos = servidores.map(aPublico);

  /** Readonly<T>: ejemplo de configuración que no debe mutar. */
  const primerServidorSoloLectura = servidorConfigFija;

  /**
   * Columnas tipadas para la DataTable genérica.
   * `key` está restringida a `keyof Servidor` (no puedes poner una clave inexistente).
   */
  const columns: Column<Servidor>[] = [
    { key: "id", header: "ID" },
    { key: "ip", header: "IP" },
    { key: "puerto", header: "Puerto" },
    { key: "estado", header: "Estado" },
    {
      key: "ultimaRevision",
      header: "Dias desde revision",
      render: (_, row) => calcularDiferenciaDias(row.ultimaRevision, new Date()),
    },
  ];

  /** Selecciona una fila y precarga un formulario parcial de edición. */
  const iniciarEdicion = (id: string) => {
    const actual = servidores.find((servidor) => servidor.id === id);
    if (!actual) return;

    setSelectedId(id);
    setEditingRow({
      estado: actual.estado,
      puerto: actual.puerto,
      ultimaRevision: actual.ultimaRevision,
    });
  };

  /** Aplica el patch parcial sobre la fila seleccionada (estilo HTTP PATCH). */
  const guardarEdicion = () => {
    if (!selectedId) return;
    setServidores((prev) =>
      prev.map((servidor) => (servidor.id === selectedId ? { ...servidor, ...editingRow } : servidor)),
    );
    setSelectedId(null);
    setEditingRow({});
  };

  useEffect(() => {
    async function cargarServidorAsync() {
      const servidor: ServidorResuelto = await fetchServidorMock();
      setServidorAsync(servidor);
    }

    void cargarServidorAsync();
  }, []);

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "2rem", fontFamily: "Inter, sans-serif" }}>
      <h1>Modulo 3: UI estricta con TypeScript</h1>
      <p>
        Tabla generica <code>DataTable&lt;T&gt;</code> + estado parcial con <code>Partial&lt;T&gt;</code>.
      </p>

      <DataTable data={servidores} columns={columns} />

      <section style={{ marginTop: "1.5rem", display: "grid", gap: "0.75rem" }}>
        <h2>Edicion de fila</h2>
        <label>
          Servidor:
          <select
            style={{ marginLeft: "0.5rem" }}
            value={selectedId ?? ""}
            onChange={(e) => iniciarEdicion(e.target.value)}
          >
            <option value="">-- seleccionar --</option>
            {servidores.map((servidor) => (
              <option key={servidor.id} value={servidor.id}>
                {servidor.id}
              </option>
            ))}
          </select>
        </label>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="number"
            placeholder="Puerto"
            value={editingRow.puerto ?? ""}
            onChange={(e) => setEditingRow((prev) => ({ ...prev, puerto: Number(e.target.value) }))}
          />
          <select
            value={editingRow.estado ?? ""}
            onChange={(e) =>
              setEditingRow((prev) => ({
                ...prev,
                estado: e.target.value as Servidor["estado"],
              }))
            }
          >
            <option value="">-- estado --</option>
            <option value="ACTIVO">ACTIVO</option>
            <option value="MANTENIMIENTO">MANTENIMIENTO</option>
            <option value="INACTIVO">INACTIVO</option>
          </select>
          <button onClick={guardarEdicion} disabled={!selectedId}>
            Guardar
          </button>
        </div>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Comprobaciones de tipos (sin render complejo)</h2>
        <small>
          Diccionario: {Object.keys(servidoresPorId).length} | Resumenes: {resumenes.length} | Publicos:{" "}
          {servidoresPublicos.length} | Solo lectura: {primerServidorSoloLectura ? "si" : "no"}
        </small>
        <br />
        <small>Awaited&lt;T&gt; (async): {servidorAsync ? servidorAsync.id : "cargando..."}</small>
      </section>
    </main>
  );
}

export default App;
