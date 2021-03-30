import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoRows'
})
export class TwoRowsPipe implements PipeTransform {

  transform(input: string, ): string {
    if (input.length > 20) {
      const index = input.indexOf(' ', 15);
      const newLine = '<br/>';
      if (index < 0) {
        input = [input.slice(0, 20), newLine, input.slice(20)].join('')
      }else {
        input =[input.slice(0, index), newLine, input.slice(index)].join('')
      }
    }
    return input;
  }

}
