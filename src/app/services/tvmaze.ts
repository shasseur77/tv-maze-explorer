import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvmazeService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.tvmaze.com';

  searchShows(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/shows?q=${query}`); // Recherche de séries par mot-clé
  }

  getShowDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/shows/${id}`); // Récupére les détails d'une série par ID
  }
}