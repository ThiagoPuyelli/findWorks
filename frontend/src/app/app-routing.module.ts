import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

import { AuthGuard } from "./auth/auth.guard";
import { NoAuthGuard } from "./auth/no-auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard], canLoad: [NoAuthGuard]},
  { path: "register", component: RegisterComponent, canActivate: [NoAuthGuard], canLoad: [NoAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
