import { Component } from '@angular/core';
// import { PrimaryBtnComponent } from '../../../shared/ui/buttons/primary-btn/primary-btn.component';
import { GridPatrocinadoresComponent } from '../grid-patrocinadores/grid-patrocinadores.component';
import { LowsectionComponent } from '../lowsection/lowsection.component';
// import { CountdownCarreraComponent } from '../../../shared/countdowns/countdown-carrera/countdown-carrera.component';
// import { CountdownInscripcionComponent } from '../../../shared/countdowns/countdown-inscripcion/countdown-inscripcion.component';
import { BannerCountdownComponent } from '../../../core/components/banner-countdown/banner-countdown.component';
import { InfoCarreraComponent } from '../../home/info-carrera/info-carrera.component';

@Component({
    selector: 'app-main',
    imports: [
        LowsectionComponent,
        GridPatrocinadoresComponent,
        BannerCountdownComponent,
        InfoCarreraComponent,
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.css'
})
export class MainComponent {}
