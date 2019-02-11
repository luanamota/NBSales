import { PedidoProvider } from './../../providers/pedido/pedido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-consultar-pedido',
  templateUrl: 'consultar-pedido.html',
})
export class ConsultarPedidoPage {
  fakeClientes:any;
  clientes:any;
  termo:string = '';
  cliente:any;
    constructor(private pedidoProvider: PedidoProvider, public navCtrl: NavController, public navParams: NavParams) {
    }

  ionViewDidLoad() {
    this.pegaClientes();
  }

  selecionaCliente(cliente){
    this.termo = '';

    this.clientes = [];

    this.cliente = cliente;
  }

  pegaClientes(){
    this.pedidoProvider.pegaClientes()
      .subscribe((data)=>{
        this.fakeClientes = data;
      })
  }

  exibeFiltrados(){
    this.clientes = this.filtrar();
  }

  filtrar() {
    if(this.termo.length > 0){
      return this.fakeClientes.filter((item) => {
        return item.nome.toLowerCase().indexOf(this.termo.toLowerCase()) > -1;
      });
    }
    else{
      this.pegaClientes();
    }
  }

}
