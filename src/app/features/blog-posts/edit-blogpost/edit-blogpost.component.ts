import { Component,OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Blogpost } from '../models/Blog-post.model';
import { BlogpostServiceService } from '../services/blogpost.service.service';
import { UpdateBlogpostrequest } from '../models/update-blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';


@Component({
  selector: 'app-edit-blogpost',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent {

    private paramSubscription? :Subscription;
    private updateBlogpostSubscription?: Subscription;
    private getBlogpostSubscription?: Subscription;
    
    blogpost? :Blogpost;
    id : string | null = null;
    categories$? : Observable<Category[]>;
    selectedCategories? : string[];

    constructor(
      private route : ActivatedRoute,
      private blogpostService: BlogpostServiceService,
      private router : Router,
      private categoryService: CategoryService
    ){ }

    OnFormSubmit(): void {
        const updateBlogPost: UpdateBlogpostrequest  = {
          title: this.blogpost?.title?? '' ,
          shortDescription: this.blogpost?.shortDescription?? '',
          content: this.blogpost?.content?? '',
          featuredImageUrl: this.blogpost?.featuredImageUrl?? '',
          urlHandle: this.blogpost?.urlHandle?? '',
          publishedDate: this.blogpost?.publishedDate?? new Date(),
          author: this.blogpost?.author?? '',
          isVisible: this.blogpost?.isVisible?? true,  
          categories: this.selectedCategories?? []  
        };
    
        if(this.id){
          this.updateBlogpostSubscription = this.blogpostService.updateBlogPost(this.id, updateBlogPost)
        .subscribe({
          next: (response)=>{
            this.router.navigateByUrl('/admin/blog-posts');
          }
        });
        }
      }
    
      delete(id : any):void{ 
        this.blogpostService.deleteBlogPost(id).
        subscribe({
          next: (response)=>{
            this.router.navigateByUrl('/admin/blog-posts');
          }
        });
    
      }
    
      ngOnInit(): void {

        this.categories$ = this.categoryService.getAllCategories();

        this.paramSubscription = this.route.paramMap.subscribe({
            next: (param) =>{
              this.id = param.get('id')
    
              //get blogpost from API
              if(this.id)
              {
                this.getBlogpostSubscription = this.blogpostService.getBlogPostById(this.id)
                .subscribe({
                  next : (response) =>{
                    this.blogpost = response;
                    this.selectedCategories = response.categories.map(x => x.id);
                  }
                });
              }          
            }
          })
      }
      ngOnDestroy(): void {
        this.paramSubscription?.unsubscribe();
        this.updateBlogpostSubscription?.unsubscribe();
        this.getBlogpostSubscription?.unsubscribe();
      }
}
