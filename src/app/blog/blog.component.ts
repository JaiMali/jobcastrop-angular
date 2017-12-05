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
  public data;
  public posts: any[] = [];
  public title;
  public scrolled: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, meta: Meta, title: Title, private http: HttpClient) { 
    let page = this.route.snapshot.data['page'];
    
    this.title = 'Blog posts';
    title.setTitle(this.title + ' - Job Castrop');

    this.http.get('https://www.jobcastrop.nl/restful/posts.php?limit=100000&offset=0').subscribe(data => {
      // Read the result field from the JSON response.
      this.data = data;
      this.loadPosts(this.limit, this.offset);
    });    
  }

  ngOnInit() {}

  loadPosts(limit: number, offset: number)
  {
    for(let i = 0;i<=limit;i++)
    {
      let item = this.data.shift();
      if(item)
      {
        this.posts.push(item);
        this.scrolled = false;
      }
    }
  }

  loadMore()
  {
    this.loadPosts(1,0);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.scrolled) {
        this.scrolled = true;
        this.loadMore();
    }
  }
}
