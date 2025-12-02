import { UserService } from '@/core/services/user.service';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <h1>Dashboard</h1>
    <p>Xin chào, bạn đã login thành công!</p>
  `,
})
export class DashboardComponent {
  constructor(private userService: UserService) {
    this.userService.getAdminProfile().subscribe((res: any) => {
      console.log(res);
    });
  }
}
