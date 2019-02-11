import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

// Firebase & AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';

// Services / Providers
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ClienteProvider } from './../providers/cliente/cliente';

// Cordova dep
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProdutosProvider } from '../providers/produtos/produtos';
import { HttpClientModule } from '@angular/common/http';
import { GlobalProvider } from '../providers/global/global';
import { PedidoProvider } from '../providers/pedido/pedido';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDB3MSj6OR45_wc4LSkFwIDkG0ldvbbCzU",
      authDomain: "nbsales-57eb2.firebaseapp.com",
      databaseURL: "https://nbsales-57eb2.firebaseio.com",
      projectId: "nbsales-57eb2",
      storageBucket: "nbsales-57eb2.appspot.com",
      messagingSenderId: "422656307097"
    }),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthServiceProvider,
    AngularFireAuthModule,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClienteProvider,
    ProdutosProvider,
    GlobalProvider,
    PedidoProvider
  ]
})
export class AppModule {}
