import { Injectable } from '@angular/core';
// import axios from 'axios-observable';
import axios from 'axios';



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
          'Accept': 'application/json' // Cabeçalho Accept,
          // "Access-Control-Allow-Origin": "http://localhost:4200",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
        method: method // Método da solicitação
      });
      return response.data
      debugger
    } catch (error) {
      debugger
      throw new Error(`Erro ao fazer a solicitação: ${error}`);
    }




  }

}
