import { Component, EventEmitter, Output } from '@angular/core';
import { PrimaryBtnComponent } from '../../../shared/ui/buttons/primary-btn/primary-btn.component';
import { SecondaryBtnComponent } from '../../../shared/ui/buttons/secondary-btn/secondary-btn.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-info-carrera',
    imports: [PrimaryBtnComponent, SecondaryBtnComponent],
    templateUrl: './info-carrera.component.html',
    styleUrl: './info-carrera.component.css'
})
export class InfoCarreraComponent {
  @Output() selected = new EventEmitter<string>();

  constructor(private router: Router) {}
  moreInfo() {
    this.router.navigate(['btt-algars']);
    this.selected.emit('btt');
  }
}
