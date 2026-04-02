import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [
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
