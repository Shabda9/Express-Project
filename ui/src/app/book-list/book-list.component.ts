import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public bookForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: RequestsService
    ) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required],
      pages: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      // Handle form submission logic here
      const formData = this.bookForm.value;
      console.log(formData);
    }
  }

  getAllBooks() {
    this.api.getAllBooks().subscribe(res => console.log(res))
  }
}
