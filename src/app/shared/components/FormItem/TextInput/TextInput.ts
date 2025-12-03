import { Component, EventEmitter, Input, Output, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { LENGTH_CONSTANTS } from '../../../../core/constants/length.constant';

@Component({
  standalone: true,
  selector: 'app-text-input',
  imports: [CommonModule, FormsModule, NzInputModule, NzIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="text-input-wrapper">
      <div class="input-container" [class.has-password-toggle]="showPasswordToggle">
        <input
          nz-input
          #input
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [maxLength]="maxLength"
          [type]="actualType"
          [ngClass]="getClasses()"
          (input)="onInput($event)"
          (blur)="onBlur($event)"
        />
        <span
          *ngIf="showPasswordToggle"
          class="password-toggle"
          (click)="togglePasswordVisibility()"
        >
          <span *ngIf="!isPasswordVisible" nz-icon nzType="eye-invisible" nzTheme="outline"></span>
          <span *ngIf="isPasswordVisible" nz-icon nzType="eye" nzTheme="outline"></span>
        </span>
      </div>
    </div>
  `,
  styleUrl: './TextInput.scss',
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() maxLength = LENGTH_CONSTANTS.MAX_LENGTH_INPUT;
  @Input() type = 'text';
  @Input() size: NzSizeLDSType = 'default';
  @Input() className?: string;
  @Input() addonAfter?: string;

  @Output() change = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<FocusEvent>();

  value = '';
  isPasswordVisible = false;
  actualType = 'text';

  get showPasswordToggle(): boolean {
    return this.type === 'password';
  }

  private onChange = (value: string) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.actualType = this.type;
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.actualType = this.isPasswordVisible ? 'text' : 'password';
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;

    this.value = newValue;
    this.onChange(newValue);
    this.change.emit(event);
  }

  onBlur(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    const trimmedValue = input.value.trim();

    if (trimmedValue !== this.value) {
      this.value = trimmedValue;
      this.onChange(trimmedValue);
      input.value = trimmedValue;
    }

    this.onTouched();
    this.blur.emit(event);
  }

  getClasses(): string {
    const classes: string[] = [];

    if (this.className) {
      classes.push(this.className);
    }

    if (this.addonAfter) {
      classes.push('addon-after');
    }

    if (this.disabled) {
      classes.push('disabled');
    }

    return classes.join(' ');
  }

  // ControlValueAccessor implementation
  writeValue(value: string | null): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
