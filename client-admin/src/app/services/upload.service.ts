import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadProduct(file: File): Observable<any> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ml_default');
    data.append('cloud_name', 'cellphones-shop');
    return this.http.post('https://api.cloudinary.com/v1_1/cellphones-shop/image/upload', data)
  }

  uploadCustomer(file: File): Observable<any> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ml_default');
    data.append('cloud_name', 'cellphones-shop');
    return this.http.post('https://api.cloudinary.com/v1_1/cellphones-shop/image/upload', data)
  }
}
