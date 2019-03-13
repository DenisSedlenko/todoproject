import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Board } from 'src/app/models/board.interface';
import { MenuItem } from 'primeng/api';
import { Todo } from 'src/app/models/todo-task.interface';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { BoardService } from 'src/app/services/board.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  @Input() board: Board;
  items: Array<MenuItem>;
  isLoading: boolean = false;
  todoTasks: Array<Todo> = new Array<Todo>();
  isEditingTodoForm: boolean = false;
  isEditingBoardForm: boolean = false;
  typeModificationTodo: string = 'Create';
  typeModificationBoard: string = 'Edit';

  boardsSubscription: Subscription;
  todosSubscription: Subscription;

  constructor(
    private boardService: BoardService,
    private todoService: TodoService) { }

  ngOnInit() {
    this.isLoading = true;
    this.todosSubscription = this.todoService.getTodo(this.board.boardId).subscribe(
      _ => this.isLoading = false,
      _ => this.isLoading = false
    );
    this.todosSubscription = this.todoService.asObservable
      .subscribe(data => this.todoTasks = data);

    this.items = [
      { label: 'New task', icon: 'pi pi-fw pi-plus',  command: (event) => {
        this.isEditingTodoForm = true;
      }},
      { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: (event) => {
        this.isEditingBoardForm = true;
      }},
      { label: 'Close', icon: 'pi pi-fw pi-times', command: (event) => {
        this.isLoading = true;
        this.boardsSubscription = this.boardService.removeBoard(this.board.boardId).subscribe(
          _ => this.isLoading = false,
          _ => this.isLoading = false
        );
      }}
    ];
  }

  onCloseEditTodoForm() {
    this.isEditingTodoForm = false;
  }

  onCloseEditBoardForm() {
    this.isEditingBoardForm = false;
  }

  onSaveTodo(todo: Todo) {
    this.isEditingTodoForm = false;
    todo.boardId = this.board.boardId;
    this.isLoading = true;
    this.todosSubscription = this.todoService.createTodo(todo).subscribe(
      _ => this.isLoading = false,
      _ => this.isLoading = false
    );
  }

  onSaveBoard(board: Board) {
    this.isEditingBoardForm = false;
    this.board.title = board.title;
    this.isLoading = true;
    this.boardsSubscription = this.boardService.updateBoard(this.board).subscribe(
      _ => this.isLoading = false,
      _ => this.isLoading = false
    );
  }

  ngOnDestroy() {
    if (this.boardsSubscription) {
      this.boardsSubscription.unsubscribe();
    }
    if (this.todosSubscription) {
      this.todosSubscription.unsubscribe();
    }
  }
}
