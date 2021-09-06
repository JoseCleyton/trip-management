import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Church } from '../../model/church.model';
import { Pageable } from '../../model/pageable.model';
@Injectable({
  providedIn: 'root',
})
export class ChurchService {
  constructor(private http: HttpClient) {}

  public getChurchQuantity() {
    return this.http.get(`${environment.apiRootDsv}church/quantity`);
  }
  public listChurchs(filters: any, pageable: Pageable) {
    return this.http.get<any>(
      `${environment.apiRootDsv}church?name=${filters.name}&page=${pageable.page}&size=${pageable.size}&direction=${pageable.direction}&sort=${pageable.sort}`
    );
  }
  public listAllChurchs() {
    return this.http.get(`${environment.apiRootDsv}church/all`);
  }
  public addChurch(church: Church): Observable<Church> {
    return this.http.post<Church>(`${environment.apiRootDsv}church`, church);
  }
  public deleteChurch(id: number) {
    return this.http.delete(`${environment.apiRootDsv}church/${id}`);
  }
  public editChurch(church: Church): Observable<Church> {
    return this.http.put<Church>(`${environment.apiRootDsv}church`, church);
  }
}
