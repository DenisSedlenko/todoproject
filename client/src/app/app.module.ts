import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { PrimengModule } from './primeng.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { AppComponent } from './components/app-shell/app.component';
import { HeaderComponent } from './components/header/header.component';
import { BoardComponent } from './components/board/board.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { TodoTaskComponent } from './components/todo-task/todo-task.component';
import { NewTodoTaskComponent } from './components/new-todo-task/new-todo-task.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { HttpUrlInterceptor } from './interceptors/http-url.interceptor';
import { UserService } from './services/user.service';
import { BoardService } from './services/board.service';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    BoardListComponent,
    TodoTaskComponent,
    NewTodoTaskComponent,
    LoginComponent,
    HomeComponent,
    LoadingComponent,
    NewBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpUrlInterceptor, multi: true },
    UserService,
    BoardService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
