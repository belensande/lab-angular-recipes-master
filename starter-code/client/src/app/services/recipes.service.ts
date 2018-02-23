import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RecipesService {
  BASE_URL: string = 'http://localhost:3000/api';
  constructor(private http: Http) { }

  getList() {
    return this.http.get(`${this.BASE_URL}/dishes`)
      .map((res) => res.json())
      .catch(err => Observable.throw(err.json()));
  }

  get(id) {
    return this.http.get(`${this.BASE_URL}/dishes/${id}`)
      .map(dish => dish.json())
      .catch(err => Observable.throw(err.json()));
  }

  addIngredient(dishId, ingredientId, quantity) {
    return this.http.post(`${this.BASE_URL}/dishes/${dishId}/ingredients/${ingredientId}/add`, {quantity})
      .map(dish => dish.json())
      .catch(err => Observable.throw(err.json()));
    }
}
