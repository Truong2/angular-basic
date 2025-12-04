# i18n Configuration Guide

This project uses `@ngx-translate/core` for internationalization (i18n) support.

## Features

- ✅ Support for multiple languages (English, Vietnamese, Japanese)
- ✅ Runtime language switching
- ✅ Integration with validation schema
- ✅ Translation files in JSON format

## Supported Languages

- **English (en)** - Default
- **Vietnamese (vi)**
- **Japanese (ja)**

## File Structure

```
src/
  assets/
    i18n/
      en.json    # English translations
      vi.json    # Vietnamese translations
      ja.json    # Japanese translations
  app/
    core/
      services/
        i18n.service.ts    # i18n service wrapper
      validators/
        validation.schema.ts  # Validation with i18n
```

## Usage

### 1. In Templates (HTML)

Use the `translate` pipe (must import TranslateModule in component):

```html
<h1>{{ 'common.login' | translate }}</h1>
<p>{{ 'common.welcome' | translate }}</p>
<label>{{ 'label.email' | translate }}</label>
```

With parameters:

```html
<p>{{ 'message.E1' | translate: { field: 'Email' } }}</p>
```

### 2. In Components (TypeScript)

#### Using I18nService:

```typescript
import { I18nService } from '@/core/services/i18n.service';

export class MyComponent {
  constructor(private i18n: I18nService) {}

  ngOnInit(): void {
    // Translate a key
    const message = this.i18n.translateKey('common.login');

    // Translate with parameters
    const error = this.i18n.translateKey('message.E1', { field: 'Email' });

    // Get translation function for validation schema
    const t = this.i18n.getTranslationFunction();
    const schema = createLoginSchema(t);

    // Change language
    this.i18n.use('vi'); // Switch to Vietnamese
  }
}
```

### 3. With Validation Schema

The validation schema is already integrated with i18n:

```typescript
import { I18nService } from '@/core/services/i18n.service';
import { createLoginSchema } from '@/core/validators/validation.schema';

export class LoginComponent {
  constructor(private i18n: I18nService) {}

  ngOnInit(): void {
    // Get translation function
    const t = this.i18n.getTranslationFunction();

    // Create schema with i18n
    const loginSchema = createLoginSchema(t);
    const validators = loginSchema.getValidators();

    // Use in form
    this.loginForm = this.fb.group({
      email: ['', validators.email],
      password: ['', validators.password],
    });
  }
}
```

## Adding New Translations

Edit the JSON files in `src/assets/i18n/`:

**en.json:**

```json
{
  "common": {
    "newKey": "New Text"
  }
}
```

## Changing Language

```typescript
this.i18n.use('vi'); // Change to Vietnamese
this.i18n.use('ja'); // Change to Japanese
this.i18n.use('en'); // Change to English
```

## Translation Keys Structure

- `common.*` - Common UI texts (buttons, labels, etc.)
- `label.*` - Form field labels
- `message.*` - Validation and error messages
- `validation.*` - Validation error messages
