import { Component, OnInit } from '@angular/core';
import { FirstserviceService } from '../firstservice.service';

@Component({
  selector: 'app-adminresult',
  templateUrl: './adminresult.component.html',
  styleUrls: ['./adminresult.component.css']
})
export class AdminresultComponent implements OnInit {

  constructor(public first:FirstserviceService) { }
public allResults:any
public viewpassword='password'
public totalQuestion:any=''


  ngOnInit(): void {
    this.getAllResult()
    this.first.getQuizSettings().subscribe((data:any)=>{
this.totalQuestion=data.length
    })
  }



getAllResult(){
this.first.fetchAllresult().subscribe((data:any)=>{
  console.log(data)
this.allResults=data   
 

})
}
 
seepassword(){
if(this.viewpassword=='password'){
  this.viewpassword='text'
}
else{
  this.viewpassword='password'

}

}

}
