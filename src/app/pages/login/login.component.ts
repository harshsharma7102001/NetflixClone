declare var google: any;
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  ngOnInit(): void {
    //'531121168764-fj0qmf042utb4q601id0dt2ojmdpe6ej.apps.googleusercontent.com'
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id:
          '405366934285-4f9oeapg4lhj80lnjk9rgv90ppts64l6.apps.googleusercontent.com',
        callback: (resp: any) => this.handleLogin(resp),
      });
      google.accounts.id.renderButton(document.getElementById('google-btn'), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350,
      });
    } else {
      console.error('Google Identity Services script not loaded.');
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      this.router.navigate(['browse']);
    }
  }
}
