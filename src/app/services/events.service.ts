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
  private readonly apiUrl = 'https://www.articsmusic.com/api/events'; // Cambia por tu dominio
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
      const currentEvents = this.getEvents();
      const updatedEvents = currentEvents.filter(e => e.id !== id);
      this.eventsSubject.next(updatedEvents);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  async updateEvent(id: string, update: Partial<Omit<EventItem, 'id'>>): Promise<void> {
    try {
      const updatedEvent = await this.http.put<EventItem>(`${this.apiUrl}/${id}`, update).toPromise();
      if (updatedEvent) {
        const currentEvents = this.getEvents();
        const updatedEvents = currentEvents.map(e => 
          e.id === id ? updatedEvent : e
        ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.eventsSubject.next(updatedEvents);
      }
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      const currentEvents = this.getEvents();
      for (const event of currentEvents) {
        await this.http.delete(`${this.apiUrl}/${event.id}`).toPromise();
      }
      this.eventsSubject.next([]);
    } catch (error) {
      console.error('Error clearing events:', error);
      throw error;
    }
  }
}


