import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Christian } from '../../model/christian.model';
import { Pageable } from '../../model/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class ChristianService {
  constructor(private http: HttpClient) {}

  public listChristians(filters: any, pageable: Pageable) {
    return this.http.get<any>(
      `${environment.apiRootDsv}christian?name=${filters.name}&monthOfBirthday=${filters.monthOfBirthday}&page=${pageable.page}&size=${pageable.size}&direction=${pageable.direction}&sort=${pageable.sort}`
    );
  }
  public findByIdChristian(id: string) {
    return this.http.get<any>(
      `${environment.apiRootDsv}christian/${id}`
    );
  }
  public getQuantityChristians() {
    return this.http.get(`${environment.apiRootDsv}christian/quantity`);
  }
  public addChristian(christian: Christian): Observable<Christian> {
    return this.http.post<Christian>(
      `${environment.apiRootDsv}christian`,
      christian
    );
  }
  public deleteChristian(id: number) {
    return this.http.delete(`${environment.apiRootDsv}christian/${id}`);
  }
  public editChristian(christian: Christian): Observable<Christian> {
    return this.http.put<Christian>(
      `${environment.apiRootDsv}christian`,
      christian
    );
  }

  public retrieveChristians() {
    return this.http.get<any>(`${environment.apiRootDsv}christian/retrieve`);
  }
}
