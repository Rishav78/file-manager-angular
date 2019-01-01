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
    this.auth.islogin()
    .subscribe( data => {
      if(data.data.islogin.authenticated) {
        this.router.navigate[data.data.islogin.user._id];
      }
    });
  }

  login(event) {
    event.preventDefault();
    this.auth.login(this.authData.email, this.authData.password)
      .subscribe( data => {
        const { authenticated, err, user } = data.data.login;
        if(!authenticated) {
          return alert(err);
        }
        this.router.navigate([user._id]);
      });
  }
}
