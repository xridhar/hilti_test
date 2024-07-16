import { AuthService } from './../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  signInForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ]),
  });
  constructor(private authService: AuthService) {}

  get email() {
    return this.signInForm.get('email');
  }

  signIn() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value.email as string);
    }
  }
}
