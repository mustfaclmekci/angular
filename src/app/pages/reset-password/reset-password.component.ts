// angular bileşeni tanımı
import { Component } from '@angular/core';
// firebase'den auth modülü ve şifre sıfırlama fonksiyonu
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-reset-password', // html tarafında bu adla çağrılır
  templateUrl: './reset-password.component.html', // html bağlantısı
  styleUrls: ['./reset-password.component.css'] // css bağlantısı
})
export class ResetPasswordComponent {
  // kullanıcı e-posta girişi için değişken
  email = '';
  
  // mesaj ve hata göstermek için
  message = '';
  error = '';

  // constructor ile auth servisini alıyoruz
  constructor(private auth: Auth) {}

  // bu fonksiyon şifre sıfırlama işlemini yapar
  resetPassword() {
    // eğer email boşsa hata ver
    if (!this.email) {
      this.error = 'Lütfen geçerli bir e-posta girin.';
      this.message = '';
      return;
    }

    // firebase ile şifre sıfırlama maili gönder
    sendPasswordResetEmail(this.auth, this.email)
      .then(() => {
        // eğer başarılıysa mesaj göster
        this.message = '📩 Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.';
        this.error = '';
      })
      .catch((err) => {
        // eğer hata varsa kullanıcıya göster
        console.error(err);
        this.message = '';
        this.error = 'Geçersiz e-posta adresi veya kullanıcı bulunamadı.';
      });
  }
}
