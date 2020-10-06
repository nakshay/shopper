import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Params,Router} from '@angular/router';

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
    private route: ActivatedRoute, private router: Router) { }

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

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
