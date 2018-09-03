import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeRole'
})
export class CapitalizeRolePipe implements PipeTransform {

  transform(value: string) {
    let splittedRole = value.split(" ");
    if ( splittedRole[0] === "ceo" ) {
      return "CEO";
    }

    var finalRole : string = "";

    for ( let i = 0 ; i < splittedRole.length ; i++ ) {
      let tempStr = splittedRole[i].substring(1,splittedRole[i].length) + " ";
      finalRole += splittedRole[i][0].toUpperCase() + tempStr;
    }
    return finalRole;
  }

}
