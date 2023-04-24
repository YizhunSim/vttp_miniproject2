import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-image-upload-component',
  templateUrl: './image-upload-component.component.html',
  styleUrls: ['./image-upload-component.component.css']
})


export class ImageUploadComponent implements OnInit {
  form!: FormGroup;
  imageSrc!: string | ArrayBuffer | null;
  apiURL = 'http://localhost:8080';

  products: Product[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl()
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files?.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result;
        this.form.patchValue({
          image: file
        });
      };
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.form.get('image')?.value);

    this.http.post<Product[]>(`${this.apiURL}/api/products`, formData).subscribe(
      (res) => {
        this.products = res;
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}

interface Product {
  name: string;
  price: number;
  imageUrl: string;
}

