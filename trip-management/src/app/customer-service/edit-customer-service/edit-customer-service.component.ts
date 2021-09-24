import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/shared/model/address.model';
import { Christian } from 'src/app/shared/model/christian.model';
import { AppState } from 'src/app/state';
import * as fromChristian from '../../state/christian';

@Component({
  selector: 'app-edit-customer-service',
  templateUrl: './edit-customer-service.component.html',
  styleUrls: ['./edit-customer-service.component.scss'],
})
export class EditCustomerServiceComponent implements OnInit, OnDestroy {
  public formEditChristian: FormGroup;
  public subscription: Subscription = new Subscription();
  public selectedChristian: Christian;

  constructor(
    public dialogRef: MatDialogRef<EditCustomerServiceComponent>,
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.subscribeToSelectChristian();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public subscribeToSelectChristian() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChristian.selectors.selectSelectedChristian))
        .subscribe((state) => {
          this.selectedChristian = state;
          if (this.selectedChristian) {
            this.updateForm();
          }
        })
    );
  }

  public createForm() {
    this.formEditChristian = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      email: new FormControl(null),
      birthDate: new FormControl(null, [
        Validators.required,
      ]),
      city: new FormControl(null, [
        Validators.required,
      ]),
      street: new FormControl(null, [
        Validators.required,
      ]),
      number: new FormControl(null, [
        Validators.required,
      ]),
      district: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  public updateForm() {
    this.formEditChristian.get('name').setValue(this.selectedChristian.name);
    this.formEditChristian.get('phone').setValue(this.selectedChristian.phone);
    this.formEditChristian.get('email').setValue(this.selectedChristian.email);
    this.formEditChristian.get('birthDate').setValue(this.selectedChristian.birthDate);

    this.formEditChristian.get('city').setValue(this.selectedChristian.address.city);
    this.formEditChristian.get('street').setValue(this.selectedChristian.address.street);
    this.formEditChristian.get('number').setValue(this.selectedChristian.address.number);
    this.formEditChristian.get('district').setValue(this.selectedChristian.address.district);

  }

  public edit() {
    const address: Address = {
      id: this.selectedChristian.address.id,
      city: this.formEditChristian.get('city').value,
      district: this.formEditChristian.get('district').value,
      number: this.formEditChristian.get('number').value,
      street: this.formEditChristian.get('street').value,
    };
    const christian: Christian = {
      id: this.selectedChristian.id,
      name: this.formEditChristian.get('name').value,
      email: this.formEditChristian.get('email').value,
      phone: this.formEditChristian.get('phone').value,
      birthDate: this.formEditChristian.get('birthDate').value,
      address: address,
      church: this.selectedChristian.church,
    };
    this.store$.dispatch(new fromChristian.actions.EditChristian(christian));
    this.formEditChristian.reset();
    this.closeDialog();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
