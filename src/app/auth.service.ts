import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

interface Token {
  'token': {
    'token': string,
    'expiresIn': number,
  },
}

interface currentUser {
  'data': {
    'currentUser': {
      'authenticated': boolean,
      'err'?: string,
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
      'token'?: {
        'token': string,
        'expiresIn': number
      },
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

  currentUser(): Observable<currentUser | null>{
    const tokenString = localStorage.getItem('token');
    if( !tokenString) {
      return new Observable(subscriber => {
        const data = <currentUser>
        {
          data : { 
            currentUser: {
              authenticated: false
            }
          }
        };
        subscriber.next(data);
      });
    }
    const token: Token = JSON.parse(tokenString);
    return this.http.post<currentUser>('http://localhost:8000/graphql', {
      query: `
        query {
          currentUser(token: "${token.token}") {
          authenticated
            user {
              _id
            }
            err
          }
        }
      `
    }, {
      withCredentials: true,
    })
  }

  login(email, password): Observable<AuthData> {
    return this.http.post<AuthData>('http://localhost:8000/graphql', {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            authenticated
            err
            token {
              token
              expiresIn
            }
            user {
              _id
            }
          }
        }
      `
    });
  }
}
