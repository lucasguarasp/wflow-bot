import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeComponent } from '../../../models/components/type-component.enum';
import { ComponentItem } from '../../../models/components/component-item';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from '../../../providers/sharedData.service';
import { DataFilterService } from '../../../providers/data-filter.service';

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
  public formGeral: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private sharedDataService: SharedDataService, private dataFilterService: DataFilterService) {
    this.sharedDataService.getSelectedItemObservable().subscribe((item) => {
      this.itemSelected = item;
    });
  }

  ngOnInit() {
    
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

  private tryParseJSON(jsonString: string): any {
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


}
