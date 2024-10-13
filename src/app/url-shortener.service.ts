import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {

  private apiUrl = 'https://api-ssl.bitly.com/v4/shorten';
  private token = '5c7bdb75a12f31a9b00fe70dab9ffa1a28f7a051';

  constructor(private http: HttpClient) { }

  shortenUrl(longUrl: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      long_url: longUrl
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
