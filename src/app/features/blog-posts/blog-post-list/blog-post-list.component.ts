import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogpostServiceService } from '../services/blogpost.service.service';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/Blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-post-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.css'
})
export class BlogPostListComponent implements OnInit {

  constructor(private blogpostService: BlogpostServiceService)
  {
    
  }

  blogposts$?: Observable<Blogpost[]>;

  ngOnInit(): void {
    this.blogposts$ = this.blogpostService.getAllBlogposts()
  }

}
