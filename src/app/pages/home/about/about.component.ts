import { Component } from '@angular/core';
import { SecondaryBtnComponent } from '../../../shared/ui/buttons/secondary-btn/secondary-btn.component';
import { ImgBentoComponent } from './img-bento/img-bento.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';

@Component({
    selector: 'app-about',
    imports: [SecondaryBtnComponent, ImgBentoComponent, ObjetivosComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent {}
