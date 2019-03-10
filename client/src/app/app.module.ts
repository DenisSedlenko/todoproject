import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { PrimengModule } from './primeng.module'

import { AppComponent } from './components/app-shell/app.component';
import { HeaderComponent } from './components/header/header.component';
import { BoardComponent } from './components/board/board.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { TodoTaskComponent } from './components/todo-task/todo-task.component';
import { NewTodoTaskComponent } from './components/new-todo-task/new-todo-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    BoardListComponent,
    TodoTaskComponent,
    NewTodoTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
