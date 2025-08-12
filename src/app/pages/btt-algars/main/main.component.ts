import { Component } from '@angular/core';
import { PrimaryBtnComponent } from '../../../shared/ui/buttons/primary-btn/primary-btn.component';
import { GridPatrocinadoresComponent } from '../grid-patrocinadores/grid-patrocinadores.component';
import { LowsectionComponent } from '../lowsection/lowsection.component';
import { CountdownCarreraComponent } from '../../../shared/countdowns/countdown-carrera/countdown-carrera.component';
import { CountdownInscripcionComponent } from '../../../shared/countdowns/countdown-inscripcion/countdown-inscripcion.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    LowsectionComponent,
    GridPatrocinadoresComponent,
    // CountdownCarreraComponent,
    // PrimaryBtnComponent,
    // CountdownInscripcionComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
