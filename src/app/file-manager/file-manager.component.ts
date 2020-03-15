import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  routepath: string = '';
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.routepath = this.route.url
  }

}
