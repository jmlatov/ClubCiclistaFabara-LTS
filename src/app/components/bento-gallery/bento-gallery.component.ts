import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService, ImageItem } from '../../services/image.service';
import { HeaderNavBlackComponent } from '../../core/components/header-nav-black/header-nav-black.component';

@Component({
  selector: 'app-bento-gallery',
  standalone: true,
  imports: [CommonModule, HeaderNavBlackComponent],
  templateUrl: './bento-gallery.component.html',
  styleUrl: './bento-gallery.component.css'
})
export class BentoGalleryComponent implements OnInit {
  images: ImageItem[] = [];
  loading = true;
  error = '';

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.loading = true;
    
    this.imageService.getImages().subscribe({
      next: (data) => {
        console.log('Imágenes cargadas:', data);
        this.images = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar imágenes:', err);
        this.error = 'Error al cargar las imágenes. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  getSpanClass(span: number): string {
    switch(span) {
      case 3: return 'span-large';
      case 2: return 'span-medium';
      default: return 'span-small';
    }
  }
  navigateToHome(): void {
    window.location.href = '/'; // Redirecciona a la ruta principal
  }
}