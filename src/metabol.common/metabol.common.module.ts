import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {CurrencyMetabolitesService, AppDataLoader} from './services';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [
    AppDataLoader,
    CurrencyMetabolitesService
  ],
})
export class MetabolCommonModule { }
