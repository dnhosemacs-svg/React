export interface Asignatura {
    readonly id: string;     // ID inmutable
    codigo: string;          // ej. "MAT-101"
    nombre: string;          // ej. "Matemáticas I"
    creditos: number;        // ej. 6
    curso: 1 | 2 | 3 | 4;    // curso académico (unión literal)
    activa: boolean;         // disponible o no
  }