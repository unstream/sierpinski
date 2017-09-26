import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Sierpinsky } from './sierpinsky/sierpinsky.component';

@NgModule({
  declarations: [
    Sierpinsky
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
//  bootstrap: [AppComponent, CanvasComponent]
  bootstrap: [Sierpinsky]
})
export class AppModule { }
