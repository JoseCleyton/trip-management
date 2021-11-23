import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginFirebaseService {
  // constructor(private auth: AngularFireAuth) {}

  // public signIn(email, password) {
  //   return this.auth.signInWithEmailAndPassword(email, password);
  // }

  // public signUp(email, password) {
  //   return this.auth.createUserWithEmailAndPassword(email, password);
  // }

  private dbPath = '/users';
  usersRef: AngularFireList<User> = null;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  public signIn(login, password) {
    return this.findAll().pipe(
      map((response) => {
        return response.find(
          (user) => user.login === login && user.password === password
        );
      })
    );
  }
  public findAll() {
    return this.usersRef.snapshotChanges().pipe(
      map((response) => {
        return response.map((a) => {
          const data = a.payload.val();
          const key = a.payload.key;
          const user: User = {
            key,
            ...data,
          };
          return user;
        });
      })
    );
  }
}
