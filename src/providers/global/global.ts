import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class GlobalProvider {
pedido:Object = {};
produtos = [];
  constructor(public http: HttpClient) {
  
  }

}
