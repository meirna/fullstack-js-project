import { Pipe, PipeTransform } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'defaultImage',
})
export class DefaultImagePipe implements PipeTransform {
  transform(image?: SafeUrl): string | SafeUrl {
    return image || '/assets/placeholder-1.png';
  }
}
