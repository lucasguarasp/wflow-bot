import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { TypeComponent } from '../../../../models/components/type-component.enum';
import { MethodCallapi } from '../../../../models/method-callapi.enum';
import { ComponentItem } from '../../../../models/components/component-item';
import { ApiService } from '../../../../providers/api.service';
import prettyBytes from 'pretty-bytes';

@Component({
  selector: 'app-tab-call-api',
  templateUrl: './tab-call-api.component.html',
  styleUrls: ['./tab-call-api.component.css']
})
export class TabCallApiComponent implements OnInit {

  @Input() itemSelected: ComponentItem
  components = TypeComponent;
  methodsCallapi = MethodCallapi;

  constructor(private apiService: ApiService, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  async callapi() {
    const url = (document.querySelector("[data-url]") as HTMLInputElement).value
    const method = (document.querySelector("[data-method]") as HTMLInputElement).value
    // const teste = (await this.apiService.getData(url, method)).toPromise();
    const teste = this.apiService.getData(url, method).then(
      response => {
        const element = this.elementRef.nativeElement.querySelector("[data-response-section]");
        if (element) {
          this.renderer.removeClass(element, 'd-none');
          this.updateResponse(response.data);
          this.updateResponseDetails(response);
          this.updateResponseHeaders(response.headers)
        }
      }
    );


    debugger

    //    fetch("https://postman-echo.com/get", {
    //   "headers": {
    //     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    //     "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    //     "cache-control": "max-age=0",
    //     "if-none-match": "W/\"49b-oZpbgMBePXXa5DSI2T40aHnudmQ\"",
    //     "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
    //     "sec-ch-ua-mobile": "?0",
    //     "sec-ch-ua-platform": "\"Windows\"",
    //     "sec-fetch-dest": "document",
    //     "sec-fetch-mode": "navigate",
    //     "sec-fetch-site": "none",
    //     "sec-fetch-user": "?1",
    //     "upgrade-insecure-requests": "1",
    //     "cookie": "sails.sid=s%3ALhG1ZXIC1q0gsZ-27DpuWW6t0CCv4Mvf.V0EgsYGif94%2FAAaaDSrBD%2BqGUXRHN7JsYeZANyRTNMA"
    //   },
    //   "referrerPolicy": "strict-origin-when-cross-origin",
    //   "body": null,
    //   "method": "GET"
    // });

  }

  private updateResponseDetails(response: any) {
    debugger
    const statusElement = this.elementRef.nativeElement.querySelector('[data-status]');
    if (statusElement) {
      this.renderer.setProperty(statusElement, 'textContent', response.status.toString());
    }

    const timeElement = this.elementRef.nativeElement.querySelector('[data-time]');
    if (timeElement) {
      this.renderer.setProperty(timeElement, 'textContent', response.customData.time.toString());
    }

    const sizeElement = this.elementRef.nativeElement.querySelector('[data-size]');
    if (sizeElement) {
      this.renderer.setProperty(sizeElement, 'textContent', prettyBytes(
        JSON.stringify(response.data).length +
        JSON.stringify(response.headers).length
      ));
    }
  }

  private updateResponse(response: any) {
    // const jsonResponseBody = document.querySelector("[data-json-response-body]")
    // if (jsonResponseBody) {
    //   jsonResponseBody.innerHTML = JSON.stringify(response);
    //   // jsonResponseBody.innerHTML = response;
    // }

    const jsonResponseBodyElement = this.elementRef.nativeElement.querySelector('[data-json-response-body]');
    if (jsonResponseBodyElement) {
      jsonResponseBodyElement.innerText = JSON.stringify(response, null, 2);
    }
  }

  private updateResponseHeaders(headers: any) {
    const responseHeadersContainer = document.querySelector(
      "[data-response-headers]"
    ) as HTMLInputElement;

    responseHeadersContainer.innerHTML = ""
    Object.entries(headers).forEach(([key, value]) => {
      const keyElement = document.createElement("div")
      keyElement.textContent = key
      responseHeadersContainer.append(keyElement)
      const valueElement = this.renderer.createElement('div');
      valueElement.textContent = value
      responseHeadersContainer.append(valueElement)
    })
  }

  addQueryParam() {
    const queryParamsContainer = this.elementRef.nativeElement.querySelector('[data-query-params]');
    if (queryParamsContainer)
      queryParamsContainer.append(this.createKeyValuePair())
  }
  addRequestHeader() {
    const requestHeadersContainer = this.elementRef.nativeElement.querySelector('[data-request-headers]');
    requestHeadersContainer.append(this.createKeyValuePair())
  }

  addJsonRequestBody() {
    const jsonRequestBodyElement = this.elementRef.nativeElement.querySelector('[data-json-request-body]');
    if(jsonRequestBodyElement && !jsonRequestBodyElement.querySelector('textarea')){
      const textareaElement = this.renderer.createElement('textarea');
      // Configurações opcionais do textarea, como atributos e estilos
      this.renderer.setAttribute(textareaElement, 'rows', '5');
      this.renderer.setAttribute(textareaElement, 'cols', '90');
      // this.renderer.setStyle(textareaElement, 'resize', 'none');
      // Adiciona o textarea ao div
      this.renderer.appendChild(jsonRequestBodyElement, textareaElement);
    }

  }

  private createKeyValuePair() {
    const keyValueTemplate = this.elementRef.nativeElement.querySelector('[data-key-value-template]');
    const element = keyValueTemplate.content.cloneNode(true)
    element.querySelector("[data-remove-btn]").addEventListener("click", (e: any) => {
      e.target.closest("[data-key-value-pair]").remove()
    })
    return element
  }
}

