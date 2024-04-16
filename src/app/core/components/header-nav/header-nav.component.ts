import { Component, NgModule, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.css',
})
export class HeaderNavComponent {
  @Output() selected = new EventEmitter<string>();

  constructor(private router: Router) {}

  selectBtt() {
    this.router.navigate(['btt-algars']);
    this.selected.emit('btt');
  }

  selectHome() {
    this.router.navigate(['']);
    this.selected.emit('home');
  }

  selectGaleria() {
    this.router.navigate(['galeria']);
    this.selected.emit('about');
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
