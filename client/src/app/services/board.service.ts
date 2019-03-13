import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Board } from '../models/board.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BoardService {

  private boards: Array<Board>;
  private boardsSubject$: BehaviorSubject<Array<Board>> = new BehaviorSubject<Array<Board>>(this.boards);
 
  private boardsCount: number;
  private boardsCountSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(this.boardsCount);

  constructor(private http: HttpClient) {}

  createBoard(board: Board) {
    return this.http.post<Array<Board>>(`/board`, board).pipe(tap(
        res => {
            this.boards = res;
            this.boardsSubject$.next(this.boards);
            this.boardsCount++;
            this.boardsCountSubject$.next(this.boardsCount);
        }
    ));
  }

  getBoards(id: number, position: number) {
    return this.http.get<Array<Board>>(`/board/${id}/${position}`).pipe(tap(
        res => {
            this.boards = res;
            this.boardsSubject$.next(this.boards);
        }
    ));
  }

  getCountBoards(id: number) {
    return this.http.get<number>(`/board/count/${id}`).pipe(tap(
        res => {
            this.boardsCount = res;
            this.boardsCountSubject$.next(this.boardsCount);
        }
    ));
  }

  updateBoard(board: Board) {
    return this.http.put<Array<Board>>(`/board`, board).pipe(tap(
        res => {
            this.boards = res;
            this.boardsSubject$.next(this.boards);
        }
    ));
  }

  removeBoard(id: number) {
    return this.http.delete<Array<Board>>(`/board/${id}`).pipe(tap(
        res => {
            this.boards = res;
            this.boardsSubject$.next(this.boards);
            this.boardsCount--;
            this.boardsCountSubject$.next(this.boardsCount);
        }
    ));
  }

  get asObservable(): Observable<Array<Board>> {
    return this.boardsSubject$;
  }

  get asObservableCount(): Observable<number> {
    return this.boardsCountSubject$;
  }
}