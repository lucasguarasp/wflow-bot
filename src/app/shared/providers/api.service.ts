import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import axios from 'axios-observable';
import axios from 'axios';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }

  public async getData(url: string, method: string, headers?: []) {

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json', // Cabeçalho Content-Type
        },
        method: method // Método da solicitação
      });
      return response
    } catch (error) {
      debugger
      throw new Error(`Erro ao fazer a solicitação: ${error}`);
    }

  }

}
