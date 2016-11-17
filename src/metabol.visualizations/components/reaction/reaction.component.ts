import { Component, Input} from '@angular/core';
import {FbaNode} from '../../models';

@Component({
  selector: '[reaction]',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent {

  @Input() node: FbaNode;

}
