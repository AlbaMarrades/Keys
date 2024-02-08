import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './assets/edit/edit.component';
import { FormComponent } from './assets/form/form.component';
import { ListComponent } from './assets/list/list.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { AppGuard } from './guards/app-guard.guard';
import { AuthGuard } from './guards/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'new-asset', component: FormComponent, canActivate: [AppGuard, AdminRoleGuard] },
  { path: 'assets-list', component: ListComponent, canActivate: [AppGuard] },
  { path: 'edit-asset/:id', component: EditComponent, canActivate: [AppGuard, AdminRoleGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
