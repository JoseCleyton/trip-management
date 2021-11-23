import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/shared/model/address.model';
import { Client } from 'src/app/shared/model/client.model';
import { AppState } from 'src/app/state';
import * as fromClient from '../../state/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {
  public formEditClient: FormGroup;
  public subscription: Subscription = new Subscription();
  public selectedClient: Client;
  public totalCustomesServices = 0;
  public clients: Client[];

  constructor(
    public dialogRef: MatDialogRef<EditClientComponent>,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.subscribeToSelectedClient();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public subscribeToSelectedClient() {
    this.subscription.add(
      this.store$
        .pipe(select(fromClient.selectors.selectSelectedClient))
        .subscribe((state) => {
          this.selectedClient = state;
          if (this.selectedClient) {
            this.updateForm();
          }
        })
    );
  }

  public createForm() {
    this.formEditClient = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      cep: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
    });
  }

  public updateForm() {
    this.formEditClient.get('name').setValue(this.selectedClient.name);
    this.formEditClient.get('phone').setValue(this.selectedClient.phone);
    this.formEditClient.get('email').setValue(this.selectedClient.email);

    this.formEditClient.get('cep').setValue(this.selectedClient?.address?.cep);

    this.formEditClient
      .get('city')
      .setValue(this.selectedClient?.address?.city);
    this.formEditClient
      .get('street')
      .setValue(this.selectedClient.address.street);
    this.formEditClient
      .get('number')
      .setValue(this.selectedClient.address.number);
    this.formEditClient
      .get('district')
      .setValue(this.selectedClient.address.district);
  }

  public edit(): void {
    if (this.selectedClient) {
      this.updateSelectedClient();
      this.store$.dispatch(
        new fromClient.actions.EditClient(this.selectedClient)
      );
    } else {
      this.store$.dispatch(
        new fromClient.actions.AddClient(this.buildClient())
      );
    }
    this.formEditClient.reset();
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private updateSelectedClient(): void {
    this.selectedClient.name = this.formEditClient.get('name').value;
    this.selectedClient.phone = this.formEditClient.get('phone').value;
    this.selectedClient.email = this.formEditClient.get('email').value;
    
    this.selectedClient.address.cep = this.formEditClient.get('cep').value;
    this.selectedClient.address.city = this.formEditClient.get('city').value;
    this.selectedClient.address.district =
      this.formEditClient.get('district').value;
    this.selectedClient.address.street =
      this.formEditClient.get('street').value;
    this.selectedClient.address.number =
      this.formEditClient.get('number').value;
  }

  public buildClient(): Client {
    const address: Address = {
      cep: this.formEditClient.get('cep').value,
      city: this.formEditClient.get('city').value,
      district: this.formEditClient.get('district').value,
      number: this.formEditClient.get('number').value,
      street: this.formEditClient.get('street').value,
    };

    const client: Client = {
      name: this.formEditClient.get('name').value,
      phone: this.formEditClient.get('phone').value,
      email: this.formEditClient.get('email').value,
      address,
    };
    return client;
  }
}
