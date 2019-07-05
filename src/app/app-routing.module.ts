import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ListPostComponent } from './protected/list-post/list-post.component';
import { AuthGuard } from './auth-guard/auth.guard';
import { ProtectedComponent } from './protected/protected.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: ProtectedComponent,
    children: [
      { path: 'post-list', component: ListPostComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'sign-up', component: SignupComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
