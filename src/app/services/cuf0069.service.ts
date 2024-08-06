import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


const endpoint = `${environment.url + environment.api}/cufapi101`;

var header = new HttpHeaders().set('Authorization', "Basic " + btoa(environment.auth))

@Injectable({
  providedIn: 'root'
})
export class Cuf0069Service {

  constructor(private httpClient: HttpClient) {}

  public postReenv(regs: JSON) {Observable<any>
    return this.httpClient.post<any>(endpoint + '/ReenvioEmail/', JSON.stringify(regs), {headers:header});
  }  

  /*
  public postRelat(regs: JSON) {Observable<any>
    return this.httpClient.post<any>(endpoint + '/Relatorio/', JSON.stringify(regs), {headers:header});
  }
    */
 
  public getRPA(rowid: string): Observable<any> {
      return this.httpClient.get<any>(endpoint + '/ConsultaRpa/' + rowid,{headers:header});
  }

  public getAPIEmail(rowid: string): Observable<any> {
    return this.httpClient.get<any>(endpoint + '/ApiEmail/' + rowid,{headers:header});
  }

  public getAll(filtros:any): Observable<any> {
    return this.httpClient.get<any>(endpoint,{headers:header, params:filtros});
  }

  public getRelat(filtros:any): Observable<any> {
    return this.httpClient.get<any>(endpoint,{
      headers:header, 
      params:filtros})
      /*,
      responseType: 'blob' as 'json'});
      */
  }

}
