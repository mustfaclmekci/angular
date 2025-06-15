// angular'da modül tanımı yapmak için
import { NgModule } from '@angular/core';
// yönlendirme için gerekli modüller
import { RouterModule, Routes } from '@angular/router';

// sayfa component'lerini içe aktar
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

// burada rotalar tanımlanıyor, hangi path'e hangi component gelecek onu söylüyoruz
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // ana sayfa boşsa login'e yönlendir
  { path: 'login', component: LoginComponent }, // /login adresi LoginComponent'i açar
  { path: 'register', component: RegisterComponent }, // /register sayfası
  { path: 'home', component: HomeComponent }, // ana ekran gibi
  { path: 'tasks', component: TaskListComponent }, // görev listesi
  { path: 'reset-password', component: ResetPasswordComponent }, // şifre sıfırlama

  { path: '**', redirectTo: 'login' } // tanımsız sayfalar login'e gider
];

// bu modül diğer modüllerle kullanılmak üzere export edilir
@NgModule({
  imports: [RouterModule.forRoot(routes)], // tanımlı rotaları root'a uygula
  exports: [RouterModule],
})
export class AppRoutingModule {}
