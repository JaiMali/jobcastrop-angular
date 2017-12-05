import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params, Data, ParamMap } from '@angular/router';
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public posts: any[] = [];
  private id;
  private scrolled: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private meta: Meta, private title: Title, private http: HttpClient) { 
    route.paramMap.subscribe(params => {
      let name = params.get('blog');
      this.http.get('https://www.jobcastrop.nl/restful/post.php?name=' + name).subscribe(data => {       
        title.setTitle(data['title'] + ' - Job Castrop');
        
        let shorttext = '';
        if(data['shorttext'])
        {
          shorttext = data['shorttext'].replace(/<\/?[^>]+>/gi, "")
        }
        this.meta.addTags([
          { name: 'author',   content: 'jobcastrop.nl'},
          { name: 'keywords', content: shorttext },
          { name: 'description', content:  shorttext}
        ]);

        this.posts.push(data);
        this.id = data['id'];        
      });
    });
  }

  ngOnInit() {
  }

  getNext(id: number)
  {
    this.http.get('https://www.jobcastrop.nl/restful/next_post.php?id=' + id).subscribe(data => {
      if(!data) return; 
      this.title.setTitle(data['title'] + ' - Job Castrop');
     
      this.meta.addTags([
        { name: 'author',   content: 'jobcastrop.nl'},
        { name: 'keywords', content:  data['shorttext'].replace(/<\/?[^>]+>/gi, "") },
        { name: 'description', content:   data['shorttext'].replace(/<\/?[^>]+>/gi, "")}
      ]);

      this.posts.push(data);
      this.scrolled = false;
      this.id = data['id'];
    });
  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll() {
    
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.scrolled) {
  //       this.scrolled = true;
  //       console.log('Fetch next...');
  //       this.getNext(this.id);
  //   }
  // }

}
