import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RulePasswordComponent } from 'src/app/shared/components/ui/rule-password/rule-password.component';
import { Church } from 'src/app/shared/model/church.model';
import { AppState } from 'src/app/state';
import * as fromChurch from '../../state/church';

@Component({
  selector: 'app-add-church',
  templateUrl: './add-church.component.html',
  styleUrls: ['./add-church.component.scss'],
})
export class AddChurchComponent implements OnInit {
  public formAddChurch: FormGroup;
  public showPassword = false;
  
  constructor(
    public dialogRef: MatDialogRef<AddChurchComponent>,
    private store$: Store<AppState>,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.formAddChurch = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      email: new FormControl(null, [Validators.email]),
      city: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      responsible: new FormControl(null, [Validators.required]),
      numberOfTithers: new FormControl(null, [Validators.min(1)]),
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          new RegExp(
            '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=.*[$*&@#%!])(?=[^0-9]*[0-9]).{5,}'
          )
        ),
      ]),
    });
  }

  public add() {
    const church: Church = {
      name: this.formAddChurch.get('name').value,
      city: this.formAddChurch.get('city').value,
      district: this.formAddChurch.get('district').value,
      number: this.formAddChurch.get('number').value,
      responsible: this.formAddChurch.get('responsible').value,
      street: this.formAddChurch.get('street').value,
      email: this.formAddChurch.get('email').value,
      phone: this.formAddChurch.get('phone').value,
      numberOfTithers: this.formAddChurch.get('numberOfTithers').value,
      user: {
        admin: false,
        login: this.formAddChurch.get('login').value,
        password: this.formAddChurch.get('password').value,
      },
    };
    this.store$.dispatch(new fromChurch.actions.AddChurch(church));
    this.formAddChurch.reset();
    this.closeDialog();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public openRulesPassword() {
    this._bottomSheet.open(RulePasswordComponent);
  }
}
