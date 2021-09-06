import { Christian } from "./christian.model";
import { Church } from "./church.model";

export class Address {
  public id?: number;
  public city: string;
  public district: string;
  public street: string;
  public number: string;
  public christian?: Christian
  public church?: Church
}
