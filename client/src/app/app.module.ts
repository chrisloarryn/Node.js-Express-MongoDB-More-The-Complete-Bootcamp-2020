import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";

import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {TaskscsvComponent} from './components/taskscsv/taskscsv.component';

import {AuthGuard} from "./auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    TasksComponent,
    TaskscsvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
