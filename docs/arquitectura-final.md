# Arquitectura final - Modulo 3: Ecosistemas modernos

## 1) Objetivo del proyecto

El objetivo fue construir una interfaz en React con TypeScript que minimice errores en tiempo de ejecucion mediante:

- componentes genericos reutilizables,
- contratos estrictos de tipos,
- transformacion segura de entidades con utility types,
- y validaciones de exhaustividad para escalar sin romper logica existente.

## 2) Estructura aplicada

La solucion se organizo por responsabilidades:

- `src/types/servidor.ts`: modelo base `Servidor` y aliases de utility types.
- `src/types/ejemplos.ts`: funciones y ejemplos reales de `Readonly`, `Pick`, `Omit`, `Record`.
- `src/components/DataTable.tsx`: componente generico `DataTable<T>`.
- `src/data/servidores.mock.ts`: datos mock tipados para pruebas de UI.
- `src/services/servidor.service.ts`: funcion async + uso de `Awaited<T>`.
- `src/utils/dateDiff.ts`: utilidad de fechas con `date-fns`.
- `src/App.tsx`: integracion general de estado, tabla, edicion parcial y demostraciones de tipos.

Esta separacion reduce acoplamiento y facilita mantenimiento, pruebas y refactorizacion.

## 3) Uso de genericos en la UI (`DataTable<T>`)

El componente `DataTable<T>` recibe:

- `data: T[]`
- `columns: Column<T>[]`, donde cada columna usa `keyof T`.

Beneficio principal: TypeScript impide referenciar columnas inexistentes. Si se cambia el modelo de datos, el compilador detecta inmediatamente cualquier columna incompatible, evitando errores de render en runtime.

## 4) Utility types aplicados en el flujo real

### `Partial<T>`

Se usa para el estado de edicion de fila:

- `DatosActualizacionServidor = Partial<Omit<Servidor, "ip">>`

Permite formularios incompletos durante la edicion, modelando el comportamiento tipo PATCH sin forzar todos los campos.

### `Readonly<T>`

Se usa en configuraciones que no deben modificarse:

- `servidorConfigFija: Readonly<Servidor>`

Evita mutaciones accidentales y protege invariantes de configuracion.

### `Pick<T, K>`

Se usa para crear una vista resumida para UI:

- `ServidorResumen = Pick<Servidor, "id" | "estado">`

Reduce superficie de datos y mejora claridad en componentes que no necesitan toda la entidad.

### `Omit<T, K>`

Se usa para construir una version publica de la entidad:

- `ServidorPublico = Omit<Servidor, "tokenInterno">`

Ayuda a evitar exponer datos sensibles por error.

### `Record<K, T>`

Se usa para indexar servidores por ID:

- `ServidorMap = Record<string, Servidor>`

Facilita busquedas y operaciones por clave con tipado estricto.

### `Awaited<T>`

Se aplica al resultado de una funcion async:

- `ServidorResuelto = Awaited<ReturnType<typeof fetchServidorMock>>`

Esto asegura que el tipo utilizado en estado/UI corresponde al valor resuelto real de la promesa.

## 5) Integracion de libreria externa tipada

Se integro `date-fns` en `src/utils/dateDiff.ts` para calcular diferencias entre fechas.

La funcion `calcularDiferenciaDias` valida entradas y devuelve `number` con contrato claro, reduciendo errores por conversiones de fecha no controladas.

## 6) Exhaustividad con `never` (Modulo 2)

En `Modulo-2/src/domain/types/matricula.ts`, la funcion `generarReporte(estado: EstadoMatricula)` usa una union discriminada y un `default` con variable `never`:

- si en el futuro se agrega un nuevo estado y no se contempla en el `switch`, TypeScript marca error de compilacion.

Esto convierte un posible bug de negocio en una alerta temprana durante desarrollo.

## 7) Comparacion contra JavaScript sin tipado

Si el mismo proyecto se construyera en JavaScript puro, habria mayor riesgo de:

- props o claves mal escritas,
- estados incompletos no controlados,
- exposicion accidental de campos sensibles,
- branches no contemplados al crecer reglas de negocio.

Con TypeScript, estos problemas se detectan antes de ejecutar la aplicacion, disminuyendo costo de correccion y probabilidad de fallos en produccion.

## 8) Verificacion final

Se valido integridad tipada con:

```bash
npx tsc --noEmit
```

Resultado esperado: `0` errores de tipos en el proyecto.
