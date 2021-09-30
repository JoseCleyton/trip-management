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
    return this.usersRef;
  }

  public findById(id: string) {
    return this.db.list(`${this.dbPath}/${id}`);
  }

  public edit(data: User) {
    return this.usersRef.update(data.id, data);
  }

  public delete(id: string) {
    return this.usersRef.remove(id);
  }
}
