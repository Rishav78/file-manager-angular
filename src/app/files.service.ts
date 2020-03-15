import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  getFiles() {
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.post('http://localhost:8000/graphql', {}, {
      headers: {
        'Authorization': `Barrer ${token.token}`
      }
    });
  }
}
