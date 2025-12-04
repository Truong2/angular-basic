# Validation Schema - Similar to Zod in React

Hệ thống validation schema tương tự Zod trong React, được thiết kế để dễ dàng chuyển đổi từ React sang Angular.

## Cách sử dụng

### 1. Tạo Validation Schema (Giống React)

```typescript
import { createLoginSchema } from '@/core/validators/validation.schema';

// Trong component
const loginSchema = createLoginSchema(t); // t là translation function
const validators = loginSchema.getValidators();

// Sử dụng với FormBuilder
this.loginForm = this.fb.group({
  email: ['', validators.email],
  password: ['', validators.password],
});
```

### 2. Tích hợp với i18n Service

```typescript
import { TranslateService } from '@ngx-translate/core'; // hoặc i18n service của bạn

// Trong component
constructor(private translate: TranslateService) {}

private t: TranslationFunction = (key: string, params?: Record<string, any>) => {
  return this.translate.instant(key, params);
};

ngOnInit(): void {
  const loginSchema = createLoginSchema(this.t);
  // ...
}
```

### 3. Custom Validators

Bạn có thể tạo custom validators riêng:

```typescript
import { CustomValidators } from '@/core/validators/custom.validators';

this.form = this.fb.group({
  email: [
    '',
    [
      CustomValidators.required('Email là bắt buộc'),
      CustomValidators.email(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email không hợp lệ'),
    ],
  ],
});
```

## So sánh với React Zod

### React (Zod):

```typescript
export const loginSchema = (t: any) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('message.E1', { field: t('label.email') }) })
      .regex(emailRegex, { message: t('message.E2', { field: t('label.email') }) }),
    password: z.string().min(1, { message: t('message.E1', { field: t('label.password') }) }),
  });
```

### Angular (Custom Validators):

```typescript
export const createLoginSchema = (t?: TranslationFunction): LoginSchema => {
  return new LoginSchema(t);
};

// Usage
const loginSchema = createLoginSchema(t);
const validators = loginSchema.getValidators();
```

## Tạo Schema mới

1. Tạo class Schema mới trong `validation.schema.ts`:

```typescript
export class MyFormSchema {
  constructor(private t: TranslationFunction = defaultT) {}

  getFieldValidators(): ValidatorFn[] {
    return [
      CustomValidators.required(this.t('message.E1', { field: this.t('label.field') })),
      // ... more validators
    ];
  }

  getValidators(): {
    field: ValidatorFn[];
  } {
    return {
      field: this.getFieldValidators(),
    };
  }
}

export const createMyFormSchema = (t?: TranslationFunction): MyFormSchema => {
  return new MyFormSchema(t);
};
```

2. Sử dụng trong component:

```typescript
const schema = createMyFormSchema(this.t);
const validators = schema.getValidators();

this.form = this.fb.group({
  field: ['', validators.field],
});
```
