import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'iteration-color-box',
  templateUrl: 'iteration-color-box.component.html',
  styleUrls: ['iteration-color-box.component.css']
})
export class IterationColorBoxComponent {

  @Input() colors: Array<String>;

  colorCircleX(colorIndex) {
    return (colorIndex % 11) * 15 + 15;
  }

  colorCircleY(colorIndex) {
    return (Math.floor(colorIndex / 11) + 1) * 25;
  }

}
