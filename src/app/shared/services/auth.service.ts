declare var google: any;
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  router = inject(Router);

  constructor() {}
  signOut() {
    if (typeof google !== 'undefined') {
      google.accounts.id.disableAutoSelect();
      this.router.navigate(['/']);
    } else {
      console.error('Google Identity Script not loaded.');
    }
  }
}
