import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCart } from './book-cart';

describe('BookCart', () => {
  let component: BookCart;
  let fixture: ComponentFixture<BookCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
