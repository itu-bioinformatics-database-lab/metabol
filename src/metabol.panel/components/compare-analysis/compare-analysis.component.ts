import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var Plotly: any;

@Component({
  selector: 'app-compare-analysis',
  templateUrl: './compare-analysis.component.html',
  styleUrls: ['./compare-analysis.component.css']
})
export class CompareAnalysisComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private element: ElementRef) { }

  data = [
    {
      z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
      type: 'heatmap'
    }
  ];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params['key1']);
      console.log(params['key2']);
    });

  }

  ngAfterViewInit(){
    Plotly.plot('heatmap', this.data);
  }

}
