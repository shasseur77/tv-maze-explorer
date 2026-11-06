import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ShowDetail } from './pages/show-detail/show-detail';
import { FavoritesPage } from './pages/favorites-page/favorites-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'show/:id', component: ShowDetail },
  { path: 'favorites', component: FavoritesPage },
  { path: '**', redirectTo: '' }
];