import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../providers/usuario/usuario';
import { NgForm } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private PATH = 'USERS/';
  user: Usuario = new Usuario(null);
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    private authService: AuthServiceProvider, private db: AngularFireDatabase ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SignupPage');
  }

  createAccount() {
    if (this.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

      // Cria um usuário no Authentication do Firebase
      this.authService.createUser(this.user)
      /**
       * Utiliza o uid do usuário criado para gerar um nó
       * no banco de dados. Este novo nó serve para controlar a liberação
       * de acesso à aplicação e guardar o usuário externo (SAP)
       */
      .then((userCred: firebase.auth.UserCredential) => {
        let uid = userCred.user.uid;
        let strEmail= userCred.user.email;
        let bolHabilitado = false;
        let strUsuarioExterno = '';
        //push cria um id automaticamente.
        //this.db.list(this.PATH).push({uid, Email:strEmail, Habilitado: bolHabilitado, UsuarioExterno: strUsuarioExterno});
        //Set permite que eu informe o id.
        this.db.list(this.PATH).set(uid,{Email:strEmail, Habilitado: bolHabilitado, UsuarioExterno: strUsuarioExterno});

        toast.setMessage('Usuário criado com sucesso.').present();
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error: any) => {
        toast.setMessage(error.message).present();
      });
    }
    else
    {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
      toast.setMessage('Erro no formulário.').present();
    }
  }

}
