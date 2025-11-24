import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBidComponent } from './preview-bid.component';

describe('PreviewBidComponent', () => {
  let component: PreviewBidComponent;
  let fixture: ComponentFixture<PreviewBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewBidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
