import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IItem, IShoppinglist, IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  @Input() 
  shoppinglist: IShoppinglist;

  @Input() 
  items: IItem[];

  @Output() 
  itemChange = new EventEmitter<IItem>();

  @Output() 
  itemRemove = new EventEmitter<string>();

  @Input()
  isOwner: boolean;

  @Input()
  currentUser: IUser;

  constructor() { }

  ngOnInit(): void { }

  onItemChange(value: IItem) {
    this.itemChange.emit(value);
  }

  onItemRemove(value: string) {
    this.itemRemove.emit(value);
  }

  setStyle(itemName: string): any {
    if (itemName.length > 20) {
      return { height: '90px' };
    } else {
      return {};
    }
  }
}
