/**
 * EXAMPLE: Cách sử dụng Zod trực tiếp trong Angular (nếu muốn giữ nguyên Zod)
 *
 * CÀI ĐẶT:
 * npm install zod
 * npm install --save-dev @types/node (nếu cần)
 *
 * LƯU Ý: File này chỉ là ví dụ, không được import vào code chính
 */

/*
import { z } from 'zod';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Tạo Zod schema (giống React)
export const loginSchema = (t: any) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('message.E1', { field: t('label.email') }) })
      .regex(emailRegex, { message: t('message.E2', { field: t('label.email') }) }),
    password: z.string().min(1, { message: t('message.E1', { field: t('label.password') }) }),
  });

// Chuyển Zod schema sang Angular Validators
export function zodToAngularValidators<T extends z.ZodTypeAny>(
  schema: T,
  formValue: Record<string, any>
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fieldName = Object.keys(control.parent?.controls || {}).find(
      (key) => control.parent?.controls[key] === control
    );

    if (!fieldName) {
      return null;
    }

    try {
      // Validate field với Zod
      const fieldSchema = (schema as z.ZodObject<any>).shape[fieldName];
      if (!fieldSchema) {
        return null;
      }

      const result = fieldSchema.safeParse(control.value);

      if (!result.success) {
        const error = result.error.errors[0];
        return {
          zod: {
            message: error.message,
          },
        };
      }

      return null;
    } catch (error) {
      return null;
    }
  };
}

// Cách sử dụng trong component:
/*
import { loginSchema } from '@/core/validators/zod-validators';

export class LoginComponent {
  loginForm!: FormGroup;

  ngOnInit(): void {
    const schema = loginSchema(this.t);
    
    this.loginForm = this.fb.group({
      email: ['', [zodToAngularValidators(schema, {})]],
      password: ['', [zodToAngularValidators(schema, {})]],
    });
  }
}
*/

/**
 * KHUYẾN NGHỊ:
 * Nên dùng Custom Validators (cách 1) thay vì Zod vì:
 * 1. Nhẹ hơn, không cần thêm dependency
 * 2. Type-safe với Angular
 * 3. Dễ maintain và test hơn
 * 4. Tương thích tốt với Angular Reactive Forms
 */
