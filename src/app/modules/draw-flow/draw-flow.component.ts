import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Drawflow from 'drawflow';
import { ConfigComponentsComponent } from '../../shared/components/modals/config-components/config-components.component';

@Component({
  selector: 'app-draw-flow',
  templateUrl: './draw-flow.component.html',
  styleUrls: ['./draw-flow.component.css']
})
export class DrawFlowComponent implements OnInit {

  @Input()
  nodes: any[];
  @Input()
  drawingData: string;
  @Input()
  locked: boolean;
  @Input()
  showLock: boolean;
  @Input()
  showNodes: boolean;
  @Input()
  otherDetails: any;

  editor!: any;
  editDivHtml: HTMLElement;
  editButtonShown: boolean = false;

  drawnNodes: any[] = [];
  selectedNodeId: string;
  selectedNode: any = {};

  lastMousePositionEv: any;

  mobile_item_selec: string;
  mobile_last_move: TouchEvent | null;

  nodeModal: ElementRef;
  @ViewChild('content') set setNodeModal(el: ElementRef) {
    this.nodeModal = el;
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initDrawingBoard();
    // this.editor.editor_mode = this.locked != null && this.locked == false ? 'edit' : 'fixed';
  }

  private initDrawingBoard() {
    this.initDrawFlow();
    if (!this.locked) {
      this.addEditorEvents();
      this.dragEvent();
    }
  }

