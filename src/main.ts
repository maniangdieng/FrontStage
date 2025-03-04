import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './AuthInterceptor';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Conserver les providers existants de appConfig
    importProvidersFrom(HttpClientModule), // Importer HttpClientModule
    provideHttpClient(withInterceptors([AuthInterceptor])), // Enregistrer l'intercepteur

  ],
}).catch((err) => console.error(err));