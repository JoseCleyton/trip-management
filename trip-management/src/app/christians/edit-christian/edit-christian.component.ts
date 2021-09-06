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
  selector: 'app-edit-christian',
  templateUrl: './edit-christian.component.html',
  styleUrls: ['./edit-christian.component.scss'],
})
export class EditChristianComponent implements OnInit, OnDestroy {
  public formEditChristian: FormGroup;
  public subscription: Subscription = new Subscription();
  public selectedChristian: Christian;

  constructor(
    public dialogRef: MatDialogRef<EditChristianComponent>,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
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
            this.createForm();
          }
        })
    );
  }

  public createForm() {
    this.formEditChristian = new FormGroup({
      name: new FormControl(this.selectedChristian.name, [Validators.required]),
      phone: new FormControl(this.selectedChristian.phone),
      email: new FormControl(this.selectedChristian.email),
      birthDate: new FormControl(this.selectedChristian.birthDate, [
        Validators.required,
      ]),
      city: new FormControl(this.selectedChristian.address.city, [
        Validators.required,
      ]),
      street: new FormControl(this.selectedChristian.address.street, [
        Validators.required,
      ]),
      number: new FormControl(this.selectedChristian.address.number, [
        Validators.required,
      ]),
      district: new FormControl(this.selectedChristian.address.district, [
        Validators.required,
      ]),
    });
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
