import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  public content;
  public title;

  constructor(private route: ActivatedRoute, private router: Router, meta: Meta, title: Title, private http: HttpClient) { 
    let page = this.route.snapshot.data['page'];
    this.http.get('https://www.jobcastrop.nl/restful/page.php?name=' + page).subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);

      this.title = data['title'];
      title.setTitle(this.title + ' - Job Castrop');
      
      meta.addTags([
        { name: 'author',   content: 'jobcastrop.nl'},
        { name: 'keywords', content: data['keywords'] },
        { name: 'description', content: data['description'] }
      ]);

      this.content = data['content'];
    });
  }

  ngOnInit() {    
  }

}
