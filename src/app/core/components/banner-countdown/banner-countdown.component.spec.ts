import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCountdownComponent } from './banner-countdown.component';

describe('BannerCountdownComponent', () => {
  let component: BannerCountdownComponent;
  let fixture: ComponentFixture<BannerCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCountdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
