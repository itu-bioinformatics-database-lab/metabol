import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'fullscreenable-svg',
  templateUrl: 'fullscreenable-svg.component.html',
  styleUrls: ['fullscreenable-svg.component.css']
})
export class FullScreenableSvgComponent {

  @Input() isFullScreen: Boolean;
  @Output() isFullScreenChange: EventEmitter<Boolean>;

  constructor() {
    this.isFullScreen = this.isFullScreen || false;
    this.isFullScreenChange = new EventEmitter<Boolean>();
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.isFullScreenChange.emit(this.isFullScreen);
  }
}
