import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Files {
  'data': {
    'files': [{
      'ext': string,
      'name': string,
      'type': string
    }]
  }
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  createFolder(location, name) {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token)
    return this.http.post('http://localhost:8000/graphql', {
      query: `
        mutation {
          createFolder(InputFolder: {
            name: "${name}",
            location: "${location}"
          }) {
            name
          }
        }
      `
    },
    {
      headers: {
        'Authorization': `Barrer ${token.token}`
      }
    })
  }

  createFile(location, name) {
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.post('http://localhost:8000/graphql', {
      query: `
        mutation {
          createFile(InputFile: {
            name: "${name}",
            location: "${location}"
          }) {
            name
          }
        }
      `
    },
    {
      headers: {
        'Authorization': `Barrer ${token.token}`
      }
    });
  }

  getFiles(location: string): Observable<Files> {
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.post<Files>('http://localhost:8000/graphql', {
      query: `
        query {
          files(location: "${location}") {
            ext
            name
            type
          }
        }
      `
    }, 
    {
      headers: {
        'Authorization': `Barrer ${token.token}`
      }
    });
  }

  getFile(location, name) {
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.post('http://localhost:8000/graphql', {
      query: `
        query {
          file(location: "${location}", name: "${name}") {
            filedata
          }
        }
      `
    }, 
    {
      headers: {
        'Authorization': `Barrer ${token.token}`
      }
    })
  }
}
