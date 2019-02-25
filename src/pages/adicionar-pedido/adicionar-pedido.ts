import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ClienteProvider } from '../../providers/cliente/cliente';

@IonicPage()
@Component({
  selector: 'page-adicionar-pedido',
  templateUrl: 'adicionar-pedido.html',
})
export class AdicionarPedidoPage {
produtos = [];
fakeClientes:any;
clientes:any;
termo:string = '';
cliente:any;
data: any;
calc: any = 0;
calc_sum: any;

constructor(private clienteProvider: ClienteProvider, private global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.produtos = this.global.produtos;

    this.pegaClientes();
    this.data = JSON.parse(localStorage.getItem('Cart'));
  // console.log(this.data[0]['valor'], "testezinho");

    for(let i=0; i < this.data.length; i++){

     this.calc += parseFloat(this.data[i]['valor']) * parseInt(this.data[i]['quant']);

     
    }
    console.log(this.calc);
  //  this.calc_sum =  this.calc;
    
  }

  selecionaCliente(cliente){
    this.termo = '';

    this.clientes = [];

    this.cliente = cliente;
  }

  pegaClientes(){
    this.clienteProvider.pegaClientes()
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

  removeProduto(i,item){
   // let index = this.produtos.indexOf(produto);
    //this.data.splice(index, 1);
   console.log(i);
   let test = JSON.parse(localStorage.getItem('Cart'));
   test.splice(i,1);
   localStorage.setItem('Cart', JSON.stringify(test)); 
   this.ionViewDidLoad();
    // this.produtos = [];
    // this.produtos = this.global.produtos;
/*
 .then((res) => {
     if (res) {
       let cart = res;
       let index = i;
        cart.splice(index, 1);
       // Update cart on storage
       localStorage.setItem('Cart', cart)
     }
   })

 localStorage.getItem('Cart')
    .then((res) => {
      if (res) {
        let cart = res;
        let index = i;
         cart.splice(index, 1);
        // Update cart on storage
        localStorage.setItem('Cart', cart)
      }
    })

     let carrinho =  JSON.parse(localStorage.getItem('Cart'));
     carrinho = carrinho.filter(function(e){
       return e.name != produto
     }); 
   localStorage.setItem('Cart', JSON.stringify(carrinho));*/
   }

  
} 
