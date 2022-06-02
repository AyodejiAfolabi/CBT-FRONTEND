import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FirstserviceService } from '../firstservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setsquiz',
  templateUrl: './setsquiz.component.html',
  styleUrls: ['./setsquiz.component.css']
})
export class SetsquizComponent implements OnInit {
  angularEditorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    uploadUrl: ''
    // upload: (file: File)=>
  }
  constructor(public firstservice:FirstserviceService, public route:Router) { }
  time:any=''
  questionLength:any=''
  allquestions:any=[]

  releaseSaveButton=false
  viewquestion:any=true
  deletesave:any=true
  chooseoption:Number=100
  editingIndex:any=100
  options=['A','B','C','D']
  public presentQuestion:any={}
  public question=''
  public question_id=''
  hideinstruction=true
  public answerArray:any
  public questionInfo=new FormGroup({
    question:new FormControl('',Validators.required),
    optionA: new FormControl('',Validators.required),
    optionB: new FormControl('',Validators.required),
    optionC: new FormControl('',Validators.required),
    optionD: new FormControl('',Validators.required),  
 answer:new FormControl('')
  })
  ngOnInit(): void {
    this.firstservice.getQuizSettings().subscribe((data:any)=>{
    this.time=data.time
    this.questionLength=data.length
    })
    setTimeout( ()=>{
      this.getAllQuestions()
  
    },1000) 
  }
submit(){
if(this.questionInfo.valid){
  
if(this.viewquestion){
  this.hideinstruction=false
}

  this.question=this.questionInfo.value.question
this.answerArray=[
  {option:this.questionInfo.value.optionA, index:0},
   {option:this.questionInfo.value.optionB,index:1},
  {option:this.questionInfo.value.optionC,index:2},
  {option:this.questionInfo.value.optionD,index:3}

]
}
else{
  alert('please fill all fields')
}
}
chose(i:any){
this.chooseoption=i
this.questionInfo.value.answer=i
this.releaseSaveButton=true
}
save(){
  let formdata=this.questionInfo.value
let data={
  question:formdata.question,
  answers:[
      {option:formdata.optionA,index:0},
      {option:formdata.optionB,index:1},
      {option:formdata.optionC,index:2},
      {option:formdata.optionD,index:3}
  ],
  correct:formdata.answer    
  }
this.firstservice.addquestion(data).subscribe((data:any)=>{
  if(data.response){
    alert('succesful')
this.allquestions.push(data)
this.clearInputs()
  }

})

}



getAllQuestions(){
  this.firstservice.getAdminQuestions().subscribe(data=>{
this.allquestions=data

console.log(this.allquestions)
  })
}

seeQuestion(i:any){
  this.editingIndex=i
this.viewquestion=false
this.presentQuestion=this.allquestions[i]
this.question=this.allquestions[i].question
this.answerArray=this.allquestions[i].answers
this.chooseoption=this.allquestions[i].correct
this.question_id=this.allquestions[i]._id
this.deletesave=true
this.clearInputs()
}

editQuestion(){
  this.questionInfo.patchValue({
    question:this.question,
    optionA:this.answerArray[0].option,
    optionB:this.answerArray[1].option,
    optionC:this.answerArray[2].option,
    optionD:this.answerArray[3].option,
    answer:this.chooseoption
  })
  this.deletesave=false


}

clearInputs(){
  this.questionInfo.patchValue({
    question:'',
    optionA:'',
    optionB:'',
    optionC:'',
    optionD:'',
    answer:''
  })}
  saveEdited(){
let formdata=this.questionInfo.value
console.log(this.allquestions)
let data={
  _id:this.question_id,
  question:formdata.question,
  answers:[
      {option:formdata.optionA,index:0},
      {option:formdata.optionB,index:1},
      {option:formdata.optionC,index:2},
      {option:formdata.optionD,index:3}
  ],
  correct:formdata.answer    
  }
 
  this.firstservice.updateQuestion(data).subscribe((response:any)=>{
  if(response.response){
    this.allquestions[this.editingIndex]=data
this.afterOperation()

  }else{
    alert('something went wrong')
  }
})}


quizSettings(){
let data={time:this.time,length:this.questionLength}
this.firstservice.addsetting(data).subscribe((response:any)=>{
if(response.response){
alert('Operation Succesful, press close')
}
})
}

deleteQuestion(){
  let formdata={_id:this.question_id}
  this.firstservice.deleteQuestion(formdata).subscribe(
    (response:any)=>{
    if(response.response){
      this.allquestions.splice(this.editingIndex,this.editingIndex+1)
this.afterOperation()
    }
    }
  )}

afterOperation(){
  this.clearInputs()
this.viewquestion=true
this.presentQuestion={}
this.question=''
this.answerArray=[]
this.chooseoption=100
this.question_id=''
this.deletesave=false
}
reload(){
window.location.reload()
}
viewresults(){
this.route.navigate(['/allresults'])
}

}
