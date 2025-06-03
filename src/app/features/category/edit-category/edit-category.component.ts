import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit,OnDestroy {
  

  private paramSubscription? :Subscription;
  private updatecategorySubscription? : Subscription;
  id : string | null = null;
  category? : Category;
  
 
  constructor(
    private route : ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {  }

  OnFormSubmit(): void {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''     
    };

    if(this.id){

      this.updatecategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest)
    .subscribe({
      next: (response)=>{
        this.router.navigateByUrl('/admin/categories');
      }

    });
    }
  }

  delete(id : any):void{

    this.categoryService.deleteCategory(id).
    subscribe({
      next: (response)=>{
        this.router.navigateByUrl('/admin/categories');
      }
    });

  }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
        next: (param) =>{
          this.id = param.get('id')

          if(this.id)
          {
            this.categoryService.getCategoryById(this.id)
            .subscribe({
              next : (response) =>{
                this.category = response;
              }
            });
          }          
        }
      })
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.updatecategorySubscription?.unsubscribe();
  }
}
