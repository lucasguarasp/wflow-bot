import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-configs-modal',
  templateUrl: './nav-configs-modal.component.html',
  styleUrls: ['./nav-configs-modal.component.css']
})
export class NavConfigsModalComponent implements OnInit {

  @Input() componentName: string;

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
  }


}
