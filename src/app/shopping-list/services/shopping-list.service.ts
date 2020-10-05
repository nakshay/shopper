import {Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Ingredient} from '../../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  onIngredientsChanged = new Subject<Ingredient[]>();
  ingredientEditStarted = new Subject<number>();

  private ingredients : Ingredient[] = [
    new Ingredient('Apple',5),
    new Ingredient('tomatos',10)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }
  
  publishUpdate(){
    this.onIngredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(newIngredient : Ingredient) {
    this.ingredients.push(newIngredient);
    this.publishUpdate();
  }

  addIngredients(ingrdients : Ingredient[]) {
    this.ingredients.push(...ingrdients);
    this.publishUpdate();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient : Ingredient) {
    this.ingredients[index] = newIngredient;
    this.publishUpdate();
  }

  onDelete(index: number ){
    this.ingredients.splice(index,1);
    this.publishUpdate();
  }


}
