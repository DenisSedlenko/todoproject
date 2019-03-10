import { Component, OnInit, Input } from '@angular/core';
import { TodoTask } from 'src/app/models/todo-task.interface';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent implements OnInit {

  @Input() todoCard: TodoTask;
  constructor() { }

  ngOnInit() {
  }

}
