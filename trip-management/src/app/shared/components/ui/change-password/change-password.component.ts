import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChangePassword } from 'src/app/shared/model/change-password-model';
import { Church } from 'src/app/shared/model/church.model';
import { UserService } from 'src/app/shared/service/user/user.service';
import { AppState } from 'src/app/state';
import * as fromChurch from '../../../../state/church';
import * as fromAlert from '../../../../state/alert';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  public formChangePassword: FormGroup;
  public selectedChurch: Church;
  public subscription: Subscription = new Subscription();
  public regexLowerCase = /[a-z]/g;
  public findLowerCase = false;

  public regexUpperCase = /[A-Z]/g;
  public findUpperCase = false;

  public regexDigits = /[0-9]/g;
  public findDigits = false;

  public regexSpecialCharacters = /[$*&@#%!]/g;
  public findSpecialCharacters = false;

  public lenghtFive = false;

  public type: string;

  constructor(
    private store$: Store<AppState>,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {}

  ngOnInit(): void {
    this.formChangePassword = new FormGroup({
      passwordAdmin: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          new RegExp(
            '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=.*[$*&@#%!])(?=[^0-9]*[0-9]).{5,}'
          )
        ),
      ]),
      confirmNewPassword: new FormControl(null, [Validators.required]),
    });
    this.chooseType();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private chooseType() {
    if (this.inputData.type === 'admin') {
      this.type = 'admin';
    } else {
      this.type = 'church';
      this.subscribeToSelectChurch();
    }
  }

  public subscribeToSelectChurch() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectSelectedChurch))
        .subscribe((state) => {
          this.selectedChurch = state;
        })
    );
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public comparePasswords() {
    const newPassword: string =
      this.formChangePassword.get('newPassword').value;
    this.findLowerCase = this.findLowerCaseInString(newPassword);
    this.findUpperCase = this.findUpperCaseInString(newPassword);
    this.findDigits = this.findDigitsInString(newPassword);
    this.findSpecialCharacters =
      this.findSpecialCharactersInString(newPassword);
    this.lenghtFive = this.lenghtFiveInString(newPassword);

    if (
      this.formChangePassword.get('newPassword').value !==
      this.formChangePassword.get('confirmNewPassword').value
    ) {
      this.formChangePassword
        .get('confirmNewPassword')
        .setErrors({ incorrect: true });
    }
  }

  public changePassword() {
    if (this.type === 'church') {
      const change: ChangePassword = {
        idUser: this.selectedChurch.user.id,
        passwordAdmin: this.formChangePassword.get('passwordAdmin').value,
        newPassword: this.formChangePassword.get('newPassword').value,
      };

      this.subscription.add(
        this.userService.changePassword(change).subscribe(
          () => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'success',
                message: 'Senha Alterada com Sucesso',
              })
            );
            this.formChangePassword.reset();
            this.closeDialog();
          },
          (error) => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'error',
                message: error.error.message,
              })
            );
          }
        )
      );
    } else {
      const change: ChangePassword = {
        idUser: null,
        passwordAdmin: this.formChangePassword.get('passwordAdmin').value,
        newPassword: this.formChangePassword.get('newPassword').value,
      };

      this.subscription.add(
        this.userService.changePasswordAdmin(change).subscribe(
          () => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'success',
                message: 'Senha Alterada com Sucesso',
              })
            );
            this.formChangePassword.reset();
            this.closeDialog();
          },
          (error) => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'error',
                message: error.error.message,
              })
            );
          }
        )
      );
    }
  }

  private findDigitsInString(str: string) {
    if (str.search(this.regexDigits) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  private findUpperCaseInString(str: string) {
    if (str.search(this.regexUpperCase) >= 0) {
      return true;
    } else {
      return false;
    }
  }
  private findLowerCaseInString(str: string) {
    if (str.search(this.regexLowerCase) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  private findSpecialCharactersInString(str: string) {
    if (str.search(this.regexSpecialCharacters) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  private lenghtFiveInString(str: string) {
    if (str.length >= 5) {
      return true;
    } else {
      return false;
    }
  }
}
