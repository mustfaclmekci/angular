// angular'ın çekirdek modülü, her projede olur
import { NgModule } from '@angular/core';
// tarayıcı desteği için gerekli modül
import { BrowserModule } from '@angular/platform-browser';
// ngModel gibi formlar için lazım olan modül
import { FormsModule } from '@angular/forms';

// firebase için ana modül ve firestore veritabanı modülü (compat versiyon)
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// yeni firebase sdk yapısıyla uyumlu modüller
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// routing (sayfa yönlendirme) modülü
import { AppRoutingModule } from './app-routing.module';

// component'lerimiz
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

// özel pipe (kategoriye göre filtreleme için)
import { CategoryFilterPipe } from './pipe/category-filter.pipe';

// firebase ayarları (environment.ts dosyasından)
import { environment } from '../environments/environment';

@NgModule({
  // uygulamada kullanılacak bileşenler
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddTaskComponent,
    TaskListComponent,
    ResetPasswordComponent,
  ],
  // uygulamada yüklenecek modüller
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CategoryFilterPipe, // özel pipe

    // firebase başlatma ve servis tanımlamaları
    AngularFireModule.initializeApp(environment.firebase), // eski yapı
    AngularFirestoreModule, // firestore (compat)
    provideFirebaseApp(() => initializeApp(environment.firebase)), // yeni yapı
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [], // servis varsa buraya eklenir (şu an boş)
  bootstrap: [AppComponent], // uygulama AppComponent ile başlar
})
export class AppModule {}
