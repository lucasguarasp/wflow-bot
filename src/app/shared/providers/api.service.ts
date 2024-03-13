import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }

  public async getData(url: string, GET: string, headers?: []) {
    try {
      const response = axios.get(url, {
        headers: {
          'Content-Type': 'application/json', // Cabeçalho Content-Type
          'Accept': 'application/json', // Cabeçalho Accept
        },
        method: 'GET' // Método da solicitação
      });
    } catch (error) {
      throw new Error(`Erro ao fazer a solicitação: ${error}`);
    }
  }

}
