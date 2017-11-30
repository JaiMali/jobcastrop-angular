import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data, ParamMap } from '@angular/router';
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public content;
  public title;
  public subtitle;
  public post;

  constructor(private route: ActivatedRoute, private router: Router, meta: Meta, title: Title, private http: HttpClient) { 
    route.paramMap.subscribe(params => {
      this.post = params.get('blog');
      this.http.get('https://www.jobcastrop.nl/restful/post.php?name=' + this.post).subscribe(data => {
        console.log(data);      
        this.title = data['title'];
        this.subtitle = data['subtitle'];
        title.setTitle(this.title + ' - Job Castrop');
        
        meta.addTags([
          { name: 'author',   content: 'jobcastrop.nl'},
          { name: 'keywords', content: data['shorttext'].replace(/<\/?[^>]+>/gi, "") },
          { name: 'description', content: data['shorttext'].replace(/<\/?[^>]+>/gi, "") }
        ]);

        this.content = data['shorttext'] + data['content'];
      });
    });
  }

  ngOnInit() {
  }

}
