import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/service/user-management.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list-component',
  templateUrl: './users-list-component.component.html',
  styleUrls: ['./users-list-component.component.scss']
})
export class UsersListComponentComponent implements OnInit {
  userList: any = {
    results: new Array<any>()
  }
  users$: Observable<any>;
  errorMessage: any;

  constructor(private userServices: UserManagementService) { }

  ngOnInit() {
    this.userServices.getList()
    .subscribe((userList: any) => {
      console.log(userList);
      this.userList = userList;
    });
  }

}
