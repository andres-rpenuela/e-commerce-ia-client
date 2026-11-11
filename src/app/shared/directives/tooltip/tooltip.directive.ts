import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  type Placement,
} from '@floating-ui/dom';

import { Subscription } from 'rxjs';

@Directive({
  selector: '[sharedTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {

  // Inputs
  readonly sharedTooltip = input.required<string>();
  readonly tooltipPlacement = input<Placement>('bottom');
  readonly tooltipDisabled = input<boolean>(false);

  // Dependencies
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);

  // Tooltip state
  private tooltipElement?: HTMLElement;
  private cleanupAutoUpdate?: () => void;
  private cleanupLanguageChange?: Subscription;

  private previousAriaDescribedBy: string | null = null;

  // Close timeout for delayed hiding of the tooltip
  private closeTimeout?: ReturnType<typeof setTimeout>;

  private static nextId = 0;
  private readonly tooltipId =
    `shared-tooltip-${TooltipDirective.nextId++}`;



  private isHovered = false;
  private isFocused = false;

  constructor() {
    effect(() => {
      const disabled = this.tooltipDisabled();
      const text = this.sharedTooltip();

      if (disabled || !text) {
        this.destroyTooltip();
        return;
      }

      if (this.tooltipElement) {
        this.updateTooltipText();
      }
    });
  }

  // Show tooltip
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
    this.hideIfInactive();
  }

  @HostListener('focusin')
  onFocusIn(): void {
    this.isFocused = true;
    this.show();
  }

  @HostListener('focusout')
  onFocusOut(): void {
    this.isFocused = false;
    this.hideIfInactive();
  }

  private show(): void {
    if (
      this.tooltipDisabled() ||
      !this.sharedTooltip() ||
      this.tooltipElement
    ) {
      return;
    }

    const reference = this.elementRef.nativeElement;

    if (
      reference.hasAttribute('disabled') ||
      reference.getAttribute('aria-disabled') === 'true'
    ) {
      return;
    }

    this.createTooltip();
    this.updateTooltipPosition();

    this.cleanupLanguageChange = this.translate.onLangChange.subscribe(() => {
      this.updateTooltipText();
    });

    this.closeTimeout = setTimeout(() => {
      this.destroyTooltip();
    }, 500); // auto close, time in ms
  }

  private hideIfInactive(): void {
    if (!this.isHovered && !this.isFocused) {
      this.destroyTooltip();
    }
  }

  // Create tooltip element
  private createTooltip(): void {
    const reference = this.elementRef.nativeElement;
    const tooltip = this.renderer.createElement('span') as HTMLElement;

    this.tooltipElement = tooltip;

    this.renderer.addClass(tooltip, 'shared-tooltip');
    this.renderer.setAttribute(tooltip, 'id', this.tooltipId);
    this.renderer.setAttribute(tooltip, 'role', 'tooltip');

    this.previousAriaDescribedBy =
      reference.getAttribute('aria-describedby');

    this.updateTooltipText();

    this.renderer.appendChild(this.document.body, tooltip);

    const describedBy = [
      this.previousAriaDescribedBy,
      this.tooltipId,
    ].filter(Boolean).join(' ');

    this.renderer.setAttribute(reference, 'aria-describedby', describedBy);
  }

  // Update translated text
  private updateTooltipText(): void {
    if (!this.tooltipElement) {
      return;
    }

    const translatedText = this.translate.instant(this.sharedTooltip());

    this.renderer.setProperty(
      this.tooltipElement,
      'textContent',
      translatedText,
    );
  }

  // Calculate tooltip position
  private updateTooltipPosition(): void {
    const reference = this.elementRef.nativeElement;
    const tooltip = this.tooltipElement;

    if (!tooltip) {
      return;
    }

    this.cleanupAutoUpdate = autoUpdate(reference, tooltip, () => {
      computePosition(reference, tooltip, {
        placement: this.tooltipPlacement(),
        strategy: 'fixed',
        middleware: [
          offset(8),
          flip({ padding: 8 }),
          shift({ padding: 8 }),
        ],
      }).then(({ x, y, strategy }) => {
        // Ignore stale calculations after tooltip destruction
        if (this.tooltipElement !== tooltip) {
          return;
        }

        Object.assign(tooltip.style, {
          position: strategy,
          left: `${x}px`,
          top: `${y}px`,
        });

        this.renderer.addClass(tooltip, 'is-visible');
      });
    });
  }

  // Remove tooltip and listeners
  private destroyTooltip(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }

    this.cleanupAutoUpdate?.();
    this.cleanupAutoUpdate = undefined;

    this.cleanupLanguageChange?.unsubscribe();
    this.cleanupLanguageChange = undefined;

    if (!this.tooltipElement) {
      return;
    }

    const reference = this.elementRef.nativeElement;

    if (this.previousAriaDescribedBy) {
      this.renderer.setAttribute(
        reference,
        'aria-describedby',
        this.previousAriaDescribedBy,
      );
    } else {
      this.renderer.removeAttribute(reference, 'aria-describedby');
    }

    this.renderer.removeChild(this.document.body, this.tooltipElement);

    this.tooltipElement = undefined;
    this.previousAriaDescribedBy = null;
  }

  ngOnDestroy(): void {
    this.destroyTooltip();
  }
}
