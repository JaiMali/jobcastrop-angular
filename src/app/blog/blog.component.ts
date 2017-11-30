import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public posts;
  public title;

  constructor(private route: ActivatedRoute, private router: Router, meta: Meta, title: Title, private http: HttpClient) { 
    let page = this.route.snapshot.data['page'];
    this.http.get('https://www.jobcastrop.nl/restful/posts.php').subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);

      this.title = 'Blog posts';
      title.setTitle(this.title + ' - Job Castrop');
      
      meta.addTags([
        { name: 'author',   content: 'jobcastrop.nl'},
        { name: 'keywords', content: ''},
        { name: 'description', content: 'GET ALL THE POSTS!!!' }
      ]);

      this.posts = data;
    });
  }

  ngOnInit() {
  }

}
