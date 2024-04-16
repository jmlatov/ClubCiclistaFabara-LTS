import { Component } from '@angular/core';
import { PrimaryBtnComponent } from '../../../shared/ui/buttons/primary-btn/primary-btn.component';

@Component({
  selector: 'app-lowsection',
  standalone: true,
  imports: [PrimaryBtnComponent],
  templateUrl: './lowsection.component.html',
  styleUrl: './lowsection.component.css',
})
export class LowsectionComponent {}
