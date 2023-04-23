import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { UserProfile } from 'src/app/common/user-profile';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  userProfile!: UserProfile;

  countries: Country[] = [];
  shippingAddressStates: State[] = [];

  constructor(private fb: FormBuilder, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth){

  }
  ngOnInit(): void {
    this.getAddressFormValues()
  }

  checkoutFormGroup = this.fb.group({
    addressForm: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      email: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      country: ['', Validators.required]
    }),
    deliveryForm: this.fb.group({
      deliveryMethod: ['', Validators.required]
    }),
    paymentForm: this.fb.group({
      nameOnCard: ['', Validators.required]
    })
  })

  getAddressFormValues() {
    this.oktaAuth.token.getUserInfo().then(
      (res: any ) => {
        const userInfo = res?.['UserInfo'];
        const profile = userInfo?.['profile'];
        this.checkoutFormGroup.get('addressForm')?.get('firstName')?.setValue(profile?.['firstName'])
        this.checkoutFormGroup.get('addressForm')?.get('lastName')?.setValue(profile?.['lastName'])
        this.checkoutFormGroup.get('addressForm')?.get('street')?.setValue(profile?.['streetAddress'])
        this.checkoutFormGroup.get('addressForm')?.get('city')?.setValue(profile?.['city'])
        this.checkoutFormGroup.get('addressForm')?.get('state')?.setValue(profile?.['state'])
        this.checkoutFormGroup.get('addressForm')?.get('zipcode')?.setValue(profile?.['zipCode'])
        this.checkoutFormGroup.get('addressForm')?.get('email')?.setValue(profile?.['email'])
        this.checkoutFormGroup.get('addressForm')?.get('country')?.setValue(profile?.['countryCode'])
      }
    )
  }
}
