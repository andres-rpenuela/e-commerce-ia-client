# Estilos de Elementos en Angular

Guía práctica para aplicar CSS dinámico y clases en Angular utilizando enlaces de propiedades, directivas, Signals y el nuevo flujo de control.

## Índice
1. [Clase Única Condicional `[class.nombre-clase]`](#1-clase-única-condicional-classnombre-clase)
2. [Multiples Clases Dinámicas `[ngClass]`](#2-multiples-clases-dinámicas-ngclass)
3. [Estilos Inline Dinámicos `[style.propiedad]`](#3-estilos-inline-dinámicos-stylepropiedad)
4. [Estructuras Condicionales Complejas con `@if`](#4-estructuras-condicionales-complejas-con-if)
5. [Tips de Rendimiento y Buenas Prácticas](#5-tips-de-rendimiento-y-buenas-prácticas)

---

### 1. Clase Única Condicional `[class.nombre-clase]`
Es la opción ideal y más limpia cuando solo necesitas activar o desactivar **una sola clase** basándote en una condición lógica o una Signal.

#### Ejemplo:
```html
<button [class.activo]="isButtonActive()">
  Aceptar
</button>
```

---

### 2. Multiples Clases Dinámicas `[ngClass]`
Se utiliza cuando un mismo elemento necesita reaccionar a múltiples condiciones de forma simultánea, aplicando diferentes clases según el estado.

#### Ejemplo:
```html
<div [ngClass]="{
  'alerta-exito': status() === 'success',
  'alerta-error': status() === 'error',
  'deshabilitado': isDisabled()
}">
  Mensaje del sistema
</div>
```
> **Nota:** En componentes *Standalone*, recuerda importar `NgClass` desde `@angular/common` en tu archivo `.ts`.

---

### 3. Estilos Inline Dinámicos `[style.propiedad]`
Úsalo cuando necesites modificar directamente propiedades CSS que dependen de valores calculados en tiempo de ejecución (como tamaños, posiciones o colores dinámicos).

#### Ejemplo:
```html
<div [style.width.%]="progreso()" [style.background-color]="colorFavorito()">
  Barra de Progreso
</div>
```

---

### 4. Estructuras Condicionales Complejas con `@if`
Aunque el bloque `@if` no inyecta CSS por sí mismo, es la mejor opción cuando el diseño cambia drásticamente y prefieres renderizar bloques de HTML completamente diferentes con sus propias clases fijas.

#### Ejemplo:
```html
@if (isAdmin()) {
  <div class="panel-admin jumbotron-premium">
    <!-- Vista avanzada de administrador -->
  </div>
} @else {
  <div class="panel-usuario vista-simple">
    <!-- Vista básica de usuario -->
  </div>
}
```

---

### 5. Tips de Rendimiento y Buenas Prácticas

*   **⚡ El "Efecto Signal":** Cuando utilices Angular Signals (`signal()`), recuerda siempre ejecutar la señal con paréntesis `()` en el HTML (ej: `mySignal()`). Esto asegura que Angular se suscriba a los cambios de forma reactiva y eficiente.
*   **🎨 Prefiere Clases sobre Estilos Inline:** Siempre que sea posible, define tus estilos en el archivo CSS/SCSS y alterna clases con `[class.nombre-clase]`. Modificar estilos inline con `[style]` puede sobrecargar el DOM y dificultar el mantenimiento.
*   **🧼 Evita funciones pesadas en la plantilla:** Si usas sintaxis antigua o no usas signals, nunca pases una función compleja a `[class]`. Angular la ejecutará en cada ciclo de detección de cambios, ralentizando la aplicación. Con Signals este problema desaparece ya que están optimizadas.
