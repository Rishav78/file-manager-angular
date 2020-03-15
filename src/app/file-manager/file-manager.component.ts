import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  data: object[] = []
  constructor(private files: FilesService, private route: Router) { }

  ngOnInit(): void {
    this.files.getFiles()
    .subscribe( data => {
      console.log(data);
    })
  }

}
