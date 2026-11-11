import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-permissions-page',
  templateUrl: './permission.page.html',
  styleUrls: ['./permission.page.css'],
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    TranslatePipe
  ],
})
export class PermissionsPageComponent {}
