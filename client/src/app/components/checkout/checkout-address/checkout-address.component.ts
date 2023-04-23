import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Country } from 'src/app/common/country';
import { UserProfile } from 'src/app/common/user-profile';
import { CartifyFormService } from 'src/app/services/cartify-form.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css'],
})
export class CheckoutAddressComponent implements OnInit{
  @Input() checkoutForm!: FormGroup;
  userProfile!: UserProfile;
  userId!: string;
  countries !: Country[]

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private cartifyFormService: CartifyFormService) {}

  ngOnInit(): void {
    // populate countries
    this.cartifyFormService.getCountries().subscribe((data) => {
      console.log('Retrieved countries: ' + JSON.stringify(data));
      this.countries = data;
    });
  }

  saveUserAddress(){
    this.userProfile = {}

   this.oktaAuth.getUser().then(
      (res: any) => {
        this.userId = res?.['sub']
        console.log(`User Id: ${this.userId}`)
        this.userProfile.firstName = this.checkoutForm.get('addressForm')?.get('firstName')?.value
        this.userProfile.lastName = this.checkoutForm.get('addressForm')?.get('lastName')?.value
        this.userProfile.streetAddress = this.checkoutForm.get('addressForm')?.get('street')?.value
        this.userProfile.city = this.checkoutForm.get('addressForm')?.get('city')?.value
        this.userProfile.state = this.checkoutForm.get('addressForm')?.get('state')?.value
        this.userProfile.zipCode = this.checkoutForm.get('addressForm')?.get('zipcode')?.value
        this.userProfile.country = this.checkoutForm.get('addressForm')?.get('country')?.value
        this.userProfile.email = this.checkoutForm.get('addressForm')?.get('email')?.value
        this.updateProfile(this.userId, this.userProfile)
      }
    )
  }

  async updateProfile(id: string, profile: UserProfile) {
    console.log(`userId: ${id}, userProfile: ${JSON.stringify(this.userProfile)}`);
    const accessToken = this.oktaAuth.getAccessToken()
    const baseUrl = this.oktaAuth.getIssuerOrigin();
    const url = `${baseUrl}/api/v1/users/${id}`;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `SSWS ${accessToken}`
    };
    const data = { profile };
    console.log(`data: ${JSON.stringify(data)}`)

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error(error);
    }
  }

  //   getStates(formGroupName: string) {
//     const formGroup = this.checkoutFormGroup.get(formGroupName);
//     const countryCode = formGroup?.value.country.code;
//     const countryName = formGroup?.value.country.name;

//     console.log(`${formGroupName} country code: ${countryCode}`);
//     console.log(`${formGroupName} country name: ${countryName}`);

//     this.cartifyFormService.getStates(countryCode).subscribe((data) => {
//       console.log(`${formGroupName} states: ${JSON.stringify(data)}`);
//       if (formGroupName === 'shippingAddress') {
//         this.shippingAddressStates = data;
//       } else {
//         this.billingAddressStates = data;
//       }

//       // select first item by default
//       formGroup?.get('state')?.setValue(data[0]);
//     });
//   }
}
