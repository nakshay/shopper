import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("Recipe 1", "Lovely food", "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg")
    , new Recipe("Recipe 2", "Another lovely food", "https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg")
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();


  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
