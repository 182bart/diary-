import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddRecordComponent } from './add-record/add-record.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'addRecord', component: AddRecordComponent },
  { path: 'edit/:id', component: AddRecordComponent },
  { path: '**', redirectTo: '' },
];
