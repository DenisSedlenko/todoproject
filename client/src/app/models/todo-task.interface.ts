import { Board } from './board.interface';

export interface Todo {
  todoId: number;
  title: string;
  description: string;
  dateCompleted: string;
  isCompleted: boolean;
  boardId: number;
  board: Board;
}