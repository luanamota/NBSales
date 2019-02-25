import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClienteProvider {

  constructor(private http: HttpClient) { }

  pegaClientes(){
    return this.http.get('../../assets/data/clientes.json')
  }
}
