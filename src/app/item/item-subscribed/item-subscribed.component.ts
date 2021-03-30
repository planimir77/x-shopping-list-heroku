import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-item-subscribed',
  templateUrl: './item-subscribed.component.html',
  styleUrls: ['./item-subscribed.component.scss']
})
export class ItemSubscribedComponent implements OnInit {

  @Input() item: IItem;

  constructor() { }

  ngOnInit(): void { }
}
