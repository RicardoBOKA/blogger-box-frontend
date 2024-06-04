import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { AddPost } from './add-post/add-post.component';

const routes: Routes = [
  { path: '', component: PostListComponent},
  { path: 'add-post', component: AddPost}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
