import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoHttpRequestModule } from '@po-ui/ng-components';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'; //atencao

registerLocaleData(localePt) //atencao

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom([BrowserAnimationsModule, PoHttpRequestModule]),
    {provide:LOCALE_ID,useValue:'pt-BR'} //atencao
  ],
  
};