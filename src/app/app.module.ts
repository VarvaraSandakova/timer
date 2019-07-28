import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

import {AppComponent} from './app.component';
import {TimerComponent} from './timer/timer.component';
import {TimerListComponent} from './timer-list/timer-list.component';
import {TimeManagerService} from './shared/services/time-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimerListComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatListModule,
    MatButtonModule
  ],
  providers: [TimeManagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
