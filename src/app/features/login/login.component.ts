import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../shared/components/Button/Button';
import { TextInputComponent } from '../../shared/components/FormItem/TextInput/TextInput';
import { FormItemComponent } from '../../shared/components/FormItem/FormItem.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    TextInputComponent,
    FormItemComponent,
  ],
  template: `
    <div class="login-container">
      <h1 class="login-title">ログイン</h1>
      <p class="login-subtitle">タクシー配車管理画面へようこそ!</p>

      <form [formGroup]="loginForm" (ngSubmit)="handleLogin()" class="login-form">
        <app-form-item controlName="email" label="メールアドレス" [required]="true">
          <app-text-input
            formControlName="email"
            placeholder="メールアドレスを入力してください"
            type="email"
          >
          </app-text-input>
        </app-form-item>

        <app-form-item controlName="password" label="パスワード" [required]="true">
          <app-text-input
            formControlName="password"
            type="password"
            placeholder="パスワードを入力してください"
          >
          </app-text-input>
        </app-form-item>

        <div class="forgot-password">
          <a href="#" class="forgot-password-link">パスワードをお忘れですか?</a>
        </div>

        <app-button
          size="large"
          variant="primary"
          type="submit"
          [disabled]="loginForm.invalid || isLoading"
          [loading]="isLoading"
        >
          ログイン
        </app-button>
      </form>
    </div>
  `,
  styles: [
    `
      .login-container {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
      }

      .login-title {
        font-size: 32px;
        font-weight: 700;
        color: #000;
        margin: 0 0 8px 0;
        text-align: center;
      }

      .login-subtitle {
        font-size: 14px;
        color: #000;
        margin: 0 0 32px 0;
        text-align: center;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .form-item {
        width: 100%;
      }

      .forgot-password {
        text-align: right;
        margin-top: -8px;
      }

      .forgot-password-link {
        font-size: 14px;
        color: #00816e;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: #006d5c;
          text-decoration: underline;
        }
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
