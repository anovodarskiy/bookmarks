import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';

import { environment } from '../environments/environment';
import { AppStoreModule } from './store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { fakeBackendProvider } from './helpers/fake-backend';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    AppRoutingModule,
    AppStoreModule
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
