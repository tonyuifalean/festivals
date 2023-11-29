import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccomodationsComponent } from './accomodations.component';

const routes: Routes = [{ path: '', component: AccomodationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccomodadtionsRoutingModule { }
