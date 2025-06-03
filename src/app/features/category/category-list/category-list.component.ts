import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NgModel } from '@angular/forms';
import { AddCategoryRequest } from '../models/add-category-request.model';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink,CommonModule, ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  /**
   *
   */
  constructor(private categoryService: CategoryService) {  

  }

  categories$? : Observable<Category[]>;

  ngOnInit(): void {
     this.categories$ = this.categoryService.getAllCategories()
    
  }
  SelectedCategory(category: AddCategoryRequest){
    console.log(category);
    
  }

}
