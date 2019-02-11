import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the TransferirGrupoClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transferir-grupo-cliente',
  templateUrl: 'transferir-grupo-cliente.html',
})
export class TransferirGrupoClientePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferirGrupoClientePage');
  }
  
  alterarGrupoCliente() {
    let alerta = this.alertCtrl.create({
      title: 'Confirmar alterações',
      subTitle: 'Confirma as alterações efetuadas?',
      buttons: [{
        text: 'Ok'
      }]
    });
    alerta.present();
  }

}
