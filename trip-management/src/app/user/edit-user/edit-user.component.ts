import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EditCustomerServiceComponent } from 'src/app/customer-service/edit-customer-service/edit-customer-service.component';
import { User } from 'src/app/shared/model/user.model';
import { AppState } from 'src/app/state';
import * as fromUser from '../../state/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  public formEditUser: FormGroup;
  public subscription: Subscription = new Subscription();
  public selectedUser: User;

  public profiles = [
    { name: 'ADMINISTRADOR', value: '1' },
    { name: 'TECNICO', value: '02' },
    { name: 'SECRETARIO', value: '03' },
  ];

  constructor(
    public dialogRef: MatDialogRef<EditCustomerServiceComponent>,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.subscribeToSelectUser();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public subscribeToSelectUser() {
    this.subscription.add(
      this.store$
        .pipe(select(fromUser.selectors.selectSelectedUser))
        .subscribe((state) => {
          this.selectedUser = state;
          if (this.selectedUser) {
            this.updateForm();
          }
        })
    );
  }

  public createForm() {
    this.formEditUser = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      profile: new FormControl(null, [Validators.required]),
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  public updateForm() {
    console.log(this.selectedUser);
    this.formEditUser.get('name').setValue(this.selectedUser.name);
    this.formEditUser.get('profile').setValue(this.selectedUser.profile);
    this.formEditUser.get('login').setValue(this.selectedUser.login);
    this.formEditUser.get('password').setValue(this.selectedUser.password);
  }

  public edit() {
    if (this.selectedUser) {
      this.selectedUser.name = this.formEditUser.get('name').value;
      this.selectedUser.profile = this.formEditUser.get('profile').value;
      this.selectedUser.login = this.formEditUser.get('login').value;
      this.selectedUser.password = this.formEditUser.get('password').value;
      this.store$.dispatch(new fromUser.actions.EditUser(this.selectedUser));
    } else {
      const user: User = {
        id: this.selectedUser.id,
        name: this.formEditUser.get('name').value,
        profile: this.formEditUser.get('profile').value,
        login: this.formEditUser.get('login').value,
        password: this.formEditUser.get('password').value,
      };
      this.store$.dispatch(new fromUser.actions.AddUser(user));
    }
    this.formEditUser.reset();
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
