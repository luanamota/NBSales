import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";
import { GlobalProvider } from "../../providers/global/global";
import { ClienteProvider } from "../../providers/cliente/cliente";

/**
 * Generated class for the AlterarCreditoClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-alterar-credito-cliente",
  templateUrl: "alterar-credito-cliente.html"
})
export class AlterarCreditoClientePage {
  produtos = [];
  fakeClientes: any;
  clientes: any;
  termo: string = "";
  cliente: any;

  constructor(
    private clienteProvider: ClienteProvider,
    private global: GlobalProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {}


  ionViewDidLoad() {
    this.produtos = this.global.produtos;

    this.pegaClientes();
  }

  selecionaCliente(cliente) {
    this.termo = "";

    this.clientes = [];

    this.cliente = cliente;
  }

  pegaClientes() {
    this.clienteProvider.pegaClientes().subscribe(data => {
      this.fakeClientes = data;
    });
  }

  exibeFiltrados() {
    this.clientes = this.filtrar();
  }

  filtrar() {
    if (this.termo.length > 0) {
      return this.fakeClientes.filter(item => {
        return item.nome.toLowerCase().indexOf(this.termo.toLowerCase()) > -1;
      });
    } else {
      this.pegaClientes();
    }
  }

  removeProduto(produto) {
    let index = this.produtos.indexOf(produto);
    this.global.produtos.splice(index, 1);

    this.produtos = [];
    this.produtos = this.global.produtos;
  }

  alterarCredito() {
    let alert = this.alertCtrl.create({
      title: 'Confirmar alterações',
      subTitle: 'Confirma as alterações efetuadas?',
      buttons: [{
        text: 'Ok'
      }]
    });
    alert.present();
  }
}
