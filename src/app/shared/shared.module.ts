import { FilterPipe } from './../services/filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterPipe]
})
export class SharedModule { }
