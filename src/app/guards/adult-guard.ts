import { CanActivateFn } from '@angular/router';

export const adultGuard: CanActivateFn = (route, state) => {
  return true;
};
