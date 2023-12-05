import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../interface';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{
  bookForm!: FormGroup
  bookId!: string;

  constructor(
    private api: RequestsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ){
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: [''],
      pages: [0, Validators.min(0)] // Assuming pages cannot be negative
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.bookId = param['id'];
      this.getBookDetails();
    });
  }

  getBookDetails() {
    this.api.getBookDetails(this.bookId).subscribe((res: Book) => {
      this.bookForm.patchValue(res);
    });
  }

  updateBook() {
    const formData = this.bookForm.value;
    this.api.updateBook(this.bookId, formData).subscribe((res: Book) => {
      this.router.navigate(['/book'])
    })
    console.log('Updating')
  }
}
