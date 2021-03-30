import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemAddComponent } from './item-add-component/item-add.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from "@angular/forms";
import { ItemListComponent } from './item-list-component/item-list.component';
import { ItemComponent } from './item/item.component';
import { ItemSubscribedListComponent } from './item-subscribed-list/item-subscribed-list.component';
import { ItemSubscribedComponent } from './item-subscribed/item-subscribed.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ItemAddComponent, 
    ItemListComponent, 
    ItemComponent,
    ItemSubscribedListComponent,
    ItemSubscribedComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    ItemAddComponent,
    ItemListComponent,
    ItemComponent,
    ItemSubscribedListComponent,
    ItemSubscribedComponent,
  ]
})
export class ItemModule { }
