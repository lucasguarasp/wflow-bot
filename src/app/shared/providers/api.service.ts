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
    const startTime = new Date().getTime(); // Captura o tempo antes da requisição

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json', // Cabeçalho Content-Type
        },
        method: method // Método da solicitação
      });

      const endTime = new Date().getTime(); // Captura o tempo após a requisição
      const timeTaken = endTime - startTime; // Calcula a diferença de tempo

      const responseData = {
        data: response.data,
        headers: response.headers,
        status: response.status,
        customData: { time: timeTaken }
      };
      return responseData

    } catch (error) {
      debugger
      throw new Error(`Erro ao fazer a solicitação: ${error}`);
    }



  }

}
