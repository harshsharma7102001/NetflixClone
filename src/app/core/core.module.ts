import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, BannerComponent],
  exports: [HeaderComponent, BannerComponent],
  imports: [CommonModule, SharedModule],
})
export class CoreModule {}
