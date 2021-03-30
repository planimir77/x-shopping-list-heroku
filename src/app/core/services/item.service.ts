import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  // get("/api/item/:_id")
  loadItem(_id: string): Observable<IItem> {
    return this.httpClient.get<IItem>(
      `${apiUrl}/api/item/${_id}`
    );
  }
  // get("/api/item/by-name/:itemName")
  loadItemByName(itemName: string): Observable<IItem> {
    return this.httpClient.get<IItem>(
      `${apiUrl}/api/item/by-name/${itemName}`
    );
  }

  // post("/api/item/create")
  createItem(itemName: string, shoppinglistId: string): Observable<IItem> {
    return this.httpClient.post<IItem>(
      `${apiUrl}/api/item/create`,
      { itemName, shoppinglistId },
    );
  }

  // put("/api/item/subscribe")
  subscribe(itemId: string, shoppinglistId: string) {
    return this.httpClient.put<IItem>(
      `${apiUrl}/api/item/subscribe`,
      { itemId, shoppinglistId },
    );
  }

  // put("/api/item/unsubscribe")
  unsubscribe(itemId: string, shoppinglistId: string) {
    return this.httpClient.put<IItem>(
      `${apiUrl}/api/item/unsubscribe`,
      { itemId, shoppinglistId },
    );
  }
}
