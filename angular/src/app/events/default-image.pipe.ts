import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
})
export class DefaultImagePipe implements PipeTransform {
  transform(image?: string): string {
    return image || '/assets/placeholder-1.png';
  }
}
