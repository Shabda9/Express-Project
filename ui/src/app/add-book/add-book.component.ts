import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';
import { Book } from '../interface';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  public bookForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: RequestsService,
    private router: Router
  ) { }

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
      const formData = this.bookForm.value;
      this.api.saveBook(formData).subscribe((res: Book) => {
        this.router.navigate(['/book']);
      })
    }
  }
}
