import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
}
