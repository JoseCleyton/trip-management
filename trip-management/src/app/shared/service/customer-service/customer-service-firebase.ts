import { map } from 'rxjs/operators';
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

  public add(data: CustomerService) {
    return this.customerServiceRef.push(data).get();
  }

  public findAll() {
    return this.customerServiceRef.snapshotChanges().pipe(
      map((response) => {
        return response.map((a) => {
          const data = a.payload.val();
          const key = a.payload.key;
          const customerService: CustomerService = {
            key,
            ...data,
          };
          return customerService;
        });
      })
    );
  }

  public findById(id: string) {
    return this.db.list(`${this.dbPath}/${id}`);
  }

  public edit(data: CustomerService){
    return this.customerServiceRef.update(data.key, {
      client: data.client,
      address: data.address,
      technician: data.technician,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd ? data.dateEnd : null,
    });
  }

  public delete(id: string) {
    return this.customerServiceRef.remove(id);
  }

  public createNumberCustomerService(customerServicesSize: number): string {
    return `${new Date().getFullYear()} - ${customerServicesSize}`;
  }
}
