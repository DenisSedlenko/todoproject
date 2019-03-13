import { Component, OnInit, OnDestroy } from '@angular/core';
import { Board } from 'src/app/models/board.interface';
import { Subscription } from 'rxjs';
import { BoardService } from 'src/app/services/board.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit, OnDestroy {

  user: User;
  boardList: Array<Board> = new Array<Board>();
  helpedBoardList: Array<Board> = new Array<Board>();
  isLoading: boolean = false;
  countBoards: number = 0;

  boardsSubscription: Subscription;
  boardsCountSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private boardService: BoardService,
    private userService: UserService) { }

  ngOnInit() { 
    this.isLoading = true;

    this.userSubscription = this.userService.asObservable.subscribe(user => {
      if (user) { 
        this.user = user;   
        this.boardsCountSubscription = this.boardService.getCountBoards(user.userId).subscribe(
          data => { this.countBoards = data; this.isLoading = false; },
          _ => this.isLoading = false
        );
        this.boardsSubscription = this.boardService.getBoards(user.userId, 0).subscribe(
          data => { 
            this.boardList = data; 
            this.isLoading = false; 
          },
          _ => this.isLoading = false
        );
      }},
      _ => this.isLoading = false);  

    this.boardsSubscription = this.boardService.asObservable.subscribe(data => {
      this.boardList = data;
    });
    this.boardsCountSubscription = this.boardService.asObservableCount.subscribe(data => this.countBoards = data);

    this.isLoading = false;
  }

  paginate($event) {
    this.isLoading = true;
    this.boardsSubscription = this.boardService.getBoards(this.user.userId, $event.page*$event.rows).subscribe(
      data => { 
        this.boardList = data; 
        this.isLoading = false; 
      },
      _ => this.isLoading = false
    );
  }

  ngOnDestroy() {
    if (this.boardsSubscription) {
      this.boardsSubscription.unsubscribe();
    }
    if (this.boardsCountSubscription) {
      this.boardsCountSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
