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
import { ConsultComponent } from './pages/consult/consult.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { ListAdminsComponent } from './pages/list-admins/list-admins.component';
import { SaveUserComponent } from './pages/save-user/save-user.component';

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
    SendConsultComponent,
    ConsultComponent,
    ProfileComponent,
    LoginAdminComponent,
    HomeAdminComponent,
    ListUsersComponent,
    ListAdminsComponent,
    SaveUserComponent
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
