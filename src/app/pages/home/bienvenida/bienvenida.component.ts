import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/ui/logo/logo.component';
import { CountdownCarreraComponent} from '../../../shared/countdowns/countdown-carrera/countdown-carrera.component';
import { CountdownInscripcionComponent } from '../../../shared/countdowns/countdown-inscripcion/countdown-inscripcion.component';

@Component({
    selector: 'app-bienvenida',
    imports: [LogoComponent, CountdownCarreraComponent, CountdownInscripcionComponent],
    templateUrl: './bienvenida.component.html',
    styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {}
