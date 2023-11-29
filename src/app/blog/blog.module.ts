import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';

import { httpTranslateLoader, SharedModule } from '@app/shared';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogPostComponent } from './subcomponents/blog-post/blog-post.component';

@NgModule({
  declarations: [
    BlogComponent,
    BlogPostComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MatExpansionModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ]
})
export class BlogModule { }
