import { Component, Output, EventEmitter, Input, HostListener, ElementRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BannerBttComponent } from '../banner-btt/banner-btt.component';
import { BannerCountdownComponent } from '../banner-countdown/banner-countdown.component';

@Component({
  selector: 'app-header-nav-black',
  standalone: true,
  imports: [CommonModule, RouterModule, BannerBttComponent],
  templateUrl: './header-nav-black.component.html',
  styleUrl: './header-nav-black.component.css',
})
export class HeaderNavBlackComponent {
  @Input() showBanner: boolean = true;
  @Output() selected = new EventEmitter<string>();
  @Output() selectedBanner = new EventEmitter<string>();
  isBttMenuOpen = false;

  constructor(private router: Router, private el: ElementRef) {}

  selectBtt() {
    this.isBttMenuOpen = false;
    this.router.navigate(['btt-algars']);
    this.selected.emit('btt');
  }

  selectHome() {
    this.router.navigate(['']);
    this.selected.emit('home');
  }

  selectGaleria() {
    this.isBttMenuOpen = false;
    this.router.navigate(['gallery']);
    this.selected.emit('gallery');
  }

  selectEventos() {
    this.router.navigate(['eventos']);
    this.selected.emit('events');
  }

  showSidebar() {
    const sidebar: HTMLElement | null = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  hideSidebar() {
    const sidebar: HTMLElement | null = document.getElementById('sidebar');
    if (sidebar) {
      document.body.style.overflow = 'auto';
      sidebar.classList.add('sidebar-closed');
      setTimeout(function () {
        sidebar.classList.remove('sidebar-closed');
        sidebar.style.display = 'none';
      }, 500);
    }
  }

  getSelected(selected: string) {
    this.selectedBanner.emit(selected);
  }

  openBttMenu() {
    this.isBttMenuOpen = true;
  }

  closeBttMenu() {
    this.isBttMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isBttMenuOpen = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isBttMenuOpen = false;
  }
}
