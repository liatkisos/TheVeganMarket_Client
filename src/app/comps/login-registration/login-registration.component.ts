import { Component, OnInit } from '@angular/core';
import { LoginAndRegistrationService } from 'src/app/services/login-and-registration.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {

  isConnected: boolean = false;
  isDisconnected: boolean = true;
  btnText: string = "Start shopping";
  userRole: boolean = false;
  username: string;
  password: number;
  msg: string;
  btnNotLoad: boolean = true;

  constructor(private loginRegisterService: LoginAndRegistrationService, private router: Router) {

  }

  ngOnInit() {

    this.loginRegisterService.userEm.subscribe(data => {

      this.isConnected = true;
      this.isDisconnected = false;

      if (data.user.role == "user") {

        if (data.userCart.isOpen) {
          this.btnText = "Continue shopping";
        }

      }
      else {

        this.router.navigate(["admin_home"]);

      }

    });

  }

  login() {

    this.btnNotLoad = false;

    if (!this.username || !this.password) {

      this.btnNotLoad = true;

      this.msg = "Please fill all inputs fields";

    }
    else {

      let ObjToSend: object = {
        username: this.username,
        password: this.password
      }

      this.loginRegisterService.login(ObjToSend).subscribe(data => {

        if (data.status == "error") {

          this.btnNotLoad = true;

          this.msg = data.msg;

        }
        else {
          
          this.btnNotLoad = true;
          this.isConnected = true;
          this.isDisconnected = false;
          this.loginRegisterService.userEm.emit(data);

          if (data.user.role == "user") {

            if (data.userCart.isOpen) {
              this.btnText = "Continue shopping";
            }

            this.router.navigate(["/login"]);

          }
          else {

            this.router.navigate(["admin_home"]);

          }

        }

      });

    }

  }

  goToMarket() {

    this.router.navigate(["shop"]);

  }

}


