import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Surah } from './features/surah/surah';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'surah', component: Surah }
];
