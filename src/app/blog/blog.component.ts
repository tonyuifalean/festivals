import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { Gtag } from 'angular-gtag';

import { BlogPost } from './subcomponents/blog-post/blog-post.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  panelOpenState = false;
  isLoading = true;

  /** Represents the list of blog posts with their properties. */
  blogPostList: BlogPost[] = [
    {
      imageData: {
        url: 'assets/images/sighisoara-sunset.jpg',
        title: 'Sighișoara Sunset',
      },
    },
    {
      imageData: {
        url: 'assets/images/sighisoara-curiosities.jpg',
        title: 'Sighișoara Curiosities',
      },
    },
    {
      imageData: {
        url: 'assets/images/discover-sighisoara.jpg',
        title: 'Discover Sighișoara',
      },
    },
  ];

  constructor(private gtag: Gtag, private meta: Meta, private title: Title) {
    this.meta.addTags([
      { name: 'description', content: 'Blog about Sighișoara' },
      { name: 'author', content: 'VEEZBLE SRL' },
      { name: 'keywords', content: 'Sighișoara, Transylvania, Blog' },
    ]);
    this.title.setTitle('Blog - SighișoaraFestival');

    if (environment.production) {
      this.gtag.pageview({
        page_title: 'Blog',
        page_path: '/blog',
        page_location: 'https://sighisoarafestival.com/blog',
      });
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
