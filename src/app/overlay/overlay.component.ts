import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mko-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.less']
})
export class OverlayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() active: boolean = false;

}
