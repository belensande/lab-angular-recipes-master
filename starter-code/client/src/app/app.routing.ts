import { Routes } from '@angular/router';
import { ListDishesComponent } from './list-dishes/list-dishes.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';

export const routes: Routes = [
  { path: '', component: ListDishesComponent },
  { path: 'dish/:id', component: DishDetailComponent },
  { path: '**', redirectTo: '' }
];
