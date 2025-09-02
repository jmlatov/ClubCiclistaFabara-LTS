import { Component } from '@angular/core';
import { CountdownInscripcionComponent } from '../../../shared/countdowns/countdown-inscripcion/countdown-inscripcion.component';
import { PrimaryBtnComponent } from '../../../shared/ui/buttons/primary-btn/primary-btn.component';
import { CountdownCarreraComponent } from '../../../shared/countdowns/countdown-carrera/countdown-carrera.component';

@Component({
    selector: 'app-banner-countdown',
    imports: [
        CountdownInscripcionComponent,
        PrimaryBtnComponent,
        CountdownCarreraComponent,
    ],
    templateUrl: './banner-countdown.component.html',
    styleUrl: './banner-countdown.component.css'
})
export class BannerCountdownComponent {}
