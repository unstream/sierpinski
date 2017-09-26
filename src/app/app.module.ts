import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Sierpinski } from './sierpinski/sierpinski.component';

@NgModule({
  declarations: [
    Sierpinski
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
//  bootstrap: [AppComponent, CanvasComponent]
  bootstrap: [Sierpinski]
})
export class AppModule { }
