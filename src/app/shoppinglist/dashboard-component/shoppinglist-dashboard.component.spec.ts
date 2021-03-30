import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistDashboardComponent } from './shoppinglist-dashboard.component';

describe('DashboardComponent', () => {
  let component: ShoppinglistDashboardComponent;
  let fixture: ComponentFixture<ShoppinglistDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppinglistDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
