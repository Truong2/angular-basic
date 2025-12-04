import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator functions
export class CustomValidators {
  /**
   * Required validator with custom message
   */
  static required(message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        !control.value ||
        (typeof control.value === 'string' && control.value.trim().length === 0)
      ) {
        return {
          required: {
            message: message || 'This field is required',
          },
        };
      }
      return null;
    };
  }

  /**
   * Email validator with custom message and regex
   */
  static email(emailRegex?: RegExp, message?: string): ValidatorFn {
    const defaultEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regex = emailRegex || defaultEmailRegex;

    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Don't validate empty values (use required separately)
      }

      if (!regex.test(control.value)) {
        return {
          email: {
            message: message || 'Please enter a valid email address',
          },
        };
      }
      return null;
    };
  }

  /**
   * Min length validator with custom message
   */
  static minLength(minLength: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Don't validate empty values (use required separately)
      }

      const length = typeof control.value === 'string' ? control.value.length : 0;
      if (length < minLength) {
        return {
          minlength: {
            requiredLength: minLength,
            actualLength: length,
            message: message || `Please enter at least ${minLength} characters`,
          },
        };
      }
      return null;
    };
  }

  /**
   * Max length validator with custom message
   */
  static maxLength(maxLength: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const length = typeof control.value === 'string' ? control.value.length : 0;
      if (length > maxLength) {
        return {
          maxlength: {
            requiredLength: maxLength,
            actualLength: length,
            message: message || `Please enter no more than ${maxLength} characters`,
          },
        };
      }
      return null;
    };
  }

  /**
   * Pattern validator with custom message
   */
  static pattern(pattern: RegExp, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      if (!pattern.test(control.value)) {
        return {
          pattern: {
            message: message || 'Please enter in the correct format',
          },
        };
      }
      return null;
    };
  }
}
