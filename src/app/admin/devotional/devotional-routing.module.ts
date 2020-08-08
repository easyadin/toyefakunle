import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevotionalPage } from './devotional.page';

const routes: Routes = [
  {
    path: '',
    component: DevotionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevotionalPageRoutingModule {}
