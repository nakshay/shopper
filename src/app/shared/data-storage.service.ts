import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/services/recipe.service';

import { exhaustMap, map,take,tap } from "rxjs/operators";
import { AuthService } from '../auth/service/auth.service';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService : RecipeService,
    private authService : AuthService) {}

  storeRecipe(){
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put("https://shopper-6a108.firebaseio.com/recipes.json",recipes)
    .subscribe(
      (res) =>{
        console.log(res);
      }
    );
  }

  fetchRecipes() {


    return this.http.get<Recipe[]>("https://shopper-6a108.firebaseio.com/recipes.json")
      .pipe(map(
        (recipes: Recipe[]) => {
          return recipes.map(
            (recipe: Recipe) => {
              return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            }
          )
        }
      ),
        tap(
          (recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
          }
        )
      );
  }
}
