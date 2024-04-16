import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/ui/logo/logo.component';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css',
})
export class BienvenidaComponent {}
