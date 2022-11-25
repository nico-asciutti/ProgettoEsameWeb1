import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoveSiamoComponent } from './dove-siamo/dove-siamo.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PrenotaComponent } from './prenota/prenota.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'dove-siamo', component: DoveSiamoComponent},
  {path: 'prenota', component: PrenotaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email', component: VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, 
                                  MenuComponent, 
                                  DoveSiamoComponent, 
                                  PrenotaComponent, 
                                  LoginComponent, 
                                  RegisterComponent, 
                                  ForgotPasswordComponent, 
                                  VerifyEmailComponent]
