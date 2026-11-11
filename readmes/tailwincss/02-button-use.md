# Sistema de botones reutilizables con Tailwind CSS 4

## Índice

1. [Objetivo](#1-objetivo)
2. [Estructura de archivos](#2-estructura-de-archivos)
3. [Configuración de Tailwind y @reference](#3-configuración-de-tailwind-y-reference)
4. [Estilos globales de botones](#4-estilos-globales-de-botones)
5. [Variantes disponibles](#5-variantes-disponibles)
6. [Tamaños disponibles](#6-tamaños-disponibles)
7. [Botones con iconos](#7-botones-con-iconos)
8. [Ejemplos de utilización](#8-ejemplos-de-utilización)
9. [Integración con SharedButton en Angular](#9-integración-con-sharedbutton-en-angular)
10. [Buenas prácticas](#10-buenas-prácticas)

---

## 1. Objetivo

Crear un sistema de botones reutilizables que mantenga una identidad visual coherente en toda la aplicación.

La idea es separar tres responsabilidades:

- **Estilos:** definen la apariencia de los botones.
- **Componente compartido:** representa el botón y recibe sus propiedades.
- **Componente padre:** decide qué acción ejecutar cuando se pulsa.

De esta forma, podemos modificar la apariencia de todos los botones sin tener que modificar cada componente que los utiliza.

## 2. Estructura de archivos

Propuesta de organización:

```text
src/
├── styles.css
│
├── styles/
│   ├── base.css
│   ├── buttons.css
│   ├── inputs.css
│   └── forms.css
│
└── app/
    └── shared/
        └── components/
            └── button/
                ├── button.component.ts
                ├── button.component.html
                └── button.component.css
```

### Responsabilidad de cada archivo

| Archivo | Responsabilidad |
|---|---|
| `styles.css` | Punto de entrada de estilos globales |
| `buttons.css` | Sistema visual de botones |
| `button.component.ts` | Propiedades y eventos del botón |
| `button.component.html` | Estructura HTML |
| `button.component.css` | Estilos exclusivos del componente |

## 3. Configuración de Tailwind y @reference

En Tailwind CSS 4 utilizamos `@import` para cargar Tailwind y nuestros estilos globales.

### styles.css

```css
@import "../../node_modules/tailwindcss";

@import "./styles/base.css";
@import "./styles/buttons.css";
@import "./styles/inputs.css";
@import "./styles/forms.css";
```

### ¿Qué hace @reference?

Cuando utilizamos `@apply` en una hoja CSS de un componente procesada de forma independiente, podemos necesitar `@reference` para proporcionar el contexto de Tailwind.

```css
/* Configuración estándar */
@reference "tailwindcss";

/* O utilizando los estilos globales del proyecto */
/* @reference "../styles.css"; */
```

**Importante:** `@reference` no importa estilos visuales ni hace que los estilos encapsulados de un componente se propaguen a otros.

Por ejemplo:

- Los estilos de `buttons.css`, importados globalmente, están disponibles en toda la aplicación.
- Los estilos de `button.component.css` pertenecen al componente `SharedButton`.
- Los estilos de `create-permission.component.css` pertenecen al componente de creación de permisos.

## 4. Estilos globales de botones

Archivo: `src/styles/buttons.css`

```css
@layer components {

  /* =====================================================
     BUTTON BASE
     ===================================================== */

  .button {
    @apply inline-flex items-center justify-center gap-2
    rounded-lg border border-transparent
    px-4 py-2.5
    text-sm font-semibold
    transition-all duration-200 ease-in-out
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50;
  }

  /* =====================================================
     BUTTON VARIANTS
     ===================================================== */

  .button-primary {
    @apply bg-indigo-600 text-white
    hover:bg-indigo-700
    active:bg-indigo-800
    focus-visible:ring-indigo-500;
  }

  .button-secondary {
    @apply border-slate-300 bg-white text-slate-700
    hover:bg-slate-100
    active:bg-slate-200
    focus-visible:ring-slate-400;
  }

  .button-success {
    @apply bg-emerald-600 text-white
    hover:bg-emerald-700
    active:bg-emerald-800
    focus-visible:ring-emerald-500;
  }

  .button-danger {
    @apply bg-red-600 text-white
    hover:bg-red-700
    active:bg-red-800
    focus-visible:ring-red-500;
  }

  .button-ghost {
    @apply bg-transparent text-slate-600
    hover:bg-slate-100
    active:bg-slate-200
    focus-visible:ring-slate-400;
  }

  /* =====================================================
     BUTTON SIZES
     ===================================================== */

  .button-sm {
    @apply gap-1.5 rounded-md px-3 py-1.5 text-xs;
  }

  .button-md {
    @apply px-4 py-2.5 text-sm;
  }

  .button-lg {
    @apply gap-2.5 px-6 py-3 text-base;
  }

  /* =====================================================
     BUTTON ICON
     ===================================================== */

  .button-icon {
    @apply inline-flex size-9 shrink-0
    items-center justify-center
    rounded-lg border border-transparent
    text-base transition-all duration-200
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50;
  }

  .button-icon-primary {
    @apply bg-indigo-50 text-indigo-600
    hover:bg-indigo-100
    active:bg-indigo-200
    focus-visible:ring-indigo-500;
  }

  .button-icon-success {
    @apply bg-emerald-50 text-emerald-600
    hover:bg-emerald-100
    active:bg-emerald-200
    focus-visible:ring-emerald-500;
  }

  .button-icon-danger {
    @apply bg-red-50 text-red-600
    hover:bg-red-100
    active:bg-red-200
    focus-visible:ring-red-500;
  }

  .button-icon-ghost {
    @apply bg-transparent text-slate-500
    hover:bg-slate-100 hover:text-slate-800
    active:bg-slate-200
    focus-visible:ring-slate-400;
  }

  /* =====================================================
     ICONS: FONT AWESOME AND SVG
     ===================================================== */

  .button .icon,
  .button-icon .icon {
    @apply inline-flex size-4 shrink-0
    items-center justify-center;
  }

  .button .icon-svg,
  .button-icon .icon-svg {
    @apply size-4 shrink-0;
  }

  .button-icon .icon-svg {
    @apply size-5;
  }

  /* =====================================================
     DARK MODE
     ===================================================== */

  html.dark .button-secondary {
    @apply border-slate-700 bg-slate-800 text-slate-200
    hover:bg-slate-700 active:bg-slate-600;
  }

  html.dark .button-ghost {
    @apply text-slate-300
    hover:bg-slate-800 hover:text-white
    active:bg-slate-700;
  }

  html.dark .button-icon-ghost {
    @apply text-slate-400
    hover:bg-slate-800 hover:text-white
    active:bg-slate-700;
  }

}
```

## 5. Variantes disponibles

Todas las variantes comparten la clase base `.button`.

| Clase | Uso recomendado |
|---|---|
| `button-primary` | Acción principal |
| `button-secondary` | Acción secundaria |
| `button-success` | Confirmar o aceptar |
| `button-danger` | Eliminar o cancelar una operación destructiva |
| `button-ghost` | Acciones discretas |

### Ejemplo

```html
<button class="button button-primary">
  Guardar
</button>

<button class="button button-secondary">
  Cancelar
</button>

<button class="button button-success">
  Aceptar
</button>

<button class="button button-danger">
  Eliminar
</button>

<button class="button button-ghost">
  Volver
</button>
```

## 6. Tamaños disponibles

| Clase | Tamaño | Uso |
|---|---|---|
| `button-sm` | Pequeño | Tablas y acciones compactas |
| `button-md` | Mediano | Uso general |
| `button-lg` | Grande | Formularios y acciones destacadas |

### Ejemplo

```html
<button class="button button-primary button-sm">
  Pequeño
</button>

<button class="button button-primary button-md">
  Mediano
</button>

<button class="button button-primary button-lg">
  Grande
</button>
```

## 7. Botones con iconos

Podemos combinar Font Awesome y SVG sin modificar la estructura general de los botones.

### 7.1. Font Awesome

Instalación:

```bash
npm install @fortawesome/fontawesome-free
```

Importación en `styles.css`:

```css
@import "tailwindcss";
@import "@fortawesome/fontawesome-free/css/all.min.css";
```

Ejemplos:

```html
<!-- Añadir -->
<i class="fa-solid fa-plus icon" aria-hidden="true"></i>

<!-- Editar -->
<i class="fa-solid fa-pen icon" aria-hidden="true"></i>

<!-- Eliminar -->
<i class="fa-solid fa-trash icon" aria-hidden="true"></i>

<!-- Guardar -->
<i class="fa-solid fa-floppy-disk icon" aria-hidden="true"></i>
```

Catálogo oficial:

https://fontawesome.com/icons

### 7.2. SVG

Los SVG permiten utilizar iconos propios o personalizados.

Ejemplo de icono de confirmación:

```html
<svg
  class="icon-svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  aria-hidden="true">

  <path d="M5 12l4 4L19 6" />

</svg>
```

La propiedad `currentColor` permite que el SVG herede el color del texto del botón.

No necesitamos definir un color fijo en el SVG.

## 8. Ejemplos de utilización

### 8.1. Botón principal con Font Awesome

```html
<button class="button button-primary">
  <i
    class="fa-solid fa-floppy-disk icon"
    aria-hidden="true">
  </i>

  Guardar
</button>
```

### 8.2. Botón de éxito con SVG

```html
<button class="button button-success">

  <svg
    class="icon-svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    aria-hidden="true">

    <path d="M5 12l4 4L19 6" />

  </svg>

  Aceptar

</button>
```

### 8.3. Botón de icono para añadir

```html
<button
  type="button"
  class="button-icon button-icon-success"
  aria-label="Añadir traducción">

  <i class="fa-solid fa-plus icon" aria-hidden="true"></i>

</button>
```

### 8.4. Botón de icono para eliminar

```html
<button
  type="button"
  class="button-icon button-icon-danger"
  aria-label="Eliminar traducción">

  <i class="fa-solid fa-trash icon" aria-hidden="true"></i>

</button>
```

### 8.5. Combinación de acciones

```html
<div class="flex items-center gap-2">

  <button class="button button-primary button-sm">
    <i class="fa-solid fa-plus icon" aria-hidden="true"></i>
    Añadir
  </button>

  <button class="button button-secondary button-sm">
    <i class="fa-solid fa-pen icon" aria-hidden="true"></i>
    Editar
  </button>

  <button class="button button-danger button-sm">
    <i class="fa-solid fa-trash icon" aria-hidden="true"></i>
    Eliminar
  </button>

</div>
```

## 9. Integración con SharedButton en Angular

La idea es que el componente compartido reciba la información visual mediante inputs y comunique la interacción mediante un output.

### button.component.ts

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  readonly icon = input<string>();
  readonly label = input<string>('');

  readonly variant = input<string>('primary');
  readonly size = input<string>('md');

  readonly disabled = input<boolean>(false);

  readonly clicked = output<void>();

}
```

### button.component.html

```html
<button
  type="button"
  class="button"
  [class.button-primary]="variant() === 'primary'"
  [class.button-secondary]="variant() === 'secondary'"
  [class.button-success]="variant() === 'success'"
  [class.button-danger]="variant() === 'danger'"
  [class.button-ghost]="variant() === 'ghost'"
  [class.button-sm]="size() === 'sm'"
  [class.button-md]="size() === 'md'"
  [class.button-lg]="size() === 'lg'"
  [disabled]="disabled()"
  (click)="clicked.emit()">

  @if (icon()) {
    <i [class]="icon() + ' icon'" aria-hidden="true"></i>
  }

  @if (label()) {
    <span>{{ label() }}</span>
  }

</button>
```

Este ejemplo utiliza Font Awesome para representar los iconos. Si también necesitas SVG dinámicos, puedes ampliar el componente con una propiedad de tipo de icono y una plantilla específica para SVG.

### Uso desde el componente padre

```html
<shared-button
  label="Añadir traducción"
  icon="fa-solid fa-plus"
  variant="success"
  size="sm"
  (clicked)="addTranslation()">
</shared-button>

<shared-button
  label="Eliminar traducción"
  icon="fa-solid fa-trash"
  variant="danger"
  size="sm"
  (clicked)="removeTranslation()">
</shared-button>

<shared-button
  label="Guardar"
  icon="fa-solid fa-floppy-disk"
  variant="primary"
  size="md"
  (clicked)="save()">
</shared-button>
```

El padre controla la lógica:

```typescript
addTranslation(): void {
  // Añadir una traducción
}

removeTranslation(): void {
  // Eliminar una traducción
}

save(): void {
  // Guardar los datos
}
```

**Importante:** en una implementación definitiva, conviene sustituir los `string` de `variant` y `size` por tipos unión para evitar valores incorrectos.

```typescript
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';
```

## 10. Buenas prácticas

1. Centralizar los estilos compartidos en `buttons.css`.
2. Utilizar variantes en lugar de crear clases para cada acción de negocio.
3. Mantener separados los estilos globales y los específicos de cada componente.
4. Utilizar Font Awesome para iconos habituales y SVG para diseños propios.
5. Utilizar `currentColor` en SVG para heredar el color del botón.
6. Añadir `aria-label` a botones que solo contienen iconos.
7. Respetar los estados `hover`, `active`, `focus-visible` y `disabled`.
8. Utilizar tipos unión en Angular para limitar las variantes y tamaños permitidos.
9. Evitar que `SharedButton` conozca la lógica de negocio.
10. Mantener una apariencia coherente en toda la aplicación.

---

## Resumen de arquitectura

```text
             COMPONENTE PADRE
                    |
                    | Inputs
                    | - label
                    | - icon
                    | - variant
                    | - size
                    | - disabled
                    |
                    v
              SHARED BUTTON
                    |
                    | Renderiza
                    v
             HTML + TAILWIND
                    |
                    +------------------+
                    |                  |
                    v                  v
               FONT AWESOME          SVG
                    |                  |
                    +--------+---------+
                             |
                             v
                       BOTÓN VISUAL
                             |
                             | Output: clicked
                             v
                     COMPONENTE PADRE
                             |
                             v
                       LÓGICA DE NEGOCIO
```

**Conclusión:** el sistema de botones debe ser una pieza transversal de la interfaz. Los estilos definen su aspecto, `SharedButton` representa el elemento y cada componente padre decide qué hacer cuando el usuario interactúa con él.
