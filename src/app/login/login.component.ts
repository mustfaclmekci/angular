// bileşen tanımı angulardan alınır
import { Component } from '@angular/core';
// firebase ile kullanıcı girişi için auth ve giriş fonksiyonu
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
// giriş yaptıktan sonra sayfa yönlendirmesi için router
import { Router } from '@angular/router';

@Component({
  selector: 'app-login', // bu bileşen html’de <app-login> olarak kullanılır
  templateUrl: './login.component.html', // html dosyasının yolu
  styleUrls: ['./login.component.css'], // stil dosyasının yolu
})
export class LoginComponent {
  // kullanıcıdan alınacak bilgiler
  email = '';
  password = '';

  // hataları göstermek için
  error = '';

  // servisleri constructor ile alıyoruz (auth ve yönlendirme)
  constructor(private auth: Auth, private router: Router) {}

  // giriş yap butonuna basılınca çalışacak fonksiyon
  login() {
    // firebase'de giriş yapılır
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // giriş başarılıysa anasayfaya yönlendir
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        // hata varsa hangi hata olduğuna göre mesaj göster
        console.error(err.code);
        if (err.code === 'auth/invalid-email') {
          this.error = 'Geçersiz e-posta formatı.';
        } else if (err.code === 'auth/user-not-found') {
          this.error = 'Bu e-posta adresine ait kullanıcı bulunamadı.';
        } else if (err.code === 'auth/wrong-password') {
          this.error = 'Hatalı şifre girdiniz.';
        } else {
          this.error = 'Giriş yapılamadı. Lütfen tekrar deneyin.';
        }
      });
  }
}