  // Private functions
  private initDrawFlow(): void {
    if (typeof document !== 'undefined') {
      const drawFlowHtmlElement = document.getElementById('drawflow');
      this.editor = new Drawflow(drawFlowHtmlElement as HTMLElement);

      this.editor.reroute = true;
      this.editor.curvature = 0.5;
      this.editor.reroute_fix_curvature = true;
      this.editor.reroute_curvature = 0.5;
      this.editor.force_first_input = false;
      this.editor.line_path = 1;
      this.editor.editor_mode = 'edit';

      // this.editor.useuuid = true;

      this.editor.start();

      // para tester, carrega desenho
      // const dataToImport = { "drawflow": { "Home": { "data": { "1": { "id": 1, "name": "welcome", "data": {}, "class": "welcome", "html": "\n    <div>\n      <div class=\"title-box\">👏 Welcome!!</div>\n      <div class=\"box\">\n        <p>Simple flow library <b>demo</b>\n        <a href=\"https://github.com/jerosoler/Drawflow\" target=\"_blank\">Drawflow</a> by <b>Jero Soler</b></p><br>\n\n        <p>Multiple input / outputs<br>\n           Data sync nodes<br>\n           Import / export<br>\n           Modules support<br>\n           Simple use<br>\n           Type: Fixed or Edit<br>\n           Events: view console<br>\n           Pure Javascript<br>\n        </p>\n        <br>\n        <p><b><u>Shortkeys:</u></b></p>\n        <p>🎹 <b>Delete</b> for remove selected<br>\n        💠 Mouse Left Click == Move<br>\n        ❌ Mouse Right == Delete Option<br>\n        🔍 Ctrl + Wheel == Zoom<br>\n        📱 Mobile support<br>\n        ...</p>\n      </div>\n    </div>\n    ", "typenode": false, "inputs": {}, "outputs": {}, "pos_x": 50, "pos_y": 50 }, "2": { "id": 2, "name": "slack", "data": {}, "class": "slack", "html": "\n          <div>\n            <div class=\"title-box\"><i class=\"fab fa-slack\"></i> Slack chat message</div>\n          </div>\n          ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "7", "input": "output_1" }] } }, "outputs": {}, "pos_x": 1028, "pos_y": 87 }, "3": { "id": 3, "name": "telegram", "data": { "channel": "channel_2" }, "class": "telegram", "html": "\n          <div>\n            <div class=\"title-box\"><i class=\"fab fa-telegram-plane\"></i> Telegram bot</div>\n            <div class=\"box\">\n              <p>Send to telegram</p>\n              <p>select channel</p>\n              <select df-channel>\n                <option value=\"channel_1\">Channel 1</option>\n                <option value=\"channel_2\">Channel 2</option>\n                <option value=\"channel_3\">Channel 3</option>\n                <option value=\"channel_4\">Channel 4</option>\n              </select>\n            </div>\n          </div>\n          ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "7", "input": "output_1" }] } }, "outputs": {}, "pos_x": 1032, "pos_y": 184 }, "4": { "id": 4, "name": "email", "data": {}, "class": "email", "html": "\n            <div>\n              <div class=\"title-box\"><i class=\"fas fa-at\"></i> Send Email </div>\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "5", "input": "output_1" }] } }, "outputs": {}, "pos_x": 1033, "pos_y": 439 }, "5": { "id": 5, "name": "template", "data": { "template": "Write your template" }, "class": "template", "html": "\n            <div>\n              <div class=\"title-box\"><i class=\"fas fa-code\"></i> Template</div>\n              <div class=\"box\">\n                Ger Vars\n                <textarea df-template></textarea>\n                Output template with vars\n              </div>\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "6", "input": "output_1" }] } }, "outputs": { "output_1": { "connections": [{ "node": "4", "output": "input_1" }, { "node": "11", "output": "input_1" }] } }, "pos_x": 607, "pos_y": 304 }, "6": { "id": 6, "name": "github", "data": { "name": "https://github.com/jerosoler/Drawflow" }, "class": "github", "html": "\n          <div>\n            <div class=\"title-box\"><i class=\"fab fa-github \"></i> Github Stars</div>\n            <div class=\"box\">\n              <p>Enter repository url</p>\n            <input type=\"text\" df-name>\n            </div>\n          </div>\n          ", "typenode": false, "inputs": {}, "outputs": { "output_1": { "connections": [{ "node": "5", "output": "input_1" }] } }, "pos_x": 341, "pos_y": 191 }, "7": { "id": 7, "name": "facebook", "data": {}, "class": "facebook", "html": "\n        <div>\n          <div class=\"title-box\"><i class=\"fab fa-facebook\"></i> Facebook Message</div>\n        </div>\n        ", "typenode": false, "inputs": {}, "outputs": { "output_1": { "connections": [{ "node": "2", "output": "input_1" }, { "node": "3", "output": "input_1" }, { "node": "11", "output": "input_1" }] } }, "pos_x": 347, "pos_y": 87 }, "11": { "id": 11, "name": "log", "data": {}, "class": "log", "html": "\n            <div>\n              <div class=\"title-box\"><i class=\"fas fa-file-signature\"></i> Save log file </div>\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "5", "input": "output_1" }, { "node": "7", "input": "output_1" }] } }, "outputs": {}, "pos_x": 1031, "pos_y": 363 } } }, "Other": { "data": { "8": { "id": 8, "name": "personalized", "data": {}, "class": "personalized", "html": "\n            <div>\n              Personalized\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "12", "input": "output_1" }, { "node": "12", "input": "output_2" }, { "node": "12", "input": "output_3" }, { "node": "12", "input": "output_4" }] } }, "outputs": { "output_1": { "connections": [{ "node": "9", "output": "input_1" }] } }, "pos_x": 764, "pos_y": 227 }, "9": { "id": 9, "name": "dbclick", "data": { "name": "Hello World!!" }, "class": "dbclick", "html": "\n            <div>\n            <div class=\"title-box\"><i class=\"fas fa-mouse\"></i> Db Click</div>\n              <div class=\"box dbclickbox\" ondblclick=\"showpopup(event)\">\n                Db Click here\n                <div class=\"modal\" style=\"display:none\">\n                  <div class=\"modal-content\">\n                    <span class=\"close\" onclick=\"closemodal(event)\">&times;</span>\n                    Change your variable {name} !\n                    <input type=\"text\" df-name>\n                  </div>\n\n                </div>\n              </div>\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "8", "input": "output_1" }] } }, "outputs": { "output_1": { "connections": [{ "node": "12", "output": "input_2" }] } }, "pos_x": 209, "pos_y": 38 }, "12": { "id": 12, "name": "multiple", "data": {}, "class": "multiple", "html": "\n            <div>\n              <div class=\"box\">\n                Multiple!\n              </div>\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [] }, "input_2": { "connections": [{ "node": "9", "input": "output_1" }] }, "input_3": { "connections": [] } }, "outputs": { "output_1": { "connections": [{ "node": "8", "output": "input_1" }] }, "output_2": { "connections": [{ "node": "8", "output": "input_1" }] }, "output_3": { "connections": [{ "node": "8", "output": "input_1" }] }, "output_4": { "connections": [{ "node": "8", "output": "input_1" }] } }, "pos_x": 179, "pos_y": 272 } } } } }
      // this.editor.import(dataToImport);
    }
  }

