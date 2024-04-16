import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgBentoComponent } from './img-bento.component';

describe('ImgBentoComponent', () => {
  let component: ImgBentoComponent;
  let fixture: ComponentFixture<ImgBentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgBentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgBentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
