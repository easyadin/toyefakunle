import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevotionreaderPageRoutingModule } from './devotionreader-routing.module';

import { DevotionreaderPage } from './devotionreader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevotionreaderPageRoutingModule
  ],
  declarations: [DevotionreaderPage]
})
export class DevotionreaderPageModule {}
