import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-another-component',
  templateUrl: './another-component.component.html',
  styleUrls: ['./another-component.component.css']
})
export class AnotherComponentComponent implements OnInit, OnDestroy {


  constructor() { }

  ngOnInit() {
    console.log("AnotherComponentComponent: ngOnInit");
  }

  ngOnDestroy(): void {
    console.log("AnotherComponentComponent: ngOnDestroy");
  }
}
