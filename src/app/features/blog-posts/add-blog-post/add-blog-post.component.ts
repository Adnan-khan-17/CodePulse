import { Component } from '@angular/core';
import { Blogpost } from '../models/Blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { pipe } from 'rxjs';
import { AddBlogPostRequest } from '../models/add-blogpost-request.model';
import { BlogpostServiceService } from '../services/blogpost.service.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-add-blog-post',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-blog-post.component.html',
  styleUrl: './add-blog-post.component.css'
})
export class AddBlogPostComponent {

  model: AddBlogPostRequest;

  constructor( private blogpostservice: BlogpostServiceService, private router: Router)
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
      
    }
  }

  OnFormSubmit()
  {
    
    this.blogpostservice.addBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blog-posts')
      }
    })
    
  }

}
