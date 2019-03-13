import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserService {

  private user: User;
  private userSubject$: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);

  constructor(private http: HttpClient) {}

  getUserInfo(id: number) {
    return this.http.get<User>(`/user/${id}`).pipe(tap(
        user => {
            this.user = user;
            this.userSubject$.next(this.user);
        }
    ));
  }

  get asObservable(): Observable<User> {
    return this.userSubject$;
  }
}