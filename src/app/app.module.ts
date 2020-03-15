import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FilesService } from './files.service';
import { FilesComponent } from './files/files.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FileManagerComponent,
    FilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, FilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
