import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Address } from 'src/app/shared/model/address.model';
import { Christian } from 'src/app/shared/model/christian.model';
import { datePipeFormatPipe } from 'src/app/shared/pipes/datePipeTransform';
import { AppState } from 'src/app/state';
import * as fromChristian from '../../state/christian';

@Component({
  selector: 'app-add-christian',
  templateUrl: './add-christian.component.html',
  styleUrls: ['./add-christian.component.scss'],
})
export class AddChristianComponent implements OnInit {
  public formAddChristian: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddChristianComponent>,
    private store$: Store<AppState>,
    private datePipe: datePipeFormatPipe
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  public add() {
    const address: Address = {
      city: this.formAddChristian.get('city').value,
      district: this.formAddChristian.get('district').value,
      number: this.formAddChristian.get('number').value,
      street: this.formAddChristian.get('street').value,
    };
    const christian: Christian = {
      name: this.formAddChristian.get('name').value,
      email: this.formAddChristian.get('email').value,
      phone: this.formAddChristian.get('phone').value,
      birthDate: this.datePipe.transform(
        this.formAddChristian.get('birthDate').value,
        'yyyy-MM-dd'
      ),
      address: address,
    };

    this.store$.dispatch(new fromChristian.actions.AddChristian(christian));
    this.formAddChristian.reset();
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  public createForm() {
    this.formAddChristian = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      email: new FormControl(null),
      birthDate: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
    });
  }
}
