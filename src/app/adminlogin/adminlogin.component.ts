import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirstserviceService } from '../firstservice.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  error=''
  public adminInfo=new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')  
  
  })
  constructor(public first:FirstserviceService, public route:Router) { }

  ngOnInit(): void {
  }
  submit(){
    let formdata=this.adminInfo.value
this.first.adminlogin(formdata).subscribe(
  (data:any)=>{
if(data.response){
  // console.log(data.data.password,environment.adminpassword)
  if(data.data.password==formdata.password){
localStorage.setItem('admintoken',JSON.stringify('quiz_admin_DB-12345678'))
this.route.navigate(['/setquiz'])
  }
  else{
    this.error='type in the correct password'
  }

}
else{
 
  this.error='please input the correct email address'
}

  }
  
)

  }

}
