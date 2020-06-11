import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ucwords'
})
export class UcwordsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const capitalize = (s) => {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    }
    return capitalize(value);
  }

}
