import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import {Recipe} from '../recipe.model'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe("Recipe 1", "Lovely food", "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg",
    [
      new Ingredient("Chicken",2),
      new Ingredient("lettuce",3)
    ])
    , new Recipe("Recipe 2", "Another lovely food", "https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg",
    [
      new Ingredient("Chicken",4),
      new Ingredient("French Fries",10)
    ])
  ];
  
  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id : number) {
    return this.recipes[id];
  }
}
