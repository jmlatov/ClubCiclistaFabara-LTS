import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BentoGalleryComponent } from './bento-gallery.component';

describe('BentoGalleryComponent', () => {
  let component: BentoGalleryComponent;
  let fixture: ComponentFixture<BentoGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BentoGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BentoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
