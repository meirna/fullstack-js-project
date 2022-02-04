import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'defaultImage',
})
export class DefaultImagePipe implements PipeTransform {
  transform(image?: string): string {
    return image
      ? `${environment.api}/assets/${image}`
      : '/assets/placeholder-1.png';
  }
}
