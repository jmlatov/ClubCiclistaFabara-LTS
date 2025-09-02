import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService, ImageItem } from '../../services/image.service';
import { HeaderNavBlackComponent } from '../../core/components/header-nav-black/header-nav-black.component';

@Component({
    selector: 'app-bento-gallery',
    imports: [CommonModule, HeaderNavBlackComponent],
    templateUrl: './bento-gallery.component.html',
    styleUrl: './bento-gallery.component.css'
})
export class BentoGalleryComponent implements OnInit {
  images: ImageItem[] = [];
  loading = true;
  error = '';
  selectedImage: ImageItem | null = null;
  selectedIndex: number | null = null;

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

  openImage(image: ImageItem, index: number): void {
    this.selectedImage = image;
    this.selectedIndex = index;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedImage = null;
    this.selectedIndex = null;
    document.body.style.overflow = 'auto';
  }

  nextImage(): void {
    if (!this.images.length || this.selectedIndex === null) return;
    const next = (this.selectedIndex + 1) % this.images.length;
    this.selectedIndex = next;
    this.selectedImage = this.images[next];
  }

  prevImage(): void {
    if (!this.images.length || this.selectedIndex === null) return;
    const prev = (this.selectedIndex - 1 + this.images.length) % this.images.length;
    this.selectedIndex = prev;
    this.selectedImage = this.images[prev];
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.selectedImage) return;
    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prevImage();
    }
  }
}