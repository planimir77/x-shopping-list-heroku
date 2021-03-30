import { FormGroup } from '@angular/forms';

export function PasswordsMustMatch(formGroup: FormGroup) {
    const equal = formGroup.get('password').value === formGroup.get('rePassword').value;
    return equal ? null : {'notEqual': true};
}