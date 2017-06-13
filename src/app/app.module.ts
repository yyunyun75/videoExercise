import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

//routes
import { routeConfig } from './app.routes';

//services
import { YoutubeService } from './services/youtube.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig),
    PaginationModule.forRoot()
  ],
  providers: [YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
