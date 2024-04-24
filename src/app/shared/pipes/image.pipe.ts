import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): any {
    return `https://image.tmdb.org/t/p/w500/${value}`;
  }
}
