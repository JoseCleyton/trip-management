import { Church } from './church.model';
import { Profile } from './profile.model';

export class User {
  public id?: string;
  public name: string;
  public login: string;
  public password: string;
  public profile: Profile;
}
