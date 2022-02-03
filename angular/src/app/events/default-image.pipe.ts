import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
})
export class DefaultImagePipe implements PipeTransform {
  transform(image?: string): string {
    return (
      image ||
      'https://www.hugyourlife.eu/wp-content/uploads/2020/06/placeholder-1.png'
    );
  }
}
