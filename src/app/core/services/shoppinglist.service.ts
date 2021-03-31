import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IShoppinglist } from 'src/app/shared/interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  constructor(private httpClient: HttpClient) { }

  // put("/shoppinglists/:id")
  updateShoppinglist(id: string, newName: string): Observable<IShoppinglist> {
    return this.httpClient.put<IShoppinglist>(
      `${apiUrl}/shoppinglists/${id}`, 
      { newName }, 
      );
  }
  // put("/shoppinglists/add-item")
  addShoppinglistItem(shoppinglistId: string, itemId: string): Observable<IShoppinglist> {
    return this.httpClient.put<IShoppinglist>(
      `${apiUrl}/shoppinglists/add-item`,
      { shoppinglistId, itemId },
    );
  }
  // post("/shoppinglists/create")
  createShoppinglist(name: string): Observable<IShoppinglist> {
    return this.httpClient.post<IShoppinglist>(
      `${apiUrl}/shoppinglists/create`,
      {shoppinglistName: name},
    );
  }
  // get("/shoppinglists")
  loadUserShoppinglists(): Observable<IShoppinglist[]> {
    return this.httpClient.get<IShoppinglist[]>(
      `${apiUrl}/shoppinglists`
    );
  }
  // get("/shoppinglists/favorite")
  getFavoriteShoppinglist(): Observable<IShoppinglist> {
    return this.httpClient.get<IShoppinglist>(
      `${apiUrl}/shoppinglists/favorite`
    );
  }
  // get("/shoppinglists/:id")
  loadShoppinglist(id: string): Observable<IShoppinglist> {
    return this.httpClient.get<IShoppinglist>(
      `${apiUrl}/shoppinglists/${id}`
    );
  }
  // delete("/shoppinglists/:id")
  deleteShoppinglist(id: string): Observable<IShoppinglist> {
    return this.httpClient.delete<IShoppinglist>(
      `${apiUrl}/shoppinglists/${id}`
    );
  }
  // put("/shoppinglists/remove-item")
  removeShoppinglistItem(shoppinglistId: string, itemId: string): Observable<IShoppinglist> {
    return this.httpClient.put<IShoppinglist>(
      `${apiUrl}/shoppinglists/remove-item`,
      { shoppinglistId, itemId },
    );
  }
  // put("/shoppinglists/not-favorite")
  shoppinglistNotFavorite(shoppinglistId: string): Observable<IShoppinglist> {
    return this.httpClient.put<IShoppinglist>(
      `${apiUrl}/shoppinglists/not-favorite`,
      { shoppinglistId },
    );
  }
  // put("/shoppinglists/favorite")
  shoppinglistFavorite(shoppinglistId: string): Observable<IShoppinglist> {
    return this.httpClient.put<IShoppinglist>(
      `${apiUrl}/shoppinglists/favorite`,
      { shoppinglistId },
    );
  }
}
