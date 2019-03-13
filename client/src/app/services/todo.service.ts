import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo-task.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TodoService {

  private todos: Array<Todo>;
  private todosSubject$: BehaviorSubject<Array<Todo>> = new BehaviorSubject<Array<Todo>>(this.todos);

  constructor(private http: HttpClient) {}

  createTodo(todo: Todo) {
    return this.http.post<Array<Todo>>(`/todo`, todo).pipe(tap(
        res => {
            this.todos = res;
            this.todosSubject$.next(this.todos);
        }
    ));
  }

  getTodo(id: number) {
    return this.http.get<Array<Todo>>(`/todo/${id}`).pipe(tap(
        res => {
            this.todos = res;
            this.todosSubject$.next(this.todos);
        }
    ));
  }

  updateTodo(todo: Todo) {
    return this.http.put<Array<Todo>>(`/todo`, todo).pipe(tap(
        res => {
            this.todos = res;
            this.todosSubject$.next(this.todos);
        }
    ));
  }

  removeTodo(id: number) {
    return this.http.delete<Array<Todo>>(`/todo/${id}`).pipe(tap(
        res => {
            this.todos = res;
            this.todosSubject$.next(this.todos);
        }
    ));
  }

  get asObservable(): Observable<Array<Todo>> {
    return this.todosSubject$;
  }
}