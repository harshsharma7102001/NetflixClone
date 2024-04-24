import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BrowseComponent],
  imports: [CommonModule, CoreModule, HttpClientModule, SharedModule],
  exports: [BrowseComponent],
})
export class PagesModule {}
