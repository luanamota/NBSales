import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController , AlertController} from 'ionic-angular';
//import { ProdutosProvider } from '../../providers/produtos/produtos';
// import { GlobalProvider } from '../../providers/global/global';
import { SharedProvider } from '../../providers/shared/shared';
import { ProdutoModel } from '../../app/models/produto/produto.model';
import { tap } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage  implements OnInit {
  produtos: ProdutoModel[];
  filteredProdutos: ProdutoModel[];
  termo: string = null;

  _cart = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  sectionObj: any;

  constructor(
    private service: SharedProvider,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController

  ){
  }

  ionViewWillEnter() {
    this.pegaProdutos();
  }

  ngOnInit() {

  }

  pegaProdutos(){
    console.log('pegaProdutos');

   this.service.dbFire.collection('produtos', ref => {
     return ref.orderBy('name')
   }).snapshotChanges()
   .pipe(
     tap(snapshot => {
       this.produtos = [];
       snapshot.map(result => {
          const produto = result.payload.doc.data() as ProdutoModel;
          produto.IdFirebase = result.payload.doc.id;

          this.produtos = [...this.produtos, produto];
       });

       this.filteredProdutos = this.produtos;
     })
   )
   .subscribe();
  }

  detailProduct(produto) {
    console.log(produto);
    this.navCtrl.push('DetalheProdutoPage', {produto});
  }


  exibeFiltrados(){
   this.filteredProdutos = this.filtrar();
  }

  filtrar() {

    if(this.termo.length > 0){
      return this.produtos.filter((item) => {
        return item.name.toLowerCase().indexOf(this.termo.toLowerCase()) > -1 || item.store.toLowerCase().indexOf(this.termo.toLowerCase()) > -1;
      });
    }
    else{
      return this.produtos;
    }

  }

  delete(event, produto: ProdutoModel) {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' })
    event.stopPropagation();
    this.service.dbFire.doc(`produtos/${produto.IdFirebase}`)
    .delete()
    .then(() => {
      console.log('produto deletado');
      toast.setMessage('Produto deletado com sucesso!').present();
    })
    .catch(err => {
      console.log(err);
    })
  }

  showPrompt(name_get, get_value) {
    const prompt = this.alertCtrl.create({
      title: 'Quantidade',
      message: "Digite a quantidade do produto",
      inputs: [
        {
          name: 'quant',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {

          let total_value =  parseFloat(get_value)   * parseInt(data.quant) ;

            this.save(name_get ,get_value, data.quant, total_value);
          //  let json = JSON.stringify('quantidade:'+ name + ', nome: Nome do produto, data: '+name_product+ 'valor: '+name_price+ 'id: '+name_id);
        //    localStorage.setItem('playlisttest', json);

          //  localStorage.setItem(name_id,'quantidade:'+ name + ', nome: Nome do produto, data: '+name_product+ 'valor: '+name_price+ 'id: '+name_id);


          }
        }
      ]
    });
    prompt.present();
  }


  save(name_get, valor, quant, value_total){
   let dataObj = [];
    this.sectionObj = { "name"    : name_get,"valor"    : valor,
    "quant"    : quant,  "total_unit"    : value_total
                         };

  let  data    =   localStorage.getItem('Cart'); //get existing item in localstorage
    if(data) //check if it exists or not empty
    {
        dataObj =   JSON.parse(data); //parse string
    }
    dataObj.push(this.sectionObj);
    localStorage.setItem("Cart",JSON.stringify(dataObj));
}

}
