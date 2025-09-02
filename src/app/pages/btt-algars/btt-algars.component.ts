import { Component } from '@angular/core';
import { PrimaryBtnComponent } from '../../shared/ui/buttons/primary-btn/primary-btn.component';
import { HeaderNavBlackComponent } from '../../core/components/header-nav-black/header-nav-black.component';
import { GridPatrocinadoresComponent } from './grid-patrocinadores/grid-patrocinadores.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { MainComponent } from './main/main.component';
import { SegmentsComponent } from './segments/segments.component';

@Component({
    selector: 'app-btt-algars',
    imports: [
        HeaderNavBlackComponent,
        MainComponent,
        SegmentsComponent
    ],
    templateUrl: './btt-algars.component.html',
    styleUrl: './btt-algars.component.css'
})
export class BttAlgarsComponent {
  selectedSection: string = 'main';

  ngOnInit() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }
  getSelected(selected: string) {
    this.selectedSection = selected;
    console.log(selected);
  }
}
