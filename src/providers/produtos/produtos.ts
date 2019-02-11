import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutosProvider {

  constructor(public http: HttpClient) {
    
  }

  pegarProdutos(){
    return this.http.get('../../assets/data/produtos.json')
  }

}
