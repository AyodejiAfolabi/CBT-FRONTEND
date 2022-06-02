import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirstserviceService } from './firstservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularapp';
  constructor(public service:FirstserviceService,public route:Router) { }

  ngOnInit(): void {
   
  }
  perform(){
    this.route.navigate(['show'])
  }
}









