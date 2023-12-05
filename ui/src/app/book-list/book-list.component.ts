import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';
import { Book } from '../interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public bookForm!: FormGroup;
  public books!: Book[];
  public showDeleteModal!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private api: RequestsService,
    private router: Router
    ) {}

  ngOnInit() {
    this.books = [];
    this.getAllBooks();
  }

  addNewBook() {
    this.router.navigate(['/book/add']);
  }

  getAllBooks() {
    this.api.getAllBooks().subscribe((res: Book[]) => {
      this.books = res
    })
  }

  editBook(book: Book) {
    this.router.navigate(['/book/', book._id]);
    console.log('Update the book')
  }

  deleteBook(id: any) {
    this.api.deleteBook(id).subscribe(res => {
      this.getAllBooks();
      this.showDeleteModal = true;
    })
  }

  hideDeleteModal() {
    this.showDeleteModal = false;
  }
}
