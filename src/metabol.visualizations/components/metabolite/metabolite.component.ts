import { Component, Input } from '@angular/core';
import {FbaNode} from '../../models';

@Component({
  selector: '[metabolite]',
  templateUrl: './metabolite.component.html',
  styleUrls: ['./metabolite.component.css']
})
export class MetaboliteComponent {

  @Input() node: FbaNode;

}
