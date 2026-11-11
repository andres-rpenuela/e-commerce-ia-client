# Manualuso label-form

Puedes crear un componente reutilizable shared-form-label que muestre el título y la descripción y utilice ng-content para proyectar el control del formulario que quieras (input, select, un componente personalizado, etc.). Así separas la presentación de la lógica del formulario. (＾▽＾)
1. shared-form-label.component.html

<div class="form-control">
  <label class="label">
    <span class="label-text font-semibold">
      {{ title() }}
    </span>
  </label>

  <p class="text-sm text-base-content/70 mb-2">
    {{ description() }}
  </p>

  <ng-content />
</div>
```
2. shared-form-label.component.ts

Usando Angular 22 y la API moderna de inputs con input():

```
import { Component, input } from '@angular/core';

@Component({
selector: 'shared-form-label',
standalone: true,
templateUrl: './shared-form-label.component.html'
})
export class SharedFormLabelComponent {

readonly title = input.required<string>();
readonly description = input<string>('');
}
```
3. Cómo utilizarlo con un FormControl

Por ejemplo, con un campo de nombre:
```
<shared-form-label
title="Nombre del permiso"
description="Introduce el nombre que identificará el permiso."
>
<input
type="text"
class="input input-bordered w-full"
[formControl]="permissionForm.controls.name"
placeholder="Ej. Gestión de usuarios"
/>
</shared-form-label>
```
También puedes proyectar un select:

```
<shared-form-label
title="Idioma"
description="Selecciona el idioma de la traducción."
>
<select
class="select select-bordered w-full"
[formControl]="translationForm.controls.localeId"
>
    <option [ngValue]="null">Selecciona un idioma</option>
    <option [ngValue]="1">Español</option>
    <option [ngValue]="2">Inglés</option>
  </select>
</shared-form-label>
```

4. No olvides las importaciones

En el componente que utilice shared-form-label, importa SharedFormLabelComponent y ReactiveFormsModule:

```
imports: [
ReactiveFormsModule,
SharedFormLabelComponent
]
```

La idea clave:
- shared-form-label no necesita conocer el FormControl. 
- Solo recibe title y description y proyecta el contenido con <ng-content />. 
- El componente padre mantiene el control y sus validaciones. 

Así puedes reutilizarlo con cualquier campo sin acoplarlo a un formulario concreto. (＾▽＾)
