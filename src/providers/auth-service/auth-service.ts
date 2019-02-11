import { Injectable } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthServiceProvider {

  //user: firebase.User;

  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth ) {
    //this.user = angularFireAuth.authState;
  }

  createUser(user: Usuario){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.Email, user.password);
  }

  signIn(user: Usuario){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.Email, user.password);
  }

  signOut() {
    this.angularFireAuth.auth.signOut();
  }

  getUsuarioLogado(): firebase.User {
    return firebase.auth().currentUser;
  }

  getIsVerified(userId): boolean {
    this.db.object('USERS/' + userId).valueChanges().subscribe((user: Usuario) => {
      if (user.Habilitado) {
        return true;
      }
    });
    return false;
  }
}
