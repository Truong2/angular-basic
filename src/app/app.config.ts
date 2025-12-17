import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import {
  TranslateModule,
  provideTranslateLoader,
  provideTranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader, provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { refreshInterceptor } from './core/interceptors/refresh.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, refreshInterceptor, errorInterceptor])),
    // Import TranslateModule for pipes/directives in standalone components
    importProvidersFrom(TranslateModule),
    // Configure the root TranslateService with the HTTP loader
    ...provideTranslateService({
      loader: provideTranslateLoader(TranslateHttpLoader),
    }),
    // Configure TranslateHttpLoader options (v17 standalone-style)
    ...provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json',
    }),
  ],
};
