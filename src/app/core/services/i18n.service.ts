import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationFunction } from '../validators/validation.schema';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly defaultLang = 'en';
  private readonly supportedLangs = ['en', 'vi', 'ja'];

  constructor(private translate: TranslateService) {
    this.initialize();
  }

  private initialize(): void {
    // Set default language
    this.translate.setDefaultLang(this.defaultLang);

    // Try to get language from localStorage or browser
    const savedLang = localStorage.getItem('app-language');
    const browserLang = this.translate.getBrowserLang() || this.defaultLang;
    const langToUse =
      savedLang || (this.supportedLangs.includes(browserLang) ? browserLang : this.defaultLang);

    // Use language
    this.use(langToUse);
  }

  /**
   * Change language
   */
  use(lang: string): void {
    if (this.supportedLangs.includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem('app-language', lang);
    }
  }

  /**
   * Get current language
   */
  getCurrentLang(): string {
    return this.translate.currentLang || this.defaultLang;
  }

  /**
   * Get translation function compatible with validation schema
   */
  getTranslationFunction(): TranslationFunction {
    return (key: string, params?: Record<string, any>): string => {
      return this.translate.instant(key, params);
    };
  }

  /**
   * Translate a key
   */
  translateKey(key: string, params?: Record<string, any>): string {
    return this.translate.instant(key, params);
  }

  /**
   * Translate asynchronously (returns Observable)
   */
  translateAsync(key: string, params?: Record<string, any>) {
    return this.translate.get(key, params);
  }

  /**
   * Check if language is supported
   */
  isSupportedLang(lang: string): boolean {
    return this.supportedLangs.includes(lang);
  }

  /**
   * Get all supported languages
   */
  getSupportedLangs(): string[] {
    return [...this.supportedLangs];
  }
}
