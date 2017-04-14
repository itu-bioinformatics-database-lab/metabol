import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

declare var Plotly: any;

@Component({
  selector: 'pathway-heatmap',
  templateUrl: './pathway-heatmap.component.html',
  styleUrls: ['./pathway-heatmap.component.css']
})
export class PathwayHeatmapComponent implements OnInit {

  constructor(private http: Http) { }

  data = [{
    x: ['a', 'b', 'c'],
    z: [[1, 20, 30], [20, 1, 60], [30, 60, 1, 5]],
    type: 'heatmap',
  }];

  ngOnInit() {
    // this.http.get('assets/datasets/healties_heatmap.json')
    //   .map(data => data.json())
    //   .subscribe(data => this.data = data);
  }

  ngAfterViewInit() {
    this.http.get('assets/datasets/healties_heatmap.json')
      .map(data => data.json())
      .subscribe(data => {
        data.margin = { b: 500 }
        Plotly.plot('heatmap', [data]);
      });
  }

}
