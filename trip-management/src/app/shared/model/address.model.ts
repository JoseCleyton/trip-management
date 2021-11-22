import { Christian } from './christian.model';
import { Church } from './church.model';

export class Address {
  public id?: number;
  public cep: string;
  public city: string;
  public district: string;
  public street: string;
  public number: string;
  public client?: any;
}
