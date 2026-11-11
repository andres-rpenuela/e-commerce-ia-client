import { Component, input, output, type TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import type {
  ButtonSize,
  ButtonTooltipPlacement,
  ButtonType,
  ButtonVariant,
} from '@shared/types/button.type';
import { TooltipDirective } from '@shared/directives/tooltip/tooltip.directive';

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  imports: [TranslatePipe, NgTemplateOutlet, TooltipDirective],
})
export class ButtonComponent {
  // Content
  readonly icon = input<string | null>(null);
  readonly svg = input<TemplateRef<unknown> | null>(null);

  readonly label = input<string>('');

  // Tooltip (Use as TooltipDirective)
  readonly tooltip = input.required<string>();
  readonly tooltipPlacement = input<ButtonTooltipPlacement>('top');

  // Appearance
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');

  // Behavior
  readonly type = input<ButtonType>('button');
  readonly disabled = input<boolean>(false);

  // Events
  readonly clicked = output<void>();

  constructor() {}

  onClick(): void {
    this.clicked.emit();
  }
}
