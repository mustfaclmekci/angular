import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  register() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Kayıt başarılı:', userCredential.user);
        this.router.navigate(['/home']); // İstersen login sayfasına da yönlendirebilirsin
      })
      .catch((err) => {
        console.error('Kayıt hatası:', err);
        this.error = 'Bu e-posta adresi zaten kayıtlı olabilir.';
      });
  }
}