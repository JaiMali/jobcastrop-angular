import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public content;

  constructor(meta: Meta, title: Title, private http: HttpClient) {    

    this.http.get('https://www.jobcastrop.nl/restful/page.php?name=home').subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);

      title.setTitle(data['title']);
      
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
