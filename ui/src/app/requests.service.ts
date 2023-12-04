import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  baseUrl: string = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) { }

  saveBooks(params: any) {
    return this.http.post<any>(this.baseUrl + 'books/new', params)
  }

  getAllBooks() {
    return this.http.get<any>(this.baseUrl + 'books')
  }
}
