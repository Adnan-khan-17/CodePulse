import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBlogPostRequest } from '../models/add-blogpost-request.model';
import { BlogpostServiceService } from '../services/blogpost.service.service';
import {  Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { log } from 'node:console';

@Component({
  selector: 'app-add-blog-post',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MarkdownComponent, NgIf],
  templateUrl: './add-blog-post.component.html',
  styleUrl: './add-blog-post.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AddBlogPostComponent implements OnInit {

  model: AddBlogPostRequest;
  categories$? = new Observable<Category[]>;

  constructor( 
    private blogpostservice: BlogpostServiceService,
    private router: Router,
    private categoryService: CategoryService
  )
  {
    this.model = {

      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
      categories: []
      
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  OnFormSubmit()
  {
    console.log(this.model);
    
    this.blogpostservice.addBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blog-posts')
      }
    })
    
  }

}
