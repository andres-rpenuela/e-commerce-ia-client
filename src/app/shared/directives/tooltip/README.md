# Shared Tooltip Directive

Directiva reutilizable de Angular para mostrar tooltips en elementos HTML y componentes.

## Índice

1. [Instalación](#1-instalación)
2. [¿Por qué Floating UI?](#2-por-qué-floating-ui)
3. [Uso básico](#3-uso-básico)
4. [Posicionamiento](#4-posicionamiento)
5. [Integración con SharedButton](#5-integración-con-sharedbutton)

## 1. Instalación

Instalar Floating UI:

```bash
npm install @floating-ui/dom
```

## 2. ¿Por qué Floating UI?

Permite calcular y adaptar automáticamente la posición del tooltip para evitar que se salga de la pantalla.

Se utilizan estas funcionalidades:

- `computePosition`: calcula la posición.
- `offset`: establece la separación respecto al elemento.
- `flip`: cambia de posición si no hay espacio suficiente.
- `shift`: desplaza el tooltip para mantenerlo visible.
- `autoUpdate`: actualiza su posición al cambiar el scroll o el tamaño de la ventana.

## 3. Uso básico

Importar la directiva en el componente:

```typescript
import { TooltipDirective } from '@shared/directives/tooltip/tooltip.directive';

@Component({
  imports: [TooltipDirective],
})
export class ExampleComponent {}
```

Aplicarla sobre cualquier elemento:

```html
<button
  sharedTooltip="btn.label.translation.edit"
  tooltipPlacement="top">
  Editar
</button>
```

El texto se obtiene mediante su clave de traducción de `ngx-translate`.

## 4. Posicionamiento

Admite cuatro posiciones iniciales:

| Valor | Posición |
|---|---|
| `top` | Superior |
| `bottom` | Inferior |
| `left` | Izquierda |
| `right` | Derecha |

Floating UI adapta automáticamente la posición cuando no hay espacio suficiente.

También permite deshabilitar el tooltip:

```html
<button
  sharedTooltip="btn.label.translation.edit"
  [tooltipDisabled]="disabled()">
  Editar
</button>
```

## 5. Integración con SharedButton

`SharedButtonComponent` incorpora la directiva internamente:

```html
<shared-button
  variant="ghost"
  icon="fa-solid fa-pen"
  tooltip="btn.label.translation.edit"
  tooltipPlacement="top"
  (clicked)="edit()">
</shared-button>
```

De esta forma, el botón solo necesita recibir la clave de traducción y la posición. La directiva se encarga del resto.

---

**Ubicación:** `shared/directives/tooltip/tooltip.directive.ts`
