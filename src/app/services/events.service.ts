import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, shareReplay, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  private readonly apiUrl = 'https://www.ccfabara.es/api/events';
  private refreshTrigger = new BehaviorSubject<number>(0);
  
  readonly events$ = this.refreshTrigger.pipe(
    switchMap(() => this.fetchEvents()),
    shareReplay(1)
  );

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'If-Modified-Since': '0'
      })
    };
  }

  constructor(private http: HttpClient) {
    this.loadEvents();
    this.testApiConnection();
  }

  private async fetchEvents(): Promise<EventItem[]> {
    const timestamp = new Date().getTime();
    const url = `${this.apiUrl}?_t=${timestamp}`;
    
    try {
      return await firstValueFrom(
        this.http.get<EventItem[]>(url, this.getHttpOptions())
      );
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  private forceRefresh(): void {
    this.refreshTrigger.next(Date.now());
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


  async loadEvents(): Promise<void> {
    this.forceRefresh();
  }

  async addEvent(input: Omit<EventItem, 'id'>): Promise<void> {
    try {
      await firstValueFrom(this.http.post<EventItem>(this.apiUrl, input, this.getHttpOptions()));
      this.forceRefresh();
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`, this.getHttpOptions()));
      this.forceRefresh();
    } catch (error: any) {
      // Fallback si Nginx/hosting bloquea DELETE (405)
      if (error?.status === 405) {
        await firstValueFrom(
          this.http.post(`${this.apiUrl}/${id}?_method=DELETE`, {}, this.getHttpOptions())
        );
      }
      this.forceRefresh();
    }
  }

  async updateEvent(id: string, update: Partial<Omit<EventItem, 'id'>>): Promise<void> {
    try {
      await firstValueFrom(this.http.put<any>(`${this.apiUrl}/${id}`, update, this.getHttpOptions()));
      this.forceRefresh();
    } catch (error: any) {
      // Fallback si Nginx/hosting bloquea PUT (405)
      if (error?.status === 405) {
        await firstValueFrom(
          this.http.post<any>(`${this.apiUrl}/${id}?_method=PUT`, update, this.getHttpOptions())
        );
        this.forceRefresh();
      } else {
        throw error;
      }
    }
  }


}


