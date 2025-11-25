import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptorInterceptor } from './Core/interceptors/jwt-interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    // HttpClient + Fetch backend + Interceptor
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptorInterceptor])
    )
  ]
};
