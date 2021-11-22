import { CustomerService } from './../../model/customer-service.model';
import { User } from '../../model/user.model';
import { Service } from '../service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceFirebaseService implements Service {
  private dbPath = '/customer-services';
  customerServiceRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.customerServiceRef = db.list(this.dbPath);
  }

  public add(data: any) {
    return this.customerServiceRef.push(data).get();
  }

  public findAll() {
    return this.customerServiceRef;
  }

  public findById(id: string) {
    return this.db.list(`${this.dbPath}/${id}`);
  }

  public edit(data: any) {
    return this.customerServiceRef.update(data.id, data);
  }

  public delete(id: string) {
    return this.customerServiceRef.remove(id);
  }

  public createNumberCustomerService(customerServicesSize: number): string {
    return `${new Date().getFullYear()} - ${customerServicesSize}`;
  }
}
