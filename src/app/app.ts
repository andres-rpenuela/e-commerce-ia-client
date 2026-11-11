import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { LoadingModalComponent } from '@shared/components/loading/loading-modal.component';
import { LoadingService } from '@shared/servicies/loading/loading.service';

@Component({
  imports: [RouterOutlet, ToastComponent, LoadingModalComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('e-commerce-ia-client');

  ngOnInit(): void {
    // Initialization logic here
    initFlowbite();
  }

  // debug loading modal
  // private readonly _loadingService = inject(LoadingService);
  //
  // testLoading(): void {
  //   this._loadingService.show('Creando permiso...');
  //
  //   setTimeout(() => {
  //     this._loadingService.hide();
  //   }, 10000);
  // }
}
