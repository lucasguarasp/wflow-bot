import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-tabs-config',
  templateUrl: './nav-tabs-config.component.html',
  styleUrls: ['./nav-tabs-config.component.css']
})
export class NavTabsConfigComponent implements OnInit {

  @Input() componentName: string;

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
  }

}
