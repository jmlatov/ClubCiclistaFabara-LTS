import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-segments',
  standalone: true,
  imports: [],
  templateUrl: './segments.component.html',
  styleUrl: './segments.component.css',
})
export class SegmentsComponent {
  @Output() selectedBanner = new EventEmitter<string>();
  close() {
    this.selectedBanner.emit('main');
  }
}
