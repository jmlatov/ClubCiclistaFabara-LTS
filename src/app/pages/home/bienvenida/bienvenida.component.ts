import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/ui/logo/logo.component';
import { CountdownCarreraComponent} from '../../../shared/countdowns/countdown-carrera/countdown-carrera.component';
import { BannerCountdownComponent } from '../../../core/components/banner-countdown/banner-countdown.component';
@Component({
    selector: 'app-bienvenida',
    imports: [LogoComponent, BannerCountdownComponent],
    templateUrl: './bienvenida.component.html',
    styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {}
