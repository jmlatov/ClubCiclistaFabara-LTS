import { Component } from '@angular/core';
import { FormularioComponent } from '../../../shared/ui/formulario/formulario.component';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [FormularioComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {}
