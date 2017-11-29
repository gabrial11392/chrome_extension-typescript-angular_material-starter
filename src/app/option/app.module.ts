

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialHelperModule }  from './material-helper/material-helper.module';

import { KitchenSink } from './kitchen-sink/kitchen-sink';

import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent,
	KitchenSink
  ],
  imports: [
    BrowserModule,
	FormsModule,
	MaterialHelperModule,
	BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

