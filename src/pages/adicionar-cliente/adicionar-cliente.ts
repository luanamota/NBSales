import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
} from "ionic-angular";
import { CONST_CLIENTE } from './adicionar-cliente.constants';
import { ClienteModel } from '../../app/models/cliente/cliente.model';
import { SharedProvider } from '../../providers/shared/shared';
import { classToPlain } from 'class-transformer';

@IonicPage()
@Component({
  selector: "page-adicionar-cliente",
  templateUrl: "adicionar-cliente.html"
})
export class AdicionarClientePage implements OnInit {

  CONST_CLIENTE = CONST_CLIENTE
  cliente = new ClienteModel();
  isNew = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: SharedProvider,
    private toastCtrl: ToastController
  ) {
  }

  ngOnInit() {
    this.isNew = this.navParams.get('isNew') as boolean;
    this.cliente = this.navParams.get('cliente') as ClienteModel;
  }
  //Adicionar cliente
  salvarCliente() {

    const clienteFire = classToPlain(this.cliente);

    if (this.isNew) {
      this.addCliente(clienteFire)
    } else {
      this.updateCliente(clienteFire)
    }

  }

  addCliente(clienteFire) {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' })
    this.service.dbFire.collection('clientes').add(clienteFire)
    .then(data => {
      console.log(data);
      this.navCtrl.pop();
      toast.setMessage('Cliente adicionado com sucesso!').present();
    })
    .catch(err => {
      console.log(err);
    });
  }

  updateCliente(clienteFire) {
    this.service.dbFire.doc(`clientes/${clienteFire.customerId}`).set(clienteFire)
    .then(data => {
      console.log(data);
      this.navCtrl.pop();
    })
    .catch(err => {
      console.log(err);
    });
  }



  ionViewDidLoad() {
    // console.log("ionViewDidLoad AdicionarClientePage");
  }

  newCliente() {
    this.navCtrl.push("AdicionarClientePage");
  }

}
