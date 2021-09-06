
import { Address } from './address.model';
import { Church } from './church.model';

export class Christian {
  public id?: number;
  public name: string;
  public phone: string;
  public email: string;
  public birthDate: string;
  public address: Address
  public church?: Church;
}
