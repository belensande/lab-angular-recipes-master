import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class IngredientsService {
  BASE_URL: string = 'http://localhost:3000/api';
  constructor(private http: Http) { }

  getList() {
    return this.http.get(`${this.BASE_URL}/ingredients`)
      .map((res) => res.json())
      .catch(err => {
        return Observable.throw(err);
    });
  }

  get(id) {
    return this.http.get(`${this.BASE_URL}/ingredients/${id}`)
      .map(dish => dish.json())
      .catch(err => Observable.throw(err.json()));
  }
}
