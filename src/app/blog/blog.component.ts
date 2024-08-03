import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

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

  constructor(
    private gtag: GoogleTagManagerService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.addTags([
      {
        name: 'description',
        content:
          "Visit the Blog about Sighisoara page for engaging stories, travel tips, and insider knowledge on Sighisoara's hidden treasures. Discover the city's rich history, cultural insights, and must-see attractions through our informative and captivating blog posts / Vizitează pagina \"Blog despre Sighișoara\" pentru povești captivante, sfaturi de călătorie și cunoștințe din interior despre comorile ascunse ale Sighișoarei. Descoperă istoria bogată a orașului, perspective culturale și atracții de neratat prin intermediul postărilor noastre informative și fascinante de pe blog.",
      },
      { name: 'author', content: 'VEEZBLE' },
      {
        name: 'keywords',
        content:
          'Sighisoara blog, Travel tips Sighisoara, Sighisoara history, Cultural insights Sighisoara, Sighisoara attractions guide, Sighisoara tourism, Explore Sighisoara, Sighisoara hidden gems, Visit Sighisoara, Sighisoara travel guide / Blog Sighișoara, Sfaturi de călătorie Sighișoara, Istoria Sighișoarei, Perspective culturale Sighișoara, Ghidul atracțiilor Sighișoara, Turism Sighișoara, Explorează Sighișoara, Comori ascunse Sighișoara, Vizitează Sighișoara, Ghid de călătorie Sighișoara',
      },
    ]);
    this.title.setTitle('Blog - Sighisoara Festival');

    if (environment.production) {
      const gtmTag = {
        event: 'page',
        page_title: 'Blog',
        page_location: 'https://sighisoarafestival.com/blog'
      };
      this.gtag.pushTag(gtmTag);
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
