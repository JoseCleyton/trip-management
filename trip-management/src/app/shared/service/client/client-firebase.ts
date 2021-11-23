import { Client } from 'src/app/shared/model/client.model';
import { map } from 'rxjs/operators';
import { Service } from '../service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class ClientFirebaseService implements Service {
  private dbPath = '/clients';
  usersRef: AngularFireList<Client> = null;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  public add(data: Client) {
    return this.usersRef.push(data).get();
  }

  public findAll() {
    return this.usersRef.snapshotChanges().pipe(
      map((response) => {
        return response.map((a) => {
          const data = a.payload.val();
          const key = a.payload.key;
          const user: Client = {
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

  public edit(data: Client) {
    return this.usersRef.update(data.key, {
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
    });
  }

  public delete(id: string) {
    return this.usersRef.remove(id);
  }
}
