import { Todo } from './todo-task.interface';
import { User } from './user.interface';

export interface Board {
  boardId: number;
  title: string;
  todos: Array<Todo>
  userId: number;
  user: User;
}