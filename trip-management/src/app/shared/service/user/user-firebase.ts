import { map } from 'rxjs/operators';
import { User } from './../../model/user.model';
import { Service } from './../service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UserFirebaseService implements Service {
  private dbPath = '/users';
  usersRef: AngularFireList<User> = null;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  public add(data: User) {
    return this.usersRef.push(data).get();
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

  public findById(id: string) {
    return this.db.list(`${this.dbPath}/${id}`);
  }

  public edit(data: User) {
    return this.usersRef.update(data.key, {
      name: data.name,
      login: data.login,
      password: data.password,
      profile: data.profile,
    });
  }

  public delete(id: string) {
    return this.usersRef.remove(id);
  }
}
