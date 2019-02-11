import { Component, ViewChild } from '@angular/core';
import { Nav,Platform,AlertController,App} from 'ionic-angular';
import { StatusBar} from '@ionic-native/status-bar';
import { SplashScreen} from '@ionic-native/splash-screen';
import { AuthServiceProvider} from '../providers/auth-service/auth-service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'LoginPage';

  users: Observable<any[]>;

  pages: Array <{title: string,component: any,iconName: string}>;

  constructor(public db: AngularFireDatabase, public app: App, public alertCtrl: AlertController, public auth: AuthServiceProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    // used for an example of ngFor and navigation
    this.pages = [{
        title: 'Home',
        component: 'HomePage',
        iconName: 'home'
      },
      {
        title: 'Produtos',
        component: 'ProdutosPage',
        iconName: 'cube'
      },
      {
        title: 'Clientes',
        component: 'ClientesPage',
        iconName: 'person'
      },
      {
        title: 'Pedidos',
        component: 'PedidosPage',
        iconName: 'paper' //or clipboard?
      },
    ];
    // this.initializeApp();
  }

  initializeApp() {
    let currentUser = this.auth.getUsuarioLogado();
    this.db.object('/Users/' + currentUser).valueChanges().subscribe((_data) => {
      console.log('object_data', _data);
    });
  }

  /**
   * Janela de popup para confirmação de logout
   */
  promptSignOut() {
    const prompt = this.alertCtrl.create({
      title: 'Sair',
      message: "Deseja realmente sair?",
      buttons: [{
          text: 'Cancelar',
          handler: data => {
            //
          }
        },
        {
          text: 'Sair',
          handler: data => {
            this.auth.signOut();
            this.nav.setRoot('LoginPage');
          }
        }
      ]
    });
    prompt.present();
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
