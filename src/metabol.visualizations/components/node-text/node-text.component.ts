import { Component, Input} from '@angular/core';
import {FbaNode} from '../../models';

@Component({
  selector: '[node-text]',
  templateUrl: './node-text.component.html',
  styleUrls: ['./node-text.component.css']
})
export class NodeTextComponent {

  @Input() node: FbaNode;

}
