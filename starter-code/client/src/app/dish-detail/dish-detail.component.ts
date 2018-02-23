import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { IngredientsService } from '../services/ingredients.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish: any;
  ingredients: any[];
  errors: string[] = [];
  message: string;
  errorQuantityInput: string = "";

  constructor(private route: ActivatedRoute,
    private recipesService: RecipesService, private ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getDishDetail(params['id']);
    });

    this.ingredientsService.getList()
      .subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      },
      (err) => {
        this.errors.push(err.message);
      });
  }

  getDishDetail(id) {
    this.recipesService.get(id)
      .subscribe(
      (dish) => {
        this.dish = dish;
      },
      (err) => {
        this.errors.push(err.message);
      });
  }

  addIngredient(ingredientId, quantity) {
    this.errors = [];
    this.message = null;
    if (isNaN(quantity) || quantity < 1) {
      this.errorQuantityInput = ingredientId;
      this.errors.push("You must specify a quantity greater than 0");
    } else {
      this.recipesService.addIngredient(this.dish._id, ingredientId, quantity)
        .subscribe(
        (dish) => {
          this.dish = dish;
          this.message = "Ingredient added successfully";
        },
        (err) => {
          this.errors.push(err.message);
        });
    }
  }

}
