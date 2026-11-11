# Apuntes de ControlValueAccessor (CVA) en Angular

Este repositorio/documento contiene una guía de referencia rápida sobre cómo implementar **`ControlValueAccessor`** en Angular para construir componentes de formulario personalizados que se integren de forma nativa con `ReactiveFormsModule` (`formControlName`, `formControl`) y `FormsModule` (`ngModel`).

---

## 📋 Índice
1. [¿Qué es ControlValueAccessor?](#1-qué-es-controlvalueaccessor)
2. [Métodos de la Interfaz](#2-métodos-de-la-interfaz)
3. [Estrategia de Inyección Moderna (Recomendada)](#3-estrategia-de-inyección-moderna-recomendada)
4. [Ejemplo Completo Paso a Paso](#4-ejemplo-completo-paso-a-paso)
  - [Componente Custom (`contador.component.ts`)](#componente-custom-contadorcomponentts)
  - [Formulario Padre (`app.component.ts`)](#formulario-padre-appcomponentts)
5. [Manejo Dinámico de Deshabilitado (`disabled`)](#5-manejo-dinámico-de-deshabilitado-disabled)
6. [📝 Notas Avanzadas, Tipos y Errores Comunes](#-notas-avanzadas-tipos-y-errores-comunes)
7. 🛠️ Añadiendo Validación Interna Personalizada (`Validator`)
8. 
---

## 1. ¿Qué es ControlValueAccessor?
Es una interfaz que actúa como **puente** entre la API de formularios de Angular y un elemento del DOM o un componente personalizado. Permite que tus propios componentes se comporten exactamente igual que un `<input>`, `<select>` o `<textarea>` nativo.

---

## 2. Métodos de la Interfaz

Para cumplir con el contrato de la interfaz, debes implementar obligatoriamente tres métodos (y uno opcional recomendado):

| Método | Tipo de Argumento | Propósito | ¿Quién lo ejecuta? |
| :--- | :--- | :--- | :--- |
| `writeValue(value: any)` | `any` (Tipar según el componente) | Escribe un nuevo valor desde el modelo/formulario hacia la vista de tu componente. | **Angular** (al inicializar o usar `setValue`/`patchValue`) |
| `registerOnChange(fn: any)` | `(value: any) => void` | Registra una función callback que debes guardar y llamar cada vez que el valor cambie internamente en tu componente. | **Angular** |
| `registerOnTouched(fn: any)` | `() => void` | Registra una función callback que debes guardar y llamar cuando el usuario interactúe y "toque" el componente (evento *blur* o similar). | **Angular** |
| `setDisabledState(isDisabled: boolean)` | `boolean` *(Opcional)* | Modifica el estado visual y funcional del componente cuando el formulario padre lo deshabilita o habilita. | **Angular** (al usar `.disable()` o `.enable()`) |

---

## 3. Estrategia de Inyección Moderna (Recomendada)

Anteriormente se utilizaba el *provider* `{ provide: NG_VALUE_ACCESSOR, ... }` en el decorador `@Component`. La arquitectura moderna de Angular prefiere **inyectar `NgControl`** en el constructor.

### Ventajas de inyectar `NgControl`:
1. **Acceso directo al estado:** Puedes comprobar si el control es válido, inválido, prístino o tocado (`controlDir.invalid && controlDir.touched`) para aplicar clases CSS de error de forma automática.
2. **Evita dependencias circulares:** Al no usar `forwardRef()`, el código es más limpio y fácil de compilar con las últimas optimizaciones de Angular.

---

## 4. Ejemplo Completo Paso a Paso

Crearemos un selector numérico (`<app-input-contador>`) con validación de rangos y manejo de deshabilitado dinámico.

### Componente Custom (`contador.component.ts`)

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-contador',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Aplicamos la clase 'is-invalid' si el formulario padre detecta un error y el usuario ya interactuó -->
    <div class="contador-container" [class.is-invalid]="controlDir?.invalid && controlDir?.touched">
      <button type="button" (click)="decrementar()" [disabled]="disabled">-</button>
      <span class="valor-pantalla">{{ valor }}</span>
      <button type="button" (click)="incrementar()" [disabled]="disabled">+</button>
    </div>
  `,
  styles: [`
    .contador-container {
      display: inline-flex;
      align-items: center;
      border: 1px solid #ccc;
      padding: 6px;
      border-radius: 4px;
      gap: 12px;
    }
    .is-invalid {
      border-color: #dc3545;
      background-color: #f8d7da;
    }
    .valor-pantalla {
      font-weight: bold;
      min-width: 20px;
      text-align: center;
    }
    button {
      cursor: pointer;
      padding: 4px 8px;
    }
    button:disabled {
      cursor: not-allowed;
    }
  `]
})
export class ContadorComponent implements ControlValueAccessor, OnInit {
  // Estado interno tipado
  valor: number = 0;
  disabled: boolean = false;

  // Firmas de tipos estrictas para los callbacks de Angular
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  // Inyección del NgControl asociado al componente (ej. formControlName="cantidad")
  protected controlDir = inject(NgControl, { self: true, optional: true });

  constructor() {
    if (this.controlDir) {
      // Nos auto-asignamos como el value accessor del control inyectado
      this.controlDir.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    // Inicializaciones adicionales basadas en el control si fuesen necesarias
  }

  incrementar(): void {
    if (this.disabled) return;
    this.valor++;
    this.notificarCambio();
  }

  decrementar(): void {
    if (this.disabled) return;
    this.valor--;
    this.notificarCambio();
  }

  private notificarCambio(): void {
    this.onChange(this.valor);  // Envía el nuevo valor al formulario de Angular
    this.onTouched();           // Marca el control como 'touched'
  }

  // --- Implementación de los métodos de ControlValueAccessor ---

  writeValue(value: number | null | undefined): void {
    // Siempre asegurar un fallback seguro si el formulario pasa null/undefined
    this.valor = value ?? 0;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
```

### Formulario Padre (`app.component.ts`)

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContadorComponent } from './contador.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ContadorComponent],
  template: `
    <form [formGroup]="miFormulario" style="padding: 24px; font-family: sans-serif;">
      <label style="display: block; margin-bottom: 8px; font-weight: bold;">
        Cantidad de artículos (Rango: 1 a 5):
      </label>
      
      <!-- Sintaxis limpia: formControlName no lleva corchetes al ser un string plano -->
      <app-input-contador formControlName="cantidad"></app-input-contador>

      <!-- Feedback visual de validaciones -->
      <div *ngIf="miFormulario.get('cantidad')?.invalid && miFormulario.get('cantidad')?.touched" 
           style="color: #dc3545; margin-top: 6px; font-size: 14px;">
        <p *ngIf="miFormulario.get('cantidad')?.hasError('min')" style="margin: 0;">⚠️ Mínimo requerido: 1</p>
        <p *ngIf="miFormulario.get('cantidad')?.hasError('max')" style="margin: 0;">⚠️ Máximo permitido: 5</p>
      </div>

      <!-- Controles dinámicos de estado -->
      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <button type="button" (click)="bloquear()">🔒 Deshabilitar</button>
        <button type="button" (click)="desbloquear()">🔓 Habilitar</button>
      </div>
    </form>
  `
})
export class AppComponent {
  miFormulario: FormGroup;

  constructor(fb: FormBuilder) {
    this.miFormulario = fb.group({
      // Inicializado en 2 con validaciones nativas de Angular
      cantidad: [2, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  bloquear(): void {
    this.miFormulario.get('cantidad')?.disable();
  }

  desbloquear(): void {
    this.miFormulario.get('cantidad')?.enable();
  }
}
```

---

## 5. Manejo Dinámico de Deshabilitado (`disabled`)
Cuando ejecutas `.disable()` o `.enable()` en el formulario de la aplicación:
1. Angular intercepta la petición.
2. Invoca automáticamente al método `setDisabledState(isDisabled)` de tu componente personalizado.
3. El componente actualiza su propiedad booleana (`this.disabled = isDisabled`), lo que a su vez bloquea los botones o inputs nativos de la interfaz gracias al *property binding* `[disabled]="disabled"`.

---

## 📝 Notas Avanzadas, Tipos y Errores Comunes

### 📌 1. Tipar adecuadamente los Callbacks
Evita usar `any` en las firmas de `registerOnChange` y `registerOnTouched`. Define el tipo exacto que procesará tu componente:
```typescript
private onChange: (value: number) => void = () => {};
private onTouched: () => void = () => {};

registerOnChange(fn: (value: number) => void): void {
  this.onChange = fn;
}
```

### 📌 2. `writeValue` puede recibir `null` u `options`
Cuando el formulario padre se resetea (`miFormulario.reset()`), Angular envía un valor `null` a través de `writeValue()`. Asegúrate de añadir siempre un control de cortocircuito o fallback en el método:
```typescript
writeValue(value: number | null): void {
  this.valor = value !== null ? value : 0; // Evita romper la app si llega null
}
```

### 📌 3. No te olvides de `onTouched()`
Si cambias el valor pero olvidas disparar `this.onTouched()`, el estado del formulario se mantendrá permanentemente como `untouched`. Esto evitará que se rendericen los mensajes de error si tu lógica depende de que el usuario haya interactuado primero con el control.

Usa el código con precaución.

📌 4. El error clásico: Usar el decorator providers junto con inject(NgControl)

Si intentas inyectar NgControl en el constructor mientras mantienes el objeto providers: [{ provide: NG_VALUE_ACCESSOR, ... }] en el @Component, Angular lanzará un error de dependencia circular catastrófico en consola (Circular dependency/Cannot instantiate cyclic dependency). Elige uno u otro; la inyección de NgControl es el estándar moderno.

Aquí tienes el bloque de código y la explicación que puedes añadir directamente al final de tu archivo README.md.
Esta sección explica cómo hacer que el componente se valide a sí mismo de forma interna implementando la interfaz Validator, sin necesidad de obligar al formulario padre a poner las reglas manualmente.
Añade este fragmento al final de tu archivo Markdown:
markdown

## 7. 🛠️ Añadiendo Validación Interna Personalizada (`Validator`)

A veces quieres que tu componente tenga sus propias reglas de validación de fábrica (por ejemplo, que el contador nunca acepte números negativos o impares), sin importar lo que configure el formulario padre.

Para lograr esto, implementamos la interfaz **`Validator`** además de `ControlValueAccessor`.

### Componente Auto-Validado (`contador.component.ts`)

Modificamos el componente para registrar la validación de forma nativa a través del token `NG_VALIDATORS`:

```typescript
import { Component, inject, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-contador',
  standalone: true,
  imports: [CommonModule],
  providers: [
    // Registramos el componente como un Validador oficial de Angular
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ContadorComponent),
      multi: true
    }
  ],
  template: `
    <div class="contador-container" [class.is-invalid]="controlDir?.invalid && controlDir?.touched">
      <button type="button" (click)="decrementar()" [disabled]="disabled">-</button>
      <span>{{ valor }}</span>
      <button type="button" (click)="incrementar()" [disabled]="disabled">+</button>
    </div>
    
    <!-- El propio componente puede pintar su error interno si quiere -->
    <div *ngIf="controlDir?.hasError('numeroImpar') && controlDir?.touched" style="color: red; font-size: 12px; margin-top: 4px;">
      ❌ Solo se permiten números pares.
    </div>
  `
})
export class ContadorComponent implements ControlValueAccessor, Validator, OnInit {
  valor: number = 0;
  disabled: boolean = false;

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};
  
  // Callback interno de Angular para avisar que las validaciones cambiaron (opcional)
  private onValidatorChange: () => void = () => {};

  protected controlDir = inject(NgControl, { self: true, optional: true });

  constructor() {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  incrementar(): void {
    if (this.disabled) return;
    this.valor++;
    this.notificarCambio();
  }

  decrementar(): void {
    if (this.disabled) return;
    this.valor--;
    this.notificarCambio();
  }

  private notificarCambio(): void {
    this.onChange(this.valor);
    this.onTouched();
    // Forzamos a Angular a re-evaluar la validación interna inmediatamente
    this.onValidatorChange(); 
  }

  // --- Métodos de ControlValueAccessor ---
  writeValue(value: number | null): void { this.valor = value ?? 0; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  // --- 🔴 Implementación de la Interfaz Validator ---

  /**
   * Este método es ejecutado por Angular cada vez que el valor cambia.
   * @returns ValidationErrors (un objeto con el error) si es inválido, o null si todo está correcto.
   */
  validate(control: AbstractControl): ValidationErrors | null {
    const esImpar = control.value % 2 !== 0;
    
    if (esImpar) {
      // Retorna la clave del error y metadatos extras si quieres
      return { numeroImpar: { valorActual: control.value } };
    }
    
    return null; // Todo correcto, el control es válido
  }

  /**
   * Permite registrar la función que Angular llama cuando cambian las reglas del validador dinámicamente.
   */
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
```

### ¿Cómo lo ve el Formulario Padre?

En el formulario padre ya no necesitas declarar la lógica de números pares en los `Validators`. Angular absorberá el error automáticamente:

```typescript
// En app.component.ts
this.miFormulario = fb.group({
  cantidad: [0] // Válido inicialmente porque 0 es par. Si sube a 1, el formulario se vuelve .invalid
});
```

E incluso puedes leer ese error específico desde la plantilla del padre usando la clave del objeto devuelto:
```html
<small *ngIf="miFormulario.get('cantidad')?.hasError('numeroImpar')">
  El componente nos dice que el número es impar.
</small>
```
