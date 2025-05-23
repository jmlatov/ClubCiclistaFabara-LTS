import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para las imágenes
export interface ImageItem {
  id: number;
  filename: string;
  url: string;
  title: string;
  span: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) { }

  getImages(): Observable<ImageItem[]> {
    // Obtenemos las imágenes desde el JSON generado
    return this.http.get<ImageItem[]>('assets/images-list.json');
  }
}