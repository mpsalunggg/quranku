import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Surah } from './features/surah/surah';
import { Ayah } from './features/ayah/ayah';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'surah', component: Surah },
  { path: 'surah/:ayahId', component: Ayah },
];
