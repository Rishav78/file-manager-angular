import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authData = {
    email: '',
    password: '',
  }

  constructor(private auth: AuthService, private router: Router) {
    
  }

  ngOnInit(): void {
  }

  login(event) {
    event.preventDefault();
    this.auth.login(this.authData.email, this.authData.password)
      .subscribe( data => {
        const { authenticated, err, user, token } = data.data.login;
        if(!authenticated) {
          return alert(err);
        }
        localStorage.setItem('token', JSON.stringify(token));
        this.router.navigate(['/']);
      });
  }
}
