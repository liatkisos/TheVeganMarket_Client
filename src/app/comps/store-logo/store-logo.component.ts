import { Component, OnInit } from '@angular/core';
import { LoginAndRegistrationService } from 'src/app/services/login-and-registration.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-store-logo',
  templateUrl: './store-logo.component.html',
  styleUrls: ['./store-logo.component.css']
})
export class StoreLogo implements OnInit {

  clientfirstName: string = "guest";
  clientLastName: string = "";
  isConnected: boolean = false;
  isAdmin: boolean = false;

  constructor(private loginRegisterService: LoginAndRegistrationService, private router: Router) {

  }

  ngOnInit() {

    this.loginRegisterService.userEm.subscribe(data => {

      this.clientfirstName = data.user.firstName;
      this.clientLastName = data.user.lastName;
      this.isConnected = true;

      if (data.user.role == "admin") {
        this.isAdmin = true;
      }

    });

    this.loginRegisterService.checkLogin().subscribe(data => {

      if (data.status == "ok") {

        this.clientfirstName = data.user.firstName;
        this.clientLastName = data.user.lastName;
        this.isConnected = true;

        if (data.user.role == "admin") {
          this.isAdmin = true;
        }

      }

    });

  }

  logout() {

    this.loginRegisterService.logout().subscribe(data => {

      this.clientfirstName = "guest";
      this.clientLastName = "";
      this.isConnected = false;
      this.isAdmin = false;

      this.router.navigate(["/logout"]);

    });

  }

}
