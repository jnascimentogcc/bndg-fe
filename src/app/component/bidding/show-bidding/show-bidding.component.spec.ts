import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBiddingComponent } from './show-bidding.component';

describe('ShowBiddingComponent', () => {
  let component: ShowBiddingComponent;
  let fixture: ComponentFixture<ShowBiddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBiddingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
