import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import { ProdutoModel } from '../../app/models/produto/produto.model';

@IonicPage()
@Component({
  selector: 'page-aplicacao-produto',
  templateUrl: 'aplicacao-produto.html',
})
export class AplicacaoProdutoPage {

  produto = new ProdutoModel;

  constructor(private service: SharedProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.produto = this.navParams.get('produto') as ProdutoModel;
  }

}
