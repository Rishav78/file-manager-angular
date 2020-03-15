import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FilesService } from '../files.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  filename: string = '';
  filesdata: object[] = [];

  constructor(private auth: AuthService, private files: FilesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  
  }


  createNewFile(event) {
    const location = this.router.url;
    this.files.createFile(location, this.filename)
      .subscribe( data => {
        console.log(data);
      })
  }

  createNewFolder(event) {
    const location = this.router.url;
    this.files.createFolder(location, this.filename)
      .subscribe( data => {
        console.log(data);
      })
  }

}
