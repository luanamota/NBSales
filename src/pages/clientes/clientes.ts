import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage() // Declarando este injector, é esperado um módulo (<page>.module.ts)
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

     }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ClientesPage');
  // }

  // newCliente(){
  //   this.navCtrl.push('AdicionarClientePage');
  // }

  // editCliente(cliente: any){
  //   this.navCtrl.push('AlterarClientePage', { cliente: cliente });
  // }

  // removeCliente(key: string){
  //     this.provider.remove(key)
  //     .then(() => {
  //       this.toast.create({ message: 'Cliente removido com sucesso!', duration: 3000 }).present();
  //     })
  //     .catch(() => {
  //       this.toast.create({ message: 'Erro ao remover cliente!', duration: 3000 }).present();
  //     })
  // }
}
