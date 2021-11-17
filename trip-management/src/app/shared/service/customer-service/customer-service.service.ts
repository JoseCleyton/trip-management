import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerService } from '../../model/customer-service.model';
import { Pageable } from '../../model/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  constructor(private http: HttpClient) {}

  public listCustomersService(filters: any, pageable: Pageable) {
    return this.http.get<any>(
      `${environment.apiRootDsv}user?name=${filters.name}&monthOfBirthday=${filters.monthOfBirthday}&page=${pageable.page}&size=${pageable.size}&direction=${pageable.direction}&sort=${pageable.sort}`
    );
  }
  public findByIdCustomerService(id: string) {
    return this.http.get<any>(`${environment.apiRootDsv}user/${id}`);
  }
  public getQuantityCustomersService() {
    return this.http.get(`${environment.apiRootDsv}user/quantity`);
  }
  public addCustomerService(
    user: CustomerService
  ): Observable<CustomerService> {
    return this.http.post<CustomerService>(
      `${environment.apiRootDsv}user`,
      user
    );
  }
  public deleteCustomerService(id: number) {
    return this.http.delete(`${environment.apiRootDsv}user/${id}`);
  }
  public editCustomerService(
    user: CustomerService
  ): Observable<CustomerService> {
    return this.http.put<CustomerService>(
      `${environment.apiRootDsv}user`,
      user
    );
  }

  public retrieveCustomersService() {
    return this.http.get<any>(`${environment.apiRootDsv}user/retrieve`);
  }
}
