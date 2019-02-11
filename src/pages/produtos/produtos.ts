import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  produtos: any;
  termo: string = '';
  constructor(private toastCtrl: ToastController, private global: GlobalProvider, private produtosProvider: ProdutosProvider, public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    this.pegaProdutos();
  }

  adicionaAoPedido(produto){
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' })

    this.global.produtos.push(produto);

    toast.setMessage('Produto adicionado com sucesso!').present();
  }

  pegaProdutos() {
    this.produtos = [];

    this.produtosProvider.pegarProdutos()
      .subscribe((data) => {
        this.produtos = data;
      })
  }

  exibeFiltrados(){
    this.produtos = this.filtrar();
  }

  filtrar() {
    if(this.termo.length > 0){
      return this.produtos.filter((item) => {
        return item.Descricao.toLowerCase().indexOf(this.termo.toLowerCase()) > -1;
      });
    }
    else{
      this.pegaProdutos();
    }
  }

}
