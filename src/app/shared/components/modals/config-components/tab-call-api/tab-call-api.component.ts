import { Component, Input, OnInit } from '@angular/core';
import { TypeComponent } from '../../../../models/components/type-component.enum';
import { MethodCallapi } from '../../../../models/method-callapi.enum';
import { ComponentItem } from '../../../../models/components/component-item';
import { ApiService } from '../../../../providers/api.service';

@Component({
  selector: 'app-tab-call-api',
  templateUrl: './tab-call-api.component.html',
  styleUrls: ['./tab-call-api.component.css']
})
export class TabCallApiComponent implements OnInit {

  @Input() itemSelected: ComponentItem
  components = TypeComponent;
  methodsCallapi = MethodCallapi;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async callapi() {
    const url = (document.querySelector("[data-url]") as HTMLInputElement).value
    const method = (document.querySelector("[data-method]") as HTMLInputElement).value
    // const teste = (await this.apiService.getData(url, method)).toPromise();
    const teste =  (await this.apiService.getData(url, method)).data;
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

}
