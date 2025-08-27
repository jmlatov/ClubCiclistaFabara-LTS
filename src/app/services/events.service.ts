import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type EventType = 'ruta' | 'prueba' | 'noticia' | 'otro';

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO: yyyy-MM-dd
  type: EventType;
  description?: string;
  url?: string; // enlace externo opcional
  imageUrl?: string; // cartel/imagen del evento opcional
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly apiUrl = 'https://www.ccfabara.es/api/events'; // Cambia por tu dominio
  private readonly eventsSubject = new BehaviorSubject<EventItem[]>([]);
  readonly events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEvents();
  }

  getEvents(): EventItem[] {
    return this.eventsSubject.value;
  }

  async loadEvents(): Promise<void> {
    try {
      const events = await this.http.get<EventItem[]>(this.apiUrl).toPromise();
      this.eventsSubject.next(events || []);
    } catch (error) {
      console.error('Error loading events:', error);
      this.eventsSubject.next([]);
    }
  }

  async addEvent(input: Omit<EventItem, 'id'>): Promise<void> {
    try {
      const newEvent = await this.http.post<EventItem>(this.apiUrl, input).toPromise();
      if (newEvent) {
        const currentEvents = this.getEvents();
        const updatedEvents = [...currentEvents, newEvent].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        this.eventsSubject.next(updatedEvents);
      }
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      await this.http.delete(`${this.apiUrl}/${id}`).toPromise();
    } catch (error: any) {
      // Fallback si Nginx/hosting bloquea DELETE (405)
      if (error?.status === 405) {
        await this.http.post(`${this.apiUrl}/${id}?_method=DELETE`, {}).toPromise();
      } else {
        console.error('Error deleting event:', error);
        throw error;
      }
    }
    const currentEvents = this.getEvents();
    const updatedEvents = currentEvents.filter(e => e.id !== id);
    this.eventsSubject.next(updatedEvents);
  }

  async updateEvent(id: string, update: Partial<Omit<EventItem, 'id'>>): Promise<void> {
    let updatedEvent: EventItem | undefined;
    try {
      updatedEvent = await this.http.put<EventItem>(`${this.apiUrl}/${id}`, update).toPromise() as EventItem;
    } catch (error: any) {
      // Fallback si Nginx/hosting bloquea PUT (405)
      if (error?.status === 405) {
        updatedEvent = await this.http.post<EventItem>(`${this.apiUrl}/${id}?_method=PUT`, update).toPromise() as EventItem;
      } else {
        console.error('Error updating event:', error);
        throw error;
      }
    }

    if (updatedEvent) {
      const currentEvents = this.getEvents();
      const updatedEvents = currentEvents
        .map(e => (e.id === id ? updatedEvent as EventItem : e))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.eventsSubject.next(updatedEvents);
    }
  }

  async clearAll(): Promise<void> {
    try {
      const currentEvents = this.getEvents();
      for (const event of currentEvents) {
        try {
          await this.http.delete(`${this.apiUrl}/${event.id}`).toPromise();
        } catch (error: any) {
          if (error?.status === 405) {
            await this.http.post(`${this.apiUrl}/${event.id}?_method=DELETE`, {}).toPromise();
          } else {
            throw error;
          }
        }
      }
      this.eventsSubject.next([]);
    } catch (error) {
      console.error('Error clearing events:', error);
      throw error;
    }
  }
}


