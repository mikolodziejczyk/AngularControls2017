import { Component, OnInit, ElementRef, AfterViewInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef, TemplateRef } from '@angular/core';
import { AnotherComponentComponent } from '../another-component/another-component.component';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit, AfterViewInit {

  constructor(private hostElement: ElementRef, private hostViewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  @ViewChild("container", { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  @ViewChild("container2", { read: ViewContainerRef }) viewContainerRef2: ViewContainerRef;
  @ViewChild("template") template: TemplateRef<any>;

  ngOnInit() {

    console.log(this.hostElement.nativeElement.outerHTML);
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    console.log(this.hostViewContainerRef.element.nativeElement);
    console.log(this.viewContainerRef.element.nativeElement);
    console.log(this.viewContainerRef2.element.nativeElement);
    console.log("Injecting the component dynamically");
    // let factory = this.componentFactoryResolver.resolveComponentFactory(AnotherComponentComponent);
    // this.ref = this.viewContainerRef.createComponent(factory);
    // // ref.changeDetectorRef.detectChanges();
    // let index = this.viewContainerRef.indexOf(this.ref.hostView);
    // console.log(`Inserted element index: ${index}`);

    for (let i = 0; i < 5; i++) {
      let view = this.template.createEmbeddedView(null);
      this.viewContainerRef.insert(view);
    }
  }

  ref: ComponentRef<AnotherComponentComponent>;

  remove = () => {
    console.log("remove");
    // this.viewContainerRef.clear();
    let index = this.viewContainerRef.indexOf(this.ref.hostView);
    this.viewContainerRef.remove(index);

  }
}
