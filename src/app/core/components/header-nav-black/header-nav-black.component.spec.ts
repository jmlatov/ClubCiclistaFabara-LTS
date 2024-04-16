import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavBlackComponent } from './header-nav-black.component';

describe('HeaderNavBlackComponent', () => {
  let component: HeaderNavBlackComponent;
  let fixture: ComponentFixture<HeaderNavBlackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNavBlackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderNavBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
