import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-banner-btt',
    imports: [],
    templateUrl: './banner-btt.component.html',
    styleUrl: './banner-btt.component.css'
})
export class BannerBttComponent {
  isStravaExpanded = false;
  @Output() selected = new EventEmitter<string>();

  expandStrava() {
    this.isStravaExpanded = !this.isStravaExpanded; // Toggle expansion state
    this.selected.emit('segment');
  }
}
