import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemService } from 'src/app/core/services';
import { IItem } from 'src/app/shared/interfaces';
import { NO_ITEMS_YET, NO_CHECKED_ITEMS, DONE} from 'src/app/shared/constants';

@Component({
  selector: 'app-item-subscribed-list',
  templateUrl: './item-subscribed-list.component.html',
  styleUrls: ['./item-subscribed-list.component.scss']
})
export class ItemSubscribedListComponent implements OnInit {

  @Input() shoppinglistId: string;
  @Input() items: IItem[];
  @Input() isDone: boolean;
  @Input() subscribedItems: boolean;
  @Output() itemChange = new EventEmitter<IItem>();
  noItemsYet: string;
  noCheckedItems: string;
  done: string;

  constructor(private itemService: ItemService) {
    this.noItemsYet = NO_ITEMS_YET;
    this.noCheckedItems = NO_CHECKED_ITEMS;
    this.done = DONE;
  }

  ngOnInit(): void { }

  setStyle(item: any):any { 
    if(item.subscribers.includes(this.shoppinglistId)){
      return { display: 'block' };
    }else{
      return { display: 'none' };
    }
  }

  isNoItems():boolean {
    debugger;
    return this.items?.length === 0;
  }

  unsubscribe(item: IItem){ 
    this.itemService.unsubscribe(item._id, this.shoppinglistId).subscribe({
      next: (response) => {
        this.itemChange.emit(response);
      },
      error: (err) => {
        throw new Error("Not implemented");
        //this.isLoading = false;
        //this.errorHandler(err);
      }
    });
  }
}
