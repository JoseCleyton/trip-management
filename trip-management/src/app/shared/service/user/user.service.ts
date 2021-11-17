import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../../model/change-password-model';
import { Pageable } from '../../model/pageable.model';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public changePassword(changePassword: ChangePassword): Observable<any> {
    return this.http.put(`${environment.apiRootDsv}christian`, changePassword);
  }
  public changePasswordAdmin(changePassword: ChangePassword): Observable<any> {
    return this.http.put(
      `${environment.apiRootDsv}christian/admin`,
      changePassword
    );
  }

  public listUsers(filters: any, pageable: Pageable) {
    return this.http.get<any>(
      `${environment.apiRootDsv}christian?name=${filters.name}&monthOfBirthday=${0}&page=${pageable.page}&size=${pageable.size}&direction=${pageable.direction}&sort=${pageable.sort}`
    );
  }
  public findByIdUser(id: string) {
    return this.http.get<any>(`${environment.apiRootDsv}christian/${id}`);
  }
  public getQuantityUsers() {
    return this.http.get(`${environment.apiRootDsv}christian/quantity`);
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiRootDsv}christian`, user);
  }
  public deleteUser(id: number) {
    return this.http.delete(`${environment.apiRootDsv}christian/${id}`);
  }
  public editUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiRootDsv}christian`, user);
  }

  public retrieveUsers() {
    return this.http.get<any>(`${environment.apiRootDsv}christian/retrieve`);
  }
}
