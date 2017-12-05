import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';

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
  public scrolled: boolean = false;

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
    this.offset++;
    this.http.get('https://www.jobcastrop.nl/restful/posts.php?limit=1&offset=' + this.offset).subscribe(data => {
      // Read the result field from the JSON response.      
      if(data[0])
      {
        this.scrolled = false;
        return this.posts.push(data[0]);
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.scrolled) {
        this.scrolled = true;
        this.loadMore();
    }
  }

}
