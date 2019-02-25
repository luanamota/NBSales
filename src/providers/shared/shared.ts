import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class SharedProvider {

  constructor(
    public http: HttpClient,
    public dbFire: AngularFirestore
  ) {
    console.log('Hello SharedProvider Provider');
  }

}
