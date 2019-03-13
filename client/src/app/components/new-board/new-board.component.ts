import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.css']
})
export class NewBoardComponent implements OnInit {

  @Input() title: string;
  @Input() typeModification: string;
  @Output() onCloseEvent = new EventEmitter();
  @Output() onSave = new EventEmitter<Board>();

  newBoardForm: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newBoardForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  get controls() { return this.newBoardForm.controls; }

  onClose() {
    this.onCloseEvent.emit();
  }

  onSubmit(value: Board) {
    this.submitted = true;

    if (this.newBoardForm.invalid) {
        return;
    }

    this.onSave.emit(value);
  }

}
