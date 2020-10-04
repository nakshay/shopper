import {Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Ingredient} from '../../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  onIngredientsChanged = new Subject<Ingredient[]>();

  private ingredients : Ingredient[] = [
    new Ingredient('Apple',5),
    new Ingredient('tomatos',10)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }
  
  addIngredient(newIngredient : Ingredient) {
    this.ingredients.push(newIngredient);
    this.onIngredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingrdients : Ingredient[]) {
    this.ingredients.push(...ingrdients);
    this.onIngredientsChanged.next(this.ingredients.slice());
  }

}
