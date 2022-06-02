import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirstserviceService {
public baseUrl=environment.baseUrl
public questionNumber:any
  constructor(public http:HttpClient) { }

  public registerStudent(data:any){
    return this.http.post(`${this.baseUrl}/registerStudent`,data);
  }
  public adminlogin(data:any){
    return this.http.post(`${this.baseUrl}/adminlogin`,data);
  }
  public addquestion(data:any){
    return this.http.post(`${this.baseUrl}/addquestion`,data);
  }
public getquestions(){


  
  let questionNumber=JSON.parse(localStorage['quizsettings']).length
 let backendData=this.http.get(`${this.baseUrl}/getquestions`);
backendData.subscribe((data:any)=>{
  data = data.sort(() => Math.random() - 0.5)
 data=data.splice(0,questionNumber)
  
 if(!localStorage.getItem('questionxyz')){
   localStorage.setItem('questionxyz',  JSON.stringify(data)  )
   this.updatequestions(data)
 
 }
 else{
  this.updatequestions(JSON.parse(localStorage['questionxyz']))
 
 }

})
}

public getAdminQuestions(){
  return this.http.get(`${this.baseUrl}/getquestions`);
}
public getQuizSettings(){
  return this.http.get(`${this.baseUrl}/getsettings`);
}
public fetchAllresult(){
  return this.http.get(`${this.baseUrl}/results`);
}
public updateQuestion(data:any){
  return this.http.post(`${this.baseUrl}/updatequestion`,data);
}
public submitResult(data:any){
  return this.http.post(`${this.baseUrl}/updatestudent`,data);
}

public deleteQuestion(data:any){
  return this.http.post(`${this.baseUrl}/deletequestion`,data);
}
public addsetting(data:any){
  return this.http.post(`${this.baseUrl}/addsetting`,data);

}
public questions=new BehaviorSubject([])
public  updatequestions(data:any){
  this.questions.next(data)
}
}
