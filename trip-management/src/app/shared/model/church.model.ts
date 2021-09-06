import { User } from './user.model';

export class Church {
  public id?: number;
  public name: string;
  public phone: string;
  public email: string;
  public city: string;
  public district: string;
  public street: string;
  public number: string;
  public responsible: string;
  public numberOfTithers?: number;
  public user: User;
}
