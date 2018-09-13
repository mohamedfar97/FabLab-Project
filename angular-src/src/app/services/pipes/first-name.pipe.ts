import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName'
})
export class FirstNamePipe implements PipeTransform {

  transform(value: string): any {
    if ( value ) {
      let split = value.split(" ");
      return split[0];
    }
  }

}
