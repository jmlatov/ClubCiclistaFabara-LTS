import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownInscripcionComponent } from './countdown-inscripcion.component';

describe('CountdownInscripcionComponent', () => {
  let component: CountdownInscripcionComponent;
  let fixture: ComponentFixture<CountdownInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownInscripcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountdownInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
