import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute ,Params} from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id : number;
  constructor(private shoppilingListService: ShoppingListService, 
    private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) =>{
        this.id = Number(params['id']);
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  addInShoppingList() {
    this.shoppilingListService.addIngredients(this.recipe.ingredients);
  }

}
