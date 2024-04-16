import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPatrocinadoresComponent } from './grid-patrocinadores.component';

describe('GridPatrocinadoresComponent', () => {
  let component: GridPatrocinadoresComponent;
  let fixture: ComponentFixture<GridPatrocinadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridPatrocinadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridPatrocinadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
