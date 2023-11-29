import { Component, Input, OnInit } from '@angular/core';

export interface BlogPost {
  imageData: {
    url: string;
    title: string;
  },
}

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  imageUrl!: string;
  imageTitle!: string;
  isLoading = true;

  @Input() postIndex!: number;
  @Input('postData')
  set postData(val: BlogPost) {
    this.imageUrl = val.imageData.url;
    this.imageTitle = val.imageData.title;
  }

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
