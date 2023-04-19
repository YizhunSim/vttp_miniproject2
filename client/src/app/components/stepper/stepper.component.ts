import { Component, Input, OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper implements OnInit{
  @Input() linearModeSelected: boolean = true;

  ngOnInit(): void {
    this.linear = this.linearModeSelected;
  }

  onClick(index: number){
    this.selectedIndex = index;
  }
}
