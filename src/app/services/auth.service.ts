import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'ccf_auth_logged_in';
  private readonly validUsername = 'admin';
  private readonly validPassword = 'admin123';

  private readonly loggedInSubject = new BehaviorSubject<boolean>(this.load());
  readonly isLoggedIn$ = this.loggedInSubject.asObservable();

  get isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  login(username: string, password: string): boolean {
    const ok = username === this.validUsername && password === this.validPassword;
    if (ok) {
      this.set(true);
    }
    return ok;
  }

  logout(): void {
    this.set(false);
  }

  private set(value: boolean) {
    this.loggedInSubject.next(value);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(value));
    } catch {}
  }

  private load(): boolean {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) === true : false;
    } catch {
      return false;
    }
  }
}


