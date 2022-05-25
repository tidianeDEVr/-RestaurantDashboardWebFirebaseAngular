import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authSer: AuthService, private router:Router, private toast:HotToastService) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  submit(){
    if(!this.loginForm.valid) return;
    const { email, password} = this.loginForm.value;
    this.authSer.login(email, password).pipe(
      this.toast.observe(
        {
          success: 'Connexion reussi',
          loading: 'Connexion en cours',
          error: 'Veuillez reessayez !'
        }
      )
    ).subscribe(()=>{
      this.router.navigate(['/dashboard']);
    })
  }
}

