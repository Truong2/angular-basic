import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ControlContainer, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-form-item',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-item" [ngClass]="[containerClassName, { 'has-error': showError && invalid }]">
      <label *ngIf="label" class="form-item__label">
        <span [innerHTML]="label"></span>
        <span *ngIf="required" class="form-item__required">*</span>
        <ng-container *ngIf="labelTooltip">
          <span class="form-item__tooltip" [innerHTML]="labelTooltip"></span>
        </ng-container>
      </label>

      <div *ngIf="description" class="form-item__description" [innerHTML]="description"></div>

      <ng-content></ng-content>

      <div
        *ngIf="showError && invalid && (control?.dirty || control?.touched)"
        class="form-item__error"
        [ngClass]="errorClassName"
      >
        {{ firstErrorMessage }}
      </div>
    </div>
  `,
  styles: [
    `
      .form-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
      }

      .form-item__label {
        font-size: 14px;
        font-weight: 600;
        color: #000;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .form-item__required {
        color: #ff3a5e;
      }

      .form-item__description {
        font-size: 12px;
        color: #666;
        margin-bottom: 4px;
      }

      .form-item__error {
        margin-top: 4px;
        font-size: 12px;
        color: #ff3a5e;
      }

      .form-item.has-error .form-item__label {
        color: #ff3a5e;
      }
    `,
  ],
})
export class FormItemComponent {
  @Input() controlName!: string;
  @Input() label?: string;
  @Input() labelTooltip?: string;
  @Input() description?: string;
  @Input() required = false;
  @Input() containerClassName?: string;
  @Input() showError = true;
  @Input() errorClassName?: string;

  constructor(private controlContainer: ControlContainer) {}

  get control(): AbstractControl | null {
    return this.controlContainer?.control?.get(this.controlName) ?? null;
  }

  get invalid(): boolean {
    return !!this.control && this.control.invalid;
  }

  get firstErrorMessage(): string | null {
    const c = this.control;
    if (!c || !c.errors) {
      return null;
    }

    if (c.errors['required']) {
      return 'この項目は必須です';
    }
    if (c.errors['email']) {
      return '正しいメールアドレスを入力してください';
    }
    if (c.errors['minlength']) {
      const requiredLength = c.errors['minlength'].requiredLength;
      return `${requiredLength}文字以上で入力してください`;
    }

    // fallback: use first error key
    const firstKey = Object.keys(c.errors)[0];
    return (c.errors[firstKey] as any)?.message || '入力内容を確認してください';
  }
}
