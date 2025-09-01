import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
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
  private readonly apiUrl = 'https://www.ccfabara.es/api/events'; // URL directa
  private readonly eventsSubject = new BehaviorSubject<EventItem[]>([]);
  readonly events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEvents();
    this.testApiConnection();
  }

  async testApiConnection(): Promise<void> {
    try {
      await firstValueFrom(this.http.get<any>(this.apiUrl, {
        observe: 'response'
      }));
    } catch (error: any) {
      // Si hay error, lo propagamos
      throw error;
    }
  }

  getEvents(): EventItem[] {
    return this.eventsSubject.value;
  }

  async loadEvents(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<any>(this.apiUrl, {
        observe: 'response'
      }));
      this.eventsSubject.next(response.body || []);
    } catch (error: any) {
      this.eventsSubject.next([]);
      throw error;
    }
  }

  async addEvent(input: Omit<EventItem, 'id'>): Promise<void> {
    try {
      const newEvent = await firstValueFrom(this.http.post<EventItem>(this.apiUrl, input));
      if (newEvent) {
        const currentEvents = this.getEvents();
        const updatedEvents = [...currentEvents, newEvent].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        this.eventsSubject.next(updatedEvents);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
    } catch (error: any) {
      // Fallback si Nginx/hosting bloquea DELETE (405)
      if (error?.status === 405) {
        await firstValueFrom(this.http.post(`${this.apiUrl}/${id}?_method=DELETE`, {}));
      } else {
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
      const response = await firstValueFrom(this.http.put<any>(`${this.apiUrl}/${id}`, update, {
        observe: 'response'
      }));
      
      updatedEvent = response.body;
    } catch (error: any) {
      // Fallback si Nginx/hosting bloquea PUT (405)
      if (error?.status === 405) {
        const response = await firstValueFrom(this.http.post<any>(`${this.apiUrl}/${id}?_method=PUT`, update, {
          observe: 'response'
        }));
        updatedEvent = response.body;
      } else {
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
          await firstValueFrom(this.http.delete(`${this.apiUrl}/${event.id}`));
        } catch (error: any) {
          if (error?.status === 405) {
            await firstValueFrom(this.http.post(`${this.apiUrl}/${event.id}?_method=DELETE`, {}));
          } else {
            throw error;
          }
        }
      }
      this.eventsSubject.next([]);
    } catch (error) {
      throw error;
    }
  }
}


