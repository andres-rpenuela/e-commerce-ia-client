import { Component, input, Input, InputSignal, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'shared-spinner',
  templateUrl: './spinner.component.html',
  imports: [TranslatePipe],
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  readonly label: InputSignal<string> = input('Cargando...');
  constructor() {}

  ngOnInit() {}
}
