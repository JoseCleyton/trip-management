import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Church } from 'src/app/shared/model/church.model';
import { AppState } from 'src/app/state';
import * as fromChurch from '../../state/church';

@Component({
  selector: 'app-edit-church',
  templateUrl: './edit-church.component.html',
  styleUrls: ['./edit-church.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditChurchComponent implements OnInit, OnDestroy {
  public formEditChurch: FormGroup;
  public selectedChurch: Church;

  public subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<EditChurchComponent>,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscribeToSelectChurch();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  public edit() {
    const church: Church = {
      id: this.selectedChurch.id,
      name: this.formEditChurch.get('name').value,
      city: this.formEditChurch.get('city').value,
      district: this.formEditChurch.get('district').value,
      number: this.formEditChurch.get('number').value,
      responsible: this.formEditChurch.get('responsible').value,
      street: this.formEditChurch.get('street').value,
      email: this.formEditChurch.get('email').value,
      phone: this.formEditChurch.get('phone').value,
      numberOfTithers: this.selectedChurch.numberOfTithers,
      user: this.selectedChurch.user,
    };

    this.store$.dispatch(new fromChurch.actions.EditChurch(church));
    this.formEditChurch.reset();
    this.closeDialog();
  }

  public subscribeToSelectChurch() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectSelectedChurch))
        .subscribe((state) => {
          this.selectedChurch = state;
          if (this.selectedChurch) {
            this.createForm();
          }
        })
    );
  }
  private createForm() {
    this.formEditChurch = new FormGroup({
      name: new FormControl(this.selectedChurch.name, [Validators.required]),
      phone: new FormControl(this.selectedChurch.phone),
      email: new FormControl(this.selectedChurch.email, [Validators.email]),
      city: new FormControl(this.selectedChurch.city, [Validators.required]),
      district: new FormControl(this.selectedChurch.district, [
        Validators.required,
      ]),
      street: new FormControl(this.selectedChurch.street, [
        Validators.required,
      ]),
      number: new FormControl(this.selectedChurch.number, [
        Validators.required,
      ]),
      responsible: new FormControl(this.selectedChurch.responsible, [
        Validators.required,
      ]),
    });
  }
}
