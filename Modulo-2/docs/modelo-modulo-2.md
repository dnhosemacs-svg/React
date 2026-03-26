## Módulo 2 — Modelo de dominio y cliente API simulado

### Objetivo
Este módulo demuestra:
- Modelado de dominio con interfaces (`Estudiante`, `Asignatura`)
- Unión discriminada para estados válidos (`EstadoMatricula`)
- Genéricos para respuestas reutilizables (`RespuestaAPI<T>`) y un cliente de datos simulado (`obtenerRecurso<T>`)

### Modelo de dominio (interfaces)
- **interface**: se usa para definir la forma de entidades y facilita que otras partes del sistema usen esa estructura.
- **Inmutabilidad de IDs (`readonly`)**: el `id` identifica la entidad y mediante readonly se evita que pueda ser modificado posteriormente.

Entidades definidas:
- `Estudiante`: `readonly id`, `nombreCompleto`, `curso`
- `Asignatura`: `readonly id`, `codigo`, `nombre`, `creditos`, `curso`, `activa`

### Unión discriminada: `EstadoMatricula`
Se modelan estados mutuamente excluyentes usando un discriminante común `tipo`, ya que de otro modo las interfaces sólo podrían crear objetos de una determinada estructura:

- `MatriculaActiva` → `tipo: "ACTIVA"` y `asignaturas: Asignatura[]`
- `MatriculaSuspendida` → `tipo: "SUSPENDIDA"` y `motivo: string`
- `MatriculaFinalizada` → `tipo: "FINALIZADA"` y `notaMedia: number`

**Por qué `type` aquí**: una unión discriminada con `type` permite que TypeScript haga narrowing seguro.

### `generarReporte(estado)`
`generarReporte` usa `switch (estado.tipo)` para producir un `string`.
La ventaja del `switch` con unión discriminada es que, en cada `case`, TypeScript sabe qué propiedades existen (por ejemplo, en `"ACTIVA"` existe `asignaturas`).

### Genéricos: `RespuestaAPI<T>` y `obtenerRecurso<T>`
- `RespuestaAPI<T>` encapsula una respuesta estándar con:
  - `codigoEstado`, `exito`, `datos: T`, `errores?`
- `obtenerRecurso<T>(endpoint)` simula una llamada asíncrona con `Promise` + `setTimeout`.
  - Internamente construye/valida una `RespuestaAPI<T>`
  - Si `exito` es `false`, rechaza con un `Error`
  - Si `exito` es `true`, devuelve `datos` tipados como `T`

**Por qué genéricos**: permiten reutilizar el mismo “cliente” para distintos tipos de datos manteniendo tipado estricto usando `T` como argumento de entrada.

### Ejecución manual
Comandos típicos:
- `npx tsc --noEmit` para comprobar tipos
- `npx tsx src/index.ts` para ejecutar el ejemplo