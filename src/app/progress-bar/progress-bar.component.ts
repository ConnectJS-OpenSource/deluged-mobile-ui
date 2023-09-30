import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  standalone: true,
  styleUrls: ['./progress-bar.component.scss'],
  imports: [
    NgIf
  ]
})
export class ProgressBarComponent  implements OnInit {

  @Input() bgColor?: string = "#e7e7e7";
  @Input() fgColor?: string = "#bb90ff";
  @Input() value: number = 0;
  @Input() height?: number = 20;

  @Input() hideLabel: boolean = false;

  constructor() { }

  ngOnInit() {}


  get outer_style() {
    return {
      backgroundColor: this.bgColor,
      height: `${this.height}px`
    }
  }

  get inner_style() {
    return {
      backgroundColor: this.fgColor,
      width: `${this.prog_value}%`,
      height: `${this.height}px`
    }
  }

  get prog_value(): number{
    return Math.round(this.value);
  }
}
