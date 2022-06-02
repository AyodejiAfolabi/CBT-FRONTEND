import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminresultComponent } from './adminresult/adminresult.component';
import { AdminguardGuard } from './guards/adminguard.guard';
import { StudentguardGuard } from './guards/studentguard.guard';
import { QuizpageComponent } from './quizpage/quizpage.component';
import { QuizsignupComponent } from './quizsignup/quizsignup.component';
import { ResultComponent } from './result/result.component';
import { SetsquizComponent } from './setsquiz/setsquiz.component';

const routes: Routes = [
{path:'',component:QuizsignupComponent},
{path:'quiz',component:QuizpageComponent,canActivate:[StudentguardGuard]},
{path:'setquiz',component:SetsquizComponent,canActivate:[AdminguardGuard]},
{path:'adminlogin',component:AdminloginComponent},
{path:'myresult',component:ResultComponent,canActivate:[StudentguardGuard]},
{path:'allresults',component:AdminresultComponent,canActivate:[AdminguardGuard]}





];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
