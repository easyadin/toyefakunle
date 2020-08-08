import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevotionreaderPage } from './devotionreader.page';

const routes: Routes = [
  {
    path: '',
    component: DevotionreaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevotionreaderPageRoutingModule {}
