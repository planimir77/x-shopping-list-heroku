import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endWithS'
})
export class EndWithSPipe implements PipeTransform {

  transform(word: string): string {
    return word + "'s";
  }

}
