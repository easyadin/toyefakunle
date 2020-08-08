import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevotionalPageRoutingModule } from './devotional-routing.module';

import { DevotionalPage } from './devotional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevotionalPageRoutingModule
  ],
  declarations: [DevotionalPage]
})
export class DevotionalPageModule {}
