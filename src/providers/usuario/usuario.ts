import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable()
export class Usuario {

  Email: string;
  password: string;
  Habilitado: boolean;
  UsuarioExterno: string;

  constructor(private db: AngularFireDatabase) { }

  getUsuarioSap(uid: string) {
    return this.db.object('USERS/' + uid).valueChanges();
  }

  getHabilitado(uid: string) {
    // if (this.db.object('USERS/' + uid))
    return false;
  }
}
