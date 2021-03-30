import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistEditComponent } from './shoppinglist-edit.component';

describe('ShoppinglistEditComponent', () => {
  let component: ShoppinglistEditComponent;
  let fixture: ComponentFixture<ShoppinglistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppinglistEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
