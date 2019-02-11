import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public db: AngularFireDatabase, public auth: AuthServiceProvider, public navCtrl: NavController) { }

  /**
   * Utilizar um lifecycle do ionic
   * para Implementar um Auth Guard
   * 
   */
  // ionViewCanEnter() {
  //   if (this.auth.getIsVerified(this.auth.getUsuarioLogado().uid))
  //     return true;
  //   else
  //     this.navCtrl.setRoot('LoginPage');  
  // }

}
