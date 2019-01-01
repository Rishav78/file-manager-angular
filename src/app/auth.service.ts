import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

interface Token {
  'token': {
    'token': string,
    'expiresIn': number,
  },
}

interface IsLogin {
  'data': {
    'islogin': {
      'authenticated': boolean,
      'user'?: {
        '_id': string
      }
    }
  }
}

interface AuthData {
  'data': {
    'login': {
      'authenticated': boolean,
      'err'?: string,
      'user'?: {
        '_id': string
      }
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  islogin(): Observable<IsLogin>{
    const tokenString: string = localStorage.getItem('token');
    if (tokenString === '') {
      return null;
    }
    const token: Token = JSON.parse(tokenString);
    return this.http.post<IsLogin>('http://localhost:8000/graphql', {
      query: `
        query {
          islogin {
            authenticated
            user {
              _id
            }
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
            authenticated
            err
            user {
              _id
            }
          }
        }
      `
    })
  }
}
