import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.less']
})
export class FormRowComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChild('helpIcon') 
  private helpIcon : ElementRef;
  

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.help) {
      let helpHtml : string = this.help.replace(/(\r)?\n/g,"<br/>");

      $(this.helpIcon.nativeElement).popover({
        content: helpHtml,
        title: this.label,
        html: true,
        container: 'body'
      });
    }
  }


  @Input() label: string;
  @Input() id: string;
  @Input() help: string;
  @Input() control: FormControl;
}
