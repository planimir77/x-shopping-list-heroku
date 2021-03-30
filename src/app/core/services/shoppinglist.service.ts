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

  // put("/api/shoppinglists/:id")
  updateShoppinglist(id: string, newName: string): Observable<IShoppinglist> {
    return this.httpClient.put<IShoppinglist>(
      `${apiUrl}/api/shoppinglists/${id}`, 
      { newName }, 
      );
  }
  // put("/api/shoppinglists/add-item")
  addShoppinglistItem(shoppinglistId: string, itemId: string): Observable<IShoppinglist> {
    return this.httpClient.put<IShoppinglist>(
      `${apiUrl}/api/shoppinglists/add-item`,
      { shoppinglistId, itemId },
    );
  }
  // post("/api/shoppinglists/create")
  createShoppinglist(name: string): Observable<IShoppinglist> {
    return this.httpClient.post<IShoppinglist>(
      `${apiUrl}/api/shoppinglists/create`,
      {shoppinglistName: name},
    );
  }
  // get("/api/shoppinglists")
  loadUserShoppinglists(): Observable<IShoppinglist[]> {
    return this.httpClient.get<IShoppinglist[]>(
      `${apiUrl}/api/shoppinglists`
    );
  }
  // get("/api/shoppinglists/favorite")
  getFavoriteShoppinglist(): Observable<IShoppinglist> {
    return this.httpClient.get<IShoppinglist>(
      `${apiUrl}/api/shoppinglists/favorite`
    );
  }
  // get("/api/shoppinglists/:id")
  loadShoppinglist(id: string): Observable<IShoppinglist> {
    return this.httpClient.get<IShoppinglist>(
      `${apiUrl}/api/shoppinglists/${id}`
    );
  }
  // delete("/api/shoppinglists/:id")
  deleteShoppinglist(id: string): Observable<IShoppinglist> {
    return this.httpClient.delete<IShoppinglist>(
      `${apiUrl}/api/shoppinglists/${id}`
    );
  }
  // put("/api/shoppinglists/remove-item")
  removeShoppinglistItem(shoppinglistId: string, itemId: string): Observable<IShoppinglist> {
    return this.httpClient.put<IShoppinglist>(
      `${apiUrl}/api/shoppinglists/remove-item`,
      { shoppinglistId, itemId },
    );
  }
  // put("/api/shoppinglists/not-favorite")
  shoppinglistNotFavorite(shoppinglistId: string): Observable<IShoppinglist> {
    return this.httpClient.put<IShoppinglist>(
      `${apiUrl}/api/shoppinglists/not-favorite`,
      { shoppinglistId },
    );
  }
  // put("/api/shoppinglists/favorite")
  shoppinglistFavorite(shoppinglistId: string): Observable<IShoppinglist> {
    return this.httpClient.put<IShoppinglist>(
      `${apiUrl}/api/shoppinglists/favorite`,
      { shoppinglistId },
    );
  }
}
