import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';
import { ClienteModel } from '../../app/models/cliente/cliente.model';
import { SharedProvider } from '../../providers/shared/shared';
import { tap } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-consultar-cliente',
  templateUrl: 'consultar-cliente.html',
})

export class ConsultarClientePage implements OnInit {

  clientes: ClienteModel[];
  filteredClientes: ClienteModel[];
  termo: string = null;
  // alertCtrl: any;

  constructor(
    private service: SharedProvider,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewWillEnter() {
    this.pegaClientes();
  }

  ngOnInit() {

  }

  pegaClientes() {
    console.log('pegaClientes');

    this.service.dbFire.collection('clientes', ref => {
      return ref.orderBy('name')
    }).snapshotChanges()
      .pipe(
        tap(snapshot => {
          this.clientes = [];
          snapshot.map(result => {
            const cliente = result.payload.doc.data() as ClienteModel;
            cliente.customerId = result.payload.doc.id;

            this.clientes = [...this.clientes, cliente];
          });

          this.filteredClientes = this.clientes;
        })
      )
      .subscribe();
  }

  detailClient(cliente) {
    console.log(cliente);
    this.navCtrl.push('DetalheClientePage', { cliente });
  }


  exibeFiltrados() {
    this.filteredClientes = this.filtrar();
  }

  filtrar() {

    if (this.termo.length > 0) {
      return this.clientes.filter((item) => {
        return item.name.toLowerCase().indexOf(this.termo.toLowerCase()) > -1 || item.vatNumber.toLowerCase().indexOf(this.termo.toLowerCase()) > -1;
      });
    }
    else {
      return this.clientes;
    }

  }

  delete(event, cliente: ClienteModel) {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' })
    event.stopPropagation();
    this.service.dbFire.doc(`clientes/${cliente.customerId}`)
      .delete()
      .then(() => {
        console.log('cliente deletado');
        toast.setMessage('Cliente deletado com sucesso!').present();
      })
      .catch(err => {
        console.log(err);
      })
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
                toast.setMessage('Cliente excluído com sucesso!').present();
              })
          }
        }
      ]
    });
    confirm.present();
  }

  addCliente() {
    this.navCtrl.push('AdicionarClientePage', {cliente: new ClienteModel, isNew: true});
  }


}
