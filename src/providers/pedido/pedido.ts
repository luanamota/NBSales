import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the PedidoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PedidoProvider {
  constructor(public http: HttpClient) {}
  pegaClientes() {
    return this.http.get("../../assets/data/pedidos.json");
  }
}
