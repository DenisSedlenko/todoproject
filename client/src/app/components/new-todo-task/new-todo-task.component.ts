import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo-task.interface';

@Component({
  selector: 'app-new-todo-task',
  templateUrl: './new-todo-task.component.html',
  styleUrls: ['./new-todo-task.component.css']
})
export class NewTodoTaskComponent implements OnInit {
  
  @Input() typeModification: string;
  @Input() todo: Todo;
  @Output() onCloseEvent = new EventEmitter();
  @Output() onSave = new EventEmitter<Todo>();

  newTodoForm: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newTodoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateCompleted: ['']
    });
  }

  get controls() { return this.newTodoForm.controls; }

  onClose() {
    this.onCloseEvent.emit();
  }

  onSubmit(value: Todo) {
    this.submitted = true;

    if (this.newTodoForm.invalid) {
        return;
    }

    this.onSave.emit(value);
  }
}
