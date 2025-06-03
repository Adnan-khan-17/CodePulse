import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogPostListComponent } from './features/blog-posts/blog-post-list/blog-post-list.component';
import { AddBlogPostComponent } from './features/blog-posts/add-blog-post/add-blog-post.component';
import { EditBlogpostComponent } from './features/blog-posts/edit-blogpost/edit-blogpost.component';

export const routes: Routes = [
    {
        path: 'admin/categories', 
        component: CategoryListComponent

    },
    {
        path: 'admin/categories/add', 
        component: AddCategoryComponent
    },
    {
        path: 'admin/categories/:id', 
        component: EditCategoryComponent
    },
    {
        path: 'admin/blog-posts', 
        component: BlogPostListComponent
    },
    {
        path: 'admin/blog-posts/add', 
        component:AddBlogPostComponent 
    },
    {
        path: 'admin/blog-posts/:id',
        component: EditBlogpostComponent
    }
];
