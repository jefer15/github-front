import { Routes } from '@angular/router';
import { UserComponent } from './features/user/user.component';
import { ProfileComponent } from './features/profile/profile.component';
import { scoreGuard } from './core/guards/score.guard';

export const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'profile/:login', component: ProfileComponent, canActivate: [scoreGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'user' },
  { path: '**', redirectTo: 'user' },
];
