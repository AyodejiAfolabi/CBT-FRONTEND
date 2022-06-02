import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirstserviceService } from '../firstservice.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
public score:any
public questionLength:any
public studentName:any


  constructor(public firstservice:FirstserviceService,public router: Router) { }

  ngOnInit(): void {

    this.getScore()
    setTimeout(
      ()=>{
this.goHome()      
      },5000)
    
    }

  goHome(){
    this.router.navigate(['/'])
  }


getScore(){
  this.score= JSON.parse(localStorage['studentInfo']).totalScore
  this.studentName= JSON.parse(localStorage['studentInfo']).studentName
  this.questionLength=JSON.parse(localStorage['questionxyz']).length
  let studentInfo=JSON.parse(localStorage['studentInfo'])
  let data={
    _id:studentInfo._id,
    studentName:studentInfo.studentName,
    email:studentInfo.email,
    password:studentInfo.password,
    score: String(studentInfo.totalScore)}

    this.firstservice.submitResult(data).subscribe(data=>{
    })
}

}
