import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HeaderNavBlackComponent } from '../../core/components/header-nav-black/header-nav-black.component';
import { EventItem, EventType, EventsService } from '../../services/events.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderNavBlackComponent, MarkdownComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit, OnDestroy {
  showForm = false;
  editingId: string | null = null;
  editingEvent: EventItem | null = null;
  private authSubscription?: Subscription;
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
    imageUrl: ['', []],
  });

  events$ = this.eventsService.events$;

  showLogin = false;
  loginError: string | null = null;
  loginForm = this.fb.group({ username: [''], password: [''] });
  isLoggedIn$ = this.auth.isLoggedIn$;

  constructor(private fb: FormBuilder, private eventsService: EventsService, private auth: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.showForm = false;
        this.editingId = null;
        this.form.reset({ type: 'ruta', title: '', date: '', description: '', url: '', imageUrl: '' });
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  toggleForm() {
    if (!this.auth.isLoggedIn) {
      this.showLogin = true;
      return;
    }
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.editingId = null;
      this.editingEvent = null;
      this.form.reset({ type: 'ruta', title: '', date: '', description: '', imageUrl: '' });
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const { type, title, date, description, url, imageUrl } = this.form.value;
    const payload = {
      type: type as EventType,
      title: title!.trim(),
      date: date!,
      description: (description || '').trim(),
      url: (url || '').trim() || undefined,
      imageUrl: (imageUrl || '').trim() || undefined,
    };

    try {
      if (this.editingId) {
        await this.eventsService.updateEvent(this.editingId, payload);
      } else {
        await this.eventsService.addEvent(payload);
      }

      this.editingId = null;
      this.form.reset({ type: 'ruta', title: '', date: '', description: '', url: '', imageUrl: '' });
      this.showForm = false;
    } catch (error) {
      // Propagamos el error para que pueda ser manejado por el componente padre
      throw error;
    }
  }

  async delete(id: string) {
    if (!this.auth.isLoggedIn) {
      this.showLogin = true;
      return;
    }
    
    try {
      await this.eventsService.deleteEvent(id);
    } catch (error) {
      throw error;
    }
  }

  startEdit(event: EventItem) {
    if (!this.auth.isLoggedIn) {
      this.showLogin = true;
      return;
    }
    this.editingId = event.id;
    this.editingEvent = event;
    this.form.setValue({
      type: event.type,
      title: event.title,
      date: event.date,
      description: event.description || '',
      url: event.url || '',
      imageUrl: event.imageUrl || '',
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


