import { Routes } from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {UpdateComponent} from './pages/update/update.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'details/:id', component: UpdateComponent },
];
