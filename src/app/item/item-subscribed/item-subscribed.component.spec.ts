import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSubscribedComponent } from './item-subscribed.component';

describe('ItemSubscribedComponent', () => {
  let component: ItemSubscribedComponent;
  let fixture: ComponentFixture<ItemSubscribedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSubscribedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSubscribedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
