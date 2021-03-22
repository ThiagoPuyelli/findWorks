import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { WorksComponent } from './components/works/works.component';
import { WorkComponent } from './pages/work/work.component';
import { HomeAuthComponent } from './components/home-auth/home-auth.component';
import { ConsultsComponent } from './pages/consults/consults.component';
import { AddWorkComponent } from './pages/add-work/add-work.component';
import { WorksListComponent } from './pages/works-list/works-list.component';
import { UpdateWorkComponent } from './pages/update-work/update-work.component';
import { SendConsultComponent } from './components/send-consult/send-consult.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    WorksComponent,
    WorkComponent,
    HomeAuthComponent,
    ConsultsComponent,
    AddWorkComponent,
    WorksListComponent,
    UpdateWorkComponent,
    SendConsultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
