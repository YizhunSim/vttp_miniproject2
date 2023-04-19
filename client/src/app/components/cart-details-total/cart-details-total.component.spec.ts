import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailsTotalComponent } from './cart-details-total.component';

describe('CartDetailsTotalComponent', () => {
  let component: CartDetailsTotalComponent;
  let fixture: ComponentFixture<CartDetailsTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDetailsTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDetailsTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
