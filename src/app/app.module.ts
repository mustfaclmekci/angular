import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { CategoryFilterPipe } from './pipe/category-filter.pipe';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './task-list/task-list.component';

import { environment } from '../environments/environment';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    RegisterComponent,
    HomeComponent,
    AddTaskComponent,
    TaskListComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CategoryFilterPipe,

    // Firebase bağlantıları
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
