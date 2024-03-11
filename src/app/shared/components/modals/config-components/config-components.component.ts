import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-config-components',
  templateUrl: './config-components.component.html',
  styleUrls: ['./config-components.component.css']
})
export class ConfigComponentsComponent implements OnInit {

  @Input() itemSelected: any;
  inputList: HTMLElement;

  showName: boolean = true;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    debugger
    this.itemSelected;
    this.showName = this.itemSelected.class === "startFlow";
  }

  public confirmar() {
    this.activeModal.close(true);
  }

  public cancelar() {
    this.activeModal.close(false);
  }

  addInput() {
    this.inputList = document.getElementById('inputList')!;
    this.inputList.innerHTML += '<input class="form-control form-control-sm" type="text" placeholder="Insert input here">';

  }

}
