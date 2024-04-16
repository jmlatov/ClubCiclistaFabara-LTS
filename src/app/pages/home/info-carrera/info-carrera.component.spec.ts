import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCarreraComponent } from './info-carrera.component';

describe('InfoCarreraComponent', () => {
  let component: InfoCarreraComponent;
  let fixture: ComponentFixture<InfoCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCarreraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
