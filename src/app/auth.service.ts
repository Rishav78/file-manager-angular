import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

interface Token {
  'token': {
    'token': string,
    'expiresIn': number,
  },
}

interface Verify {
  'data': {
    'verifyToken': {
      'authenticated': boolean
    }
  }
}

interface AuthData {
  'data': {
    'login': {
      'authenticated': boolean,
      'token': Token,
      'err'?: string
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  islogin(): Observable<Verify | null>{
    const tokenString: string = localStorage.getItem('token');
    if (tokenString === '') {
      return null;
    }
    const token: Token = JSON.parse(tokenString);
    return this.http.post<Verify>('http://localhost:8000/graphql', {
      query: `
        query {
          verifyToken(token: "${token.token}") {
            authenticated
          }
        }
      `
    })
  }

  login(email, password): Observable<AuthData> {
    return this.http.post<AuthData>('http://localhost:8000/graphql', {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            token {
              token
              expiresIn
            }
            authenticated
            err
          }
        }
      `
    })
  }
}
