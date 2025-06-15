import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  
  { path: 'tasks', component: TaskListComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'login' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule {}
