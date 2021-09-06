import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../../model/change-password-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public changePassword(changePassword: ChangePassword): Observable<any> {
    return this.http.put(`${environment.apiRootDsv}user`, changePassword);
  }
  public changePasswordAdmin(changePassword: ChangePassword): Observable<any> {
    return this.http.put(`${environment.apiRootDsv}user/admin`, changePassword);
  }
}
