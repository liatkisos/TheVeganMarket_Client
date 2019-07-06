import { Component, OnInit } from '@angular/core';
import { LoginAndRegistrationService } from 'src/app/services/login-and-registration.service';

@Component({
  selector: 'app-store-information',
  templateUrl: './store-information.component.html',
  styleUrls: ['./store-information.component.css']
})
export class StoreInformationComponent implements OnInit {

  totalOrders: number;
  totalProducts: number;
  isConnected: boolean = false;
  isConnectedFirstTime: boolean = false;
  isConnectedWithOpenCart: boolean = false;
  CartDate: string;
  totalPrice: number;
  lastPurchaseDate: string;

  constructor(private loginRegisterService: LoginAndRegistrationService) {

  }

  ngOnInit() {

    this.loginRegisterService.userEm.subscribe(data => {
      
      if (!data.userCart.isOpen && !data.lastOrder) {

        this.isConnectedFirstTime = true;
        this.isConnected = false;
        this.isConnectedWithOpenCart = false;

      }
      else {

        if (data.userCart.isOpen) {

          this.isConnected = false;
          this.isConnectedFirstTime = false;
          this.isConnectedWithOpenCart = true;
          this.CartDate = data.userCart.date;
          this.totalPrice = data.userCart.totalPrice.toFixed(2);

        }
        else {
          //console.log(data.lastOrder);
          if (data.lastOrder) {

            this.isConnected = true;
            this.isConnectedFirstTime = false;
            this.isConnectedWithOpenCart = false;
           // console.log(data);
            this.lastPurchaseDate = data.lastOrder;

          }
          else {

            this.isConnectedFirstTime = true;
            this.isConnected = false;
            this.isConnectedWithOpenCart = false;

          }

        }

      }

    });

    this.loginRegisterService.getProduct().subscribe(data => {

      this.totalProducts = data;

    });

    this.loginRegisterService.getOrders().subscribe(data => {

      this.totalOrders = data;

    });

  }

}