  private addEditorEvents() {
    // Events!
    this.editor.on('nodeCreated', (id: any) => {
      console.log('Editor Event :>> Node created ' + id, this.editor.getNodeFromId(id));
    });

    this.editor.on('nodeRemoved', (id: any) => {
      console.log('Editor Event :>> Node removed ' + id);
    });

    this.editor.on('nodeSelected', (id: any) => {
      console.log('Editor Event :>> Node selected ' + id, this.editor.getNodeFromId(id));
      this.selectedNode = this.editor.drawflow.drawflow.Home.data[`${id}`];
      console.log('Editor Event :>> Node selected :>> this.selectedNode :>> ', this.selectedNode);
      console.log('Editor Event :>> Node selected :>> this.selectedNode :>> ', this.selectedNode.data);
    });

    this.editor.on('click', (e: any) => {
      console.log('Editor Event :>> Click :>> ', e);
      if (e.target.closest('.drawflow_content_node') != null || e.target.classList[0] === 'drawflow-node') {
        if (e.target.closest('.drawflow_content_node') != null) {
          this.selectedNodeId = e.target.closest('.drawflow_content_node').parentElement.id;
        } else {
          this.selectedNodeId = e.target.id;
        }
        this.selectedNode = this.editor.drawflow.drawflow.Home.data[`${this.selectedNodeId.slice(5)}`];
      }

      if (e.target.closest('#editNode') != null || e.target.classList[0] === 'edit-node-button') {
        // Open modal with Selected Node   
        debugger
        this.open(this.nodeModal, this.selectedNodeId);
      }

      if (e.target.closest('#editNode') === null) {
        this.hideEditButton();
      }
    });

    this.editor.on('moduleCreated', (name: any) => {
      console.log('Editor Event :>> Module Created ' + name);
    });

    this.editor.on('moduleChanged', (name: any) => {
      console.log('Editor Event :>> Module Changed ' + name);
    });

    this.editor.on('connectionCreated', (connection: any) => {
      console.log('Editor Event :>> Connection created ', connection);
    });

    this.editor.on('connectionRemoved', (connection: any) => {
      console.log('Editor Event :>> Connection removed ', connection);
    });

    this.editor.on('contextmenu', (e: any) => {
      console.log('Editor Event :>> Context Menu :>> ', e);

      if (e.target.closest('.drawflow_content_node') != null || e.target.classList[0] === 'drawflow-node') {
        if (e.target.closest('.drawflow_content_node') != null) {
          this.selectedNodeId = e.target.closest('.drawflow_content_node').parentElement.id;
        } else {
          this.selectedNodeId = e.target.id;
        }
        this.selectedNode = this.editor.drawflow.drawflow.Home.data[`${this.selectedNodeId.slice(5)}`];

        this.showEditButton();
      }
    });

    this.editor.on('zoom', (zoom: any) => {
      console.log('Editor Event :>> Zoom level ' + zoom);
    });

    this.editor.on('addReroute', (id: any) => {
      console.log('Editor Event :>> Reroute added ' + id);
    });

    this.editor.on('removeReroute', (id: any) => {
      console.log('Editor Event :>> Reroute removed ' + id);
    });

    // this.editor.on('mouseMove', (position: any) => {
    //   console.log('Editor Event :>> Position mouse x:' + position.x + ' y:' + position.y);
    // });

    this.editor.on('nodeMoved', (id: any) => {
      console.log('Editor Event :>> Node moved ' + id);
    });

    this.editor.on('translate', (position: any) => {
      console.log(
        'Editor Event :>> Translate x:' + position.x + ' y:' + position.y
      );
    });

    this.editor.on('dblclick', (e: any) => {
      console.log(
        'Editor Event :>> Translate dblclick'
      );
    });
  }

  private dragEvent() {
    var elements = Array.from(document.getElementsByClassName('drag-drawflow'));

    elements.forEach(element => {
      // element.addEventListener('touchend', this.drop, false);
      // element.addEventListener('touchmove', this.positionMobile, false);
      // element.addEventListener('touchstart', this.drag, false);
      element.addEventListener("dblclick", (event) => { });

    });

  }

  private positionMobile(ev: any) {
    this.mobile_last_move = ev;
  }

