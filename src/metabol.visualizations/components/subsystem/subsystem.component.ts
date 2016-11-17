import { Component, Input, Output, EventEmitter } from '@angular/core';
import {SubsystemNode} from '../../models';

@Component({
  selector: '[subsystem]',
  templateUrl: './subsystem.component.html',
  styleUrls: ['./subsystem.component.css']
})
export class SubsystemComponent {

  @Input() node: SubsystemNode;
  @Output() onClick = new EventEmitter();

  onSubsystemClick() {
    this.node.deactive = true;
    this.node.reactions.forEach(r => { r.deactive = false });
    this.onClick.emit(this.node);
  }

}
