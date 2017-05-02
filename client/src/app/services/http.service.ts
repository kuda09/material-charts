import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import {IIndice} from "../models/indice";
import {AuthHttp} from "angular2-jwt";
import {IVisualisation} from "../store/state/interfaces/vis.interface";


@Injectable()
export class HttpService {

  url: string = "/api";
  constructor(private http: Http, private authHttp: AuthHttp) {

  }

  getData(route) {

    return this.http.get(`${this.url}${route}`)
        .map(res => res.json());
  }

  retrieveIndices(data: IIndice): Observable<any>{
    const body = Object.assign({}, data);
    return this.authHttp.post(`${this.url}/elasticsearch/indices`, body)
        .map(res => res.json());
  }

  saveIndices(data: IIndice): Observable<any>{
    const body = Object.assign({}, data);
    return this.authHttp.post(`${this.url}/collections/indice`, body)
        .map(res => res.json());
  }

  updateIndices(data: IIndice): Observable<any>{
    const body = Object.assign({}, data);
    return this.authHttp.patch(`${this.url}/collections/indice`, body)
        .map(res => res.json());
  }

  deleteIndices(data: IIndice): Observable<any>{
    const body = Object.assign({}, data);

    return this.authHttp.post(`${this.url}/collections/indice/delete`, body)
        .map(res => res.json());
  }

  search(data) : Observable<any> {
    const body = Object.assign({}, data);
    return this.authHttp.post(`${this.url}/elasticsearch/search`, body)
        .map(res => res.json());
  }

  saveVis(data: IVisualisation): Observable<any>{
    const body = Object.assign({}, data);
    return this.authHttp.post(`${this.url}/collections/visualisation`, body)
        .map(res => res.json());
  }

  editVis(data: IVisualisation): Observable<any>{
    const body = Object.assign({}, data);
    return this.authHttp.patch(`${this.url}/collections/visualisation`, body)
        .map(res => res.json());
  }

  deleteVis(data: IVisualisation): Observable<any>{
    const body = Object.assign({}, data);

    return this.authHttp.post(`${this.url}/collections/visualisation/delete`, body)
        .map(res => res.json());
  }




}
