import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FbaService} from '../../../services/fba/fba.service';
import {FbaIteration, FbaNode, FbaLink} from '../../../services/fba/fbaiteration';
import * as colorization from '../../../modules/colorization';
import {VisualizationComponent} from '../../visualization/visualization.component';
import {IterationColorBoxComponent} from './iteration-color-box/iteration-color-box.component';
import {TextResultComponent} from './text-result/text-result.component';


@Component({
  moduleId: module.id,
  selector: 'app-result',
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.css'],
  directives: [VisualizationComponent, IterationColorBoxComponent, TextResultComponent],
  providers: [FbaService]
})
export class ResultComponent {

  nodes: FbaNode[];
  links: FbaLink[];
  colorize: colorization.IdenticalByHalf;
  isFullScreen: Boolean;
  currentIteration: number;
  colors: Array<String>;
  textResult: Array<any>;

  constructor(private fba: FbaService, route: ActivatedRoute) {
    this.colorize = new colorization.IdenticalByHalf();
    this.nodes = new Array<FbaNode>();
    this.links = new Array<FbaLink>();
    this.colors = new Array<String>();
    this.isFullScreen = false;

    route.params.subscribe((params) => {
      this.fba.startFba(params['key']);
    });

    this.currentIteration = 0;

    this.textResult = new Array<any>();
  }

  next() {
    this.fba.getNextIteration(
      (data) => {
        this.visualizationResultAnalyze(data);
        this.textResultAnalyze(data);

      });
  }

  previous() {
    this.currentIteration--;
  }

  save() {
    this.fba.save((data) => console.log(data));
  }

  visualizationResultAnalyze(data: FbaIteration) {
    let colorOfIteration = this.colorize.next();
    data.nodes.forEach((x) => x.color = colorOfIteration);
    this.colors.push(colorOfIteration);

    this.currentIteration++;
    data.nodes.forEach((x) => x.iteration = this.currentIteration);

    this.nodes = this.nodes.concat(data.nodes);
    this.links = this.links.concat(data.links);
  }

  textResultAnalyze(data: FbaIteration) {
    this.textResult.unshift({
      constraints: data.constraints,
      fluxes: data.fluxes,
      newMetaboliteCount: data.nodes.map(x => x.type == "r").length,
      newReactionCount: data.nodes.map(x => x.type == "m").length
    });
  }
}
