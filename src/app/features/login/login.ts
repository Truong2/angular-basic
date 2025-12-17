import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@/shared/components/Button/Button';
import { TextInputComponent } from '@/shared/components/FormItem/TextInput/TextInput';
import { FormItemComponent } from '@/shared/components/FormItem/FormItem';
import { AuthService } from '@/core/services/auth.service';
import { createLoginSchema } from '@/core/validators/validation.schema';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonComponent,
    TextInputComponent,
    FormItemComponent,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    // Create form with validation schema (similar to React Zod schema)
    const loginSchema = createLoginSchema();
    const validators = loginSchema.getValidators();

    this.loginForm = this.fb.group({
      email: ['', validators.email],
      password: ['', validators.password],
    });
  }

  handleLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.auth.login({ email, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.data.accessToken);
        localStorage.setItem('refresh_token', res.data.refreshToken);
        window.location.href = '/dashboard';
      },
      error: (error) => {
        console.error('Login error:', error);
        this.isLoading = false;
      },
    });
  }
}
