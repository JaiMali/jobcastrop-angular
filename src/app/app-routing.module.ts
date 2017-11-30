import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: PageComponent, data: { page: 'about'} },
  { path: 'contact', component: PageComponent, data: { page: 'contact'} },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:blog', component: PostComponent},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }