import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

declare var Plotly: any;

@Component({
  selector: 'pathway-histogram',
  templateUrl: './pathway-histogram.component.html',
  styleUrls: ['./pathway-histogram.component.css']
})
export class PathwayHistogramComponent implements OnInit {

  constructor() { }

  data = [{
    x: ['a', 'b', 'c'],
    y: [1, 20, 30],
    type: 'bar',
  }];

  @Input() pathwayScores: Array<object>;

  ngOnInit() { }

  ngAfterViewInit() {
    this.data[0].x = Object.keys(this.pathwayScores[0]);
    this.data[0].y = [];

    for (let scores of this.pathwayScores)
      this.data[0].y = _.sortBy(_.toPairs(scores), [(x) => x[0]]).map(x => x[1]);

    Plotly.plot('histogram', this.data);
  }

}
