import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatGridListModule,
  MatListModule,
  MatIconModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { EmojiService } from './emoji.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // material 
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [EmojiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
