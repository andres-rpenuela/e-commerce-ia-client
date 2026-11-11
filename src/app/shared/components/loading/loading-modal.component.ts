
import { Component, inject } from '@angular/core';
import { LoadingService } from '@shared/servicies/loading/loading.service';

@Component({
  selector: 'shared-loading-modal',
  standalone: true,
  templateUrl: './loading-modal.component.html',
  styleUrl: './loading-modal.component.css',
})
export class LoadingModalComponent {

  readonly loadingService = inject(LoadingService);
}
