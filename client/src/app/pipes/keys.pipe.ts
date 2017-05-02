import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, args?: string[]): any {
    if(!value) {

      return value;
    }

    let keys = [];

    for(let key in value) {


      if(!Array.isArray(args) || args.length === 0 || args.indexOf(key) > -1) {

        keys.push({
          key: key,
          value: value[key]
        })
      }
    }

    return keys;

  }
}
