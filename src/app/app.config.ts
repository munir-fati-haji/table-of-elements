import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideDialogInitializer } from './shared/utils/dialog-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideNotificationInitializer } from './shared/utils/notification-utils';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideDialogInitializer(),
    importProvidersFrom([BrowserAnimationsModule]),
    provideNotificationInitializer(),
    provideHttpClient(),
  ],
};
