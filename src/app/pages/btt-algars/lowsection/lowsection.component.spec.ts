import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowsectionComponent } from './lowsection.component';

describe('LowsectionComponent', () => {
  let component: LowsectionComponent;
  let fixture: ComponentFixture<LowsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowsectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LowsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
