import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ClienteModel } from '../../app/models/cliente/cliente.model';
import { SharedProvider } from '../../providers/shared/shared';

@IonicPage()
@Component({
  selector: 'page-detalhe-cliente',
  templateUrl: 'detalhe-cliente.html',
})
export class DetalheClientePage {

  cliente = new ClienteModel;

  constructor(private service: SharedProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.cliente = this.navParams.get('cliente') as ClienteModel;
  }

  editCliente() {
    this.navCtrl.push('AdicionarClientePage', { cliente: this.cliente, isNew: false });
  }

  showConfirm(event, cliente: ClienteModel) {
    const confirm = this.alertCtrl.create({
      title: 'Excluir',
      message: 'Deseja excluir o cliente?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' })
            event.stopPropagation();
            this.service.dbFire.doc(`clientes/${cliente.customerId}`)
              .delete()
              .then(() => {
                console.log('cliente deletado');
                this.navCtrl.pop();
                toast.setMessage('Cliente excluído com sucesso!').present();
              })
          }
        }
      ]
    });
    confirm.present();
  }


}
