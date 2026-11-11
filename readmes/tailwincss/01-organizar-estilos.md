# Tailwind CSS 4 – Organización de estilos y directivas

## Índice

1. [Introducción](#1-introducción)
2. [Organización de archivos](#2-organización-de-archivos)
3. [Directiva `@import`](#3-directiva-import)
4. [Directiva `@layer`](#4-directiva-layer)
  - [@layer base](#41-layer-base)
  - [@layer components](#42-layer-components)
  - [@layer utilities](#43-layer-utilities)
5. [Directiva `@apply`](#5-directiva-apply)
6. [Directiva `@reference`](#6-directiva-reference)
7. [Diferencias entre las directivas](#7-diferencias-entre-las-directivas)
8. [Ejemplo práctico en Angular](#8-ejemplo-práctico-en-angular)
9. [Buenas prácticas](#9-buenas-prácticas)

---

## 1. Introducción

Tailwind CSS es un framework CSS basado en clases de utilidad (*utility-first*).

En lugar de escribir reglas CSS tradicionales para cada elemento, utilizamos clases que representan propiedades concretas.

Por ejemplo:

```html
<button class="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white">
  Guardar
</button>
```

Sin embargo, cuando una aplicación crece, repetir las mismas clases en muchos componentes puede dificultar el mantenimiento.

Tailwind CSS 4 proporciona diferentes directivas para organizar y reutilizar estilos:

| Directiva | Función |
|---|---|
| `@import` | Importa Tailwind CSS y otros archivos CSS. |
| `@layer` | Organiza estilos en capas. |
| `@apply` | Aplica utilidades Tailwind dentro de reglas CSS. |
| `@reference` | Comparte el contexto de Tailwind sin volver a generar sus estilos. |

## 2. Organización de archivos

Para una aplicación Angular, podemos separar los estilos globales por responsabilidad.

```text
src/
├── styles.css
└── styles/
    ├── base.css
    ├── buttons.css
    ├── inputs.css
    └── forms.css
```

Responsabilidad de cada archivo:

| Archivo | Responsabilidad |
|---|---|
| `styles.css` | Punto de entrada global de Tailwind CSS. |
| `base.css` | Estilos generales de HTML y configuración visual base. |
| `buttons.css` | Estilos reutilizables de botones. |
| `inputs.css` | Estilos reutilizables de campos. |
| `forms.css` | Estilos comunes de formularios. |

## 3. Directiva `@import`

La directiva `@import` permite incorporar otros archivos CSS.

En Tailwind CSS 4, se utiliza para cargar el framework:

**src/styles.css**

```css
@import "tailwindcss";

@import "./styles/base.css";
@import "./styles/buttons.css";
@import "./styles/inputs.css";
@import "./styles/forms.css";
```

De esta forma, Angular carga un único punto de entrada global y este incorpora el resto de hojas de estilos.

**Importante:** no es necesario importar `tailwindcss` en cada archivo. Se importa una sola vez desde la hoja global.

## 4. Directiva `@layer`

`@layer` permite organizar las reglas CSS en diferentes capas.

Tailwind CSS utiliza tres capas principales:

- `base`: estilos fundamentales.
- `components`: componentes visuales reutilizables.
- `utilities`: utilidades CSS personalizadas.

### 4.1. @layer base

Se utiliza para definir los estilos generales de la aplicación.

Normalmente afecta a elementos HTML como `body`, `h1`, `h2`, `input`, `select` o `textarea`.

**base.css**

```css
@layer base {
  body {
    @apply min-h-screen bg-slate-50 text-slate-900 antialiased;
  }

  html.dark body {
    @apply bg-slate-950 text-slate-100;
  }

  h1 {
    @apply text-2xl font-bold tracking-tight;
  }

  h2 {
    @apply text-lg font-semibold;
  }

  input,
  select,
  textarea {
    @apply rounded-lg border border-slate-300 bg-white px-3 py-2
      text-slate-900 outline-none transition
      focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20;
  }

  html.dark input,
  html.dark select,
  html.dark textarea {
    @apply border-slate-700 bg-slate-900 text-slate-100;
  }
}
```

Ahora todos los elementos `h1` tendrán el mismo estilo sin necesidad de añadir clases Tailwind individualmente.

### 4.2. @layer components

Se utiliza para definir clases CSS reutilizables que representan componentes visuales.

Por ejemplo:

- Botones.
- Tarjetas.
- Etiquetas.
- Paneles.
- Elementos de navegación.

**buttons.css**

```css
@layer components {
  .button {
    @apply rounded-xl bg-indigo-600 px-6 py-3
      font-semibold text-white transition;
  }

  .button:hover {
    @apply bg-indigo-700;
  }

  .button:disabled {
    @apply cursor-not-allowed opacity-50;
  }

  .button-danger {
    @apply rounded-xl bg-red-600 px-6 py-3
      font-semibold text-white transition;
  }

  .button-danger:hover {
    @apply bg-red-700;
  }
}
```

Utilización:

```html
<button class="button">
  Guardar
</button>

<button class="button-danger">
  Eliminar
</button>
```

La ventaja es que centralizamos el diseño y evitamos repetir las mismas utilidades en diferentes plantillas.

### 4.3. @layer utilities

Se utiliza para crear utilidades CSS propias que pueden combinarse con otras clases.

Por ejemplo:

```css
@layer utilities {
  .content-auto {
    content-visibility: auto;
  }

  .text-balance {
    text-wrap: balance;
  }
}
```

Utilización:

```html
<div class="content-auto">
  Contenido
</div>
```

A diferencia de `components`, estas clases suelen representar una propiedad o comportamiento concreto, no un componente visual completo.

## 5. Directiva `@apply`

`@apply` permite utilizar clases de utilidad de Tailwind dentro de una regla CSS convencional.

Es especialmente útil cuando necesitamos reutilizar un conjunto de clases.

Por ejemplo, en lugar de repetir:

```html
<button class="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition">
  Guardar
</button>
```

Podemos definir:

```css
.button {
  @apply rounded-xl bg-indigo-600 px-6 py-3
    font-semibold text-white transition;
}
```

Y utilizar:

```html
<button class="button">
  Guardar
</button>
```

### Ventajas de @apply

- Evita repetir clases.
- Centraliza los estilos.
- Facilita los cambios de diseño.
- Mantiene las plantillas HTML más limpias.

**Recomendación:** utilizar `@apply` cuando exista una combinación de estilos que se repita o represente un patrón visual reutilizable. No es necesario convertir cada elemento en una clase CSS propia.

## 6. Directiva `@reference`

Esta directiva es especialmente importante cuando trabajamos con Angular y hojas CSS independientes.

En Tailwind CSS 4, cada hoja de estilos puede procesarse de manera independiente.

Por ejemplo, tenemos:

```text
src/
├── styles.css
└── app/
    └── features/
        └── permissions/
            └── create/
                ├── create-permission.component.ts
                ├── create-permission.component.html
                └── create-permission.component.css
```

La hoja global `styles.css` importa Tailwind:

```css
@import "tailwindcss";
```

Sin embargo, si queremos utilizar `@apply` dentro de `create-permission.component.css`, necesitamos proporcionar a Tailwind el contexto de la hoja global.

Para ello utilizamos `@reference`.

**create-permission.component.css**

```css
@reference "../../../../styles.css";

.permission-form {
  @apply rounded-xl border border-slate-200 bg-white p-6 shadow-sm;
}
```

La ruta debe ser relativa al archivo CSS donde se utiliza `@reference`.

### ¿Qué hace exactamente @reference?

- Permite acceder al tema y las variables de Tailwind.
- Permite utilizar las utilidades de Tailwind mediante `@apply`.
- Permite acceder a las variantes y demás definiciones disponibles en la hoja referenciada.
- No vuelve a generar ni importar los estilos globales.

**Importante:** `@reference` no sustituye a `@import`.

| Directiva | Comportamiento |
|---|---|
| `@import "tailwindcss"` | Incorpora Tailwind y genera sus estilos. |
| `@reference "../styles.css"` | Comparte el contexto de Tailwind sin duplicar la salida CSS. |

### ¿Cuándo utilizar @reference?

| Ubicación | ¿Necesita @reference? |
|---|---|
| `src/styles.css` | No. |
| `src/styles/buttons.css`, importado desde el CSS global | No, si se procesa como parte de la hoja global. |
| `src/app/component/component.css` | Sí, si utiliza directivas o utilidades que necesitan el contexto de Tailwind. |

## 7. Diferencias entre las directivas

| Directiva | Objetivo | Ejemplo |
|---|---|---|
| `@import` | Incorporar archivos CSS | `@import "tailwindcss";` |
| `@layer base` | Estilos fundamentales | `body`, `h1`, `input` |
| `@layer components` | Patrones visuales reutilizables | `.button`, `.card` |
| `@layer utilities` | Utilidades personalizadas | `.content-auto` |
| `@apply` | Reutilizar utilidades Tailwind | `@apply rounded-xl;` |
| `@reference` | Compartir el contexto de Tailwind | `@reference "../styles.css";` |

### ¿Es obligatorio utilizar @layer?

No.

También podemos escribir directamente:

```css
.button {
  @apply rounded-xl bg-indigo-600 px-6 py-3 text-white;
}
```

O utilizar:

```css
@layer components {
  .button {
    @apply rounded-xl bg-indigo-600 px-6 py-3 text-white;
  }
}
```

Ambas opciones funcionan, pero hay una diferencia en la cascada CSS:

- Las reglas incluidas en una capa participan en el orden de prioridad de las capas.
- Las reglas normales que están fuera de cualquier capa tienen prioridad sobre las reglas normales dentro de una capa.

Por eso conviene mantener una organización coherente y evitar mezclar estilos en capas y fuera de ellas sin una razón.

## 8. Ejemplo práctico en Angular

Vamos a aplicar todo lo anterior a una aplicación Angular.

### 8.1. Estilos globales

**src/styles.css**

```css
@import "tailwindcss";

@import "./styles/base.css";
@import "./styles/buttons.css";
@import "./styles/inputs.css";
```

### 8.2. Estilos base

**src/styles/base.css**

```css
@layer base {
  body {
    @apply min-h-screen bg-slate-50 text-slate-900 antialiased;
  }

  html.dark body {
    @apply bg-slate-950 text-slate-100;
  }
}
```

### 8.3. Estilos de botones

**src/styles/buttons.css**

```css
@layer components {
  .button {
    @apply rounded-xl bg-indigo-600 px-6 py-3
      font-semibold text-white transition;
  }

  .button:hover {
    @apply bg-indigo-700;
  }

  .button:disabled {
    @apply cursor-not-allowed opacity-50;
  }
}
```

### 8.4. Utilización en un componente Angular

**create-permission.component.html**

```html
<footer class="flex justify-end border-t border-slate-200 pt-6 dark:border-slate-700">
  <button
    type="submit"
    [disabled]="permissionForm.invalid"
    class="button">
    {{ 'common.btn.save' | translate }}
  </button>
</footer>
```

El botón utiliza la clase global `.button`, que se ha definido en `buttons.css` y cargado desde `styles.css`.

No necesitamos `@reference` en el CSS del componente porque no estamos utilizando `@apply` en él.

## 9. Buenas prácticas

Para mantener una arquitectura CSS organizada en Angular + Tailwind CSS 4:

1. Importar Tailwind una sola vez desde `styles.css`.
2. Separar los estilos globales por responsabilidad.
3. Utilizar `@layer base` para estilos generales de HTML.
4. Utilizar `@layer components` para patrones visuales reutilizables.
5. Utilizar `@layer utilities` para pequeñas utilidades CSS personalizadas.
6. Utilizar `@apply` cuando exista una combinación de clases que merezca reutilizarse.
7. Utilizar `@reference` en hojas CSS independientes que necesiten acceder al contexto de Tailwind.
8. Mantener los estilos específicos de cada componente junto a su propio CSS.
9. Evitar duplicar clases o definir estilos globales que afecten accidentalmente a otros componentes.

### Resumen de arquitectura

```text
src/
│
├── styles.css
│
├── styles/
│   ├── base.css
│   ├── buttons.css
│   ├── inputs.css
│   └── forms.css
│
└── app/
    └── features/
        └── permissions/
            └── create/
                ├── create-permission.component.ts
                ├── create-permission.component.html
                └── create-permission.component.css
```

Esta organización permite mantener los estilos globales centralizados y los estilos específicos dentro de sus respectivos componentes Angular.
