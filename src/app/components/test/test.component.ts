import { Component, OnInit } from '@angular/core';
import {VisualizationComponent} from '../visualization/visualization.component';

@Component({
  moduleId: module.id,
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: ['test.component.css'],
  directives: [VisualizationComponent]
})
export class TestComponent implements OnInit {
  isFullScreen: Boolean;

  constructor() {
    this.isFullScreen = true;
  }

  ngOnInit() {
  }

}
