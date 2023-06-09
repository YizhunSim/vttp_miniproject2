import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false
  userFullName: string = ''

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!
        this.getUserDetails()
      }
    )
  }

  getUserDetails() {
    if (this.isAuthenticated){

      // Fetch the logged in user details (user's claims)
      // user full name is explosed as a property name
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string
          console.log(`getUserDetails: ${JSON.stringify(res)}`)

          // retrieve user's email from authentication response
          const userEmail = res.email;

          // now store the email in browser session storage
          this.storage.setItem('userEmail', JSON.stringify(userEmail));
        }
      )
    }
  }

  logout(){
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuth.signOut()
  }


}
