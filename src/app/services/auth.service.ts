import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, from } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new Subject<boolean>();

  constructor( private router:Router, private auth: Auth) {}
  
  login(username:string, password:string) {
    localStorage.setItem('token', 'true');
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout() {
    from(this.auth.signOut());
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
