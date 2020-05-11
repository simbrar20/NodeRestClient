import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { NullTemplateVisitor } from '@angular/compiler';

export interface IBike {
  id?: number;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<IBike> = [];
  myName = '';
  Car = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
    await this.refresh();
  }

  async refresh() {
    this.Car = await this.getAllCars('Car');
  }

  async getAllCars(path: string) {
    const resp = await this.http.get(path);
  
    return resp;
  }

  async createCar() {
    const car = {
      make: null,
      model: null,
      year: null
    };
    const resp = await this.http.post('Car', car);
  
    if (resp) {
      // this.refresh();
      this.Car.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Car create failed!');
    }
    return resp;
  }

  async updateCar(car: any) {
    const resp = await this.http.put(`Car/id/${car.id}`, car);
    if (resp) {
      this.toastService.showToast('sucess', 3000, 'Car updated successfully!');
    }
    return resp;
  }
  removeCar(car: any, index: number) {
    this.Car.splice(index, 1);
  }

}
