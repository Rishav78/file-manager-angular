import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  @Input() filesdata: object[];

  constructor(private router: Router, private files: FilesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe( () => {
      this.files.getFiles(this.router.url)
        .subscribe( data => {
          this.filesdata = data.data.files;
          console.log(data);
        })
    })
  }

  showFiles(file) {
    switch(file.type) {
      case 'folder':
        this.router.navigate([this.router.url, file.name]);
        break;
      case 'file':
        this.files.getFile(this.router.url, file.name)
          .subscribe( data => {
            console.log(data);
          })
    }
  }

}
