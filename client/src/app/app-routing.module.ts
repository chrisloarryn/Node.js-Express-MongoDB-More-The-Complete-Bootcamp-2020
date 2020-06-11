import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Components
import {TasksComponent} from "./components/tasks/tasks.component";
import {SigninComponent} from "./components/signin/signin.component";
import {SignupComponent} from "./components/signup/signup.component";
import {TaskscsvComponent} from "./components/taskscsv/taskscsv.component";
import {AuthGuard} from "./auth.guard";
// import {TaskscsvComponent} from "./components/taskscsv/taskscsv.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'private',
    component: TaskscsvComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {
}
