import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BttAlgarsComponent } from './pages/btt-algars/btt-algars.component';
import { SegmentsComponent } from './pages/btt-algars/segments/segments.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'btt-algars', component: BttAlgarsComponent },

];
