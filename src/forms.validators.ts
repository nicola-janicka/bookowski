import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxCurrentYearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const year = Number(control.value);
    const currentYear = new Date().getFullYear();

    if (isNaN(year)) {
      return { invalidYear: true };
    }

    return year > currentYear ? { yearInFuture: true } : null;
  };
}
