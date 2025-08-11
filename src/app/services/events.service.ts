import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type EventType = 'ruta' | 'prueba' | 'noticia' | 'otro';

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO: yyyy-MM-dd
  type: EventType;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly storageKey = 'ccf_events';
  private readonly eventsSubject = new BehaviorSubject<EventItem[]>(this.load());
  readonly events$ = this.eventsSubject.asObservable();

  getEvents(): EventItem[] {
    return this.eventsSubject.value;
  }

  addEvent(input: Omit<EventItem, 'id'>) {
    const id = this.generateId();
    const next = [...this.getEvents(), { ...input, id }];
    this.set(next);
  }

  deleteEvent(id: string) {
    const next = this.getEvents().filter((e) => e.id !== id);
    this.set(next);
  }

  updateEvent(id: string, update: Partial<Omit<EventItem, 'id'>>) {
    const next = this.getEvents().map((e) => (e.id === id ? { ...e, ...update } : e));
    this.set(next);
  }

  clearAll() {
    this.set([]);
  }

  private set(arr: EventItem[]) {
    this.eventsSubject.next(arr);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(arr));
    } catch {}
  }

  private load(): EventItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as EventItem[]) : [];
    } catch {
      return [];
    }
  }

  private generateId(): string {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }
}


