import { Component, input, InputSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  imports: [TranslatePipe, NgClass],
  selector: 'shared-label-form',
  styleUrl: './label-form.component.css',
  templateUrl: './label-form.component.html',
})
export class LabelFormComponent {
  title: InputSignal<string> = input.required<string>();
  description: InputSignal<string | null | undefined> = input();
  required: InputSignal<boolean> = input(false);

  labelFor: InputSignal<string | null | undefined> = input();
  labelClass: InputSignal<string> = input('label');

  protected readonly Validators = Validators;
}
