import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FestivalDetailsComponent, FestivalListComponent } from './components';

const routes: Routes = [
  { path: '', component: FestivalListComponent },
  { path: 'festival-details/:id', component: FestivalDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FestivalsRoutingModule {}
