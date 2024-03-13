import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeComponent } from '../../../models/components/type-component.enum';
import { ComponentItem } from '../../../models/components/component-item';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from '../../../providers/sharedData.service';
import { DataFilterService } from '../../../providers/data-filter.service';
import { MethodCallapi } from '../../../models/method-callapi.enum';
import { ApiService } from '../../../providers/api.service';

declare module 'axios' {
  interface AxiosRequestConfig {
    customData?: any;
  }
}

@Component({
  selector: 'app-config-components',
  templateUrl: './config-components.component.html',
  styleUrls: ['./config-components.component.css']
})
export class ConfigComponentsComponent implements OnInit {

  @Input() itemSelected: ComponentItem
  inputList: HTMLElement;
  @Output() itemOut = new EventEmitter<FormGroup>();

  components = TypeComponent;
  methodsCallapi = MethodCallapi;
  // methodsCallapi: string[] = [];
  public formGeral: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private sharedDataService: SharedDataService, private dataFilterService: DataFilterService, private apiService: ApiService) {
    this.sharedDataService.getSelectedItemObservable().subscribe((item) => {
      this.itemSelected = item;
    });
  }

  ngOnInit() {
    debugger
    // this.methodsCallapi = (Object.keys(MethodCallapi) as Array<keyof typeof MethodCallapi>).filter(key => isNaN(Number(MethodCallapi[key]))) as string[];
    this.itemSelected = new ComponentItem(this.itemSelected);
    JSON.stringify(this.itemSelected);
    this.buildForms();
    this.filterData();
  }

  buildForms() {
    this.formGeral = this.fb.group({
      name: [''],
      nameOut: [''],
      data: [{}],
    });

    this.fillFormGeral();
  }

  fillFormGeral() {
    debugger
    var teste = JSON.stringify(this.itemSelected.data);
    this.formGeral.patchValue({
      name: this.itemSelected.name,
      nameOut: this.itemSelected.name.concat('_result'),
      data: JSON.stringify(this.itemSelected.data)
    });

    if (this.itemSelected.class === this.components.StartFlow) {
      this.formGeral.disable()
    }
  }

  public confirmar() {
    const controleName = this.formGeral.get('name') as AbstractControl<string> | null;

    // if (controleName) {
    //   this.itemSelected.name = controleName.value;    
    // }

    this.updateItem()

    this.sharedDataService.updateSelectedItem(this.itemSelected);
    this.activeModal.close(this.itemSelected);

  }

  updateItem() {
    // Itera sobre os controles do FormGroup
    Object.keys(this.formGeral.controls).forEach(controlName => {
      // Verifica se o campo correspondente existe em itemSelected
      debugger
      if (this.itemSelected.hasOwnProperty(controlName)) {
        // Define o valor do controle no itemSelected
        this.itemSelected[controlName] = this.tryParseJSON(this.formGeral.get(controlName)?.value);
      }
    });
  }

  tryParseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return jsonString; // or handle the error as needed
    }
  }

  public cancelar() {
    this.activeModal.close(false);
  }

  addInput() {
    this.inputList = document.getElementById('inputList')!;
    this.inputList.innerHTML += '<input class="form-control form-control-sm mb-2" type="text" placeholder="Insert input here">';
  }

  filterData() {
    const people = [
      {
        "name": "John Doe",
        "age": 30,
        "address": {
          "country": "Brazil"
        }
      },
      {
        "name": "Jane Doe",
        "age": 25,
        "address": {
          "country": "United States"
        }
      }
    ]

    const persons = [
      {
        "name": "Peter Smith",
        "age": 40,
        "address": {
          "country": "Canada"
        }
      },
      {
        "name": "Sarah Jones",
        "age": 35,
        "address": {
          "country": "Brazil"
        }
      }
    ]

    const cars = [
      {
        "make": "Toyota",
        "model": "Corolla",
        "country": "Brazil"
      },
      {
        "make": "Honda",
        "model": "Civic",
        "country": "United States"
      }
    ]
    const data = [...people, ...persons, ...cars];
    const expression = "[?address.country == 'li' || country == 'po']";
    const filteredData = this.dataFilterService.filterData(data, expression);
    console.log(filteredData); // Faça algo com os dados filtrados
  }

  // ngAfterViewInit() {
  //   const keyValueTemplate = document.querySelector("[data-key-value-template]")!
  //   const queryParamsContainer = document.querySelector("[data-query-params]")!
  //   const form = document.querySelector("[data-form]")
  //   const requestHeadersContainer = document.querySelector("[data-request-headers]")
  //   const responseHeadersContainer = document.querySelector(
  //     "[data-response-headers]"
  //   )


  //   this.elementRef.nativeElement.querySelector("[data-add-query-param-btn]")
  //     .addEventListener("click", () => {
  //       queryParamsContainer.append(createKeyValuePair())
  //     })

  //   function createKeyValuePair() {
  //     const element = keyValueTemplate.content.cloneNode(true)
  //     element.querySelector("[data-remove-btn]").addEventListener("click", e => {
  //       e.target.closest("[data-key-value-pair]").remove()
  //     })
  //     return element
  //   }

  // }


  async callapi() {
    debugger
    const url = (document.querySelector("[data-url]") as HTMLInputElement).value
    const method = (document.querySelector("[data-method]") as HTMLInputElement).value
    await this.apiService.getData(url, method)
      .then(response => {
        // Manipule a resposta aqui
        console.log(response);
      })
      .catch(error => {
        // Lide com erros aqui
        console.log('Erro ao obter dados:', error);
      });


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
