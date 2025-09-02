import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderNavComponent } from './core/components/header-nav/header-nav.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { BttAlgarsComponent } from './pages/btt-algars/btt-algars.component';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterOutlet,
        FooterComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ccf-Angular17';
  selectedSection: string = 'home';

  getSelected(selected: string) {
    this.selectedSection = selected;
  }
}
