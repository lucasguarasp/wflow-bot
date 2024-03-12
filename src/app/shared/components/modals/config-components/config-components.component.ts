import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeComponent } from '../../../models/components/type-component.enum';
import { ComponentItem } from '../../../models/components/component-item';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from '../../../providers/sharedData.service';

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

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private sharedDataService: SharedDataService) {
    this.sharedDataService.getSelectedItemObservable().subscribe((item) => {
      this.itemSelected = item;
    });
  }

  ngOnInit() {
    debugger
    this.itemSelected = new ComponentItem(this.itemSelected);
    this.buildForms();
  }

  buildForms() {
    this.formGeral = this.fb.group({
      name: [''],
      nameOut: [''],
    });

    this.fillFormGeral();
  }

  fillFormGeral() {
    debugger
    this.formGeral.patchValue({
      name: this.itemSelected.name,
      nameOut: JSON.stringify(this.itemSelected.data)
    });

    if (this.itemSelected.class === this.components.StartFlow) {
      this.formGeral.disable()
    }
  }

  public confirmar() {
    const controleName = this.formGeral.get('name') as AbstractControl<string> | null;
    
    if (controleName) {
      this.itemSelected.name = controleName.value;
      debugger
    }

    this.sharedDataService.updateSelectedItem(this.itemSelected);
    this.activeModal.close(this.itemSelected);

  }

  public cancelar() {
    this.activeModal.close(false);
  }

  addInput() {
    this.inputList = document.getElementById('inputList')!;
    this.inputList.innerHTML += '<input class="form-control form-control-sm mb-2" type="text" placeholder="Insert input here">';
  }

}
