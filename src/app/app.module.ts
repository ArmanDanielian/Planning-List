import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterPipe } from './shared/filter.pipe';
import { SearchPipe } from './shared/search.pipe';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FilterPipe,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
