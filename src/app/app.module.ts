import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstcompComponent } from './firstcomp/firstcomp.component';
import { QuizsignupComponent } from './quizsignup/quizsignup.component';
import { QuizpageComponent } from './quizpage/quizpage.component';
import { SetsquizComponent } from './setsquiz/setsquiz.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { MaterialmoduleModule } from './material/material.module';
import {AngularEditorModule} from '@kolkov/angular-editor';
import { ResultComponent } from './result/result.component';
import { AdminresultComponent } from './adminresult/adminresult.component';
import { NotfoundComponent } from './notfound/notfound.component';
@NgModule({
  declarations: [
    AppComponent,
    FirstcompComponent,
    QuizsignupComponent,
    QuizpageComponent,
    SetsquizComponent,
    AdminloginComponent,
    ResultComponent,
    AdminresultComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialmoduleModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {



  
 }
