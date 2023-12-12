import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Book, User } from './interface';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  baseUrl: string = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) { }

  saveBook(params: any) {
    return this.http.post<any>(this.baseUrl + 'books', params)
  }

  getAllBooks() {
    return this.http.get<any>(this.baseUrl + 'books')
  }

  getBookDetails(id: string) {
    return this.http.get<any>(this.baseUrl + 'books/' + id)
  }

  deleteBook(id: string) {
    return this.http.delete<any>(this.baseUrl + 'books/' + id)
  }

  updateBook(id: string, params: Book) {
    return this.http.put<any>(this.baseUrl + 'books/' + id, params)
  }

  createUser(params: User) {
    return this.http.post<any>(this.baseUrl + 'users/', params)
  }

}
