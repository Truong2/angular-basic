import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ControlContainer, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-form-item',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './FormItem.html',
  styleUrl: './FormItem.scss',
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

  getContainerClasses(): any {
    const classes: any = {
      'has-error': this.showError && this.invalid,
    };

    // Split containerClassName if it contains multiple classes
    if (this.containerClassName) {
      const classList = this.containerClassName.split(' ').filter(Boolean);
      classList.forEach((className: string) => {
        classes[className] = true;
      });
    }

    return classes;
  }

  get firstErrorMessage(): string | null {
    const c = this.control;
    if (!c || !c.errors) {
      return null;
    }

    // Check for custom error messages (from CustomValidators)
    const errors = c.errors;

    if (errors['required']) {
      return (errors['required'] as any)?.message || 'This field is required';
    }
    if (errors['email']) {
      return (errors['email'] as any)?.message || 'Please enter a valid email address';
    }
    if (errors['minlength']) {
      const minlengthError = errors['minlength'] as any;
      return (
        minlengthError?.message ||
        `Please enter at least ${minlengthError?.requiredLength || 0} characters`
      );
    }
    if (errors['maxlength']) {
      const maxlengthError = errors['maxlength'] as any;
      return (
        maxlengthError?.message ||
        `Please enter no more than ${maxlengthError?.requiredLength || 0} characters`
      );
    }
    if (errors['pattern']) {
      return (errors['pattern'] as any)?.message || 'Please enter in the correct format';
    }

    // fallback: use first error key
    const firstKey = Object.keys(c.errors)[0];
    const firstError = c.errors[firstKey];

    // Check if error has a message property
    if (firstError && typeof firstError === 'object' && 'message' in firstError) {
      return (firstError as any).message;
    }

    return 'Please check your input';
  }
}
