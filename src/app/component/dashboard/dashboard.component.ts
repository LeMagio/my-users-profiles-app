import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UserManagementService } from 'src/app/service/user-management.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  userList: any = {
    results: new Array<any>()
  };

  constructor(private breakpointObserver: BreakpointObserver,
              private userServices: UserManagementService) {}

  ngOnInit() {
    this.userServices.getList()
      .subscribe((userList: any) => {
        const info = userList.info;
        this.breakpointObserver.observe(Breakpoints.Handset).pipe(
          map(({ matches }) => {
            if (matches) {
              return userList.results.map((user: any) => {
                return {
                  ...user,
                  cols: 4,
                  rows: 1
                };
              });
            }
            return userList.results.map((user: any) => {
              return {
                ...user,
                cols: 1,
                rows: 1
              };
            });
          })
        ).subscribe((list) => {
          this.userList = { info, results: list };
        });
        // this.userList = userList;
      });
  }
}
