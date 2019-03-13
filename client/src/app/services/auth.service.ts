import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login(email:string) {
        return this.http.post<{accessToken: string, id: number}>('/auth/login', { email })
            .pipe(tap(res => {
                localStorage.setItem('access_token', res.accessToken);
        }));
    }

    public get isLoggedIn(): boolean {
        return this.accessToken !==  null;
    }

    public get accessToken(): string {
        return localStorage.getItem('access_token');
    }

    logout() {
        localStorage.removeItem('access_token');
    }
}