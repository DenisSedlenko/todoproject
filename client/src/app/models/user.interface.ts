import { Board } from './board.interface';

export interface User {
    userId: number;
    email: string;
    boards: Array<Board>
}