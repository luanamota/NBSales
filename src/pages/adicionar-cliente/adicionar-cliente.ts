import { AngularFireDatabase } from "angularfire2/database";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
} from "ionic-angular";
import * as firebase from "firebase";

import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

@IonicPage()
@Component({
  selector: "page-adicionar-cliente",
  templateUrl: "adicionar-cliente.html"
})
export class AdicionarClientePage {
  clientes = [];
  ref = firebase.database().ref("clientes/");
  nome: string = "";
  telefone: string= "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase
  ) {

    this.getAllClientes();
  }

  //Adicionar cliente
  addCliente(cli) {
    console.log('addCliente Cliente: ', cli)
    this.db.list('clientes').push(cli)
      .then((result: any) => {
        console.log('addCliente ADD: ', result);
      })
  }

  ionViewDidLoad() {
    // console.log("ionViewDidLoad AdicionarClientePage");
  }

  newCliente() {
    this.navCtrl.push("AdicionarClientePage");
  }

  // Função para buscar os clientes
  public get(): Observable<any>{
    return this.db.list('clientes').valueChanges();
  }

  getAllClientes() {
    return this.db.list('clientes')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return this.clientes = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
  // cadastroCliente(){
  //   this.db.database.ref('/CUSTOMERS').push(this.createForm)
  // }
  // private setupPageTitle() {
  //   this.title = this.navParams.data.cliente
  //     ? "Alterando cliente"
  //     : "Novo cliente";
  // }

  // createForm() {
  //   this.form = this.FormBuilder.group({
  //     key: [this.cliente.key],
  //     name: [this.cliente.name, Validators.required],
  //     phone: [this.cliente.phone, Validators.required]
  //   });
  // }

  // onSubmit() {
  //   if (this.form.valid) {
  //     this.provider
  //       .save(this.form.value)
  //       .then(() => {
  //         this.cliente.toast
  //           .create({ message: "Cliente salvo com sucesso!", duration: 3000 })
  //           .present();
  //         this.navCtrl.pop();
  //       })
  //       .catch(e => {
  //         this.cliente.toast
  //           .create({ message: "Cliente salvo com sucesso!", duration: 3000 })
  //           .present();
  //         console.error(e);
  //       });
  //   }
  // }
}
