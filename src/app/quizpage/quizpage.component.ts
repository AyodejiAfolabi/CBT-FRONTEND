import { Component, OnInit } from '@angular/core';
import { FirstserviceService } from '../firstservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizpage',
  templateUrl: './quizpage.component.html',
  styleUrls: ['./quizpage.component.css']
})
export class QuizpageComponent implements OnInit {

  constructor(public firstservice:FirstserviceService,public route:Router) { }
  readtime:any
  public minute:any=''
  public seconds:any=''
  answers:any=[]
  options=['A','B','C','D']
public questionxyz:any=[]
public start=0
public presentQuestion:any={}
  ngOnInit(): void {
    this.firstservice.getQuizSettings().subscribe((data:any)=>{
      let studentInfo=JSON.parse(localStorage['studentInfo'])
      if((studentInfo.minute&&studentInfo.seconds)|| (studentInfo.minute==0&&studentInfo.seconds==0) ){
        this.minute=studentInfo.minute
        this.seconds=studentInfo.seconds
         }
        else{
          this.minute=data.time
          this.seconds='00'
          studentInfo.minute=data.time
          studentInfo.seconds='00'
          localStorage.setItem('studentInfo', JSON.stringify(studentInfo))
        }
    
        if(this.minute){
this.readtime=setInterval( ()=>{
  this.readTime()
},1000)
       

        }

      })

this.updateLatestQuestion()

  setTimeout( ()=>{
    this.getQuestions()

  },100) 
 
  if(JSON.parse(localStorage['donetest'])){
    this.route.navigate(['/'])
  }

  }




  getQuestions(){

this.firstservice.getquestions()
this.firstservice.questions.subscribe(data=>{
 this.questionxyz=data
 
this.presentQuestion=this.questionxyz[this.start]
console.log(this.presentQuestion)

if(!JSON.parse(localStorage['studentInfo']).answers){
for (var x in data){
this.answers.push(0)
}
}else{
  this.answers=JSON.parse(localStorage['studentInfo']).answers
}

}
  
  )
  }

  chose(answerIndex:any){
this.questionxyz[this.start].chosen=answerIndex
if(answerIndex==this.questionxyz[this.start].correct){
this.answers[this.start]=1
}
else{
this.answers[this.start]=0
}
this.updateScoreInLocalStorage(this.answers)

localStorage.setItem('questionxyz',JSON.stringify(this.questionxyz))
  }

prev(){
this.start--
this.presentQuestion=this.questionxyz[this.start]
let studentInfo= JSON.parse(localStorage['studentInfo'])
studentInfo['latestQuestion']=this.start
localStorage.setItem('studentInfo',JSON.stringify(studentInfo))
}
next(){
  this.start++
this.presentQuestion=this.questionxyz[this.start]
let studentInfo= JSON.parse(localStorage['studentInfo'])
studentInfo['latestQuestion']=this.start
localStorage.setItem('studentInfo',JSON.stringify(studentInfo))

}

readTime(){



let seconds=Number(this.seconds)
let minutes=Number(this.minute)
if(seconds==1&&minutes==0){
clearInterval(this.readtime)
this.finalSubmit()
}
if(seconds==0){
  seconds=59
  minutes--
}  else{
  seconds--
}
(seconds<10)? this.seconds='0'+seconds:this.seconds=seconds
// this.seconds=seconds
this.minute=minutes
this.updateTimeInLocalStorage()
}


updateLatestQuestion(){
  let studentInfo:any={}
   studentInfo= JSON.parse(localStorage['studentInfo'])
if(studentInfo['latestQuestion']){
  this.start=studentInfo['latestQuestion']
}else{
  studentInfo['latestQuestion']=0
}
localStorage.setItem('studentInfo',JSON.stringify(studentInfo))
}

updateTimeInLocalStorage(){
 let studentInfo= JSON.parse(localStorage['studentInfo'])
  studentInfo.minute=this.minute
  studentInfo.seconds=this.seconds
  localStorage.setItem('studentInfo',JSON.stringify(studentInfo))
}

updateScoreInLocalStorage(answers:any){
  let studentInfo= JSON.parse(localStorage['studentInfo'])

    studentInfo.answers=answers
  
  localStorage.setItem('studentInfo',JSON.stringify(studentInfo))
}





submit(){
  let confirmsubmit=confirm('Are you sure you want to submit')
  if(confirmsubmit){
   this.finalSubmit()
}

// localStorage.setItem('studentInfo',JSON.stringify(studentInfo))

}

finalSubmit(){
  let totalScore=0
  let studentInfo= JSON.parse(localStorage['studentInfo'])
for ( var x in   studentInfo.answers){
  totalScore+=studentInfo.answers[x]
}
studentInfo.totalScore=totalScore
localStorage.setItem('studentInfo',JSON.stringify(studentInfo))
localStorage.setItem('donetest',JSON.stringify(true))
this.route.navigate(['/myresult'])

  
}

}
