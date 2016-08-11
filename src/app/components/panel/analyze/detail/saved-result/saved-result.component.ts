import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {ResultComponent} from "../../../../analyze/result/result.component";
import {LoadingService} from "../../../../../services/loading/loading.service";
import {ActivatedRoute} from '@angular/router';
import {FbaService} from '../../../../../services/fba/fba.service';
import {FbaIteration, FbaNode, FbaLink} from '../../../../../models/fbaiteration';
import * as colorization from '../../../../../modules/colorization';
import {VisualizationComponent} from '../../../../visualization/visualization.component';
import {IterationColorBoxComponent} from '../../../../analyze/result/iteration-color-box/iteration-color-box.component';
import {TextResultComponent} from '../../../../analyze/result/text-result/text-result.component';


@Component({
  moduleId: module.id,
  selector: 'saved-result',
  templateUrl: 'saved-result.component.html',
  styleUrls: ['saved-result.component.css'],
  directives: [VisualizationComponent, IterationColorBoxComponent, TextResultComponent],
  providers: [FbaService]
})
export class SavedResultComponent extends ResultComponent {

  @Output() nextIteration = new EventEmitter<{ iteration: number, callback: (data) => void }>();

  lastGettedIteration: number = 0;
  iterationLength: number;

  ngOnInit() {
  }

  next() {
    if (this.iterationLength > this.currentIteration)
      if (this.lastGettedIteration == this.currentIteration) {
        this.nextIteration.emit(
          {
            iteration: this.currentIteration,
            callback: (iteration) => {
              this.currentIteration++;
              this.lastGettedIteration++;
              this.visualizationResultAnalyze(iteration);
              this.textResultAnalyze(iteration);
            }
          });
      }
      else
        this.currentIteration++;
  }

}
