import { Component, OnInit } from '@angular/core';
import { LoginAndRegistrationService } from 'src/app/services/login-and-registration.service';


@Component({
  selector: 'app-login-and-registration',
  templateUrl: './login-and-registration.component.html',
  styleUrls: ['./login-and-registration.component.css']
})
export class LoginAndRegistrationComponent implements OnInit {

  constructor(private loginRegisterService: LoginAndRegistrationService) {

  }

  ngOnInit() {

    this.loginRegisterService.checkLogin().subscribe(data => {
      
      if (data.status == "ok") {

        this.loginRegisterService.userEm.emit(data);

      }

    });

   

  }

}
