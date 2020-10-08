import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import {Recipe} from '../recipe.model'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  onRecipiesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // new Recipe("Recipe 1", "Lovely food", "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg",
    // [
    //   new Ingredient("Chicken",2),
    //   new Ingredient("lettuce",3)
    // ])
    // , new Recipe("Recipe 2", "Another lovely food", "https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg",
    // [
    //   new Ingredient("Chicken",4),
    //   new Ingredient("French Fries",10)
    // ])
  ];
  
  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id : number) {
    return this.recipes[id];
  }

  addRecipe(recipe : Recipe) {
    this.recipes.push(recipe);
    this.publishUpdate();
  }

  updateRecipe(index : number, recipe : Recipe) {
    this.recipes[index] = recipe;
    this.publishUpdate();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
    this.publishUpdate();
  }

  setRecipes(recipes : Recipe[]) {
    this.recipes = recipes;
    this.publishUpdate();
  }

  publishUpdate(){
    this.onRecipiesChanged.next(this.recipes.slice());
  }
    
}
