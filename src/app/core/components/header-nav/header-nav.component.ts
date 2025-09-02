import { Component, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BannerBttComponent } from '../banner-btt/banner-btt.component';
import { BannerCountdownComponent } from '../banner-countdown/banner-countdown.component';

@Component({
    selector: 'app-header-nav',
    imports: [RouterModule],
    templateUrl: './header-nav.component.html',
    styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent {
  @Output() selected = new EventEmitter<string>();
  @Output() selectedBanner = new EventEmitter<string>();
  isBttMenuOpen = false;
  private closeTimer: any = null;

  constructor(private router: Router, private el: ElementRef) {}

  selectBtt() {
    this.clearCloseTimer();
    this.isBttMenuOpen = false;
    this.router.navigate(['btt-algars']);
    this.selected.emit('btt');
  }

  selectHome() {
    this.router.navigate(['']);
    this.selected.emit('home');
  }

  selectGaleria() {
    this.clearCloseTimer();
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
    this.clearCloseTimer();
    this.isBttMenuOpen = true;
  }

  closeBttMenu() {
    this.isBttMenuOpen = false;
  }

  closeBttMenuDelayed() {
    this.clearCloseTimer();
    this.closeTimer = setTimeout(() => {
      this.isBttMenuOpen = false;
      this.closeTimer = null;
    }, 1000);
  }

  private clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.clearCloseTimer();
      this.isBttMenuOpen = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.clearCloseTimer();
    this.isBttMenuOpen = false;
  }
}
