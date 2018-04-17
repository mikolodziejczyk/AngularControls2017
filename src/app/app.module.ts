import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 


import { AppComponent } from './app.component';

// Import your library
import { SampleModule } from 'third-lib';
import { MyComponentComponent } from './my-component/my-component.component';
import { AnotherComponentComponent } from './another-component/another-component.component';
import { NumberControlComponent } from './number-control/number-control.component';

@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    AnotherComponentComponent,
    NumberControlComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
     // Specify your library as an import
     SampleModule.forRoot()

  ],
  entryComponents: [AnotherComponentComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
