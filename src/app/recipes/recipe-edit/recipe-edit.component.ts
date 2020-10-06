import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
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
    private formBuilder : FormBuilder, private router: Router) { }

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
              name: new FormControl(ingredient.name,Validators.required),
              amount : new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9+0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = this.formBuilder.group(
    { name: this.formBuilder.control(recipeName,Validators.required) ,
      description : this.formBuilder.control(description,Validators.required),
      imagePath : this.formBuilder.control(imagePath,Validators.required),
      ingredients: ingredients
    }
    );
  }

  onIngredientAdded() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name : new FormControl(null, Validators.required),
        amount : new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9+0-9]*$/)
        ])
      })
    );
  }


  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit(){

    // let recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );

    if(this.isEditMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }

}
