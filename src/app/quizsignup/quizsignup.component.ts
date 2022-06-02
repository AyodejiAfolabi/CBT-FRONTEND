import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder  } from '@angular/forms';
import { FirstserviceService } from '../firstservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizsignup',
  templateUrl: './quizsignup.component.html',
  styleUrls: ['./quizsignup.component.css']
})
export class QuizsignupComponent implements OnInit {

  constructor(public firstservice:FirstserviceService, public route:Router) { }
  public studentInfo=new FormGroup({
    studentName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')  
  
  })

  ngOnInit(): void {
    this.firstservice.getQuizSettings().subscribe(data=>{
      localStorage['quizsettings']=JSON.stringify(data)
    })

    localStorage.removeItem('studentInfo')
    localStorage.removeItem('questionxyz')
    localStorage.removeItem('donetest')


  }

  submit(){
let formdata=this.studentInfo.value
   this.firstservice.registerStudent(formdata).subscribe((data:any)=>{
     if(data.response){
       localStorage.setItem('studentInfo',JSON.stringify(data.data))
this.route.navigate(['quiz'])
     }
     else{
       alert('please check your connection and try again')
     }
    

   })
  }

}
