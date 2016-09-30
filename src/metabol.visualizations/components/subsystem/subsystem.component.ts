import { Component, Input } from '@angular/core';
import {SubsystemNode} from '../../models';

@Component({
  selector: 'subsystem',
  templateUrl: './subsystem.component.html',
  styleUrls: ['./subsystem.component.css']
})
export class SubsystemComponent {

  @Input() node: SubsystemNode;

}
