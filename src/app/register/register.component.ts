import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // CSS stil dosyası
})
export class RegisterComponent {
  // Kullanıcıdan alınacak e-posta ve şifre bilgileri
  email = '';
  password = '';

  // Oluşabilecek hataları tutmak için kullanılan değişken
  error = '';

  // Firebase Authentication ve yönlendirme servisi (router)
  constructor(private auth: Auth, private router: Router) {}

  // Kayıt oluşturma işlemi
  register() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Kayıt başarılıysa anasayfaya yönlendirme
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        // Hata kodlarına göre kullanıcıya uygun mesaj gösterilir
        console.error(err.code);
        if (err.code === 'auth/email-already-in-use') {
          this.error = 'Bu e-posta adresi zaten kayıtlı.';
        } else if (err.code === 'auth/invalid-email') {
          this.error = 'Geçersiz e-posta adresi.';
        } else if (err.code === 'auth/weak-password') {
          this.error = 'Şifre en az 6 karakter olmalıdır.';
        } else {
          this.error = 'Kayıt oluşturulamadı. Lütfen tekrar deneyin.';
        }
      });
  }
}