  public allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any) {
    if (ev.type === "touchstart") {
      this.selectedNode = ev.target.closest(".drag-drawflow").getAttribute('data-node');
    } else {
      ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
    }
  }

  drop(ev: any) {
    if (ev.type === "touchend") {
      // var parentdrawflow = document.elementFromPoint(this.mobile_last_move.touches[0].clientX, this.mobile_last_move.touches[0].clientY).closest("#drawflow");
      // if (parentdrawflow != null) {
      //   addNodeToDrawFlow(this.mobile_item_selec, this.mobile_last_move.touches[0].clientX, this.mobile_last_move.touches[0].clientY);
      // }
      this.mobile_item_selec = '';
    } else {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("node");
      this.addNodeToDrawFlow(data, ev.clientX, ev.clientY);
    }
  }

  private addNodeToDrawFlow(name: string, pos_x: number, pos_y: number) {
    // if (this.editor.editor_mode === 'fixed') {
    //   return false;
    // }

    pos_x = pos_x * (this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().x * (this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)));
    pos_y = pos_y * (this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().y * (this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)));


    // this.editor.addNode(name, inputs, outputs, posx, posy, class, data, html);
    switch (name) {
      case 'startFlow':
        var startFlow = `
        <div>
          <div class="title-box"><i class="fa fa-play"></i> StartFlow</div>
        </div>
        `;
        this.editor.addNode('startFlow', 0, 1, pos_x, pos_y, 'startFlow', { nameOut: '__sessionData__', data: {} }, startFlow);
        break;
      case 'endFlow':
        var endFlow = `
        <div>
          <div class="title-box"><i class="fa fa-circle"></i> endFlow</div>
        </div>
        `;
        this.editor.addNode('endFlow', 1, 0, pos_x, pos_y, 'endFlow', { data: {} }, endFlow);
        break;
      case 'dbclick':
        var dbclick = `
          <div (dblclick)="testeModal()">
          <div class="title-box"><i class="fas fa-mouse" (dblclick)="testeModal()"></i> No name</div>
            <div class="box dbclickbox" (dblclick)="testeModal()">
              Db Click here
            </div>
          </div>
          `;
        this.editor.addNode('noName', 1, 1, pos_x, pos_y, 'noName', { name: '' }, dbclick);
        break;
      case 'Anotation':
        var Anotation = `
        <div>
          <div class="title-box">👏 Welcome!!</div>
          <div class="box">
            <p>Simple flow library <b>demo</b>
            <a href="https://github.com/jerosoler/Drawflow" target="_blank">Drawflow</a> by <b>Jero Soler</b></p><br>
    
            <p>Multiple input / outputs<br>
               Data sync nodes<br>
               Import / export<br>
               Modules support<br>
               Simple use<br>
               Type: Fixed or Edit<br>
               Events: view console<br>
               Pure Javascript<br>
            </p>
            <br>
            <p><b><u>Shortkeys:</u></b></p>
            <p>🎹 <b>Delete</b> for remove selected<br>
            💠 Mouse Left Click == Move<br>
            ❌ Mouse Right == Delete Option<br>
            🔍 Ctrl + Wheel == Zoom<br>
            📱 Mobile support<br>
            ...</p>
          </div>
        </div>
        `;
        this.editor.addNode('Anotation', 0, 0, pos_x, pos_y, 'Anotation', {}, Anotation);
        break;

      default:
    }
  }

  export() {
    const html = JSON.stringify(this.editor.export(), null, 4)
  }

  save() {
    const html = JSON.stringify(this.editor.export(), null, 4)
  }

  import() {
    const dataToImport = { "drawflow": { "Home": { "data": { "1": { "id": 1, "name": "welcome", "data": {}, "class": "welcome", "html": "\n    <div>\n      <div class=\"title-box\">👏 Welcome!!</div>\n      <div class=\"box\">\n        <p>Simple flow library <b>demo</b>\n        <a href=\"https://github.com/jerosoler/Drawflow\" target=\"_blank\">Drawflow</a> by <b>Jero Soler</b></p><br>\n\n        <p>Multiple input / outputs<br>\n           Data sync nodes<br>\n           Import / export<br>\n           Modules support<br>\n           Simple use<br>\n           Type: Fixed or Edit<br>\n           Events: view console<br>\n           Pure Javascript<br>\n        </p>\n        <br>\n        <p><b><u>Shortkeys:</u></b></p>\n        <p>🎹 <b>Delete</b> for remove selected<br>\n        💠 Mouse Left Click == Move<br>\n        ❌ Mouse Right == Delete Option<br>\n        🔍 Ctrl + Wheel == Zoom<br>\n        📱 Mobile support<br>\n        ...</p>\n      </div>\n    </div>\n    ", "typenode": false, "inputs": {}, "outputs": {}, "pos_x": 50, "pos_y": 50 }, "2": { "id": 2, "name": "slack", "data": {}, "class": "slack", "html": "\n          <div>\n            <div class=\"title-box\"><i class=\"fab fa-slack\"></i> Slack chat message</div>\n          </div>\n          ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "7", "input": "output_1" }] } }, "outputs": {}, "pos_x": 1028, "pos_y": 87 }, "3": { "id": 3, "name": "telegram", "data": { "channel": "channel_2" }, "class": "telegram", "html": "\n          <div>\n            <div class=\"title-box\"><i class=\"fab fa-telegram-plane\"></i> Telegram bot</div>\n            <div class=\"box\">\n              <p>Send to telegram</p>\n              <p>select channel</p>\n              <select df-channel>\n                <option value=\"channel_1\">Channel 1</option>\n                <option value=\"channel_2\">Channel 2</option>\n                <option value=\"channel_3\">Channel 3</option>\n                <option value=\"channel_4\">Channel 4</option>\n              </select>\n            </div>\n          </div>\n          ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "7", "input": "output_1" }] } }, "outputs": {}, "pos_x": 1032, "pos_y": 184 }, "4": { "id": 4, "name": "email", "data": {}, "class": "email", "html": "\n            <div>\n              <div class=\"title-box\"><i class=\"fas fa-at\"></i> Send Email </div>\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "5", "input": "output_1" }] } }, "outputs": {}, "pos_x": 1033, "pos_y": 439 }, "5": { "id": 5, "name": "template", "data": { "template": "Write your template" }, "class": "template", "html": "\n            <div>\n              <div class=\"title-box\"><i class=\"fas fa-code\"></i> Template</div>\n              <div class=\"box\">\n                Ger Vars\n                <textarea df-template></textarea>\n                Output template with vars\n              </div>\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "6", "input": "output_1" }] } }, "outputs": { "output_1": { "connections": [{ "node": "4", "output": "input_1" }, { "node": "11", "output": "input_1" }] } }, "pos_x": 607, "pos_y": 304 }, "6": { "id": 6, "name": "github", "data": { "name": "https://github.com/jerosoler/Drawflow" }, "class": "github", "html": "\n          <div>\n            <div class=\"title-box\"><i class=\"fab fa-github \"></i> Github Stars</div>\n            <div class=\"box\">\n              <p>Enter repository url</p>\n            <input type=\"text\" df-name>\n            </div>\n          </div>\n          ", "typenode": false, "inputs": {}, "outputs": { "output_1": { "connections": [{ "node": "5", "output": "input_1" }] } }, "pos_x": 341, "pos_y": 191 }, "7": { "id": 7, "name": "facebook", "data": {}, "class": "facebook", "html": "\n        <div>\n          <div class=\"title-box\"><i class=\"fab fa-facebook\"></i> Facebook Message</div>\n        </div>\n        ", "typenode": false, "inputs": {}, "outputs": { "output_1": { "connections": [{ "node": "2", "output": "input_1" }, { "node": "3", "output": "input_1" }, { "node": "11", "output": "input_1" }] } }, "pos_x": 347, "pos_y": 87 }, "11": { "id": 11, "name": "log", "data": {}, "class": "log", "html": "\n            <div>\n              <div class=\"title-box\"><i class=\"fas fa-file-signature\"></i> Save log file </div>\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "5", "input": "output_1" }, { "node": "7", "input": "output_1" }] } }, "outputs": {}, "pos_x": 1031, "pos_y": 363 } } }, "Other": { "data": { "8": { "id": 8, "name": "personalized", "data": {}, "class": "personalized", "html": "\n            <div>\n              Personalized\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "12", "input": "output_1" }, { "node": "12", "input": "output_2" }, { "node": "12", "input": "output_3" }, { "node": "12", "input": "output_4" }] } }, "outputs": { "output_1": { "connections": [{ "node": "9", "output": "input_1" }] } }, "pos_x": 764, "pos_y": 227 }, "9": { "id": 9, "name": "dbclick", "data": { "name": "Hello World!!" }, "class": "dbclick", "html": "\n            <div>\n            <div class=\"title-box\"><i class=\"fas fa-mouse\"></i> Db Click</div>\n              <div class=\"box dbclickbox\" ondblclick=\"showpopup(event)\">\n                Db Click here\n                <div class=\"modal\" style=\"display:none\">\n                  <div class=\"modal-content\">\n                    <span class=\"close\" onclick=\"closemodal(event)\">&times;</span>\n                    Change your variable {name} !\n                    <input type=\"text\" df-name>\n                  </div>\n\n                </div>\n              </div>\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [{ "node": "8", "input": "output_1" }] } }, "outputs": { "output_1": { "connections": [{ "node": "12", "output": "input_2" }] } }, "pos_x": 209, "pos_y": 38 }, "12": { "id": 12, "name": "multiple", "data": {}, "class": "multiple", "html": "\n            <div>\n              <div class=\"box\">\n                Multiple!\n              </div>\n            </div>\n            ", "typenode": false, "inputs": { "input_1": { "connections": [] }, "input_2": { "connections": [{ "node": "9", "input": "output_1" }] }, "input_3": { "connections": [] } }, "outputs": { "output_1": { "connections": [{ "node": "8", "output": "input_1" }] }, "output_2": { "connections": [{ "node": "8", "output": "input_1" }] }, "output_3": { "connections": [{ "node": "8", "output": "input_1" }] }, "output_4": { "connections": [{ "node": "8", "output": "input_1" }] } }, "pos_x": 179, "pos_y": 272 } } } } }
    this.editor.import(dataToImport);
  }

  onClear() {
    this.editor.clear();
  }

  changeMode() {
    this.locked = !this.locked;
    this.editor.editor_mode = this.locked != null && this.locked == false ? 'edit' : 'fixed';
  }

  onZoomOut() {
    this.editor.zoom_out();
  }

  onZoomIn() {
    this.editor.zoom_in();
  }

  onZoomReset() {
    this.editor.zoom_reset();
  }

  exportDrawingData() {
    return this.editor.export();
  }

  onSubmit() {
    this.drawingData = this.exportDrawingData();
  }

  openModalConfig() {

    const modalRef = this.modalService.open(ConfigComponentsComponent, {
      centered: true,
      backdrop: 'static'
    });
    debugger
    this.selectedNodeId;
    modalRef.componentInstance.itemSelected = this.selectedNode;
    // modalRef.componentInstance.confirmarLabel = 'Sim';
    // modalRef.componentInstance.cancelarLabel = 'Não';
    // modalRef.result.then(result => {
    //   if (result) {
    //     debugger

    //   }
    // });
  }

  private hideEditButton() {
    this.editButtonShown = false;
    this.editDivHtml = document.getElementById('editNode')!;
    if (this.editDivHtml) {
      this.editDivHtml.remove();
    }
  }

  open(content: any, nodeId: string) {
    this.hideEditButton();

    const oldNodeIdNumber = parseInt(nodeId.slice(5));
    this.selectedNode = this.editor.drawflow.drawflow.Home.data[`${oldNodeIdNumber}`];
    const oldNodeStringified = JSON.stringify(this.selectedNode);
    // const { inputsCount, outputsCount } = this.countInOutputsOfNode(JSON.parse(oldNodeStringified));

    this.openModalConfig()
    // const modalRef = this.modalService.open(content, { size: 'xl', backdrop: 'static', keyboard: false });
  }
  private showEditButton() {
    this.editButtonShown = true;
    this.editDivHtml = document.createElement('div');
    this.editDivHtml.id = 'editNode';
    this.editDivHtml.innerHTML = '<i class="fas fa-pen" aria-hidden="true"></i>';
    this.editDivHtml.style.display = 'block';
    this.editDivHtml.style.position = 'absolute';
    this.editDivHtml.className = 'edit-node-button';

    this.editDivHtml.style.right = '22px';
    this.editDivHtml.style.top = '-15px';
    this.editDivHtml.style.width = '30px';
    this.editDivHtml.style.height = '30px';
    this.editDivHtml.style.borderRadius = '50%';
    this.editDivHtml.style.textAlign = 'center';
    this.editDivHtml.style.fontSize = 'x-small';

    this.editDivHtml.style.border = '2px solid #4ea9ff';
    this.editDivHtml.style.background = 'white';
    this.editDivHtml.style.color = '#4ea9ff';
    // this.editDivHtml.style.boxShadow = '0 2px 20px 2px #4ea9ff';
    this.editDivHtml.style.lineHeight = '25px';

    const selectedNodeHtml = document.getElementById(this.selectedNodeId);
    selectedNodeHtml?.append(this.editDivHtml);
  }

}
