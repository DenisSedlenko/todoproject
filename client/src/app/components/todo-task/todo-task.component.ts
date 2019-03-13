import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Todo } from 'src/app/models/todo-task.interface';
import { MenuItem } from 'primeng/api';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent implements OnInit, OnDestroy {

  @Input() todo: Todo;

  items: Array<MenuItem>;
  isLoading: boolean = false;
  isEditingForm: boolean = false;
  typeModification: string = 'Edit';

  todoSubscription: Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.isLoading = true;
    this.items = [
      { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: (event) => {
        this.isEditingForm = true;
      }},
      { label: 'Close', icon: 'pi pi-fw pi-times', command: (event) => {
        this.todoSubscription = this.todoService.removeTodo(this.todo.boardId).subscribe(
          _ => this.isLoading = false,
          _ => this.isLoading = false
        );
      } }
    ];
  }

  onCloseEditForm() {
    this.isEditingForm = false;
  }

  onClickCompleted() {
    this.isLoading = true;
    this.todo.isCompleted = !this.todo.isCompleted;
    this.todoSubscription = this.todoService.updateTodo(this.todo).subscribe(
      _ => this.isLoading = false,
      _ => this.isLoading = false
    )
  }

  onSave(todo: Todo) {
    this.isLoading = true;
    this.isEditingForm = false;
    this.todo = Object.assign({}, this.todo, todo);
    this.todoSubscription = this.todoService.updateTodo(this.todo).subscribe(
      _ => this.isLoading = false,
      _ => this.isLoading = false
    );
  }

  ngOnDestroy() {
    if (this.todoSubscription) {
      this.todoSubscription.unsubscribe();
    }
  }
}
