import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';
import { DescriptionPipe } from './pipes/description.pipe';
import { ImagePipe } from './pipes/image.pipe';
@NgModule({
  declarations: [MovieCarouselComponent, DescriptionPipe, ImagePipe],
  exports: [MovieCarouselComponent, DescriptionPipe, ImagePipe],
  imports: [CommonModule],
})
export class SharedModule {}
