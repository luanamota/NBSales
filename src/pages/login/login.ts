import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController, IonicPage } from 'ionic-angular';
import { FormGroup, NgForm } from '../../../node_modules/@angular/forms';
import { Usuario } from '../../providers/usuario/usuario';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  @ViewChild('form') form: NgForm;
  user: Usuario = new Usuario(null);
  currentUser: any;

  constructor(
    public db: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toastCtrl: ToastController, 
    private auth: AuthServiceProvider, 
    private menuCtrl: MenuController) {
    this.currentUser = this.auth.getUsuarioLogado();
  }

  /**
   * Desabilita o menu no projeto NBApproval (tabs menu)
   */
  ionViewDidLoad() {
    this.menuCtrl.enable(false, 'mnuMenuPrincipal');
    // Caso exista um usuário logado, redirecione para HomePage
    // if (this.auth.getUsuarioLogado())
    //   this.navCtrl.setRoot('HomePage');
  }

  /**
   * 
   * Realiza login do usuário, verifica se ele está
   * Habilitado no nó do DB e redireciona à HomePage
   * 
   * @param this.user { instância de Usuario }
   * @param this.form { form template com two-way-bind ao usuario }
   */
  loginAndGoToInbox() {
    let toast = this.toastCtrl.create({ duration: 5000, position: 'bottom' });
    // two way data binding
    if (this.form.valid) {
      // Chama serviço de login do AuthServiceProvider
      this.auth.signIn(this.user).then( () => {
        /**
         * retorna um objeto do banco, pesquisando pelo uid do usuário logado.
         * Caso o campo Habilitado == true, permite o acesso
         * Se não, envia um toast para tela.
         */
        this.currentUser = this.auth.getUsuarioLogado();
        this.db.object('USERS/' + this.currentUser.uid).valueChanges().subscribe(
          (user: Usuario) => {
            if (user.Habilitado) {
              this.navCtrl.setRoot('HomePage');
            } else {
              toast.setMessage('Acesso não liberado. Entre em contato com o Administrador').present();
            }
          }
        );
      }).catch((error: any) => {
          toast.setMessage(error.message).present();
      });
    }
  }

  /**
   * Chama a página de cadastro
   * 
   * @author 
   */
  goToSignUp() {
    this.navCtrl.push('SignupPage');
  }

}
