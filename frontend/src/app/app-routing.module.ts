import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

import { AuthGuard } from "./auth/auth.guard";
import { NoAuthGuard } from "./auth/no-auth.guard";
import { WorkComponent } from './pages/work/work.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "page/:page", component: HomeComponent },
  { path: "category/:category", component: HomeComponent },
  { path: "category-page/:category/:page", component: HomeComponent },
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard], canLoad: [NoAuthGuard]},
  { path: "register", component: RegisterComponent, canActivate: [NoAuthGuard], canLoad: [NoAuthGuard]},
  { path: "work/:id", component: WorkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
