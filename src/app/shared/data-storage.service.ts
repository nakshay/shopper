import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  

  constructor(private http: HttpClient, private recipeService : RecipeService) {}

  storeRecipe(){
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put("https://shopper-6a108.firebaseio.com/recipes.json",recipes).subscribe(
      (res) =>{
        console.log(res);
      }
    );
  }

}
