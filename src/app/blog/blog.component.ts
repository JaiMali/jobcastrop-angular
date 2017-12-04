import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  @Input() limit:number = 10;
  @Input() offset:number = 0;
  public posts;
  public title;

  constructor(private route: ActivatedRoute, private router: Router, meta: Meta, title: Title, private http: HttpClient) { 
    let page = this.route.snapshot.data['page'];
    
    this.title = 'Blog posts';
    title.setTitle(this.title + ' - Job Castrop');

    meta.addTags([
      { name: 'author',   content: 'jobcastrop.nl'},
      { name: 'keywords', content: ''},
      { name: 'description', content: 'GET ALL THE POSTS!!!' }
    ]);
  }

  ngOnInit() {
    this.loadPosts(this.limit, this.offset);
  }

  loadPosts(limit: Number, offset: Number)
  {
    this.http.get('https://www.jobcastrop.nl/restful/posts.php?limit=' + this.limit + '&offset=' + this.offset).subscribe(data => {
      // Read the result field from the JSON response.
      this.posts = data;
    });
  }

  loadMore()
  {
    this.limit += this.limit;
    this.loadPosts(this.limit, this.offset);
  }

}
