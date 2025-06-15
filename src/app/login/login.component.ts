import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // css
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Giriş başarılı:', userCredential.user);
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        console.error('Giriş hatası:', err);
        this.error = 'E-posta veya şifre hatalı.';
      });
  }
}
