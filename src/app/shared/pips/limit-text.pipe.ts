import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitText',
  standalone: true
})
export class LimitTextPipe implements PipeTransform {

  transform(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

}
