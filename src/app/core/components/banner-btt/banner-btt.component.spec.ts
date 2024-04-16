import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerBttComponent } from './banner-btt.component';

describe('BannerBttComponent', () => {
  let component: BannerBttComponent;
  let fixture: ComponentFixture<BannerBttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerBttComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerBttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
