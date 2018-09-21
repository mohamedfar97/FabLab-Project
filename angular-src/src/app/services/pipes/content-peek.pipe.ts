import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentPeek'
})
export class ContentPeekPipe implements PipeTransform {

  transform( value: string ): string {
    if ( value ) {
      let contentPeek;
      if ( value.length > 40 ) {
        contentPeek = value.substring(0,40) + ' ....';
      } else {
        contentPeek = value;
      }
      return contentPeek;
    }
  }

}
