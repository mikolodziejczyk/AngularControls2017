import { Component, OnInit, Input } from '@angular/core';
import { multilineTextToHtml } from '../formhelpers/multilineTextToHtml';

@Component({
  selector: 'mko-operation-failed',
  templateUrl: './operation-failed.component.html',
  styleUrls: ['./operation-failed.component.css']
})
export class OperationFailedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() active : boolean = false;
  @Input() title: string = "Nieudane";
  @Input() body: string;
  @Input() backLinkName: string = "Wróć";
  @Input() backLinkUrl: string;

  _bodyHtml: string;

  @Input() set bodyHtml(v: string) {
    this._bodyHtml = v;
    this.body = multilineTextToHtml(v);
  }
  
  get bodyHtml() : string {
    return this._bodyHtml;
  }
}
