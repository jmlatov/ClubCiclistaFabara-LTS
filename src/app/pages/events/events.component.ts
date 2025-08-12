import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HeaderNavBlackComponent } from '../../core/components/header-nav-black/header-nav-black.component';
import { EventItem, EventType, EventsService } from '../../services/events.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderNavBlackComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent {
  showForm = false;
  editingId: string | null = null;
  filter: EventType | 'todas' = 'todas';
  types: { value: EventType; label: string }[] = [
    { value: 'ruta', label: 'Ruta' },
    { value: 'prueba', label: 'Prueba' },
    { value: 'noticia', label: 'Noticia' },
    { value: 'otro', label: 'Otro' },
  ];

  form = this.fb.group({
    type: ['ruta' as EventType, Validators.required],
    title: ['', [Validators.required, Validators.minLength(3)]],
    date: ['', Validators.required],
    description: [''],
    url: ['', []],
  });

  events$ = this.eventsService.events$;

  showLogin = false;
  loginError: string | null = null;
  loginForm = this.fb.group({ username: [''], password: [''] });

  constructor(private fb: FormBuilder, private eventsService: EventsService, private auth: AuthService) {}

  toggleForm() {
    if (!this.auth.isLoggedIn) {
      this.showLogin = true;
      return;
    }
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.editingId = null;
      this.form.reset({ type: 'ruta', title: '', date: '', description: '' });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { type, title, date, description, url } = this.form.value;
    const payload = {
      type: type as EventType,
      title: title!.trim(),
      date: date!,
      description: (description || '').trim(),
      url: (url || '').trim() || undefined,
    };

    if (this.editingId) {
      this.eventsService.updateEvent(this.editingId, payload);
    } else {
      this.eventsService.addEvent(payload);
    }

    this.editingId = null;
    this.form.reset({ type: 'ruta', title: '', date: '', description: '', url: '' });
    this.showForm = false;
  }

  delete(id: string) {
    if (!this.auth.isLoggedIn) {
      this.showLogin = true;
      return;
    }
    this.eventsService.deleteEvent(id);
  }

  startEdit(event: EventItem) {
    if (!this.auth.isLoggedIn) {
      this.showLogin = true;
      return;
    }
    this.editingId = event.id;
    this.form.setValue({
      type: event.type,
      title: event.title,
      date: event.date,
      description: event.description || '',
      url: event.url || '',
    });
    this.showForm = true;
  }

  matchesFilter(e: EventItem): boolean {
    return this.filter === 'todas' ? true : e.type === this.filter;
  }

  trackById(_: number, e: EventItem) {
    return e.id;
  }

  attemptLogin() {
    const { username, password } = this.loginForm.value;
    const ok = this.auth.login((username || '').trim(), (password || '').trim());
    if (ok) {
      this.showLogin = false;
      this.loginError = null;
      this.loginForm.reset();
      this.toggleForm();
    } else {
      this.loginError = 'Credenciales inválidas';
    }
  }

  logout() {
    this.auth.logout();
  }
}


