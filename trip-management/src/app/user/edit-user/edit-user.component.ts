import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EditCustomerServiceComponent } from 'src/app/customer-service-container/edit-customer-service/edit-customer-service.component';
import { Profile } from 'src/app/shared/model/profile.model';
import { User } from 'src/app/shared/model/user.model';
import { AppState } from 'src/app/state';
import * as fromUser from '../../state/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  public showPassword = false;
  public formEditUser: FormGroup;
  public subscription: Subscription = new Subscription();
  public selectedUser: User;

  public profiles: Profile[] = [
    { description: 'ADMINISTRADOR', id: '1' },
    { description: 'TECNICO', id: '2' },
    { description: 'SECRETARIO', id: '3' },
  ];

  constructor(
    public dialogRef: MatDialogRef<EditCustomerServiceComponent>,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.subscribeToSelectUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public subscribeToSelectUser(): void {
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

  public createForm(): void {
    this.formEditUser = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      profile: new FormControl(null, [Validators.required]),
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  public updateForm(): void {
    this.formEditUser.get('name').setValue(this.selectedUser.name);
    this.formEditUser.get('profile').setValue(this.selectedUser.profile.id);
    this.formEditUser.get('login').setValue(this.selectedUser.login);
    this.formEditUser.get('password').setValue(this.selectedUser.password);
  }

  public edit(): void {
    if (this.selectedUser) {
      this.updateSelectedUser();
      this.store$.dispatch(new fromUser.actions.EditUser(this.selectedUser));
    } else {
      this.store$.dispatch(new fromUser.actions.AddUser(this.buildUser()));
    }
    this.formEditUser.reset();
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.store$.dispatch(new fromUser.actions.SelectUser(null));
  }

  private updateSelectedUser(): void {
    this.selectedUser.name = this.formEditUser.get('name').value;
    this.selectedUser.profile = this.profiles.find(
      (profile) => profile.id === this.formEditUser.get('profile').value
    );
    this.selectedUser.login = this.formEditUser.get('login').value;
    this.selectedUser.password = this.formEditUser.get('password').value;
  }

  private buildUser(): User {
    const profile = this.profiles.find(
      (pr) => pr.id === this.formEditUser.get('profile').value
    );
    return {
      id: this.formEditUser.get('login').value,
      name: this.formEditUser.get('name').value,
      profile,
      login: this.formEditUser.get('login').value,
      password: this.formEditUser.get('password').value,
    };
  }
}
