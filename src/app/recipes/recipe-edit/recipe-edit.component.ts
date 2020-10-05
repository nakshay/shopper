import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id : number;
  isEditMode : boolean;
  recipeForm : FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id']);
        this.isEditMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  get ingredientsControl(){
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  private initForm(){
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if(this.isEditMode) {
      let recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount : new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.recipeForm = this.formBuilder.group(
    { name: this.formBuilder.control(recipeName) ,
      description : this.formBuilder.control(description),
      imagePath : this.formBuilder.control(imagePath),
      ingredients: ingredients
    }
    );
  }


  onSubmit(){
    console.log(this.recipeForm);
  }

}
