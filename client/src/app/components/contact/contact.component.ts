import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';


declare var google: any

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  @ViewChild('map') mapElement!: ElementRef;
  map: any;
  contactData = { name: '', email: '', message: '' };

  api_key = "AIzaSyCVa8UXORLRG9SUpzPy9_aBNHbdo7eAH7Q"

    constructor() { }

    ngOnInit(): void {
      // this.loadMap();
    }

    // loadMap() {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    //     const mapOptions = {
    //       center: latLng,
    //       zoom: 15,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };

    //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    //     const marker = new google.maps.Marker({
    //       position: latLng,
    //       map: this.map,
    //       title: 'My Location'
    //     });
    //   });
    // }

    onSubmit() {
      // Handle form submission here
  }

}
