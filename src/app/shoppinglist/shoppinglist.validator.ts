import { AbstractControl } from '@angular/forms';

export function ValidateWhitespace(control: AbstractControl): { [key: string]: boolean } | null {
    let isValid = control.value.trim().length >= 3;

    return isValid ? null : { 'whitespace': true };
}

export function CheckInput(input: string): string {
    let newValue = null;

    if (input.trimStart().length !== input.length) {
        newValue = input.trimStart();
    }
    else if (input.includes('  ')) {
        newValue = input.replace('  ', ' ');
    }else if (input.length > 0 && input.charAt(0) !== input.charAt(0).toUpperCase()) {
        newValue = input.charAt(0).toUpperCase() + input.slice(1);
        if (newValue.length > 1) {
            const newChar = newValue[1].toLowerCase();
            newValue = newValue.substring(0, 1) + newChar + newValue.substring(1 + 1);
        }
    }

    return newValue;
}
