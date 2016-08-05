import {Component, Input} from '@angular/core';
import {AccordionComponent} from '../../../accordion/accordion.component';
import {KeysPipe} from '../../../../pipes/keys.pipe';

@Component({
  moduleId: module.id,
  selector: 'text-result',
  templateUrl: 'text-result.component.html',
  styleUrls: ['text-result.component.css'],
  directives: [AccordionComponent],
  pipes: [KeysPipe]
})
export class TextResultComponent {

  @Input() title: String;
  @Input() currentIteration: Number;

  // TODO: update api
  @Input() textResult: Array<any>;

  constructor() {
    this.textResult = new Array<any>();
  }

  // Bad performans
  // titleGenerater(index) {
  //   let iteration = this.textResult[index];
  //   let title = 'Iteration ' + (this.textResult.length - index)
  //     + ' (Expanded Metabolite: ' + '' + ')'
  //     + ' (Added ' + iteration.newMetaboliteCount + ' metabolites, '
  //     + iteration.newReactionCount + ' reactions)';
  //
  //   return title;
  // }
}
