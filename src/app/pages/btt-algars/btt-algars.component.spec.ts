import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BttAlgarsComponent } from './btt-algars.component';

describe('BttAlgarsComponent', () => {
  let component: BttAlgarsComponent;
  let fixture: ComponentFixture<BttAlgarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BttAlgarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BttAlgarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
