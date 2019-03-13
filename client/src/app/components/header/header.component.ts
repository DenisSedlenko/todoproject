import { Component, OnInit, OnDestroy } from '@angular/core';
import { Board } from 'src/app/models/board.interface';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isEditingBoardForm: boolean = false;
  typeModificationBoard: string = 'Create';
  items: MenuItem[];
  user: User;
  isLoading: boolean = false;

  userSubscription: Subscription;
  
  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private boardService: BoardService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.userService.asObservable.subscribe(user => this.user = user);
    this.items = [{ label: 'Logout', icon: 'pi pi-power-off', command: (event) => {
      if (this.authService.isLoggedIn) {
        this.authService.logout();
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(["login"])); 
      }
    }}];
  }

  onCloseEditBoardForm() {
    this.isEditingBoardForm = false;
  }

  onSaveBoard(board: Board) {
    this.isEditingBoardForm = false;
    board.userId = this.user.userId;
    this.isLoading = true;
    this.boardService.createBoard(board).subscribe(
      _ => this.isLoading = false,
      _ => this.isLoading = false
    );
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
