import { Component } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email = '';
  message = '';
  error = '';

  constructor(private auth: Auth) {}

  resetPassword() {
    if (!this.email) {
      this.error = 'Lütfen geçerli bir e-posta girin.';
      this.message = '';
      return;
    }

    sendPasswordResetEmail(this.auth, this.email)
      .then(() => {
        this.message = '📩 Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.';
        this.error = '';
      })
      .catch((err) => {
        console.error(err);
        this.message = '';
        this.error = 'Geçersiz e-posta adresi veya kullanıcı bulunamadı.';
      });
  }
}
