import { Component, OnInit } from '@angular/core';

import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-list-dishes',
  templateUrl: './list-dishes.component.html',
  styleUrls: ['./list-dishes.component.css']
})
export class ListDishesComponent implements OnInit {
  dishes: any[];
  errors: string[] = [];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipesService.getList()
      .subscribe(
      (dishes) => {
        this.dishes = dishes;
      },
      (err) => {
        this.errors.push(err.message);
      });
  }

}
