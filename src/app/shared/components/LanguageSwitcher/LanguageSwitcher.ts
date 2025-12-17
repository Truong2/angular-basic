import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '@/core/services/i18n.service';

@Component({
  standalone: true,
  selector: 'app-language-switcher',
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="flex items-center gap-2">
      <label class="content-13 text-neutral800">
        {{ 'common.language' | translate }}:
        <select
          class="ml-1 border border-neutral300 rounded px-2 py-1 bg-white content-13"
          [value]="currentLang"
          (change)="onLanguageChange($event)"
        >
          <option *ngFor="let lang of supportedLangs" [value]="lang">
            {{ 'language.' + lang | translate }}
          </option>
        </select>
      </label>
    </div>
  `,
})
export class LanguageSwitcherComponent {
  supportedLangs: string[] = [];
  currentLang = '';

  constructor(private i18n: I18nService) {}

  ngOnInit(): void {
    this.supportedLangs = this.i18n.getSupportedLangs();
    this.currentLang = this.i18n.getCurrentLang();
  }

  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;

    if (this.i18n.isSupportedLang(lang)) {
      this.i18n.use(lang);
      this.currentLang = lang;
    }
  }
}
