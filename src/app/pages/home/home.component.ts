import { Component } from '@angular/core';
import { InfoCarreraComponent } from './info-carrera/info-carrera.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LocationComponent } from './location/location.component';
import { AboutComponent } from './about/about.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderNavComponent } from '../../core/components/header-nav/header-nav.component';
import { CountdownInscripcionComponent } from '../../shared/countdowns/countdown-inscripcion/countdown-inscripcion.component';
import { PrimaryBtnComponent } from '../../shared/ui/buttons/primary-btn/primary-btn.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InfoCarreraComponent,
    BienvenidaComponent,
    LocationComponent,
    AboutComponent,
    HeaderNavComponent,
    CountdownInscripcionComponent,
    PrimaryBtnComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (typeof document !== 'undefined') {
          document.documentElement.scrollTop = 0;
        }
      });
  }

  ngOnInit() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }

  selectedSection: string = 'home';

  getSelected(selected: string) {
    this.selectedSection = selected;
  }
}
