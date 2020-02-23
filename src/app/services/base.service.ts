import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';



import { HttpErrorResponse, HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  constructor(protected http: HttpClient) { }

  
  protected post<T>(apiUrl: string, body: T): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.http.post(environment.API_BASE_URL + '/' + apiUrl, body).
      subscribe(
        (res: Response) => resolve(this.handleResponse(res)),
        (err: HttpErrorResponse ) => reject(this.handleError(err))
      );
    });
}

protected postWithFormData<T>(apiUrl: string, formData: FormData): Promise<any> {
    
  return new Promise( (resolve,reject) => {
    this.http.post(environment.API_BASE_URL + '/' + apiUrl, formData).
    subscribe(
      (res: Response) => resolve(this.handleResponse(res)),
      (err: HttpErrorResponse ) => reject(this.handleError(err))
    );
  })
}

protected update<T>(apiUrl: string, body: T){
    return new Promise( (resolve, reject) => {
      this.http.put(environment.API_BASE_URL + '/' + apiUrl, body).
      subscribe(
        (res: Response) => resolve(this.handleResponse(res)),
        (err: HttpErrorResponse ) => reject(this.handleError(err))
      );
    });
}

handleResponse(res:Response){
  return res;
}

protected get(apiUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_BASE_URL + '/' + apiUrl).
      subscribe(
        (res: Response) => resolve(this.handleResponse(res)),
        (err: HttpErrorResponse ) => reject(this.handleError(err))
      );
    });
}

protected download(apiUrl: string, params: HttpParams) : Promise<any>{

    return new Promise( (resolve, reject) => {
      this.http.get(environment.API_BASE_URL + '/' + apiUrl, {responseType: 'blob', params: params}).
      subscribe(
        (res: Blob) => {
          if(res.size == 0){
            reject("Error while downloading file");
          } else {
            console.log(res)
            const blob = new Blob([res], { type : 'blob' });
            resolve(blob);
          }
        },
        (err: HttpErrorResponse) => reject(this.handleError(err))
      );
    });
}

protected delete<T>(apiUrl: string, body: T): Promise<any> {
  let options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: body
  }
  console.log(body);
  return new Promise( (resolve,reject) => {
    this.http.delete(environment.API_BASE_URL + '/' + apiUrl, options).
    subscribe(
      (res: Response) => resolve(this.handleResponse(res)),
      (err: HttpErrorResponse ) => reject(this.handleError(err))
    );
  })
}

protected collectData(res: Response) {
  if (res) {
      const data = res.text();
      const response = res.json();
      return [data, response];
  } else {
      return {};
  }
}

protected handleError(error: HttpErrorResponse) {
  let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return Error(errorMessage);
}


}
