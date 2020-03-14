import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.islogin()
    .subscribe(data => {
      console.log(data)
    })
    
  }

  login(event) {
    event.preventDefault();
    const email: string = event.target.querySelector('#email').value;
    const password: string = event.target.querySelector('#password').value;
    this.auth.login(email, password)
      .subscribe( data => {
        console.log(data)
        const { authenticated, err, token } = data.data.login;
        console.log(authenticated, err, token)
        if(!authenticated) {
          return alert(err);
        }
        localStorage.setItem('token', JSON.stringify(token));
      });
  }
}
