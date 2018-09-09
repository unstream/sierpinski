import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SierpinskiComponent } from './sierpinski/sierpinski.component';

@NgModule({
  declarations: [
    SierpinskiComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],

  bootstrap: [SierpinskiComponent]
})
export class AppModule { }
