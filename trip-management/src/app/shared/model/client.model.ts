import { Address } from './address.model';

export class Client {
  public key?: string;
  public id?: string;
  public name: string;
  public phone: string;
  public email: string;
  public address: Address;
}
