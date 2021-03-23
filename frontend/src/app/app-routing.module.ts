import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

import { AuthGuard } from "./auth/auth.guard";
import { NoAuthGuard } from "./auth/no-auth.guard";
import { WorkComponent } from './pages/work/work.component';
import { ConsultsComponent } from './pages/consults/consults.component';
import { WorksListComponent } from './pages/works-list/works-list.component';
import { AddWorkComponent } from './pages/add-work/add-work.component';
import { UpdateWorkComponent } from './pages/update-work/update-work.component';
import { ConsultComponent } from "./pages/consult/consult.component";
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "page/:page", component: HomeComponent },
  { path: "category/:category", component: HomeComponent },
  { path: "category-page/:category/:page", component: HomeComponent },
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard], canLoad: [NoAuthGuard]},
  { path: "register", component: RegisterComponent, canActivate: [NoAuthGuard], canLoad: [NoAuthGuard]},
  { path: "work/:id", component: WorkComponent},
  { path: "consults", component: ConsultsComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  { path: "works-user", component: WorksListComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  { path: "add-work", component: AddWorkComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  { path: "update-work/:id", component: UpdateWorkComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  { path: "consults/:id", component: ConsultComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  { path: "profile/:id", component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
