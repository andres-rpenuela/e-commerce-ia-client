
import {
  afterNextRender,
  Component,
  ElementRef,
  input,
  output,
  ViewChild
} from '@angular/core';

import { Modal } from 'flowbite';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  readonly id = input.required<string>();
  readonly title = input<string>('');

  readonly closed = output<void>();

  @ViewChild('modalElement')
  private modalElement!: ElementRef<HTMLElement>;

  private modal!: Modal;
  private previousFocusedElement: HTMLElement | null = null;

  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(this.modalElement.nativeElement);
    });
  }

  open(): void {
    this.previousFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    this.modal.show();
  }

  close(): void {
    this.modal.hide();

    this.previousFocusedElement?.focus();
    this.previousFocusedElement = null;

    this.closed.emit();
  }
}
