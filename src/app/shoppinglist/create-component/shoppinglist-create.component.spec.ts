import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistCreateComponent } from './shoppinglist-create.component';

describe('ShoppinglistCreateComponent', () => {
  let component: ShoppinglistCreateComponent;
  let fixture: ComponentFixture<ShoppinglistCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppinglistCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
