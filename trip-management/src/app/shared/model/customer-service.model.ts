import { Technician } from './technician.model';
import { Client } from './client.model';
import { Address } from './address.model';

export class CustomerService {
  public id?: string;
  public client: Client;
  public address: Address;
  public technician: Technician;
  public dateStart: string;
  public dateEnd: string;
}
