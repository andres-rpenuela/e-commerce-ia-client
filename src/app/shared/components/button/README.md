# Shared Button Component

Componente transversal encargado de representar botones reutilizables en la aplicación.

Su objetivo es centralizar la presentación visual, los iconos, los tamaños, las variantes y los tooltips, dejando la lógica de negocio en el componente padre.

## Índice

1. [Características](#1-características)
2. [Inputs disponibles](#2-inputs-disponibles)
3. [Variantes](#3-variantes)
4. [Tamaños](#4-tamaños)
5. [Iconos](#5-iconos)
6. [Tooltip](#6-tooltip)
7. [Ejemplos de utilización](#7-ejemplos-de-utilización)
8. [Eventos y lógica de negocio](#8-eventos-y-lógica-de-negocio)
9. [Buenas prácticas](#9-buenas-prácticas)
10. [Resumen + Ejemplos](#10-resumen--ejemplos)
11. [SVG e iconos personalizados](#11-svg-e-iconos-personalizados)
---

## 1. Características

El componente permite:

- Mostrar botones con texto.
- Mostrar botones con iconos.
- Combinar iconos y texto.
- Mostrar botones únicamente con iconos.
- Elegir entre diferentes variantes visuales.
- Configurar el tamaño.
- Deshabilitar el botón.
- Mostrar tooltips al pasar el ratón o recibir el foco.
- Emitir eventos al pulsarlo.

La lógica de negocio siempre corresponde al componente padre.

## 2. Inputs disponibles

| Input | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `label` | `string` | `''` | Texto del botón. |
| `icon` | `string \| null` | `null` | Clases CSS del icono. |
| `tooltip` | `string` | `''` | Texto emergente. |
| `variant` | `ButtonVariant` | `'primary'` | Variante visual. |
| `size` | `ButtonSize` | `'md'` | Tamaño del botón. |
| `disabled` | `boolean` | `false` | Deshabilita la interacción. |

### Evento disponible

| Output | Tipo | Descripción |
|---|---|---|
| `clicked` | `void` | Se emite cuando el usuario pulsa el botón. |

## 3. Variantes

El input `variant` permite seleccionar la apariencia del botón.

| Variante | Clase CSS | Uso recomendado |
|---|---|---|
| `primary` | `button-primary` | Acción principal. |
| `secondary` | `button-secondary` | Acción secundaria. |
| `success` | `button-success` | Confirmar o añadir. |
| `danger` | `button-danger` | Eliminar o realizar acciones destructivas. |
| `ghost` | `button-ghost` | Acciones discretas. |

### Ejemplos

```html
<!-- Acción principal -->
<shared-button
  label="btn.label.save"
  variant="primary"
/>

<!-- Acción secundaria -->
<shared-button
  label="btn.label.cancel"
  variant="secondary"
/>

<!-- Acción de confirmación -->
<shared-button
  label="btn.label.accept"
  variant="success"
/>

<!-- Acción destructiva -->
<shared-button
  label="btn.label.delete"
  variant="danger"
/>

<!-- Acción discreta -->
<shared-button
  label="btn.label.edit"
  variant="ghost"
/>
```

## 4. Tamaños

El input `size` permite adaptar el botón al espacio disponible y al contexto de uso.

| Tamaño | Valor | Uso |
|---|---|---|
| Pequeño | `sm` | Tablas y acciones compactas. |
| Mediano | `md` | Uso general. |
| Grande | `lg` | Formularios y acciones destacadas. |

### Ejemplos

```html
<shared-button label="Pequeño" size="sm" />
<shared-button label="Mediano" size="md" />
<shared-button label="Grande" size="lg" />
```

## 5. Iconos

El componente admite iconos mediante Font Awesome y SVG.

### 5.1. Font Awesome

Para utilizar Font Awesome, se indican las clases CSS del icono.

Catálogo oficial:

https://fontawesome.com/icons

Ejemplos:

```html
<!-- Añadir -->
<shared-button
  icon="fa-solid fa-plus"
  label="btn.label.add"
/>

<!-- Editar -->
<shared-button
  icon="fa-solid fa-pen"
  label="btn.label.edit"
/>

<!-- Eliminar -->
<shared-button
  icon="fa-solid fa-trash"
  label="btn.label.delete"
/>

<!-- Guardar -->
<shared-button
  icon="fa-solid fa-floppy-disk"
  label="btn.label.save"
/>

<!-- Buscar -->
<shared-button
  icon="fa-solid fa-magnifying-glass"
  label="btn.label.search"
/>
```

### 5.2. SVG

También podemos utilizar SVG para iconos propios o personalizados.

Ejemplo:

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

Para SVG personalizado, es preferible proyectar el contenido SVG mediante `ng-content` o disponer de una API específica para iconos. No debemos pasar código SVG como una cadena de clases CSS.

## 6. Tooltip

El input `tooltip` permite mostrar una descripción cuando el usuario pasa el ratón por encima del botón o navega hasta él mediante teclado.

Es especialmente útil cuando el botón solo contiene un icono.

```html
<shared-button
  icon="fa-solid fa-trash"
  tooltip="btn.tooltip.delete"
  variant="danger"
/>
```

Ejemplos de claves:

```json
{
  "btn": {
    "tooltip": {
      "add": "Añadir",
      "edit": "Editar",
      "delete": "Eliminar",
      "save": "Guardar"
    }
  }
}
```

Cuando se muestra el texto del botón, normalmente no necesitamos repetirlo en el tooltip.

## 7. Ejemplos de utilización

### 7.1. Botón con texto

```html
<shared-button
  label="btn.label.save"
  variant="primary"
  size="md"
  (clicked)="save()"
/>
```

### 7.2. Botón con icono y texto

```html
<shared-button
  icon="fa-solid fa-plus"
  label="btn.label.translation.add"
  variant="success"
  size="sm"
  (clicked)="addTranslation()"
/>
```

### 7.3. Botón solo con icono

```html
<shared-button
  icon="fa-solid fa-trash"
  tooltip="btn.tooltip.translation.delete"
  variant="danger"
  size="sm"
  (clicked)="removeTranslation()"
/>
```

### 7.4. Botón deshabilitado

```html
<shared-button
  icon="fa-solid fa-floppy-disk"
  label="btn.label.save"
  variant="primary"
  [disabled]="!form.valid"
/>
```

### 7.5. Botones en una tabla

```html
<div class="flex items-center gap-2">

  <shared-button
    icon="fa-solid fa-pen"
    tooltip="btn.tooltip.edit"
    variant="ghost"
    size="sm"
    (clicked)="edit()"
  />

  <shared-button
    icon="fa-solid fa-trash"
    tooltip="btn.tooltip.delete"
    variant="danger"
    size="sm"
    (clicked)="delete()"
  />

</div>
```

### 7.6. Botones en un formulario

```html
<div class="flex justify-end gap-3">

  <shared-button
    label="btn.label.cancel"
    variant="secondary"
    (clicked)="cancel()"
  />

  <shared-button
    icon="fa-solid fa-floppy-disk"
    label="btn.label.save"
    variant="primary"
    [disabled]="!form.valid"
    (clicked)="save()"
  />

</div>
```

## 8. Eventos y lógica de negocio

El componente compartido no debe implementar operaciones específicas del dominio.

Por ejemplo, si necesitamos añadir una traducción:

```typescript
addTranslation(): void {
  // Lógica para añadir una traducción.
}
```

Y desde la plantilla:

```html
<shared-button
  icon="fa-solid fa-plus"
  label="btn.label.translation.add"
  variant="success"
  (clicked)="addTranslation()"
/>
```

De esta forma:

- `SharedButton` representa el botón.
- El componente padre controla la acción.
- `clicked` comunica la interacción.

## 9. Buenas prácticas

1. Utilizar `primary` para la acción principal de cada contexto.
2. Utilizar `danger` únicamente para acciones destructivas.
3. Utilizar botones solo con iconos cuando el espacio sea reducido.
4. Añadir siempre un `tooltip` a los botones que solo muestran iconos.
5. Evitar repetir el texto del botón en el tooltip.
6. Utilizar claves de traducción en lugar de textos fijos.
7. Mantener la lógica de negocio fuera del componente compartido.
8. Utilizar SVG para iconos propios y Font Awesome para iconos habituales.
9. Deshabilitar el botón cuando la acción no esté disponible.
10. Mantener las variantes y tamaños centralizados en los estilos globales.

---

## 10. Resumen + Ejemplos

**Resumen:** `SharedButton` es un componente visual reutilizable. Mediante sus inputs podemos controlar su apariencia y contenido, mientras que su output `clicked` permite que el componente padre gestione la acción correspondiente.

### Ejemplos de uso de `shared-button`

1\. Botón principal con texto

```
<shared-button
  label="COMMON.SAVE"
  variant="primary"
  size="md"
/>
```

2\. Botón con icono y texto

```
<shared-button
  label="COMMON.ADD"
  icon="fa-solid fa-plus"
  variant="success"
/>
```

3\. Botón solo con icono y tooltip

```
<shared-button
  icon="fa-solid fa-pen"
  tooltip="COMMON.EDIT"
  variant="ghost"
  size="sm"
/>
```

4\. Botón de eliminar con tooltip

```
<shared-button
  icon="fa-solid fa-trash"
  tooltip="COMMON.DELETE"
  variant="danger"
/>
```

5\. Botón secundario con tooltip y texto

```
<shared-button
  label="COMMON.CANCEL"
  tooltip="COMMON.CANCEL_DESCRIPTION"
  variant="secondary"
/>
```

6\. Botón para enviar un formulario

```
<shared-button
  label="COMMON.SAVE"
  icon="fa-solid fa-floppy-disk"
  type="submit"
  variant="primary"
  [disabled]="!form.valid"
/>
```

7\. Botón deshabilitado

```
<shared-button
  label="COMMON.PUBLISH"
  icon="fa-solid fa-upload"
  variant="primary"
  [disabled]="true"
/>
```

8\. Botón con evento

```
<shared-button
  label="COMMON.EDIT"
  icon="fa-solid fa-pen"
  tooltip="COMMON.EDIT"
  variant="secondary"
  (clicked)="editItem()"
/>
```

### Ejemplo en una tabla de acciones

```
<shared-button
  icon="fa-solid fa-eye"
  tooltip="COMMON.VIEW"
  variant="ghost"
  size="sm"
  (clicked)="viewItem(item.id)"
/>

<shared-button
  icon="fa-solid fa-pen"
  tooltip="COMMON.EDIT"
  variant="ghost"
  size="sm"
  (clicked)="editItem(item.id)"
/>

<shared-button
  icon="fa-solid fa-trash"
  tooltip="COMMON.DELETE"
  variant="danger"
  size="sm"
  (clicked)="deleteItem(item.id)"
/>
```

### Variantes disponibles

| Input      | Valores                                              |
| ---------- | ---------------------------------------------------- |
| `variant`  | `primary`, `secondary`, `success`, `danger`, `ghost` |
| `size`     | `sm`, `md`, `lg`                                     |
| `type`     | `button`, `submit`, `reset`                          |
| `icon`     | Clase de Font Awesome                                |
| `label`    | Clave de traducción                                  |
| `tooltip`  | Clave de traducción                                  |
| `disabled` | `true`, `false`                                      |

Consejo: en botones que solo muestran un icono, utiliza siempre `tooltip` para que el usuario pueda identificar su acción y para proporcionar el nombre accesible mediante `aria-label`.


## 11. SVG e iconos personalizados

El componente `shared-button` admite tres formas de representar iconos:

1. **Template SVG (`svg`):** permite pasar una plantilla Angular mediante `TemplateRef`.
2. **SVG String (`svgString`):** permite utilizar SVG almacenados como constantes en archivos TypeScript.
3. **Font Awesome (`icon`):** permite utilizar clases CSS de Font Awesome u otras librerías compatibles.

### Prioridad de representación

Si se proporcionan varias opciones, el componente utiliza la primera disponible:

**`svg` → `svgString` → `icon`**

### 11.1. SVG mediante TemplateRef

Permite definir el SVG directamente en una plantilla HTML utilizando `ng-template`.

```html
<ng-template #saveIcon>
  <svg
    viewBox="0 0 24 24"
    class="icon-svg"
    fill="none"
    stroke="currentColor"
    stroke-width="2">
    <path d="M5 12l4 4L19 6" />
  </svg>
</ng-template>

<shared-button
  [svg]="saveIcon"
  label="COMMON.SAVE"
  variant="primary"
/>
```

### 11.2. SVG mediante constantes TypeScript

Permite centralizar los SVG en archivos TypeScript y reutilizarlos en diferentes componentes.

**icons.ts**

```typescript
export const INSERT_ROW_ARROW = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  aria-hidden="true">
  <path
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M3 9V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44771 1 1v3"
  />
</svg>
`;
```

**Componente TypeScript**

```typescript
import { INSERT_ROW_ARROW } from '@shared/icons/icons';

readonly insertRowIcon = INSERT_ROW_ARROW;
```

**Plantilla HTML**

```html
<shared-button
  [svgString]="insertRowIcon"
  tooltip="TABLE.INSERT_ROW"
  variant="ghost"
/>
```

### 11.3. Font Awesome

Permite utilizar directamente las clases de Font Awesome.

```html
<shared-button
  icon="fa-solid fa-trash"
  tooltip="COMMON.DELETE"
  variant="danger"
/>
```

También se puede combinar con texto:

```html
<shared-button
  icon="fa-solid fa-plus"
  label="COMMON.ADD"
  variant="success"
/>
```

### 11.4. Prioridad entre iconos

Si se proporcionan simultáneamente varias opciones, prevalece el SVG de mayor prioridad.

```html
<shared-button
  [svgString]="insertRowIcon"
  icon="fa-solid fa-plus"
  label="COMMON.ADD"
  variant="primary"
/>
```

En este ejemplo se muestra `insertRowIcon` y se ignora el icono de Font Awesome.

### 11.5. Recomendaciones

- Utilizar `svg` cuando el icono esté definido como plantilla Angular.
- Utilizar `svgString` cuando se quiera centralizar y reutilizar SVG en archivos TypeScript.
- Utilizar `icon` para iconos estándar de Font Awesome.
- Preferir `currentColor` en los SVG para adaptar automáticamente el color al botón.
- Mantener los SVG como contenido estático y de confianza.
- No utilizar SVG proporcionados directamente por usuarios sin validación y sanitización adecuadas.

**Nota de seguridad:** Angular sanitiza el contenido insertado mediante `[innerHTML]`. No utilizar `bypassSecurityTrustHtml` para evitar esa protección sin una necesidad justificada y una validación adecuada del contenido.
