import { Injectable } from '@angular/core';
// import axios from 'axios-observable';
import axios from 'axios';
import { environment } from '../../../enviroments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL: string = environment.apiUrl;

  constructor() { }

  public async getData(url: string, method: string, headers?: []) {

    debugger
    const startTime = new Date().getTime(); // Captura o tempo antes da requisição

    const headersObject = {}
    if (headers)
      Object.assign({}, ...headers);

    // Configuração da solicitação
    const requestOptions = {
      method: method, // Método da solicitação (GET neste caso)
      headers: headersObject, // Cabeçalhos da solicitação
      params: {
        key: 'value',
        destinationUrl: url // Passa a URL de destino para o servidor
      }
    };

    try {
      // Faz a solicitação para o seu servidor
      axios.get(this.API_URL, requestOptions)
        .then(response => {
          console.log(response.data); // Dados da resposta recebida do servidor
debugger
          const responseData = {
            data: response.data,
            headers: response.headers,
            status: response.status,
            customData: { time: timeTaken }
          };
          return responseData
        })
        .catch(error => {
          console.error('Erro:', error); // Exibe o erro no console
        });

      const endTime = new Date().getTime(); // Captura o tempo após a requisição
      const timeTaken = endTime - startTime; // Calcula a diferença de tempo

    } catch (error: any) {
      let errorMessage = 'Erro ao fazer a solicitação';
      if (error.response && error.response.status) {
        errorMessage += `, status ${error.response.status}`;
      } else if (error.status) {
        errorMessage += `, status ${error.status}`;
      }
      debugger
      throw new Error(errorMessage);
      // throw new Error(`Erro ao fazer a solicitação: ${error}`);
    }



  }

}
