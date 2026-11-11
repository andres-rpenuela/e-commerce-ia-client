# Font Awesome en Angular 22

## Índice

1. [¿Qué es Font Awesome?](#1-qué-es-font-awesome)
2. [Instalación](#2-instalación)
3. [Configuración en Angular](#3-configuración-en-angular)
4. [Dónde consultar los iconos](#4-dónde-consultar-los-iconos)
5. [Cómo utilizar los iconos](#5-cómo-utilizar-los-iconos)
6. [Integración con SharedButton](#6-integración-con-sharedbutton)
7. [Personalización mediante CSS](#7-personalización-mediante-css)
8. [Buenas prácticas y consejos](#8-buenas-prácticas-y-consejos)

---

## 1. ¿Qué es Font Awesome?

[Font Awesome](https://fontawesome.com/) es una biblioteca de iconos que permite incorporar iconografía a nuestras aplicaciones mediante clases CSS.

Por ejemplo:

- `fa-plus`: añadir.
- `fa-minus`: eliminar.
- `fa-pen`: editar.
- `fa-trash`: borrar.
- `fa-floppy-disk`: guardar.
- `fa-magnifying-glass`: buscar.

En lugar de crear manualmente cada icono con SVG, podemos utilizar las clases que proporciona la biblioteca.

## 2. Instalación

Para utilizar Font Awesome mediante clases CSS, instalamos su paquete gratuito:

```bash
npm install @fortawesome/fontawesome-free
```

Este paquete incluye:

- Iconos gratuitos.
- Hojas de estilos CSS.
- Fuentes necesarias para representar los iconos.

**Importante:** No es necesario instalar `@fortawesome/angular-fontawesome` para utilizar iconos mediante etiquetas HTML y clases CSS.

## 3. Configuración en Angular

En Angular 22 podemos importar la hoja de estilos de Font Awesome desde nuestro archivo global `src/styles.css`.

```css
@import "tailwindcss";
@import "@fortawesome/fontawesome-free/css/all.min.css";

/* Estilos globales de la aplicación */
@import "./styles/base.css";
@import "./styles/buttons.css";
@import "./styles/inputs.css";
@import "./styles/forms.css";
```

Con esta configuración, Font Awesome estará disponible en todos los componentes de la aplicación.

No necesitamos importar sus estilos en cada componente.

## 4. Dónde consultar los iconos

El catálogo oficial permite buscar iconos por nombre, categoría y estilo.

**Web oficial:** https://fontawesome.com/icons

Al seleccionar un icono podemos consultar su nombre y las clases necesarias para utilizarlo.

Por ejemplo, al buscar `plus` encontraremos el icono de añadir.

<https://fontawesome.com/icons/plus?f=classic&s=solid>

### Estilos disponibles

Font Awesome dispone de diferentes estilos:

| Estilo | Clase | Descripción |
|---|---|---|
| Solid | `fa-solid` | Iconos rellenos |
| Regular | `fa-regular` | Iconos de estilo normal |
| Brands | `fa-brands` | Marcas y redes sociales |

La disponibilidad de cada estilo depende del icono y de la versión gratuita o Pro.

## 5. Cómo utilizar los iconos

Una vez instalada y configurada la biblioteca, podemos utilizar sus clases directamente en HTML.

### Ejemplo básico

```html
<i class="fa-solid fa-plus"></i>
```

### Algunos ejemplos habituales

```html
<!-- Añadir -->
<i class="fa-solid fa-plus"></i>

<!-- Eliminar -->
<i class="fa-solid fa-minus"></i>

<!-- Editar -->
<i class="fa-solid fa-pen"></i>

<!-- Guardar -->
<i class="fa-solid fa-floppy-disk"></i>

<!-- Buscar -->
<i class="fa-solid fa-magnifying-glass"></i>

<!-- Papelera -->
<i class="fa-solid fa-trash"></i>
```

La estructura es:

```html
<i class="ESTILO NOMBRE-DEL-ICONO"></i>
```

Por ejemplo:

```html
<i class="fa-solid fa-plus"></i>
```

- `fa-solid`: indica el estilo.
- `fa-plus`: identifica el icono.

## 6. Integración con SharedButton

En nuestro proyecto queremos disponer de un componente reutilizable que no conozca la lógica de negocio.

El componente recibe el icono que debe mostrar y comunica al componente padre cuándo se ha pulsado.

### button.component.ts

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  readonly icon = input.required<string>();
  readonly label = input<string>('');

  readonly clicked = output<void>();
}
```

### button.component.html

```html
<button
  type="button"
  (click)="clicked.emit()">

  <i [class]="icon()" aria-hidden="true"></i>

  @if (label()) {
  <span>{{ label() }}</span>
  }

</button>
```

En este ejemplo:

- `icon()` recibe las clases CSS del icono.
- `label()` permite mostrar un texto opcional.
- `clicked` notifica al componente padre.
- El componente no decide qué ocurre al pulsarlo.

### Uso desde el componente padre

```html
<shared-button
  icon="fa-solid fa-plus"
  label="Añadir traducción"
  (clicked)="addTranslation()">
</shared-button>

<shared-button
  icon="fa-solid fa-minus"
  label="Eliminar traducción"
  (clicked)="removeTranslation()">
</shared-button>
```

El componente padre controla las operaciones, mientras que `SharedButton` se limita a representar el botón.

> Si quieres traducir el texto desde el componente hijo, puedes importar `TranslatePipe` y utilizar `{{ label() | translate }}`. En ese caso, pásale la clave de traducción, no el texto ya traducido.

## 7. Personalización mediante CSS

Podemos modificar el tamaño, el color y otros aspectos del icono mediante CSS.

```html
<i
  class="fa-solid fa-plus text-lg text-green-600"
  aria-hidden="true">
</i>
```

También podemos utilizar clases CSS propias:

```css
.button-icon {
  font-size: 1rem;
  color: currentColor;
}
```

Y aplicarlas desde Angular:

```html
<i
  [class]="icon()"
  class="button-icon"
  aria-hidden="true">
</i>
```

`currentColor` hace que el icono herede el color del texto de su elemento contenedor.

## 8. Buenas prácticas y consejos

1. **Utiliza el catálogo oficial.** Busca el icono que necesitas y comprueba que está disponible en la versión gratuita.
2. **Centraliza la importación.** Importa Font Awesome una sola vez en `styles.css`.
3. **Utiliza nombres claros.** Por ejemplo, `fa-plus` para añadir y `fa-trash` para eliminar.
4. **Mantén separados los estilos y la lógica.** El componente reutilizable muestra el icono, pero el padre decide qué operación ejecutar.
5. **Utiliza `aria-hidden="true"`.** Es recomendable cuando el icono es decorativo y el botón ya tiene un texto accesible.
6. **Evita mezclar bibliotecas sin necesidad.** Si ya utilizas Font Awesome, no necesitas introducir otra biblioteca exclusivamente para iconos.
7. **Comprueba las clases completas.** Tailwind no sustituye a Font Awesome: `fa-solid fa-plus` son clases de Font Awesome, no utilidades de Tailwind.

### Si el icono no aparece

Comprueba estos puntos:

- El paquete está instalado en `node_modules`.
- La importación de Font Awesome está en `src/styles.css`.
- El nombre del icono y su estilo son correctos.
- La hoja CSS se ha cargado correctamente.
- El navegador no muestra errores al cargar los archivos de fuentes.

---

**Resumen:** Font Awesome nos permite incorporar iconos mediante clases CSS. En nuestro proyecto lo importamos globalmente y dejamos que `SharedButton` reciba las clases del icono mediante un `input()`, manteniendo el componente reutilizable y desacoplado de la lógica de negocio.
