import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  // get("/item/:_id")
  loadItem(_id: string): Observable<IItem> {
    return this.httpClient.get<IItem>(
      `${apiUrl}/item/${_id}`
    );
  }
  // get("/item/by-name/:itemName")
  loadItemByName(itemName: string): Observable<IItem> {
    return this.httpClient.get<IItem>(
      `${apiUrl}/item/by-name/${itemName}`
    );
  }

  // post("/item/create")
  createItem(itemName: string, shoppinglistId: string): Observable<IItem> {
    return this.httpClient.post<IItem>(
      `${apiUrl}/item/create`,
      { itemName, shoppinglistId },
    );
  }

  // put("/item/subscribe")
  subscribe(itemId: string, shoppinglistId: string) {
    return this.httpClient.put<IItem>(
      `${apiUrl}/item/subscribe`,
      { itemId, shoppinglistId },
    );
  }

  // put("/item/unsubscribe")
  unsubscribe(itemId: string, shoppinglistId: string) {
    return this.httpClient.put<IItem>(
      `${apiUrl}/item/unsubscribe`,
      { itemId, shoppinglistId },
    );
  }
}
