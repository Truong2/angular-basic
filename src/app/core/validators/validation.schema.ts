import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CustomValidators } from './custom.validators';

// Email regex pattern
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Translation function type (you can replace with your i18n service)
export type TranslationFunction = (key: string, params?: Record<string, any>) => string;

// Default translation function (fallback when i18n service is not available)
const defaultT: TranslationFunction = (key: string, params?: Record<string, any>) => {
  // Placeholder translations - should be replaced with actual i18n service
  const translations: Record<string, string> = {
    'message.E1': `${params?.['field'] || ''} is required`,
    'message.E2': `${params?.['field'] || ''} format is incorrect`,
    'label.email': 'Email',
    'label.password': 'Password',
  };

  let message = translations[key] || key;

  // Replace params in message (support both {{param}} and {param} formats)
  if (params) {
    Object.keys(params).forEach((paramKey) => {
      message = message.replace(`{{${paramKey}}}`, params[paramKey]);
      message = message.replace(`{${paramKey}}`, params[paramKey]);
    });
  }

  return message;
};

/**
 * Login validation schema - Similar to Zod schema in React
 * Usage: loginSchema(t).applyToFormGroup(formGroup)
 */
export class LoginSchema {
  constructor(private t: TranslationFunction = defaultT) {}

  /**
   * Create validators for email field
   */
  getEmailValidators(): ValidatorFn[] {
    return [
      CustomValidators.required(this.t('message.E1', { field: this.t('label.email') })),
      CustomValidators.email(emailRegex, this.t('message.E2', { field: this.t('label.email') })),
    ];
  }

  /**
   * Create validators for password field
   */
  getPasswordValidators(): ValidatorFn[] {
    return [CustomValidators.required(this.t('message.E1', { field: this.t('label.password') }))];
  }

  /**
   * Get all validators as an object (similar to Zod schema shape)
   */
  getValidators(): {
    email: ValidatorFn[];
    password: ValidatorFn[];
  } {
    return {
      email: this.getEmailValidators(),
      password: this.getPasswordValidators(),
    };
  }

  /**
   * Apply validators to a FormGroup
   */
  applyToFormGroup(control: AbstractControl): void {
    const validators = this.getValidators();

    const emailControl = control.get('email');
    if (emailControl) {
      emailControl.setValidators(validators.email);
      emailControl.updateValueAndValidity();
    }

    const passwordControl = control.get('password');
    if (passwordControl) {
      passwordControl.setValidators(validators.password);
      passwordControl.updateValueAndValidity();
    }
  }
}

/**
 * Factory function to create login schema (similar to React version)
 * @param t Translation function
 * @returns LoginSchema instance
 */
export const createLoginSchema = (t?: TranslationFunction): LoginSchema => {
  return new LoginSchema(t);
};
