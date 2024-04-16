import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownCarreraComponent } from './countdown-carrera.component';

describe('CountdownCarreraComponent', () => {
  let component: CountdownCarreraComponent;
  let fixture: ComponentFixture<CountdownCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownCarreraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountdownCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
