import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddBlogPostRequest } from '../models/add-blogpost-request.model';
import { Blogpost } from '../models/Blog-post.model';
import { UpdateBlogpostrequest } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostServiceService {

  constructor(private http: HttpClient) { }

  addBlogPost(model: AddBlogPostRequest): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/BlogPost`,model);
  }

  getAllBlogposts(): Observable<Blogpost[]>
  {
    return this.http.get<Blogpost[]>(`${environment.apiBaseUrl}/api/BlogPost`)
  }

  getBlogPostById(id: any): Observable<Blogpost>
    {
      return this.http.get<Blogpost>(`${environment.apiBaseUrl}/api/BlogPost/${id}`)
    }
  updateBlogPost(id: string, updateBlogPost: UpdateBlogpostrequest): Observable<Blogpost>
    {
      return this.http.put<Blogpost>(`${environment.apiBaseUrl}/api/BlogPost/${id}`,updateBlogPost)
    }

  deleteBlogPost(id:any): Observable<Blogpost>
    {
      return this.http.delete<Blogpost>(`${environment.apiBaseUrl}/api/BlogPost/${id}`)
    }
}
