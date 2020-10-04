import { EventEmitter, Injectable } from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  onIngredientsChanged = new EventEmitter<Ingredient[]>();

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
    this.onIngredientsChanged.emit(this.ingredients.slice());
  }

}
