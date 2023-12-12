import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../requests.service';
import { User } from '../interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm!: FormGroup;
  signupSuccess!: boolean;

  constructor(
    private fb: FormBuilder,
    private api: RequestsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    // Add logic to handle form submission, e.g., calling an authentication service
    const userData = this.signupForm.value;
    this.api.createUser(userData).subscribe((res: User) => {
      // this.authService.setCurrentUser(res);
      console.log(res.token)
      // localStorage.setItem('access_token', res.token || "");
      this.router.navigate(['/login'])
    })
    console.log('Signup form submitted:', this.signupForm.value);
  }
}
