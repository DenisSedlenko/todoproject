import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTodoTaskComponent } from './new-todo-task.component';

describe('NewTodoTaskComponent', () => {
  let component: NewTodoTaskComponent;
  let fixture: ComponentFixture<NewTodoTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTodoTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTodoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
