import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent }
];

@NgModule ({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
