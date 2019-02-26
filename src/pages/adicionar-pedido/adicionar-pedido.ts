import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SharedProvider } from "../../providers/shared/shared";
import { ClienteModel } from "../../app/models/cliente/cliente.model";
import { tap } from "rxjs/operators";

@IonicPage()
@Component({
  selector: "page-adicionar-pedido",
  templateUrl: "adicionar-pedido.html"
})
export class AdicionarPedidoPage {
  produtos = [];
  // fakeClientes:any;
  // clientes:any;
  // termo:string = '';
  //cliente: any;
  clientes: ClienteModel[];
  filteredClientes: ClienteModel[];
  termo: string = null;
  data: any;
  calc: any = 0;
  calc_sum: any;
  today : number = new  Date().getTime();
  constructor(
    private service: SharedProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  pegaClientes() {
    console.log("pegaClientes");

    this.service.dbFire
      .collection("clientes", ref => {
        return ref.orderBy("name");
      })
      .snapshotChanges()
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

  ionViewDidLoad() {
    this.pegaClientes();
    this.data = JSON.parse(localStorage.getItem("Cart"));
    for (let i = 0; i < this.data.length; i++) {
      this.calc +=
        parseFloat(this.data[i]["valor"]) * parseInt(this.data[i]["quant"]);
    }
   // console.log(this.calc);
    //  this.calc_sum =  this.calc;
  }

  selecionaCliente(cliente) {
    this.termo = "";

    this.clientes = [];

    this.filteredClientes = cliente;
  }

  // pegaClientes(){
  //   this.clienteProvider.pegaClientes()
  //     .subscribe((data)=>{
  //       this.fakeClientes = data;
  //     })
  // }

  // exibeFiltrados(){
  //   this.clientes = this.filtrar();
  // }

  // filtrar() {
  //   if(this.termo.length > 0){
  //     return this.fakeClientes.filter((item) => {
  //       return item.nome.toLowerCase().indexOf(this.termo.toLowerCase()) > -1;
  //     });
  //   }
  //   else{
  //     this.pegaClientes();
  //   }
  // }

  exibeFiltrados() {
    this.filteredClientes = this.filtrar();
  }

  filtrar() {
    if (this.termo.length > 0) {
      return this.clientes.filter(item => {
        return (
          item.name.toLowerCase().indexOf(this.termo.toLowerCase()) > -1 ||
          item.vatNumber.toLowerCase().indexOf(this.termo.toLowerCase()) > -1
        );
      });
    } else {
      return this.clientes;
    }
  }

  removeProduto(i, valor_total) {
    // let index = this.produtos.indexOf(produto);
    //this.data.splice(index, 1);

    let remove = JSON.parse(localStorage.getItem("Cart"));
    remove.splice(i, 1);
    localStorage.setItem("Cart", JSON.stringify(remove));
    //location.reload();

    this.calc = this.calc - valor_total;
  //  this.ionViewDidLoad();
  this.data = JSON.parse(localStorage.getItem("Cart"));
console.log(this.calc);

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
