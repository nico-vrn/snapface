import { RouterModule } from '@angular/router';
import { httpInterceptorProviders } from './interceptors/index';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import * as fr from '@angular/common/locales/fr';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ],
  providers : [
    { provide : LOCALE_ID, useValue: 'fr-FR'},
    httpInterceptorProviders
  ]
})

export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
